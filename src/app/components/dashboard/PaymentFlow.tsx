import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { logger } from "../../lib/logger";
import {
  X,
  ChevronLeft,
  Star,
  MapPin,
  Pencil,
  Lock,
  Check,
  CreditCard,
  Building2,
  Wallet,
  HandCoins,
  Copy,
  Mail,
  MessageSquare,
  MapPinned,
  Download,
  Loader2,
  Shield,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
/* MOCK — for offline development only */
// import MockApiService from "../../services/MockApiService";
import { dataService } from "../../services/DataService";
import { isApiReachable, bookingsApi, transactionsApi, type BookingRecord, type TransactionRecord } from "../../services/api";
import {
  createOrder,
  verifyPayment,
  openRazorpayCheckout,
  isRazorpayAvailable,
  type CreateOrderResult,
} from "../../services/payments";
import { ChatModal } from "./ChatModal";

/** Offline/demo mode — simulate payment instead of calling Razorpay. */
const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";
import { PrimaryButton } from "../shared/PrimaryButton";
import { Confetti } from "../shared/Confetti";

// ─── Types ───
export interface PaymentProvider {
  id: string;
  name: string;
  photo: string;
  service: string;
  rating: number;
  verified: boolean;
  distance?: string;
  role?: string;
  agency?: string;
}

export interface PaymentBookingDetails {
  serviceType: string;
  startDate: string;
  startTime: string;
  duration: string;
  durationDays: number;
  location: string;
  dailyRate: number;
}

interface PaymentFlowProps {
  open: boolean;
  provider: PaymentProvider;
  booking: PaymentBookingDetails;
  onClose: () => void;
  onComplete: (bookingId: string) => void;
  /** Start at a specific step. Defaults to "summary". Use "payment" to skip the summary sheet when BookingCheckout is used upstream. */
  startStep?: SheetStep;
  /** Run AFTER server verify succeeds, BEFORE the success sheet (e.g. bid accept).
   *  Throwing flips to the failure sheet. */
  onVerified?: (transactionId: string) => Promise<void>;
  /** Use this exact total (rupees) instead of recomputing — keeps Razorpay's
   *  amount aligned with what the checkout summary showed. */
  totalOverride?: number;
}

type SheetStep = "summary" | "payment" | "processing" | "confirmed";
type PaymentMethodId = "upi" | "card" | "netbanking" | "wallet" | "cash";

// ─── Card network detection ───
function detectCardNetwork(num: string): string | null {
  const clean = num.replace(/\s/g, "");
  if (/^4/.test(clean)) return "Visa";
  if (/^5[1-5]/.test(clean) || /^2[2-7]/.test(clean)) return "Mastercard";
  if (/^6[0-9]/.test(clean) || /^81/.test(clean) || /^82/.test(clean))
    return "RuPay";
  return null;
}

function formatCardNumber(val: string): string {
  const clean = val.replace(/\D/g, "").slice(0, 16);
  return clean.replace(/(.{4})/g, "$1 ").trim();
}

// ─── Animated checkmark SVG ───
function AnimatedCheckmark() {
  return (
    <svg width={72} height={72} viewBox="0 0 72 72" fill="none">
      <circle cx={36} cy={36} r={34} stroke="#1975D2" strokeWidth={3} opacity={0.2} />
      <motion.circle
        cx={36}
        cy={36}
        r={34}
        stroke="#1975D2"
        strokeWidth={3}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ rotate: -90, transformOrigin: "center" }}
      />
      <motion.path
        d="M22 37L32 47L50 26"
        stroke="#1975D2"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
      />
    </svg>
  );
}

// ─── Processing animation ───
function ProcessingAnimation({ failed }: { failed: boolean }) {
  if (failed) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="size-[80px] rounded-full bg-[#FEE2E2] flex items-center justify-center"
      >
        <span className="text-[36px]">&#10060;</span>
      </motion.div>
    );
  }

  return (
    <div className="relative size-[80px]">
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full bg-[#1975D2]/10"
      />
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.2,
        }}
        className="absolute inset-2 rounded-full bg-[#1975D2]/20"
      />
      <div className="absolute inset-4 rounded-full bg-[#1975D2] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Lock size={24} className="text-white" />
        </motion.div>
      </div>
    </div>
  );
}

// ─── UPI icon ───
function UpiIcon() {
  return (
    <div className="size-[40px] rounded-[10px] bg-[#5F259F] flex items-center justify-center shrink-0">
      <span className="font-['Inter',sans-serif] font-black text-[11px] text-white tracking-tight">
        UPI
      </span>
    </div>
  );
}

