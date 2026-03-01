import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";
import { BUDGET_TIERS, type QuestionnaireData } from "./CareQuestionnaire";
import { CardQuestionnaire, type CardQuestionnaireData } from "./CardQuestionnaire";
import { ChooseModePopup } from "./ChooseModePopup";
import { SwipeScreen, MOCK_PROVIDERS, type ProviderProfile } from "./SwipeScreen";
import { BookingCheckout, type CheckoutProfile } from "./BookingCheckout";
import { PaymentFlow, type PaymentProvider, type PaymentBookingDetails } from "./PaymentFlow";
import { requirementsApi } from "../../services/api";
import { useBooking } from "../../context/BookingContext";
import { PrimaryButton } from "../shared/PrimaryButton";

// ─── Flow states ───
type FlowState =
  | { kind: "questionnaire" }
  | { kind: "swipe"; data: QuestionnaireData }
  | { kind: "checkout"; data: QuestionnaireData; provider: ProviderProfile }
  | { kind: "payment"; data: QuestionnaireData; provider: ProviderProfile }
  | { kind: "bidSuccess"; data: QuestionnaireData };

// Helper: bridge CardQuestionnaireData -> QuestionnaireData for downstream
function bridgeData(cd: CardQuestionnaireData): QuestionnaireData {
  return {
    careFor: cd.careFor || "Parent",
    patientAge: "",
    patientGender: "",
    serviceType: cd.careType || "Elder Care",
    duration: cd.hoursPerDay || "8 Hours",
    language: cd.specialRequirements.find((r) => r.includes("Bengali")) ? "Bengali" : "No Preference",
    budgetLevel: cd.budget.includes("1500") ? 2 : cd.budget.includes("1000") ? 1 : 0,
  };
}

// Helper: convert ProviderProfile -> CheckoutProfile
function toCheckoutProfile(p: ProviderProfile): CheckoutProfile {
  return {
    id: p.id,
    name: p.name,
    age: p.age,
    photo: p.photo,
    service: p.service,
    experience: p.experience,
    rating: p.rating,
    verified: p.verified,
    duration: p.duration,
    expectedPay: p.expectedPay,
    agency: p.agency,
  };
}

