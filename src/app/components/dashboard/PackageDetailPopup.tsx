import { useState, useCallback } from "react";
import { ArrowLeft, Clock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useModalOverlay } from "../../context/ModalContext";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import svgCheckPath from "../../../imports/svg-vfjnzpb7vy";
import { BookingCheckout, type CheckoutProfile } from "./BookingCheckout";
import {
  PaymentFlow,
  type PaymentProvider,
  type PaymentBookingDetails,
} from "./PaymentFlow";
import { DatePicker, type DateRange } from "../shared/DatePicker";
import { PrimaryButton } from "../shared/PrimaryButton";

// ─── Types ───
export interface PackageDetail {
  title: string;
  accentColor: string;
  price: string;
  originalPrice: string;
  save: string;
  duration: string;
  description: string;
  highlights: string[];
  included: string[];
}

// ─── Package data ───
export const PACKAGE_DETAILS: Record<string, PackageDetail> = {
  "Post-Op Recovery": {
    title: "Post-Op Recovery",
    accentColor: "#1975D2",
    price: "₹7,225",
    originalPrice: "₹8,500",
    save: "Save 15%",
    duration: "7 days",
    description:
      "Complete post-operative recovery support with trained nurses and physiotherapists. Includes medication management, wound care, mobility exercises, and daily progress tracking.",
    highlights: [
      "Trained Nursing Staff",
      "Daily Vitals Monitoring",
      "Physiotherapy Sessions",
    ],
    included: [
      "24/7 trained nurse on call",
      "Daily physiotherapy sessions",
      "Medication & wound management",
      "Mobility & rehab exercises",
      "Daily health reports to family",
      "Emergency escalation support",
    ],
  },
  "New Parents Help": {
    title: "New Parents Help",
    accentColor: "#0D9488",
    price: "₹13,500",
    originalPrice: "₹15,000",
    save: "Save 10%",
    duration: "30 days",
    description:
      "Comprehensive help for new parents including infant care, cooking nutritious meals, and maintaining a clean home environment. Experienced staff trained in newborn care.",
    highlights: [
      "Infant Care Specialist",
      "Home Cooked Meals",
      "House Cleaning",
    ],
    included: [
      "Certified infant care support",
      "Nutritious meal preparation",
      "Daily house cleaning",
      "Laundry & sterilization",
      "Night-time baby care assistance",
      "Parent wellness check-ins",
    ],
  },
  "Daily Companion": {
    title: "Daily Companion",
    accentColor: "#9333EA",
    price: "₹9,600",
    originalPrice: "₹12,000",
    save: "Save 20%",
    duration: "30 days",
    description:
      "A full-time companion for elderly or those recovering, providing daily activity assistance, emotional support, and household help.",
    highlights: [
      "Trained Companion",
      "Activity Support",
      "Emotional Wellness",
    ],
    included: [
      "Daily activity assistance",
      "Companionship & conversation",
      "Light household chores",
      "Meal reminders & prep",
      "Outdoor walk assistance",
      "Weekly progress reports",
    ],
  },
  "Physio at Home": {
    title: "Physio at Home",
    accentColor: "#EA580C",
    price: "₹8,500",
    originalPrice: "₹10,000",
    save: "Save 15%",
    duration: "10 sessions",
    description:
      "Professional physiotherapy sessions at your doorstep by certified therapists. Customized exercise plans and progress tracking included.",
    highlights: [
      "Certified Therapist",
      "Custom Exercise Plan",
      "Progress Tracking",
    ],
    included: [
      "10 in-home physio sessions",
      "Customized rehab program",
      "Strength & flexibility training",
      "Pain management techniques",
      "Progress reports after every session",
      "Post-package exercise guide",
    ],
  },
};

// ─── Helpers ───
function priceNum(price: string) {
  return parseInt(price.replace(/[^0-9]/g, ""), 10) || 500;
}