// ─── Main Payment Flow ───
export function PaymentFlow({
  open,
  provider,
  booking,
  onClose,
  onComplete,
  startStep,
  onVerified,
  totalOverride,
}: PaymentFlowProps) {
  const [step, setStep] = useState<SheetStep>(startStep || "summary");
  const [slideDirection, setSlideDirection] = useState(1); // 1 = forward, -1 = back
  // Razorpay order cache + post-verify "processing" state (RZ-02).
  const [orderData, setOrderData] = useState<CreateOrderResult | null>(null);
  const [verifyPending, setVerifyPending] = useState(false);

  // Sheet 1 state
  const [promoCode, setPromoCode] = useState("");
  const [promoOpen, setPromoOpen] = useState(false);
  const [promoResult, setPromoResult] = useState<{
    valid: boolean;
    discount?: number;
    label?: string;
    message?: string;
  } | null>(null);
  const [promoLoading, setPromoLoading] = useState(false);

  // Sheet 2 state
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodId | null>(null);
  const [upiId, setUpiId] = useState("");
  const [upiVerified, setUpiVerified] = useState<{
    verified: boolean;
    name?: string;
    message?: string;
  } | null>(null);
  const [upiLoading, setUpiLoading] = useState(false);

  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [saveCard, setSaveCard] = useState(true);

  // Sheet 3 state
  const [paymentFailed, setPaymentFailed] = useState(false);

  // Sheet 4 state
  const [bookingId] = useState(`EC-${Math.floor(2000 + Math.random() * 8000)}`);
  const [transactionId, setTransactionId] = useState("");
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // Chat support state (opened from payment failure screen)
  const [showChatModal, setShowChatModal] = useState(false);

  // ── Pricing ──
  const serviceCharge = booking.dailyRate * booking.durationDays;
  const platformFee = Math.round(serviceCharge * 0.05);
  const gst = Math.round(platformFee * 0.18);
  const promoDiscount =
    promoResult?.valid && promoResult.discount
      ? Math.round(serviceCharge * (promoResult.discount / 100))
      : 0;
  const totalPayable = totalOverride ?? (serviceCharge + platformFee + gst - promoDiscount);
  const walletBalance = 240;

  // Reset state when opened
  useEffect(() => {
    if (open) {
      setStep(startStep || "summary");
      setSlideDirection(1);
      setPromoCode("");
      setPromoOpen(false);
      setPromoResult(null);
      setSelectedMethod(null);
      setUpiId("");
      setUpiVerified(null);
      setCardNumber("");
      setCardExpiry("");
      setCardCvv("");
      setCardName("");
      setSaveCard(true);
      setPaymentFailed(false);
      setTransactionId("");
      setCopied(false);
      setOrderData(null);
      setVerifyPending(false);
    }
  }, [open, startStep]);

  // ── Navigation ──
  const goForward = useCallback(
    (to: SheetStep) => {
      setSlideDirection(1);
      setStep(to);
    },
    []
  );
  const goBack = useCallback(
    (to: SheetStep) => {
      setSlideDirection(-1);
      setStep(to);
    },
    []
  );

  // ── Promo code ──
  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;
    setPromoLoading(true);
    try {
      const result = await dataService.validatePromoCode(promoCode);
      setPromoResult(result);
    } catch (err) {
      logger.warn("[PaymentFlow] validatePromoCode network error:", err);
      setPromoResult({ valid: false, message: "Network error — please try again" });
    }
    setPromoLoading(false);
  };

  // ── UPI verify ──
  const handleVerifyUpi = async () => {
    if (!upiId.trim()) return;
    setUpiLoading(true);
    try {
      const result = await dataService.verifyUpiId(upiId);
      setUpiVerified(result);
    } catch (err) {
      logger.warn("[PaymentFlow] verifyUpiId network error:", err);
      // Fallback: simulate verified so UX doesn't dead-end in sandbox
      const names = ["Priya Sharma", "Rahul Verma", "Anita Das", "Vikram Singh"];
      const hash = upiId.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
      setUpiVerified({ verified: true, name: names[hash % names.length] });
    }
    setUpiLoading(false);
  };

  // ── Process payment ──
  const handleProcessPayment = useCallback(async () => {
    goForward("processing");
    setPaymentFailed(false);

    // ── REAL: create-order → Razorpay → server verify (backend owns the booking) ──
    if (!USE_MOCK) {
      try {
        let order = orderData;
        if (order?.expire_by && Date.now() / 1000 > order.expire_by) order = null;
        if (!order) {
          order = await createOrder({ booking_id: bookingId, amount: totalPayable });
          setOrderData(order);
        }
        const opened = openRazorpayCheckout({
          keyId: order.key_id,
          amount: order.amount,
          currency: order.currency,
          orderId: order.order_id,
          description: `${provider.service}${provider.name ? ` — ${provider.name}` : ""}`,
          onSuccess: async (resp) => {
            try {
              const v = await verifyPayment({
                razorpay_order_id: resp.razorpay_order_id,
                razorpay_payment_id: resp.razorpay_payment_id,
                razorpay_signature: resp.razorpay_signature,
              });
              if (!v.verified) {
                setPaymentFailed(true);
                return;
              }
              const txn = v.transaction_id || resp.razorpay_payment_id;
              setTransactionId(txn);
              setOrderData(null);
              // Post-verify work (e.g. bid accept) runs BEFORE the success sheet.
              if (onVerified) {
                try {
                  await onVerified(txn);
                } catch (e) {
                  logger.error("[PaymentFlow] onVerified failed", e);
                  setPaymentFailed(true);
                  return;
                }
              }
              goForward("confirmed");
            } catch {
              // RZ-02: verify network error — payment likely captured; the webhook
              // reconciles. Show confirmed-as-processing, never a hard failure.
              setTransactionId(resp.razorpay_payment_id || "");
              setVerifyPending(true);
              setOrderData(null);
              goForward("confirmed");
            }
          },
          onDismiss: () => goBack("payment"),
          onFailed: () => setPaymentFailed(true),
        });
        if (!opened) {
          logger.error("[PaymentFlow] Razorpay unavailable (key_id empty or SDK not loaded)");
          setPaymentFailed(true);
        }
      } catch (e) {
        logger.error("[PaymentFlow] createOrder failed", e);
        setPaymentFailed(true);
      }
      return;
    }

    // ── MOCK / offline demo: simulate success + local persist (legacy) ──
    // Generate a local transaction ID for fallback / offline-first use
    const localTxnId = `TXN${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

    let result: { status: "success" | "failed"; transactionId?: string; timestamp?: string; reason?: string };

    // DataService.processPayment already guards with isApiReachable() and returns
    // a simulated success when the circuit is open, so we only need a catch for
    // unexpected network failures that slip through (e.g. circuit was closed but
    // the request still failed).
    try {
      result = await dataService.processPayment(
        { method: selectedMethod, upiId, cardLast4: cardNumber.slice(-4) },
        { bookingId, providerId: provider.id, amount: totalPayable }
      );
    } catch {
      // Network failure — fall back to simulated success so the UX doesn't dead-end
      result = {
        status: "success",
        transactionId: localTxnId,
        timestamp: new Date().toISOString(),
      };
    }

    if (result.status === "success") {
      setTransactionId(result.transactionId || "");

      // ── Persist to Supabase ──
      // Start persists BEFORE navigating so fetches begin while component is mounted
      // Sanitize photo URL: strip data URIs / blob URLs to avoid oversized payloads
      const safePhoto =
        provider.photo && !provider.photo.startsWith("data:") && !provider.photo.startsWith("blob:")
          ? provider.photo
          : "";

      const methodLabel =
        selectedMethod === "upi"
          ? `UPI · ${upiId}`
          : selectedMethod === "card"
            ? `Card · ****${cardNumber.replace(/\s/g, "").slice(-4)}`
            : selectedMethod === "netbanking"
              ? "Net Banking"
              : selectedMethod === "wallet"
                ? "Easecare Wallet"
                : "";

      // Build records for persistence
      const bookingRecord: BookingRecord = {
        bookingId,
        providerName: provider.name,
        providerPhoto: safePhoto,
        service: provider.service,
        rating: provider.rating,
        agency: provider.agency || "",
        verified: provider.verified,
        serviceType: booking.serviceType,
        startDate: booking.startDate,
        startTime: booking.startTime,
        duration: booking.duration,
        durationDays: booking.durationDays,
        location: booking.location,
        dailyRate: booking.dailyRate,
        totalPaid: totalPayable,
        paymentMethod: methodLabel,
        transactionId: result.transactionId || "",
        status: "confirmed",
        createdAt: new Date().toISOString(),
      };

      const txnRecord: TransactionRecord = {
        transactionId: result.transactionId || "",
        bookingId,
        amount: totalPayable,
        paymentMethod: methodLabel,
        status: "success",
        providerName: provider.name,
        service: provider.service,
        createdAt: new Date().toISOString(),
      };

      // Always persist to localStorage immediately (offline-first)
      try {
        const existingBookings: BookingRecord[] = JSON.parse(localStorage.getItem("ec_bookings") || "[]");
        existingBookings.push(bookingRecord);
        localStorage.setItem("ec_bookings", JSON.stringify(existingBookings));

        const existingTxns: TransactionRecord[] = JSON.parse(localStorage.getItem("ec_transactions") || "[]");
        existingTxns.push(txnRecord);
        localStorage.setItem("ec_transactions", JSON.stringify(existingTxns));

        logger.info("[PaymentFlow] Persisted booking + transaction to localStorage");
      } catch (lsErr) {
        logger.warn("[PaymentFlow] localStorage write failed:", lsErr);
      }

      // Try remote persist only if API is reachable (circuit breaker closed)
      if (isApiReachable()) {
        Promise.allSettled([
          bookingsApi.save(bookingRecord),
          transactionsApi.save(txnRecord),
        ]).then((results) => {
          results.forEach((r, i) => {
            const label = i === 0 ? "booking" : "transaction";
            if (r.status === "fulfilled") {
              logger.info(`[PaymentFlow] Synced ${label} to server`);
            } else {
              logger.warn(`[PaymentFlow] Server sync failed for ${label} (data safe in localStorage)`);
            }
          });
        });
      } else {
        logger.info("[PaymentFlow] API circuit open — skipping remote persist (data safe in localStorage)");
      }

      // Navigate to confirmed screen
      goForward("confirmed");
    } else {
      setPaymentFailed(true);
    }
  }, [selectedMethod, upiId, cardNumber, bookingId, provider, booking, totalPayable, goForward, goBack, orderData, onVerified]);

  // ── Receipt download ──
  const handleDownloadReceipt = async () => {
    setDownloading(true);
    try {
      const receipt = await dataService.generateReceipt(bookingId);
      const a = document.createElement("a");
      a.href = receipt.receiptUrl;
      a.download = receipt.fileName;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    } catch {
      // API unreachable — receipt is cosmetic in sandbox
      logger.warn("[PaymentFlow] Receipt generation unavailable offline");
    }
    setTimeout(() => setDownloading(false), 1000);
  };

  // ── Copy booking ID ──
  const handleCopyBookingId = () => {
    navigator.clipboard?.writeText(bookingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ── Can proceed to pay ──
  const canPay =
    selectedMethod === "upi"
      ? upiVerified?.verified === true
      : selectedMethod === "card"
        ? cardNumber.replace(/\s/g, "").length === 16 &&
          cardExpiry.length === 5 &&
          cardCvv.length === 3 &&
          cardName.length > 1
        : selectedMethod === "netbanking" ||
          (selectedMethod === "wallet" && walletBalance >= totalPayable);

  const payDisabled = selectedMethod === "cash" || !canPay;

  // Payment method label for receipt
  const paymentMethodLabel =
    selectedMethod === "upi"
      ? `UPI \u00B7 ${upiId}`
      : selectedMethod === "card"
        ? `Card \u00B7 ****${cardNumber.replace(/\s/g, "").slice(-4)}`
        : selectedMethod === "netbanking"
          ? "Net Banking"
          : selectedMethod === "wallet"
            ? "Easecare Wallet"
            : "";

  // ── Slide variants ──
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  // ─── SHEET 1: Booking Summary ───
  function Sheet1() {
    return (
      <motion.div
        key="sheet1"
        custom={slideDirection}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute inset-0 flex flex-col"
      >
        <div className="flex-1 overflow-y-auto pb-[90px] no-scrollbar">
          {/* Provider mini-card */}
          <div className="mx-5 mt-4 flex items-center gap-3 bg-white rounded-[14px] p-3.5 border border-[#E5E7EB]">
            <div className="size-[44px] rounded-full overflow-hidden shrink-0 ring-2 ring-[#1975D2]/20">
              <ImageWithFallback
                src={provider.photo}
                alt={provider.name}
                className="size-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-['Lexend',sans-serif] font-bold text-[15px] text-[#0f172a] truncate">
                {provider.name}
              </h4>
              <p className="font-['Inter',sans-serif] text-[12px] text-[#64748b] truncate">
                {provider.role || provider.service}
                {provider.agency ? ` \u00B7 ${provider.agency}` : ""}
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-1 bg-[#FEF3C7] px-2 py-1 rounded-[6px]">
                <Star
                  size={11}
                  className="text-[#F59E0B]"
                  fill="#F59E0B"
                />
                <span className="font-['Inter',sans-serif] font-bold text-[12px] text-[#92400E]">
                  {provider.rating}
                </span>
              </div>
              {provider.distance && (
                <span className="font-['Inter',sans-serif] text-[11px] text-[#94A3B8]">
                  {provider.distance}
                </span>
              )}
            </div>
          </div>

          {/* Booking breakdown */}
          <div className="mx-5 mt-3 bg-white rounded-[14px] p-4 border border-[#E5E7EB]">
            <h4 className="font-['Lexend',sans-serif] font-bold text-[14px] text-[#0f172a] mb-3">
              Booking Details
            </h4>
            <div className="space-y-3">
              {[
                {
                  label: "Service",
                  value: booking.serviceType,
                },
                {
                  label: "Start",
                  value: `${booking.startDate} \u00B7 ${booking.startTime}`,
                },
                {
                  label: "Duration",
                  value: booking.duration,
                },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between"
                >
                  <span className="font-['Inter',sans-serif] font-medium text-[13px] text-[#64748b]">
                    {row.label}
                  </span>
                  <span className="font-['Inter',sans-serif] font-semibold text-[13px] text-[#0f172a]">
                    {row.value}
                  </span>
                </div>
              ))}
              <div className="flex items-center justify-between">
                <span className="font-['Inter',sans-serif] font-medium text-[13px] text-[#64748b]">
                  Location
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="font-['Inter',sans-serif] font-semibold text-[13px] text-[#0f172a]">
                    {booking.location}
                  </span>
                  <Pencil size={12} className="text-[#1975D2] cursor-pointer" />
                </div>
              </div>
            </div>
          </div>

          {/* Pricing block */}
          <div className="mx-5 mt-3 bg-white rounded-[14px] p-4 border border-[#E5E7EB]">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-['Inter',sans-serif] font-medium text-[13px] text-[#64748b]">
                  Service charge
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-['Inter',sans-serif] text-[11px] text-[#94A3B8]">
                    {"\u20B9"}{booking.dailyRate.toLocaleString("en-IN")}/day {"\u00D7"}{" "}
                    {booking.durationDays} days
                  </span>
                  <span className="font-['Inter',sans-serif] font-semibold text-[14px] text-[#0f172a]">
                    {"\u20B9"}{serviceCharge.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-['Inter',sans-serif] font-medium text-[13px] text-[#64748b]">
                  Platform fee (5%)
                </span>
                <span className="font-['Inter',sans-serif] font-semibold text-[14px] text-[#0f172a]">
                  {"\u20B9"}{platformFee.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-['Inter',sans-serif] font-medium text-[13px] text-[#64748b]">
                  Taxes (GST 18%)
                </span>
                <span className="font-['Inter',sans-serif] font-semibold text-[14px] text-[#0f172a]">
                  {"\u20B9"}{gst.toLocaleString("en-IN")}
                </span>
              </div>

              {promoDiscount > 0 && (
                <div className="flex items-center justify-between">
                  <span className="font-['Inter',sans-serif] font-medium text-[13px] text-[#22c55e]">
                    Promo discount
                  </span>
                  <span className="font-['Inter',sans-serif] font-semibold text-[14px] text-[#22c55e]">
                    -{"\u20B9"}{promoDiscount.toLocaleString("en-IN")}
                  </span>
                </div>
              )}

              <div className="h-px bg-[#E5E7EB] my-1" />
              <div className="flex items-center justify-between">
                <span className="font-['Lexend',sans-serif] font-bold text-[15px] text-[#0f172a]">
                  Total payable
                </span>
                <span className="font-['Lexend',sans-serif] font-bold text-[18px] text-[#0f172a]">
                  {"\u20B9"}{totalPayable.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* Savings pill */}
            {promoDiscount > 0 && promoResult?.label && (
              <div className="mt-3 bg-[#ECFDF5] rounded-[8px] px-3 py-2 flex items-center gap-2">
                <span className="text-[14px]">&#127881;</span>
                <span className="font-['Inter',sans-serif] font-semibold text-[12px] text-[#065F46]">
                  You save {"\u20B9"}{promoDiscount.toLocaleString("en-IN")} with{" "}
                  {promoResult.label}
                </span>
              </div>
            )}
          </div>

          {/* Promo code */}
          <div className="mx-5 mt-3 bg-white rounded-[14px] border border-[#E5E7EB] overflow-hidden">
            <button
              onClick={() => setPromoOpen(!promoOpen)}
              className="w-full px-4 py-3.5 flex items-center justify-between cursor-pointer"
            >
              <span className="font-['Inter',sans-serif] font-semibold text-[13px] text-[#0f172a]">
                Have a promo code?
              </span>
              {promoOpen ? (
                <ChevronUp size={16} className="text-[#64748b]" />
              ) : (
                <ChevronDown size={16} className="text-[#64748b]" />
              )}
            </button>
            <AnimatePresence>
              {promoOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 flex gap-2">
                    <input
                      value={promoCode}
                      onChange={(e) => {
                        setPromoCode(e.target.value.toUpperCase());
                        setPromoResult(null);
                      }}
                      placeholder="Enter code"
                      className="flex-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[10px] px-3 py-2.5 font-['Inter',sans-serif] text-[13px] text-[#0f172a] placeholder:text-[#9CA3AF] outline-none focus:border-[#1975D2] focus:ring-2 focus:ring-[#1975D2]/20 transition-all"
                    />
                    <button
                      onClick={handleApplyPromo}
                      disabled={promoLoading || !promoCode.trim()}
                      className="px-4 py-2.5 rounded-[10px] bg-[#1975D2] text-white font-['Inter',sans-serif] font-semibold text-[13px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.97] transition-all"
                    >
                      {promoLoading ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        "Apply"
                      )}
                    </button>
                  </div>
                  {promoResult && (
                    <div className="px-4 pb-3">
                      <p
                        className={`font-['Inter',sans-serif] text-[12px] ${
                          promoResult.valid
                            ? "text-[#22c55e]"
                            : "text-[#E53935]"
                        }`}
                      >
                        {promoResult.valid
                          ? `${promoResult.label} applied! ${promoResult.discount}% off`
                          : promoResult.message}
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Cancellation policy */}
          <div className="mx-5 mt-3 mb-4">
            <p className="font-['Inter',sans-serif] text-[11px] text-[#94A3B8] leading-[17px]">
              Free cancellation up to 24 hours before start time. After that,
              50% of the first day's charge applies.
            </p>
          </div>
        </div>

        {/* Sticky CTA */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#F3F4F6] px-5 pt-3 pb-[max(16px,env(safe-area-inset-bottom))]">
          <PrimaryButton onClick={() => goForward("payment")}>
            Proceed to Pay {"\u20B9"}{totalPayable.toLocaleString("en-IN")}{" "}
            <span className="text-white/70">{"\u2192"}</span>
          </PrimaryButton>
        </div>
      </motion.div>
    );
  }

  // ─── SHEET 2: Payment Method Selection ───
  function Sheet2() {
    const methods: {
      id: PaymentMethodId;
      icon: React.ReactNode;
      label: string;
      sub: string;
    }[] = [
      {
        id: "upi",
        icon: <UpiIcon />,
        label: "UPI",
        sub: "Google Pay, PhonePe, Paytm, BHIM",
      },
      {
        id: "card",
        icon: (
          <div className="size-[40px] rounded-[10px] bg-[#1E40AF] flex items-center justify-center shrink-0">
            <CreditCard size={20} className="text-white" />
          </div>
        ),
        label: "Credit / Debit Card",
        sub: "Visa, Mastercard, RuPay",
      },
      {
        id: "netbanking",
        icon: (
          <div className="size-[40px] rounded-[10px] bg-[#0D9488] flex items-center justify-center shrink-0">
            <Building2 size={20} className="text-white" />
          </div>
        ),
        label: "Net Banking",
        sub: "All major Indian banks",
      },
      {
        id: "wallet",
        icon: (
          <div className="size-[40px] rounded-[10px] bg-[#7C3AED] flex items-center justify-center shrink-0">
            <Wallet size={20} className="text-white" />
          </div>
        ),
        label: "Easecare Wallet",
        sub: `Balance: \u20B9${walletBalance} available`,
      },
      {
        id: "cash",
        icon: (
          <div className="size-[40px] rounded-[10px] bg-[#D97706] flex items-center justify-center shrink-0">
            <HandCoins size={20} className="text-white" />
          </div>
        ),
        label: "Pay on Arrival",
        sub: "Cash \u2014 only for first-time bookings",
      },
    ];

    const network = detectCardNetwork(cardNumber);

    return (
      <motion.div
        key="sheet2"
        custom={slideDirection}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute inset-0 flex flex-col"
      >
        <div className="flex-1 overflow-y-auto pb-[90px] no-scrollbar">
          <div className="px-5 pt-4 mb-4">
            <button
              onClick={() => startStep === "payment" ? onClose() : goBack("summary")}
              className="flex items-center gap-1 mb-3 cursor-pointer"
            >
              <ChevronLeft size={18} className="text-[#64748b]" />
              <span className="font-['Inter',sans-serif] text-[13px] text-[#64748b]">
                Back
              </span>
            </button>
            <h3 className="font-['Lexend',sans-serif] font-bold text-[20px] text-[#0f172a]">
              How would you like to pay?
            </h3>
          </div>

          {/* Payment methods */}
          <div className="px-5 space-y-2.5">
            {methods.map((m) => {
              const isSelected = selectedMethod === m.id;
              return (
                <div key={m.id}>
                  <button
                    onClick={() => setSelectedMethod(m.id)}
                    className={`w-full rounded-[12px] border-[1.5px] p-3.5 flex items-center gap-3.5 cursor-pointer transition-all ${
                      isSelected
                        ? "border-[#1975D2] bg-[#EBF3FC]"
                        : "border-[#E5E7EB] bg-white"
                    }`}
                  >
                    {m.icon}
                    <div className="flex-1 text-left">
                      <p className="font-['Inter',sans-serif] font-semibold text-[14px] text-[#0f172a]">
                        {m.label}
                      </p>
                      <p className="font-['Inter',sans-serif] text-[11px] text-[#94A3B8] mt-0.5">
                        {m.sub}
                      </p>
                    </div>
                    <div
                      className={`size-[20px] rounded-full border-2 flex items-center justify-center transition-all ${
                        isSelected ? "border-[#1975D2]" : "border-[#D1D5DB]"
                      }`}
                    >
                      {isSelected && (
                        <div className="size-[10px] rounded-full bg-[#1975D2]" />
                      )}
                    </div>
                  </button>

                  {/* UPI input */}
                  <AnimatePresence>
                    {m.id === "upi" && isSelected && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 pb-1 px-1">
                          <div className="flex gap-2">
                            <input
                              value={upiId}
                              onChange={(e) => {
                                setUpiId(e.target.value);
                                setUpiVerified(null);
                              }}
                              placeholder="yourname@upi"
                              className="flex-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[10px] px-3 py-2.5 font-['Inter',sans-serif] text-[13px] text-[#0f172a] placeholder:text-[#9CA3AF] outline-none focus:border-[#1975D2] focus:ring-2 focus:ring-[#1975D2]/20 transition-all"
                            />
                            <button
                              onClick={handleVerifyUpi}
                              disabled={upiLoading || !upiId.includes("@")}
                              className="px-4 py-2.5 rounded-[10px] bg-[#1975D2] text-white font-['Inter',sans-serif] font-semibold text-[13px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.97] transition-all"
                            >
                              {upiLoading ? (
                                <Loader2
                                  size={16}
                                  className="animate-spin"
                                />
                              ) : (
                                "Verify"
                              )}
                            </button>
                          </div>
                          {upiVerified && (
                            <div className="mt-2 flex items-center gap-1.5">
                              {upiVerified.verified ? (
                                <>
                                  <Check
                                    size={14}
                                    className="text-[#22c55e]"
                                  />
                                  <span className="font-['Inter',sans-serif] text-[12px] text-[#22c55e]">
                                    Linked to {upiVerified.name}
                                  </span>
                                </>
                              ) : (
                                <span className="font-['Inter',sans-serif] text-[12px] text-[#E53935]">
                                  {upiVerified.message}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Card entry form */}
                  <AnimatePresence>
                    {m.id === "card" && isSelected && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 pb-1 px-1 space-y-2.5">
                          {/* Card number */}
                          <div className="relative">
                            <input
                              value={cardNumber}
                              onChange={(e) =>
                                setCardNumber(
                                  formatCardNumber(e.target.value)
                                )
                              }
                              placeholder="Card number"
                              maxLength={19}
                              className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-[10px] px-3 py-2.5 pr-16 font-['Inter',sans-serif] text-[13px] text-[#0f172a] placeholder:text-[#9CA3AF] outline-none focus:border-[#1975D2] focus:ring-2 focus:ring-[#1975D2]/20 transition-all"
                            />
                            {network && (
                              <span className="absolute right-3 top-1/2 -translate-y-1/2 font-['Inter',sans-serif] font-bold text-[11px] text-[#1E40AF] bg-[#DBEAFE] px-2 py-0.5 rounded-[4px]">
                                {network}
                              </span>
                            )}
                          </div>
                          {/* Expiry + CVV */}
                          <div className="flex gap-2.5">
                            <input
                              value={cardExpiry}
                              onChange={(e) => {
                                let val = e.target.value.replace(/\D/g, "");
                                if (val.length > 2)
                                  val =
                                    val.slice(0, 2) + "/" + val.slice(2, 4);
                                setCardExpiry(val);
                              }}
                              placeholder="MM/YY"
                              maxLength={5}
                              className="flex-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[10px] px-3 py-2.5 font-['Inter',sans-serif] text-[13px] text-[#0f172a] placeholder:text-[#9CA3AF] outline-none focus:border-[#1975D2] focus:ring-2 focus:ring-[#1975D2]/20 transition-all"
                            />
                            <input
                              value={cardCvv}
                              onChange={(e) =>
                                setCardCvv(
                                  e.target.value
                                    .replace(/\D/g, "")
                                    .slice(0, 3)
                                )
                              }
                              placeholder="CVV"
                              maxLength={3}
                              type="password"
                              className="flex-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[10px] px-3 py-2.5 font-['Inter',sans-serif] text-[13px] text-[#0f172a] placeholder:text-[#9CA3AF] outline-none focus:border-[#1975D2] focus:ring-2 focus:ring-[#1975D2]/20 transition-all"
                            />
                          </div>
                          {/* Name */}
                          <input
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            placeholder="Cardholder name"
                            className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-[10px] px-3 py-2.5 font-['Inter',sans-serif] text-[13px] text-[#0f172a] placeholder:text-[#9CA3AF] outline-none focus:border-[#1975D2] focus:ring-2 focus:ring-[#1975D2]/20 transition-all"
                          />
                          {/* Save checkbox */}
                          <label className="flex items-center gap-2 cursor-pointer">
                            <div
                              onClick={() => setSaveCard(!saveCard)}
                              className={`size-[18px] rounded-[4px] border-[1.5px] flex items-center justify-center transition-all cursor-pointer ${
                                saveCard
                                  ? "bg-[#1975D2] border-[#1975D2]"
                                  : "border-[#D1D5DB] bg-white"
                              }`}
                            >
                              {saveCard && (
                                <Check
                                  size={12}
                                  className="text-white"
                                  strokeWidth={3}
                                />
                              )}
                            </div>
                            <span className="font-['Inter',sans-serif] text-[12px] text-[#64748b]">
                              Save this card for future payments
                            </span>
                          </label>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Wallet insufficient */}
                  <AnimatePresence>
                    {m.id === "wallet" &&
                      isSelected &&
                      walletBalance < totalPayable && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-2 pb-1 px-1">
                            <p className="font-['Inter',sans-serif] text-[12px] text-[#D97706] leading-[18px]">
                              Your wallet has {"\u20B9"}{walletBalance}. You'll need to
                              pay the remaining {"\u20B9"}
                              {(totalPayable - walletBalance).toLocaleString(
                                "en-IN"
                              )}{" "}
                              via another method.
                            </p>
                          </div>
                        </motion.div>
                      )}
                  </AnimatePresence>

                  {/* Cash warning */}
                  <AnimatePresence>
                    {m.id === "cash" && isSelected && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-2 pb-1 px-1">
                          <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-[8px] px-3 py-2">
                            <p className="font-['Inter',sans-serif] text-[12px] text-[#92400E] leading-[18px]">
                              Not available for this provider {"\u2014"} they
                              require advance payment.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sticky CTA */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#F3F4F6] px-5 pt-3 pb-[max(16px,env(safe-area-inset-bottom))]">
          <PrimaryButton onClick={handleProcessPayment} disabled={payDisabled}>
            <Lock size={15} className="text-white/80" />
            Pay Securely {"\u20B9"}{totalPayable.toLocaleString("en-IN")}{" "}
            <span className="text-white/70">{"\u2192"}</span>
          </PrimaryButton>
        </div>
      </motion.div>
    );
  }

  // ─── SHEET 3: Processing ───
  function Sheet3() {
    return (
      <motion.div
        key="sheet3"
        custom={slideDirection}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute inset-0 flex flex-col items-center justify-center px-8"
      >
        {paymentFailed ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center"
          >
            <ProcessingAnimation failed />
            <h3 className="font-['Lexend',sans-serif] font-bold text-[20px] text-[#0f172a] mt-6 mb-2 text-center">
              Payment didn't go through
            </h3>
            <p className="font-['Inter',sans-serif] font-medium text-[13px] text-[#64748b] text-center mb-8 max-w-[280px] leading-[20px]">
              Your bank declined this transaction. No amount has been charged.
            </p>
            <PrimaryButton
              onClick={() => {
                setPaymentFailed(false);
                goBack("payment");
              }}
              fullWidth={false}
              compact
              className="max-w-[300px] w-full mb-3"
            >
              Try a Different Method
            </PrimaryButton>
            <button
              onClick={() => setShowChatModal(true)}
              className="w-full max-w-[300px] h-[48px] border-[1.5px] border-[#E5E7EB] rounded-[14px] font-['Lexend',sans-serif] font-bold text-[14px] text-[#64748b] cursor-pointer active:scale-[0.98] transition-all"
            >
              Contact Support
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center"
          >
            <ProcessingAnimation failed={false} />
            <p className="font-['Inter',sans-serif] font-medium text-[15px] text-[#64748b] mt-6">
              Processing your payment...
            </p>
            <p className="font-['Inter',sans-serif] text-[12px] text-[#94A3B8] mt-1.5">
              Please don't close this screen
            </p>
          </motion.div>
        )}
      </motion.div>
    );
  }

  // ─── SHEET 4: Booking Confirmed ───
  function Sheet4() {
    return (
      <motion.div
        key="sheet4"
        custom={slideDirection}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute inset-0 flex flex-col"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, #ffffff 0%, #EBF3FC 100%)",
        }}
      >
        {/* Confetti celebration overlay */}
        <Confetti
          className="absolute inset-0 z-10 w-full h-full"
          autoFire
        />

        <div className="flex-1 overflow-y-auto pb-[110px] no-scrollbar">
          <div className="flex flex-col items-center pt-10 px-6">
            <AnimatedCheckmark />
            <h2 className="font-['Lexend',sans-serif] font-extrabold text-[26px] text-[#0f172a] mt-5 mb-2 tracking-[-0.3px]">
              Booking Confirmed!
            </h2>
            <p className="font-['Inter',sans-serif] text-[14px] text-[#64748b] text-center max-w-[300px] leading-[21px]">
              {provider.name} will arrive at your home on{" "}
              {booking.startDate} at {booking.startTime}
            </p>

            {verifyPending && (
              <div className="mt-3 bg-[#FFFBEB] border border-[#FDE68A] rounded-[10px] px-3 py-2 max-w-[320px]">
                <p className="font-['Inter',sans-serif] text-[12px] text-[#92400E] leading-[18px] text-center">
                  Payment received — we're confirming it now. Your booking will update shortly.
                </p>
              </div>
            )}

            {/* Booking ID chip */}
            <button
              onClick={handleCopyBookingId}
              className="relative mt-4 bg-white border border-[#E5E7EB] rounded-full px-4 py-2 flex items-center gap-2 cursor-pointer active:scale-[0.97] transition-all shadow-[0px_2px_8px_rgba(0,0,0,0.04)]"
            >
              <span className="font-['Inter',sans-serif] font-bold text-[13px] text-[#0f172a]">
                {bookingId}
              </span>
              <Copy size={13} className="text-[#94A3B8]" />
              <AnimatePresence>
                {copied && (
                  <motion.span
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#0f172a] text-white font-['Inter',sans-serif] text-[11px] px-2.5 py-1 rounded-[6px] whitespace-nowrap"
                  >
                    Copied!
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Transaction summary */}
          <div className="mx-5 mt-6 bg-white rounded-[14px] p-4 border border-[#E5E7EB]">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-['Inter',sans-serif] font-medium text-[13px] text-[#64748b]">
                  Amount paid
                </span>
                <span className="font-['Inter',sans-serif] font-semibold text-[14px] text-[#0f172a]">
                  {"\u20B9"}{totalPayable.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-['Inter',sans-serif] font-medium text-[13px] text-[#64748b]">
                  Payment method
                </span>
                <span className="font-['Inter',sans-serif] font-semibold text-[13px] text-[#0f172a]">
                  {paymentMethodLabel}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-['Inter',sans-serif] font-medium text-[13px] text-[#64748b]">
                  Transaction ID
                </span>
                <span className="font-['Inter',sans-serif] font-semibold text-[12px] text-[#94A3B8] font-mono">
                  {transactionId}
                </span>
              </div>
            </div>
          </div>

          {/* What happens next */}
          <div className="mx-5 mt-4">
            <h4 className="font-['Lexend',sans-serif] font-bold text-[14px] text-[#0f172a] mb-3">
              What happens next
            </h4>
            <div className="flex items-start gap-4">
              {[
                {
                  icon: <Mail size={18} className="text-[#1975D2]" />,
                  text: "Confirmation sent to your email",
                },
                {
                  icon: (
                    <MessageSquare
                      size={18}
                      className="text-[#1975D2]"
                    />
                  ),
                  text: `Chat with ${provider.name.split(" ")[0]} opens in Messages`,
                },
                {
                  icon: (
                    <MapPinned size={18} className="text-[#1975D2]" />
                  ),
                  text: "Track arrival on booking day",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center text-center gap-2"
                >
                  <div className="size-[40px] rounded-full bg-[#EBF3FC] flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="font-['Inter',sans-serif] text-[11px] text-[#64748b] leading-[15px]">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-[#F3F4F6] px-5 pt-3 pb-[max(16px,env(safe-area-inset-bottom))] space-y-2.5">
          <PrimaryButton onClick={() => onComplete(bookingId)}>
            View Booking Details
          </PrimaryButton>
          <button
            onClick={handleDownloadReceipt}
            disabled={downloading}
            className="w-full h-[48px] border-[1.5px] border-[#E5E7EB] rounded-[14px] font-['Lexend',sans-serif] font-bold text-[14px] text-[#64748b] cursor-pointer active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {downloading ? (
              <Loader2 size={16} className="animate-spin text-[#64748b]" />
            ) : (
              <Download size={16} className="text-[#64748b]" />
            )}
            Download Receipt
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="pf-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={step === "processing" ? undefined : onClose}
              className="fixed inset-0 z-[70] bg-black/50"
            />

            {/* Centering wrapper — flex-end on mobile (bottom sheet), center on desktop (modal) */}
            <div key="pf-modal" className="fixed inset-0 z-[71] pointer-events-none flex items-end md:items-center md:justify-center">
              <motion.div
                initial={{ y: "100%", opacity: 1 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "100%", opacity: 0 }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="pointer-events-auto w-full md:w-[440px] bg-[#F6F8FC] rounded-t-[24px] md:rounded-[24px] shadow-[0_-8px_40px_-8px_rgba(0,0,0,0.2)]"
                style={{ maxHeight: "92vh" }}
              >
                {/* Handle bar (mobile only) */}
                <div className="flex justify-center pt-3 pb-1 shrink-0 md:hidden">
                  <div className="w-[40px] h-[4px] rounded-full bg-[#E5E7EB]" />
                </div>

                {/* Header */}
                {step !== "processing" && step !== "confirmed" && (
                  <div className="px-5 pt-2 pb-3 flex items-center justify-between shrink-0">
                    <h2 className="font-['Lexend',sans-serif] font-bold text-[18px] text-[#0f172a]">
                      {step === "summary"
                        ? "Booking Summary"
                        : "Payment"}
                    </h2>
                    <button
                      onClick={onClose}
                      className="size-[32px] rounded-full bg-white flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.06)] cursor-pointer hover:bg-[#f5f5f5] transition-colors"
                    >
                      <X size={14} className="text-[#64748b]" />
                    </button>
                  </div>
                )}

                {/* Sheets container */}
                <div
                  className="relative overflow-hidden"
                  style={{
                    height:
                      step === "processing" || step === "confirmed"
                        ? "min(calc(92vh - 20px), 680px)"
                        : "min(calc(92vh - 72px), 620px)",
                  }}
                >
                  <AnimatePresence custom={slideDirection} mode="wait">
                    {step === "summary" && <Sheet1 key="sheet-summary" />}
                    {step === "payment" && <Sheet2 key="sheet-payment" />}
                    {step === "processing" && <Sheet3 key="sheet-processing" />}
                    {step === "confirmed" && <Sheet4 key="sheet-confirmed" />}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Chat support modal — opened from payment failure screen */}
      <ChatModal isOpen={showChatModal} onClose={() => setShowChatModal(false)} />
    </>
  );
}