import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Tag,
  Phone,
  Shield,
  Star,
  Check,
  Gift,
  Sparkles,
  Clock,
  MapPin,
  Calendar,
  Ticket,
  Info,
  Heart,
  BadgePercent,
  CircleCheck,
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { PrimaryButton } from "../shared/PrimaryButton";
import { useModalOverlay } from "../../context/ModalContext";


// ─── Generic profile type that works with both BidProfile and ProviderProfile ───
export interface CheckoutProfile {
  id: string;
  name: string;
  age: number;
  photo: string;
  service: string;
  experience: string;
  rating: number;
  verified: boolean;
  duration: string;
  expectedPay: string;
  agency?: string;
  bidAmount?: string;
}

// ─── Service line items derived from profile ───
interface ServiceItem {
  name: string;
  qty: number;
}

function getServiceItems(profile: CheckoutProfile): ServiceItem[] {
  const items: ServiceItem[] = [
    { name: `${profile.service} — ${profile.duration}`, qty: 1 },
    { name: "Background verification fee", qty: 1 },
    { name: "Basic medical checkup included", qty: 1 },
    { name: "Emergency contact setup", qty: 1 },
    { name: "Daily progress reports", qty: 1 },
  ];
  if (profile.agency) {
    items.push({ name: `${profile.agency} service guarantee`, qty: 1 });
  }
  return items;
}

// ─── Coupon data ───
interface Coupon {
  code: string;
  label: string;
  discount: number; // percentage
  maxDiscount: number;
  minOrder: number;
}
const AVAILABLE_COUPONS: Coupon[] = [
  {
    code: "EASECARE20",
    label: "20% off on first booking",
    discount: 20,
    maxDiscount: 500,
    minOrder: 1000,
  },
  {
    code: "CARE100",
    label: "Flat ₹100 off",
    discount: 0,
    maxDiscount: 100,
    minOrder: 500,
  },
  {
    code: "WELCOME15",
    label: "15% off — New user special",
    discount: 15,
    maxDiscount: 300,
    minOrder: 800,
  },
  {
    code: "FESTIVE10",
    label: "10% festive season discount",
    discount: 10,
    maxDiscount: 250,
    minOrder: 1000,
  },
  {
    code: "LOYALTY25",
    label: "25% off for returning users",
    discount: 25,
    maxDiscount: 600,
    minOrder: 1500,
  },
  {
    code: "WEEKEND50",
    label: "Flat ₹50 off on weekends",
    discount: 0,
    maxDiscount: 50,
    minOrder: 0,
  },
];

// ─── Tip options ───
const TIP_OPTIONS = [
  { amount: 50, label: "₹50", popular: false },
  { amount: 75, label: "₹75", popular: true },
  { amount: 100, label: "₹100", popular: false },
];