function toCheckoutProfile(pkg: PackageDetail): CheckoutProfile {
  return {
    id: `pkg-${pkg.title.replace(/\s+/g, "-").toLowerCase()}`,
    name: pkg.title,
    age: 0,
    photo: "",
    service: "Care Package",
    experience: pkg.description,
    rating: 4.9,
    verified: true,
    duration: pkg.duration,
    expectedPay: pkg.price,
    agency: "EasyCare Packages",
    bidAmount: pkg.price,
  };
}

function toPaymentProps(
  pkg: PackageDetail,
  startDate?: Date | null,
  endDate?: Date | null,
): { provider: PaymentProvider; booking: PaymentBookingDetails } {
  const num = priceNum(pkg.price);
  const chosenDate = startDate || new Date();
  const dateStr = chosenDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const days =
    startDate && endDate
      ? Math.round((endDate.getTime() - startDate.getTime()) / 86400000) + 1
      : 1;

  return {
    provider: {
      id: `pkg-${pkg.title.replace(/\s+/g, "-").toLowerCase()}`,
      name: pkg.title,
      photo: "",
      service: "Care Package",
      rating: 4.9,
      verified: true,
      agency: "EasyCare Packages",
      role: "Care Package",
    },
    booking: {
      serviceType: pkg.title,
      startDate: dateStr,
      startTime: "9:00 AM",
      duration: pkg.duration,
      durationDays: days,
      location: "Home Address",
      dailyRate: num,
    },
  };
}

// ─── Component ───
type PopupStep = "details" | "checkout" | "payment";

interface PackageDetailPopupProps {
  pkg: PackageDetail | null;
  isOpen: boolean;
  onClose: () => void;
  onProceed: (pkg: PackageDetail) => void;
}