// ─── Bid Posted Success ───
function BidSuccessScreen({
  data,
  onDone,
}: {
  data: QuestionnaireData;
  onDone: () => void;
}) {
  const [gigId] = useState(() => `#${String(Math.floor(Math.random() * 90000) + 10000)}`);

  // Persist requirement to Supabase on mount
  useEffect(() => {
    requirementsApi
      .save({
        reqId: gigId.replace("#", ""),
        service: data.serviceType,
        careFor: data.careFor,
        duration: data.duration,
        budget: BUDGET_TIERS[data.budgetLevel].label,
        language: data.language,
        status: "active",
      })
      .then(() => console.log("[BidSuccess] Requirement persisted to Supabase"))
      .catch((err) => console.warn("[BidSuccess] Failed to persist requirement:", err));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const rows = [
    { label: "Gig ID", value: gigId },
    { label: "Care For", value: data.careFor },
    { label: "Patient", value: `${data.patientAge} years old, ${data.patientGender}` },
    { label: "Duration", value: data.duration },
    { label: "Language", value: data.language },
    { label: "Budget", value: BUDGET_TIERS[data.budgetLevel].label },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#f6f8fc] flex flex-col">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
        className="flex-1 overflow-y-auto"
      >
        {/* Success header */}
        <div className="flex flex-col items-center pt-16 pb-2 px-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
            className="size-[88px] rounded-full bg-gradient-to-br from-[#1e3a8a] to-[#2563eb] flex items-center justify-center mb-5 shadow-[0px_8px_24px_-4px_rgba(25,117,210,0.4)]"
          >
            <Check size={40} className="text-white" strokeWidth={2.5} />
          </motion.div>
          <h2 className="font-['Lexend',sans-serif] font-bold text-[26px] text-[#0f172a] mb-1.5 tracking-[-0.3px]">
            Request Posted!
          </h2>
          <p className="font-['Inter',sans-serif] text-[14px] text-[#64748b] text-center max-w-[260px] leading-[21px]">
            Agencies will send you competitive bids soon.
          </p>
        </div>

        {/* Summary card */}
        <div className="px-5 mt-6">
          <div className="bg-white rounded-[20px] shadow-[0px_4px_16px_-4px_rgba(0,0,0,0.08)] border border-[#f1f5f9] p-5">
            <h4 className="font-['Lexend',sans-serif] font-bold text-[13px] text-[#94a3b8] tracking-[0.7px] uppercase mb-4">
              Request Summary
            </h4>
            {rows.map((row, idx) => (
              <div
                key={row.label}
                className={`flex items-start justify-between py-3 ${
                  idx < rows.length - 1 ? "border-b border-[#f1f5f9]" : ""
                }`}
              >
                <span className="font-['Inter',sans-serif] text-[14px] text-[#64748b]">
                  {row.label}
                </span>
                <span className="font-['Inter',sans-serif] font-semibold text-[15px] text-[#0f172a] capitalize text-right">
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Status info */}
        <div className="px-5 mt-4 mb-6">
          <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-[16px] p-4 flex gap-3">
            <div className="size-[8px] bg-[#22c55e] rounded-full mt-1.5 shrink-0 animate-pulse" />
            <p className="font-['Inter',sans-serif] text-[13px] text-[#166534] leading-[20px]">
              Your request is now live. Agencies near you are reviewing it and will respond with their best offers.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="shrink-0 px-5 pb-8 pt-4">
        <PrimaryButton onClick={onDone}>
          View My Bookings
        </PrimaryButton>
      </div>
    </div>
  );
}

// Helper: build PaymentFlow props from provider + questionnaire data
function buildPaymentProps(provider: ProviderProfile, data: QuestionnaireData) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() + 7);
  const dateStr = startDate.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  const dailyRate =
    parseInt(
      (provider.expectedPay || "1200").replace(/[^0-9]/g, ""),
      10
    ) || 1200;

  const paymentProvider: PaymentProvider = {
    id: provider.id,
    name: provider.name,
    photo: provider.photo,
    service: provider.service,
    rating: provider.rating,
    verified: provider.verified,
    role: provider.service,
    agency: provider.agency,
    distance: "2.3 km",
  };

  const paymentBooking: PaymentBookingDetails = {
    serviceType: `${data.serviceType} \u00B7 Full Day`,
    startDate: dateStr,
    startTime: "9:00 AM",
    duration: `${data.duration}/day \u00B7 5 days`,
    durationDays: 5,
    location: "Salt Lake, Kolkata",
    dailyRate,
  };

  return { paymentProvider, paymentBooking };
}

// ─── Main Flow Orchestrator ───
export function PostRequirementFlow() {
  const navigate = useNavigate();
  const { setBookedProvider } = useBooking();
  const [flow, setFlow] = useState<FlowState>({ kind: "questionnaire" });
  const [showModeSheet, setShowModeSheet] = useState(false);
  const [cardData, setCardData] = useState<CardQuestionnaireData | null>(null);

  const goToBookings = () => navigate("/bookings");

  switch (flow.kind) {
    case "questionnaire":
      return (
        <>
          <CardQuestionnaire
            onClose={() => navigate("/")}
            onSubmit={(data) => {
              setCardData(data);
              setShowModeSheet(true);
            }}
          />
          {/* Bottom sheet overlay — renders on top of questionnaire */}
          {cardData && (
            <ChooseModePopup
              open={showModeSheet}
              onQuickFind={() => {
                setShowModeSheet(false);
                setFlow({ kind: "swipe", data: bridgeData(cardData) });
              }}
              onBidPost={() => {
                setShowModeSheet(false);
                setFlow({ kind: "bidSuccess", data: bridgeData(cardData) });
              }}
              onClose={() => setShowModeSheet(false)}
            />
          )}
        </>
      );

    case "swipe":
      return (
        <SwipeScreen
          title="Quick Find"
          profiles={MOCK_PROVIDERS}
          onClose={() => {
            setFlow({ kind: "questionnaire" });
            setShowModeSheet(false);
          }}
          onAccept={(provider) =>
            setFlow({ kind: "checkout", data: flow.data, provider })
          }
          onBidPost={() =>
            setFlow({ kind: "bidSuccess", data: flow.data })
          }
        />
      );

    case "checkout": {
      const checkoutProfile = toCheckoutProfile(flow.provider);
      return (
        <AnimatePresence>
          <BookingCheckout
            profile={checkoutProfile}
            onProceedToPay={() =>
              setFlow({ kind: "payment", data: flow.data, provider: flow.provider })
            }
            onClose={() => setFlow({ kind: "swipe", data: flow.data })}
          />
        </AnimatePresence>
      );
    }

    case "payment": {
      const { paymentProvider, paymentBooking } = buildPaymentProps(flow.provider, flow.data);
      return (
        <>
          {/* BookingCheckout stays in background while PaymentFlow is open as overlay */}
          <PaymentFlow
            open
            startStep="payment"
            provider={paymentProvider}
            booking={paymentBooking}
            onClose={() => setFlow({ kind: "checkout", data: flow.data, provider: flow.provider })}
            onComplete={() => {
              setBookedProvider({
                providerName: flow.provider.name,
                providerPhoto: flow.provider.photo,
                service: flow.provider.service,
                rating: flow.provider.rating,
                agency: flow.provider.agency || "",
                timeSlot: `${paymentBooking.startDate}, ${paymentBooking.startTime}`,
                bidAmount: flow.provider.expectedPay || "",
              });
              goToBookings();
            }}
          />
        </>
      );
    }

    case "bidSuccess":
      return (
        <BidSuccessScreen data={flow.data} onDone={goToBookings} />
      );
  }
}