// ─── Coupon Bottom Sheet ───
function CouponSheet({
  onApply,
  onClose,
  appliedCode,
}: {
  onApply: (coupon: Coupon) => void;
  onClose: () => void;
  appliedCode: string | null;
}) {
  const [inputCode, setInputCode] = useState("");

  const matchedManual = AVAILABLE_COUPONS.find(
    (c) => c.code.toLowerCase() === inputCode.trim().toLowerCase()
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[75] flex items-end md:items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px] touch-none"
        onClick={onClose}
      />
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 320 }}
        className="relative w-full max-w-[420px] bg-white rounded-t-[24px] md:rounded-[24px] max-h-[80vh] flex flex-col"
        style={{ overscrollBehavior: "contain" }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1 md:hidden">
          <div className="w-[40px] h-[4px] rounded-full bg-[#d0d5dd]" />
        </div>
        {/* Header */}
        <div className="px-5 pt-2 pb-4 flex items-center justify-between border-b border-[#f3f4f6]">
          <h3 className="font-['Lexend',sans-serif] font-bold text-[18px] text-[#111827]">
            Coupons & Offers
          </h3>
          <button
            onClick={onClose}
            className="size-8 rounded-full bg-[#f3f4f6] flex items-center justify-center cursor-pointer"
          >
            <X size={16} className="text-[#6b7280]" />
          </button>
        </div>

        {/* Manual input */}
        <div className="px-5 py-4 border-b border-[#f3f4f6]">
          <div className="flex gap-2">
            <input
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value.toUpperCase())}
              placeholder="Enter coupon code"
              className="flex-1 bg-[#f9fafb] border border-[#e5e7eb] rounded-[10px] px-4 py-3 font-['Inter',sans-serif] text-[14px] text-[#111827] placeholder:text-[#9ca3af] outline-none focus:border-[#1975D2] transition-colors"
            />
            <button
              onClick={() => matchedManual && onApply(matchedManual)}
              disabled={!matchedManual}
              className={`px-5 rounded-[10px] font-['Inter',sans-serif] font-semibold text-[14px] cursor-pointer transition-all active:scale-[0.97] ${
                matchedManual
                  ? "bg-[#1975D2] text-white"
                  : "bg-[#e5e7eb] text-[#9ca3af] cursor-not-allowed"
              }`}
            >
              Apply
            </button>
          </div>
        </div>

        {/* Coupon list */}
        <div className="flex-1 overflow-y-auto px-5 py-3 no-scrollbar space-y-2.5 pb-6">
          {AVAILABLE_COUPONS.map((coupon) => {
            const isApplied = appliedCode === coupon.code;
            return (
              <div
                key={coupon.code}
                className={`border rounded-[14px] p-4 transition-all ${
                  isApplied
                    ? "border-[#1975D2] bg-[#EBF3FC]"
                    : "border-[#e5e7eb] bg-white"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-[#111827] text-white font-['Inter',sans-serif] font-bold text-[11px] px-2.5 py-1 rounded-[6px] tracking-wide">
                        {coupon.code}
                      </span>
                      {isApplied && (
                        <CircleCheck size={16} className="text-[#1975D2]" />
                      )}
                    </div>
                    <p className="font-['Inter',sans-serif] text-[13px] text-[#374151] mt-1.5">
                      {coupon.label}
                    </p>
                    {coupon.minOrder > 0 && (
                      <p className="font-['Inter',sans-serif] text-[11px] text-[#9ca3af] mt-1">
                        Min. order ₹{coupon.minOrder} &bull; Max discount ₹
                        {coupon.maxDiscount}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => onApply(coupon)}
                    className={`font-['Inter',sans-serif] font-semibold text-[13px] cursor-pointer px-3 py-1.5 rounded-[8px] transition-all active:scale-[0.97] ${
                      isApplied
                        ? "text-[#ef4444] bg-[#fef2f2]"
                        : "text-[#1975D2] bg-[#EBF3FC]"
                    }`}
                  >
                    {isApplied ? "Remove" : "Apply"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main BookingCheckout ───
export function BookingCheckout({
  profile,
  onProceedToPay,
  onClose,
}: {
  profile: CheckoutProfile;
  onProceedToPay: () => void;
  onClose: () => void;
}) {
  const [showCoupons, setShowCoupons] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [selectedTip, setSelectedTip] = useState<number | null>(null);
  const [customTip, setCustomTip] = useState("");
  const [showCustomTip, setShowCustomTip] = useState(false);
  const [serviceDays, setServiceDays] = useState(1);
  const [showPlusDetails, setShowPlusDetails] = useState(false);
  const [plusAdded, setPlusAdded] = useState(false);

  // ── Price calculations ──
  const bidStr = profile.bidAmount || profile.expectedPay;
  const basePriceNum = parseInt(bidStr.replace(/[^0-9]/g, ""), 10) || 2200;
  const originalPrice = Math.round(basePriceNum * 1.25);
  const serviceTotal = basePriceNum * serviceDays;
  const originalTotal = originalPrice * serviceDays;
  const taxRate = 0.05;
  const platformFee = 99;
  const verificationFee = 49;
  const bajajProtection = 99;
  const taxesAndFees = Math.round(serviceTotal * taxRate) + platformFee;

  // Coupon discount
  let couponDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discount > 0) {
      couponDiscount = Math.min(
        Math.round(serviceTotal * (appliedCoupon.discount / 100)),
        appliedCoupon.maxDiscount
      );
    } else {
      couponDiscount = appliedCoupon.maxDiscount;
    }
  }

  // Plus discount
  const plusPrice = 249;
  const plusOriginal = 699;
  const plusDiscount = plusAdded
    ? Math.round(serviceTotal * 0.1) > 100
      ? 100
      : Math.round(serviceTotal * 0.1)
    : 0;

  // Tip
  const tipAmount = showCustomTip
    ? parseInt(customTip, 10) || 0
    : selectedTip || 0;

  const subtotal = serviceTotal + verificationFee + bajajProtection;
  const totalSavings = originalTotal - serviceTotal + couponDiscount + plusDiscount;
  const totalAmount =
    subtotal +
    taxesAndFees -
    couponDiscount -
    plusDiscount +
    tipAmount +
    (plusAdded ? plusPrice : 0);
  const amountToPay = totalAmount;

  const handleApplyCoupon = (coupon: Coupon) => {
    if (appliedCoupon?.code === coupon.code) {
      setAppliedCoupon(null);
    } else {
      setAppliedCoupon(coupon);
    }
    setShowCoupons(false);
  };

  const serviceItems = getServiceItems(profile);

  useModalOverlay(true); // BookingCheckout is always open when rendered

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
      className="fixed inset-0 z-[70] flex items-end md:items-center justify-center"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px] touch-none"
        onClick={onClose}
      />

      {/* Popup */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 320 }}
        className="relative w-full max-w-[420px] bg-[#f6f8fc] rounded-t-[24px] md:rounded-[24px] flex flex-col max-h-[92vh] md:max-h-[85vh]"
        style={{ overscrollBehavior: "contain" }}
      >
        {/* Handle (mobile) */}
        <div className="flex justify-center pt-3 pb-1 md:hidden">
          <div className="w-[40px] h-[4px] rounded-full bg-[#d0d5dd]" />
        </div>

        {/* ── Header ── */}
        <div className="shrink-0 bg-white rounded-t-[24px] px-5 pt-2 pb-3 flex items-center justify-between border-b border-[#f3f4f6]">
          <div>
            <h1 className="font-['Lexend',sans-serif] font-bold text-[18px] text-[#111827]">
              Booking Summary
            </h1>
            <p className="font-['Inter',sans-serif] text-[12px] text-[#9ca3af]">
              Review details before confirming
            </p>
          </div>
          <button
            onClick={onClose}
            className="size-8 rounded-full bg-[#f3f4f6] flex items-center justify-center cursor-pointer hover:bg-[#e5e7eb] transition-colors active:scale-[0.95]"
          >
            <X size={16} className="text-[#6b7280]" />
          </button>
        </div>

        {/* ── Scrollable Body ── */}
        <div className="flex-1 overflow-y-auto no-scrollbar pb-4">
        {/* Savings banner */}
        {totalSavings > 0 && (
          <div className="mx-4 mt-4 bg-gradient-to-r from-[#ecfdf5] to-[#d1fae5] rounded-[14px] px-4 py-3 flex items-center gap-2.5">
            <div className="size-[28px] rounded-[8px] bg-[#22c55e] flex items-center justify-center shrink-0">
              <Tag size={14} className="text-white" />
            </div>
            <p className="font-['Inter',sans-serif] font-semibold text-[13px] text-[#065f46]">
              Saving ₹{totalSavings.toLocaleString("en-IN")} on this order
            </p>
          </div>
        )}

        {/* ── Provider Card ── */}
        <div className="mx-4 mt-3 bg-white rounded-[20px] overflow-hidden shadow-[0px_1px_4px_rgba(0,0,0,0.04)]">
          <div className="p-4 flex items-center gap-3.5">
            <div className="size-[52px] rounded-[14px] overflow-hidden shrink-0 ring-2 ring-[#1975D2]/20">
              <ImageWithFallback
                src={profile.photo}
                alt={profile.name}
                className="size-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-['Lexend',sans-serif] font-bold text-[16px] text-[#111827] truncate">
                  {profile.name}
                </h3>
                {profile.verified && (
                  null
                )}
                {profile.verified && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#F4F1FE] border border-[#E8E0FC] shrink-0">
                    <svg width="20" height="14" viewBox="0 0 353.3 248.43" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0"><path d="m304.52 102.82-3e-3 2e-3h4e-3c-1.6236 2.454-2.213 5.4084-2.7078 8.4882-0.60669 3.7502-1.2461 7.3503-2.5723 10.879-1.5936 4.2305-4.2696 8.9439-8.9275 12.633a120.97 120.97 0 0 0-20.684-35.668c5.5503-2.2185 10.998-2.1839 15.476-1.4453 3.7202 0.61578 7.1575 1.8619 10.71 3.2117 2.9125 1.1124 5.7667 2.0793 8.7038 1.8992m-54.045-54.044-2e-3 0.0027 4e-3 -9.1e-4c-0.18009 2.9361 0.78679 5.7895 1.8983 8.7038 1.3498 3.5519 2.5959 6.9892 3.2126 10.709 0.73858 4.4824 0.77224 9.9363-1.4517 15.491a121.07 121.07 0 0 0-35.711-20.637c3.6974-4.6962 8.4318-7.3894 12.681-8.9894 3.5292-1.3262 7.1293-1.9656 10.881-2.5732 3.078-0.4939 6.0332-1.0824 8.4873-2.7069m45.529 107.26c5.8741 0.86865 10.548 3.6083 14.041 6.4735 2.9125 2.394 5.2665 5.1919 7.6687 8.138 1.9656 2.4177 3.9539 4.6825 6.5863 5.995h-26.521a121.88 121.88 0 0 0-1.7755-20.607m-193.18-107.26 2e-3 0.0018v-0.0027c2.454 1.6236 5.4093 2.2121 8.4882 2.7078 3.7502 0.60669 7.3503 1.2461 10.879 2.5714 4.2496 1.6 8.9848 4.2941 12.681 8.9903a120.97 120.97 0 0 0-35.711 20.637c-2.2239-5.5548-2.1912-11.009-1.4508-15.492 0.61579-3.7193 1.8619-7.1575 3.2117-10.71 1.1115-2.9125 2.0793-5.7667 1.8992-8.7029m-54.044 54.045 0.0027 9.1e-4 -9.1e-4 -3e-3c2.9361 0.17919 5.7904-0.7877 8.7038-1.8992 3.5519-1.3498 6.9892-2.5959 10.708-3.2126 4.4797-0.73767 9.9272-0.77132 15.477 1.4462a121.07 121.07 0 0 0-20.683 35.668c-4.658-3.6902-7.3339-8.4018-8.9275-12.633-1.3262-3.5292-1.9656-7.1293-2.5723-10.88-0.49481-3.0789-1.0842-6.0342-2.7078-8.4873m-19.779 73.823c2.6323-1.3125 4.6188-3.5765 6.5872-5.995 2.4004-2.9452 4.7544-5.7431 7.6668-8.1362 3.4937-2.8661 8.1644-5.6066 14.04-6.4744a121.88 121.88 0 0 0-1.7737 20.606zm147.65-147.65v0.0027l0.00182-0.0027c1.3125 2.6332 3.5774 4.6207 5.996 6.589 2.9452 2.4004 5.744 4.7544 8.1371 7.6668 2.8834 3.5155 5.6412 8.2235 6.4908 14.151a121.88 121.88 0 0 0-20.625-1.7564c-7.032 0-13.921 0.60578-20.626 1.7564 0.84954-5.9268 3.6074-10.636 6.4908-14.15 2.394-2.9134 5.1919-5.2674 8.1371-7.6687 2.4186-1.9665 4.6834-3.9549 5.9969-6.5881" fill="#fab60f"/><g fill="#d52736"><path d="m152.02 176.68 9.114-0.0264c1.197-7.6978-1.1442-13.625-8.9312-12.21-6.5617 1.1916-13.61 7.7105-17.87 12.21l12.016-0.0527c1.3389-0.88048 3.9594-1.8846 5.0354-1.137 0.40294 0.28015 0.61306 0.67764 0.63489 1.2161"/><path d="m193 176.65h11.37c0.5412-13.427-1.6218-27.293-7.8642-39.289-5.6776-10.915-15.063-18.334-27.213-20.127-17.737-2.6169-35.634 4.8917-50.765 15.634-16.474 11.696-30.073 27.581-41.956 43.783l15.02-0.0218c13.522-19.166 44.623-48.262 67.502-48.452 7.2912-0.06 14.704 1.6509 20.185 6.5408 3.9712 3.5437 8.7856 10.425 8.55 16.01-0.14008 3.3118-3.0789 4.3269-5.8968 3.3009-2.1894-0.79679-3.7356-2.7979-5.2674-4.9017-4.9781-6.8346-12.743-10.179-21.261-9.0139-10.158 1.3889-22.75 9.2768-30.872 16.451-7.0038 6.187-13.434 12.958-19.499 20.088h16.149c5.9186-7.1457 12.168-13.239 20.203-18.243 2.5423-1.5836 5.673-3.2581 8.9639-4.3896 8.3017-2.8534 16.563-2.1311 20.232 8.2053 1.4417 4.064 1.6536 7.6286 1.2334 14.161l-9.1e-4 0.26651h10.98l0.0282-0.33563c8e-3 -3.5774-0.07-5.9878 0.25286-9.5333 0.27743-3.0553 1.227-6.2215 4.0649-6.5981 6.0314-1.2634 5.7422 12.155 5.8604 16.467"/><path d="m216.33 176.65h11.464c0.55484-12.458-0.51301-27.216-4.5434-40.103a71.857 71.857 0 0 0-2.7369-7.3658c-2.4404-5.5694-5.724-10.61-9.6388-15.269-4.3514-5.1755-9.536-9.8289-15.381-13.495a58.213 58.213 0 0 0-5.3592-2.9825v-0.0018a54.575 54.575 0 0 0-5.6776-2.3895l-7e-3 -0.0027c-22.326-7.927-44.906-2.2894-63.847 8.0125a128.25 128.25 0 0 0-10.63 6.489 140.08 140.08 0 0 0-9.6324 7.1593h-9.1e-4l-5e-3 6e-3a130.98 130.98 0 0 0-12.547 11.623 111.88 111.88 0 0 0-2.585 2.8306c-2.253 2.5541-5.7249 6.1351-4.6943 9.8371 0.81589 2.9361 4.6043 2.0711 5.9241 1.0597 2.0256-1.087 4.2505-2.8097 6.1542-4.4206 2.5778-2.1821 5.0127-4.5315 7.565-6.7436 10.324-8.9494 21.084-15.851 31.683-20.522a96.415 96.415 0 0 1 6.9283-2.7433 85.501 85.501 0 0 1 6.8464-2.0938l0.0109-3e-3c19.722-5.1209 41.154-1.8037 54.876 14.28 13.219 15.492 15.632 36.23 15.834 56.839m-142.25-17.514c1.2316-1.1497 2.4868-2.6496 3.7948-4.3105 1.8301-2.3212 2.0138-4.5688 1.2907-6.1915a4.2386 4.2386 0 0 0-1.1497-1.5308 4.0022 4.0022 0 0 0-1.6554-0.8259c-1.4917-0.3411-3.2754 0.19283-4.7898 2.0356-1.7127 2.0829-4.0776 5.6467-4.5606 8.7984a6.549 6.549 0 0 0-0.05367 1.7027c0.05912 0.52392 0.1992 1.0224 0.43478 1.4772l0.0018 5e-3 9.1e-4 -9.1e-4c0.38566 0.7404 1.036 1.1306 1.9038 1.1634q0.27196 9e-3 0.58486-0.0246 0.30562-0.0346 0.65672-0.11734l9.1e-4 2e-3 0.01092-3e-3c1.1679-0.28015 2.3358-1.066 3.5292-2.1794"/><path d="m245 176.65 0.0819-2e-3h0.0409c1.1997 0.0655 3.2818-0.48662 4.4824-2.5123a6.1851 6.1851 0 0 0 0.60033-1.3935 8.3681 8.3681 0 0 0 0.31562-1.8228h9.1e-4l8e-3 -0.14008c0.9114-31.841-8.8411-58.199-25.398-76.107a80.953 80.953 0 0 0-10.402-9.4649 78.588 78.588 0 0 0-11.768-7.4185l-9.1e-4 9.09e-4 -0.0655-0.03274-2e-3 -0.0018c-13.917-7.112-29.7-9.8435-45.192-8.531a89.594 89.594 0 0 0-17.827 3.3491l-0.0409 0.01273c-15.932 4.7125-30.758 14.068-42.84 26.342a110.97 110.97 0 0 0-9.8135 11.418c8.4727-7.3103 17.563-13.723 27.071-18.817a122.79 122.79 0 0 1 6.4553-3.2236 113.7 113.7 0 0 1 6.5663-2.796l0.012-0.0054c8.4-3.2645 16.681-5.3465 24.963-6.277 8.2826-0.9305 16.571-0.70947 24.987 0.62852 5.9896 0.95324 11.836 2.5214 17.103 4.7153q1.5336 0.63852 3.0116 1.3553a51.846 51.846 0 0 1 2.8652 1.5008h2e-3l0.0145 0.0073-9.1e-4 9.09e-4c18.543 10.154 31.425 30.988 37.099 54.512a117.34 117.34 0 0 1 3.2618 28.247v2e-3l-3e-3 0.27378c0.0946 2.5477 0.96779 4.6789 2.464 5.6385 0.27833 0.17828 0.58031 0.31744 0.90139 0.40749h2e-3q0.49117 0.1419 1.0433 0.13462"/></g><path d="m211.85 70.537c44.582 14.725 76.801 56.65 76.989 106.12h-22.059c1.4599-43.21-17.398-82.212-54.93-106.12" fill="#fab60f"/><path d="m82.406 211.35h-8.923l-2.2094 7.7742h-7.112l9.4096-29.773h9.0112l9.6743 29.773h-7.4213zm-7.907-5.0363h6.8464q-2.6933-8.7247-3.4891-11.972h-0.08914l-1.4135 5.6549zm40.683 5.0363h-8.9239l-2.2085 7.7742h-7.112l9.4087-29.773h9.0121l9.6743 29.773h-7.4213zm-7.9079-5.0363h6.8473q-2.6951-8.7247-3.49-11.972h-0.0882l-1.4135 5.6549zm24.559 12.679v-29.244q4.4178-0.66309 9.4533-0.66309 9.5215-2e-3 13.666 3.983c2.7606 2.6578 4.1377 6.1333 4.1377 10.418 0 5.0654-1.5681 8.9894-4.7125 11.773-3.1435 2.7824-7.9952 4.1741-14.548 4.1741q-4.5497 0-7.9961-0.44115m6.8473-24.385v19.393q0.57485 0.13189 2.474 0.13189c3.4009 0 6.0369-0.89776 7.8997-2.6869 1.8628-1.7892 2.7906-4.3514 2.7906-7.6941q2e-3 -4.5934-2.5477-7.002-2.5532-2.4077-7.3476-2.4077-2.0102 0-3.269 0.2656m27.739-5.2565h6.8473v11.441h11.706v-11.441h6.8473v29.773h-6.8473v-12.413h-11.706v12.413h-6.8473zm50.224 21.999h-8.923l-2.2085 7.7742h-7.1129l9.4096-29.773h9.0121l9.6743 29.773h-7.4213zm-7.907-5.0363h6.8473q-2.6951-8.7247-3.49-11.972h-0.0882l-1.4135 5.6549zm40.683 5.0363h-8.9239l-2.2085 7.7742h-7.112l9.4087-29.773h9.0121l9.6743 29.773h-7.4213zm-7.9079-5.0363h6.8473q-2.6951-8.7247-3.4901-11.972h-0.0882l-1.4135 5.6549zm24.559 12.811v-29.376q3.7557-0.66309 9.2332-0.66309 6.7582 0 9.718 2.2312 2.9607 2.2303 2.9598 6.3834c0 1.6491-0.493 3.1362-1.4872 4.4688a7.9497 7.9497 0 0 1-3.8575 2.8197v0.17646q2.7833 1.0387 4.0194 5.4775 2.2758 7.9961 2.474 8.4818h-6.9792q-0.88411-1.6554-2.1211-6.9356-0.61852-2.6496-1.6782-3.7102t-3.4018-1.0606h-2.1202v11.706zm6.7591-24.782v8.1726h2.827q2.5623-2e-3 4.0422-1.1634 1.4799-1.157 1.4799-3.1217c0-1.3107-0.44115-2.3267-1.3325-3.0407-0.89048-0.71402-2.1575-1.0669-3.7911-1.0669q-2.4077 0-3.2254 0.22011" fill="#d52736"/></svg>
                    <span className="font-['Lexend',sans-serif] font-semibold text-[10px] text-[#5B21B6] leading-none whitespace-nowrap">
                      Aadhaar Verified
                    </span>
                  </span>
                )}
              </div>
              <p className="font-['Inter',sans-serif] text-[12px] text-[#6b7280] mt-0.5">
                {profile.service} &bull; {profile.experience}
              </p>
              {profile.agency && (
                <p className="font-['Inter',sans-serif] text-[11px] text-[#1975D2] mt-0.5">
                  via {profile.agency}
                </p>
              )}
            </div>
            <div className="flex items-center gap-1 bg-[#fef3c7] px-2 py-1 rounded-[6px] shrink-0">
              <Star size={11} className="text-[#f59e0b]" fill="#f59e0b" />
              <span className="font-['Inter',sans-serif] font-bold text-[12px] text-[#92400e]">
                {profile.rating}
              </span>
            </div>
          </div>
        </div>

        {/* ── Service Details Card ── */}
        <div className="mx-4 mt-3 bg-white rounded-[20px] p-5 shadow-[0px_1px_4px_rgba(0,0,0,0.04)]">
          <div className="flex items-start justify-between mb-1">
            <div>
              <h3 className="font-['Lexend',sans-serif] font-bold text-[15px] text-[#111827]">
                {profile.service}
              </h3>
              <p className="font-['Inter',sans-serif] text-[12px] text-[#6b7280] mt-0.5">
                {profile.duration} package
              </p>
            </div>
            
          </div>

          {/* Service items */}
          <div className="mt-4 pt-3 border-t border-[#f3f4f6] space-y-2">
            {serviceItems.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-[#9ca3af] mt-0.5 text-[10px]">•</span>
                <p className="font-['Inter',sans-serif] text-[12px] text-[#6b7280] leading-[18px]">
                  {item.name} x{item.qty}
                </p>
              </div>
            ))}
          </div>

          {/* Days label */}
          {serviceDays > 1 && (
            <div className="mt-3 bg-[#EBF3FC] rounded-[8px] px-3 py-2">
              <p className="font-['Inter',sans-serif] text-[12px] text-[#1975D2]">
                <Calendar size={12} className="inline mr-1.5 -mt-0.5" />
                Booked for {serviceDays} day{serviceDays > 1 ? "s" : ""} &bull;
                ₹{basePriceNum.toLocaleString("en-IN")}/day
              </p>
            </div>
          )}
        </div>

        {/* ── EaseCare Plus Upsell ── */}
        <div className="mx-4 mt-3 bg-gradient-to-r from-[#f0f0ff] to-[#e8e4ff] rounded-[20px] p-5 shadow-[0px_1px_4px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="size-[32px] rounded-full bg-[#6d28d9] flex items-center justify-center">
                <Sparkles size={16} className="text-white" />
              </div>
              <div>
                <p className="font-['Lexend',sans-serif] font-bold text-[14px] text-[#111827]">
                  EaseCare Plus
                </p>
                <p className="font-['Inter',sans-serif] text-[11px] text-[#6b7280]">
                  6 months plan
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setPlusAdded(!plusAdded)}
                className={`px-4 py-2 rounded-[8px] font-['Inter',sans-serif] font-semibold text-[13px] cursor-pointer transition-all active:scale-[0.97] ${
                  plusAdded
                    ? "bg-[#6d28d9] text-white"
                    : "border border-[#6d28d9] text-[#6d28d9] bg-white"
                }`}
              >
                {plusAdded ? "Added" : "Add"}
              </button>
              <div className="text-right">
                <p className="font-['Inter',sans-serif] font-bold text-[14px] text-[#111827]">
                  ₹{plusPrice}
                </p>
                <p className="font-['Inter',sans-serif] text-[11px] text-[#9ca3af] line-through">
                  ₹{plusOriginal}
                </p>
              </div>
            </div>
          </div>
          <p className="font-['Inter',sans-serif] text-[11px] text-[#6b7280] mt-2.5">
            Get 10% off on all bookings, upto ₹100
          </p>
          <button
            onClick={() => setShowPlusDetails(!showPlusDetails)}
            className="font-['Inter',sans-serif] font-semibold text-[12px] text-[#6d28d9] mt-1.5 cursor-pointer underline underline-offset-2"
          >
            {showPlusDetails ? "Hide benefits" : "View all benefits"}
          </button>
          <AnimatePresence>
            {showPlusDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-3 pt-3 border-t border-[#d8d0f0] space-y-2">
                  {[
                    "10% off on every booking (up to ₹100)",
                    "Priority matching with top-rated workers",
                    "Free rescheduling up to 2 hours before",
                    "Dedicated support line",
                    "Monthly care reports",
                  ].map((b) => (
                    <div key={b} className="flex items-center gap-2">
                      <CircleCheck size={13} className="text-[#6d28d9] shrink-0" />
                      <span className="font-['Inter',sans-serif] text-[12px] text-[#374151]">
                        {b}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Coupons & Offers ── */}
        <div className="mx-4 mt-3 bg-white rounded-[20px] shadow-[0px_1px_4px_rgba(0,0,0,0.04)]">
          <button
            onClick={() => setShowCoupons(true)}
            className="w-full px-5 py-4 flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="size-[32px] rounded-full bg-[#ecfdf5] flex items-center justify-center">
                <BadgePercent size={16} className="text-[#22c55e]" />
              </div>
              <div className="text-left">
                <p className="font-['Inter',sans-serif] font-semibold text-[14px] text-[#111827]">
                  Coupons and offers
                </p>
                {appliedCoupon && (
                  <p className="font-['Inter',sans-serif] text-[11px] text-[#22c55e] mt-0.5">
                    {appliedCoupon.code} applied &bull; Saving ₹{couponDiscount}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-['Inter',sans-serif] font-semibold text-[13px] text-[#1975D2]">
                {AVAILABLE_COUPONS.length} offers
              </span>
              <ChevronRight size={16} className="text-[#1975D2]" />
            </div>
          </button>
        </div>

        {/* ── Verified customer ── */}
        <div className="mx-4 mt-3 bg-white rounded-[20px] px-5 py-4 shadow-[0px_1px_4px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-[#6b7280]" />
              <div>
                <p className="font-['Inter',sans-serif] font-medium text-[13px] text-[#111827]">
                  Verified Customer, +91-98XXXXX890
                </p>
              </div>
            </div>
            <button className="font-['Inter',sans-serif] font-semibold text-[13px] text-[#1975D2] cursor-pointer">
              Change
            </button>
          </div>
        </div>

        {/* ── Payment Summary ── */}
        <div className="mx-4 mt-3 bg-white rounded-[20px] p-5 shadow-[0px_1px_4px_rgba(0,0,0,0.04)]">
          <h3 className="font-['Lexend',sans-serif] font-bold text-[16px] text-[#111827] mb-4">
            Payment summary
          </h3>

          <div className="space-y-3.5">
            {/* Item total */}
            <div className="flex items-center justify-between">
              <span className="font-['Inter',sans-serif] text-[13px] text-[#6b7280]">
                Service total ({serviceDays} day{serviceDays > 1 ? "s" : ""})
              </span>
              <div className="flex items-center gap-2">
                <span className="font-['Inter',sans-serif] text-[12px] text-[#9ca3af] line-through">
                  ₹{originalTotal.toLocaleString("en-IN")}
                </span>
                <span className="font-['Inter',sans-serif] font-semibold text-[14px] text-[#111827]">
                  ₹{serviceTotal.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* Verification fee */}
            <div className="flex items-center justify-between">
              <span className="font-['Inter',sans-serif] text-[13px] text-[#6b7280]">
                Verification fee
              </span>
              <span className="font-['Inter',sans-serif] font-medium text-[14px] text-[#111827]">
                ₹{verificationFee}
              </span>
            </div>

            {/* Bajaj protection */}
            <div className="flex items-center justify-between">
              <span className="font-['Inter',sans-serif] text-[13px] text-[#6b7280] flex items-center gap-1">
                <Shield size={12} className="text-[#6b7280]" />
                Bajaj Finance protection
              </span>
              <span className="font-['Inter',sans-serif] font-medium text-[14px] text-[#111827]">
                ₹{bajajProtection}
              </span>
            </div>

            {/* Taxes */}
            <div className="flex items-center justify-between">
              <span className="font-['Inter',sans-serif] text-[13px] text-[#6b7280]">
                Taxes & platform fee
              </span>
              <span className="font-['Inter',sans-serif] font-medium text-[14px] text-[#111827]">
                ₹{taxesAndFees.toLocaleString("en-IN")}
              </span>
            </div>

            {/* Coupon */}
            {couponDiscount > 0 && (
              <div className="flex items-center justify-between">
                <span className="font-['Inter',sans-serif] text-[13px] text-[#22c55e] flex items-center gap-1">
                  <Tag size={12} className="text-[#22c55e]" />
                  Coupon ({appliedCoupon?.code})
                </span>
                <span className="font-['Inter',sans-serif] font-semibold text-[14px] text-[#22c55e]">
                  -₹{couponDiscount.toLocaleString("en-IN")}
                </span>
              </div>
            )}

            {/* Plus discount */}
            {plusDiscount > 0 && (
              <div className="flex items-center justify-between">
                <span className="font-['Inter',sans-serif] text-[13px] text-[#6d28d9] flex items-center gap-1">
                  <Sparkles size={12} className="text-[#6d28d9]" />
                  Plus discount
                </span>
                <span className="font-['Inter',sans-serif] font-semibold text-[14px] text-[#6d28d9]">
                  -₹{plusDiscount}
                </span>
              </div>
            )}

            {/* Plus subscription */}
            {plusAdded && (
              <div className="flex items-center justify-between">
                <span className="font-['Inter',sans-serif] text-[13px] text-[#6b7280]">
                  EaseCare Plus (6 mo)
                </span>
                <span className="font-['Inter',sans-serif] font-medium text-[14px] text-[#111827]">
                  ₹{plusPrice}
                </span>
              </div>
            )}

            {/* Tip */}
            {tipAmount > 0 && (
              <div className="flex items-center justify-between">
                <span className="font-['Inter',sans-serif] text-[13px] text-[#6b7280] flex items-center gap-1">
                  <Heart size={12} className="text-[#ec4899]" />
                  Tip for {profile.name.split(" ")[0]}
                </span>
                <span className="font-['Inter',sans-serif] font-medium text-[14px] text-[#111827]">
                  ₹{tipAmount}
                </span>
              </div>
            )}

            {/* Divider */}
            <div className="h-px bg-[#e5e7eb]" />

            {/* Total amount */}
            <div className="flex items-center justify-between">
              <span className="font-['Lexend',sans-serif] font-bold text-[15px] text-[#111827]">
                Total amount
              </span>
              <span className="font-['Lexend',sans-serif] font-bold text-[18px] text-[#111827]">
                ₹{(amountToPay - tipAmount).toLocaleString("en-IN")}
              </span>
            </div>

            {/* Amount to pay */}
            <div className="flex items-center justify-between bg-[#f9fafb] rounded-[10px] px-3 py-2.5 -mx-1">
              <span className="font-['Lexend',sans-serif] font-bold text-[15px] text-[#1975D2]">
                Amount to pay
              </span>
              <span className="font-['Lexend',sans-serif] font-bold text-[20px] text-[#1975D2]">
                ₹{amountToPay.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>

        {/* ── Tip Section ── */}
        <div className="mx-4 mt-3 bg-white rounded-[20px] p-5 shadow-[0px_1px_4px_rgba(0,0,0,0.04)]">
          <h3 className="font-['Lexend',sans-serif] font-bold text-[16px] text-[#111827] mb-1">
            Add a tip to thank the Professional
          </h3>
          <div className="flex items-center gap-2 mt-3">
            {TIP_OPTIONS.map((tip) => (
              <button
                key={tip.amount}
                onClick={() => {
                  setShowCustomTip(false);
                  setSelectedTip(
                    selectedTip === tip.amount ? null : tip.amount
                  );
                }}
                className={`relative flex-1 py-3 rounded-[10px] font-['Inter',sans-serif] font-semibold text-[14px] cursor-pointer transition-all active:scale-[0.97] border ${
                  selectedTip === tip.amount && !showCustomTip
                    ? "border-[#1975D2] bg-[#EBF3FC] text-[#1975D2]"
                    : "border-[#e5e7eb] bg-white text-[#374151]"
                }`}
              >
                {tip.label}
                {tip.popular && (
                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-[#ec4899] text-white font-['Inter',sans-serif] font-bold text-[8px] px-1.5 py-0.5 rounded-[4px] uppercase tracking-wider">
                    Popular
                  </span>
                )}
              </button>
            ))}
            <button
              onClick={() => {
                setShowCustomTip(!showCustomTip);
                setSelectedTip(null);
              }}
              className={`flex-1 py-3 rounded-[10px] font-['Inter',sans-serif] font-semibold text-[14px] cursor-pointer transition-all active:scale-[0.97] border ${
                showCustomTip
                  ? "border-[#1975D2] bg-[#EBF3FC] text-[#1975D2]"
                  : "border-[#e5e7eb] bg-white text-[#374151]"
              }`}
            >
              Custom
            </button>
          </div>

          {/* Custom tip input */}
          <AnimatePresence>
            {showCustomTip && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-3 flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-['Inter',sans-serif] font-semibold text-[14px] text-[#9ca3af]">
                      ₹
                    </span>
                    <input
                      value={customTip}
                      onChange={(e) =>
                        setCustomTip(e.target.value.replace(/\D/g, ""))
                      }
                      placeholder="Enter amount"
                      className="w-full bg-[#f9fafb] border border-[#e5e7eb] rounded-[10px] pl-7 pr-4 py-3 font-['Inter',sans-serif] text-[14px] text-[#111827] placeholder:text-[#9ca3af] outline-none focus:border-[#1975D2] transition-colors"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="font-['Inter',sans-serif] text-[11px] text-[#9ca3af] mt-3.5">
            100% of the tip goes to the professional.
          </p>
        </div>

        {/* ── Cancellation Policy ── */}
        <div className="mx-4 mt-3 mb-4 bg-white rounded-[20px] p-5 shadow-[0px_1px_4px_rgba(0,0,0,0.04)]">
          <h3 className="font-['Lexend',sans-serif] font-bold text-[15px] text-[#111827] mb-2">
            Cancellation policy
          </h3>
          <p className="font-['Inter',sans-serif] text-[12px] text-[#6b7280] leading-[19px]">
            Free cancellations if done more than 12 hrs before the service or if
            a professional isn't assigned. A fee will be charged otherwise.
          </p>
          <button className="font-['Inter',sans-serif] font-semibold text-[13px] text-[#111827] mt-2 cursor-pointer underline underline-offset-2">
            Read full policy
          </button>
        </div>
      </div>

        {/* ── Sticky CTA ── */}
        <div className="shrink-0 bg-white border-t border-[#f3f4f6] px-5 pt-3 pb-[max(16px,env(safe-area-inset-bottom))] shadow-[0px_-4px_20px_rgba(0,0,0,0.06)] rounded-b-none md:rounded-b-[24px]">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="font-['Inter',sans-serif] text-[11px] text-[#9ca3af]">
              Amount to pay
            </p>
            <p className="font-['Lexend',sans-serif] font-bold text-[22px] text-[#111827] leading-[28px]">
              ₹{amountToPay.toLocaleString("en-IN")}
            </p>
          </div>
          {totalSavings > 0 && (
            <div className="bg-[#ecfdf5] rounded-[8px] px-2.5 py-1">
              <p className="font-['Inter',sans-serif] font-semibold text-[11px] text-[#065f46]">
                You save ₹{totalSavings.toLocaleString("en-IN")}
              </p>
            </div>
          )}
        </div>
        <PrimaryButton onClick={onProceedToPay}>
          Proceed to Pay
        </PrimaryButton>
        </div>

        {/* ── Coupon Sheet ── */}
        <AnimatePresence>
          {showCoupons && (
            <CouponSheet
              onApply={handleApplyCoupon}
              onClose={() => setShowCoupons(false)}
              appliedCode={appliedCoupon?.code || null}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}