export function PackageDetailPopup({
  pkg,
  isOpen,
  onClose,
  onProceed,
}: PackageDetailPopupProps) {
  useModalOverlay(isOpen);
  const [step, setStep] = useState<PopupStep>("details");
  const [dateRange, setDateRange] = useState<DateRange | null>(null);

  const handleClose = useCallback(() => {
    setStep("details");
    setDateRange(null);
    onClose();
  }, [onClose]);

  if (!pkg) return null;

  const rangeReady = dateRange?.start && dateRange?.end;

  // Step 2: Checkout
  if (step === "checkout" && isOpen) {
    return (
      <AnimatePresence>
        <BookingCheckout
          profile={toCheckoutProfile(pkg)}
          onProceedToPay={() => setStep("payment")}
          onClose={() => setStep("details")}
        />
      </AnimatePresence>
    );
  }

  // Step 3: Payment
  if (step === "payment" && isOpen) {
    const { provider, booking } = toPaymentProps(
      pkg,
      dateRange?.start,
      dateRange?.end,
    );
    return (
      <PaymentFlow
        open
        startStep="payment"
        provider={provider}
        booking={booking}
        onClose={() => setStep("checkout")}
        onComplete={() => {
          setStep("details");
          onProceed(pkg);
        }}
      />
    );
  }

  // Step 1: Details + scheduling
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col md:items-center md:justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            className="relative mt-auto md:mt-0 bg-[#f9fafb] rounded-t-[24px] md:rounded-[24px] max-h-[92vh] md:max-h-[85vh] md:w-full md:max-w-[520px] flex flex-col overflow-hidden"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
          >
            {/* Header */}
            <div className="bg-white border-b border-[#e5e7eb]">
              <div className="px-4 pt-4 pb-3 flex items-center gap-3">
                <button
                  onClick={handleClose}
                  className="p-1 rounded-[6px] cursor-pointer hover:bg-[#f3f4f6] transition-colors"
                >
                  <ArrowLeft size={20} className="text-[#111827]" />
                </button>
                <h2 className="font-['Inter',sans-serif] font-bold text-[18px] text-[#111827] leading-[28px]">
                  {pkg.title}
                </h2>
              </div>

              {/* Price + badge */}
              <div className="mx-4 mb-4 flex items-center gap-3">
                <span
                  className="font-['Lexend',sans-serif] font-bold text-[22px]"
                  style={{ color: pkg.accentColor }}
                >
                  {pkg.price}
                </span>
                <span className="font-['Inter',sans-serif] text-[13px] text-[#94a3b8] line-through">
                  {pkg.originalPrice}
                </span>
                <span
                  className="px-2 py-0.5 rounded-full font-['Inter',sans-serif] font-semibold text-[11px]"
                  style={{
                    backgroundColor: `${pkg.accentColor}15`,
                    color: pkg.accentColor,
                  }}
                >
                  {pkg.save}
                </span>
                <span className="ml-auto font-['Inter',sans-serif] text-[12px] text-[#6b7280] flex items-center gap-1">
                  <Clock size={12} />
                  {pkg.duration}
                </span>
              </div>
            </div>

            {/* Scrollable body */}
            <div
              className="flex-1 overflow-y-auto px-4 pt-4 pb-[100px]"
              style={{ WebkitOverflowScrolling: "touch" } as React.CSSProperties}
            >
              {/* Highlights */}
              <div className="flex gap-2 flex-wrap mb-3">
                {pkg.highlights.map((h) => (
                  <span
                    key={h}
                    className="px-3 py-1.5 rounded-full font-['Inter',sans-serif] font-medium text-[12px] border"
                    style={{
                      borderColor: `${pkg.accentColor}30`,
                      backgroundColor: `${pkg.accentColor}08`,
                      color: pkg.accentColor,
                    }}
                  >
                    {h}
                  </span>
                ))}
              </div>

              {/* Description */}
              <div className="bg-white rounded-[16px] border border-[#f3f4f6] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] p-4 mb-3">
                <p className="font-['Inter',sans-serif] text-[13px] text-[#6b7280] leading-[20px] mb-3">
                  {pkg.description}
                </p>
                <div className="h-px bg-[#f3f4f6] mb-3" />
                <p className="font-['Lexend',sans-serif] font-bold text-[13px] text-[#111827] mb-2">
                  What's included
                </p>
                <div className="flex flex-col gap-2">
                  {pkg.included.map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <svg
                        width={14}
                        height={14}
                        viewBox="0 0 13.3125 15.3125"
                        fill="none"
                        className="shrink-0"
                      >
                        <path
                          d={svgCheckPath.p23b0c100}
                          fill={pkg.accentColor}
                        />
                      </svg>
                      <span className="font-['Inter',sans-serif] text-[13px] text-[#6b7280] leading-[18px]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Schedule */}
              <div className="bg-white rounded-[16px] border border-[#f3f4f6] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] p-4">
                <h4 className="font-['Lexend',sans-serif] font-bold text-[15px] text-[#111827] mb-3">
                  When should we start?
                </h4>
                <DatePicker
                  mode="range"
                  dateRange={dateRange}
                  onSelectRange={setDateRange}
                  accentColor={pkg.accentColor}
                  label="Package dates"
                />
              </div>

              {/* Note */}
              <div className="mt-3 bg-[#eff6ff] border border-[#dbeafe] rounded-[12px] px-4 py-2.5">
                <p className="font-['Inter',sans-serif] text-[11px] text-[#1e40af] leading-[16px]">
                  A verified care team will be assigned within 30 minutes of
                  checkout. You'll be notified once confirmed.
                </p>
              </div>
            </div>

            {/* ─── Sticky CTA ─── */}
            <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#e5e7eb] px-4 py-4 shadow-[0px_-4px_6px_-1px_rgba(0,0,0,0.05)]">
              <PrimaryButton
                onClick={() => dateRange?.start && dateRange?.end && setStep("checkout")}
                disabled={!dateRange?.start || !dateRange?.end}
                color={pkg.accentColor}
              >
                {dateRange?.start && dateRange?.end ? "Proceed to Checkout" : "Select date range to continue"}
              </PrimaryButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
