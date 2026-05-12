import { useState, useCallback } from "react";
import { ArrowLeft, Clock, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useModalOverlay } from "../../context/ModalContext";
import { BookingCheckout, type CheckoutProfile } from "./BookingCheckout";
import {
  PaymentFlow,
  type PaymentProvider,
  type PaymentBookingDetails,
} from "./PaymentFlow";
import { DatePicker, type DateRange } from "../shared/DatePicker";
import { PrimaryButton } from "../shared/PrimaryButton";

// ─── The service item type (re-used from QuickCategories) ───
export interface ServiceItem {
  name: string;
  description: string;
  price: string;
  duration: string;
  included: string[];
}

export interface ServiceCategory {
  label: string;
  color: string;
  bg: string;
  icon: string;
  viewBox: string;
}

// ─── Helpers ───
function priceNum(price: string) {
  return parseInt(price.replace(/[^0-9]/g, ""), 10) || 500;
}

function toCheckoutProfile(service: ServiceItem, category: ServiceCategory): CheckoutProfile {
  return {
    id: `svc-${service.name.replace(/\s+/g, "-").toLowerCase()}`,
    name: service.name,
    age: 0,
    photo: "",
    service: category.label,
    experience: service.description,
    rating: 4.8,
    verified: true,
    duration: service.duration,
    expectedPay: service.price,
    agency: "EaseCare Services",
    bidAmount: service.price,
  };
}

function toPaymentProps(
  service: ServiceItem,
  category: ServiceCategory,
  startDate?: Date | null,
  endDate?: Date | null,
  startTime?: string,
): { provider: PaymentProvider; booking: PaymentBookingDetails } {
  const num = priceNum(service.price);
  const chosenDate = startDate || new Date();
  const dateStr = chosenDate.toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  });
  const days = startDate && endDate
    ? Math.round((endDate.getTime() - startDate.getTime()) / 86400000) + 1
    : 1;

  return {
    provider: {
      id: `svc-${service.name.replace(/\s+/g, "-").toLowerCase()}`,
      name: service.name,
      photo: "",
      service: category.label,
      rating: 4.8,
      verified: true,
      agency: "EaseCare Services",
      role: category.label,
    },
    booking: {
      serviceType: service.name,
      startDate: dateStr,
      startTime: startTime || "9:00 AM",
      duration: `${days} day${days > 1 ? "s" : ""}`,
      durationDays: days,
      location: "Home Address",
      dailyRate: num,
    },
  };
}

type PopupStep = "details" | "checkout" | "payment";

interface ServiceBookingPopupProps {
  service: ServiceItem | null;
  category: ServiceCategory | null;
  isOpen: boolean;
  onClose: () => void;
  onComplete: (service: ServiceItem, category: ServiceCategory) => void;
}

export function ServiceBookingPopup({
  service,
  category,
  isOpen,
  onClose,
  onComplete,
}: ServiceBookingPopupProps) {
  useModalOverlay(isOpen);
  const [step, setStep] = useState<PopupStep>("details");
  const [dateRange, setDateRange] = useState<DateRange | null>(null);
  const [selectedTime, setSelectedTime] = useState("9:00 AM");

  const handleClose = useCallback(() => {
    setStep("details");
    setDateRange(null);
    setSelectedTime("9:00 AM");
    onClose();
  }, [onClose]);

  if (!service || !category) return null;

  const accentColor = category.color;
  const rangeReady = dateRange?.start && dateRange?.end;

  // Step 2: Checkout
  if (step === "checkout" && isOpen) {
    return (
      <AnimatePresence>
        <BookingCheckout
          profile={toCheckoutProfile(service, category)}
          onProceedToPay={() => setStep("payment")}
          onClose={() => setStep("details")}
        />
      </AnimatePresence>
    );
  }

  // Step 3: Payment
  if (step === "payment" && isOpen) {
    const { provider, booking } = toPaymentProps(
      service, category, dateRange?.start, dateRange?.end, selectedTime,
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
          onComplete(service, category);
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
            className="absolute inset-0 bg-black/50 backdrop-blur-sm touch-none"
            onClick={handleClose}
          />

          <motion.div
            className="relative mt-auto md:mt-0 bg-[#f9fafb] rounded-t-[24px] md:rounded-[24px] max-h-[92vh] md:max-h-[85vh] md:w-full md:max-w-[520px] flex flex-col overflow-hidden"
            style={{ overscrollBehavior: "contain" }}
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
                  Book Service
                </h2>
              </div>

              {/* Service hero */}
              <div className="mx-4 mb-4 flex gap-3">
                <div
                  className="w-[56px] h-[56px] rounded-[14px] flex items-center justify-center shrink-0"
                  style={{ backgroundColor: category.bg }}
                >
                  <svg width={24} height={24} fill="none" viewBox={category.viewBox}>
                    <path d={category.icon} fill={category.color} />
                  </svg>
                </div>
                <div className="flex-1 min-w-0 py-0.5">
                  <h3 className="font-['Inter',sans-serif] font-bold text-[16px] text-[#111827] leading-[22px]">
                    {service.name}
                  </h3>
                  <p className="font-['Inter',sans-serif] text-[12px] text-[#6b7280] leading-[16px] mt-0.5">
                    {category.label}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="font-['Lexend',sans-serif] font-bold text-[15px]" style={{ color: accentColor }}>
                      {service.price}
                    </span>
                    <span className="font-['Inter',sans-serif] text-[11px] text-[#94a3b8]">
                      · {service.duration}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Scrollable body */}
            <div
              className="flex-1 overflow-y-auto px-4 pt-4 pb-[100px]"
              style={{ WebkitOverflowScrolling: "touch" } as React.CSSProperties}
            >
              {/* Schedule */}
              <div className="bg-white rounded-[16px] border border-[#f3f4f6] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] p-4">
                <h4 className="font-['Lexend',sans-serif] font-bold text-[15px] text-[#111827] mb-3">
                  When do you need this?
                </h4>

                <DatePicker
                  mode="range"
                  dateRange={dateRange}
                  onSelectRange={setDateRange}
                  accentColor={accentColor}
                  label="Service dates"
                />

                <AnimatePresence>
                  {rangeReady && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 pt-3 border-t border-[#f3f4f6]">
                        <p className="font-['Inter',sans-serif] font-medium text-[12px] text-[#6b7280] mb-2">
                          Preferred time
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          {["7:00 AM", "9:00 AM", "11:00 AM", "2:00 PM", "5:00 PM"].map(
                            (time) => (
                              <button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className="flex items-center gap-1.5 px-3 py-2 rounded-[10px] border font-['Inter',sans-serif] font-medium text-[12px] cursor-pointer transition-all active:scale-[0.97]"
                                style={{
                                  borderColor: selectedTime === time ? accentColor : "#e5e7eb",
                                  backgroundColor: selectedTime === time ? `${accentColor}12` : "#fff",
                                  color: selectedTime === time ? accentColor : "#6b7280",
                                }}
                              >
                                <Clock size={12} />
                                {time}
                              </button>
                            ),
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Service details */}
              <div className="mt-3 bg-white rounded-[16px] border border-[#f3f4f6] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] p-4">
                <p className="font-['Inter',sans-serif] text-[13px] text-[#6b7280] leading-[20px] mb-3">
                  {service.description}
                </p>
                <div className="h-px bg-[#f3f4f6] mb-3" />
                <p className="font-['Lexend',sans-serif] font-bold text-[13px] text-[#111827] mb-2">
                  What's included
                </p>
                <div className="flex flex-col gap-2">
                  {service.included.map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <CheckCircle2 size={14} className="shrink-0" style={{ color: accentColor }} />
                      <span className="font-['Inter',sans-serif] text-[13px] text-[#6b7280] leading-[18px]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Note */}
              <div className="mt-3 bg-[#eff6ff] border border-[#dbeafe] rounded-[12px] px-4 py-2.5">
                <p className="font-['Inter',sans-serif] text-[11px] text-[#1e40af] leading-[16px]">
                  A verified professional will be assigned within 30 minutes of
                  checkout. You'll be notified once confirmed.
                </p>
              </div>
            </div>

            {/* Sticky CTA */}
            <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#e5e7eb] px-4 py-4 shadow-[0px_-4px_6px_-1px_rgba(0,0,0,0.05)]">
              <PrimaryButton
                onClick={() => rangeReady && setStep("checkout")}
                disabled={!rangeReady}
                color={accentColor}
              >
                {rangeReady ? "Proceed to Checkout" : "Select date range to continue"}
              </PrimaryButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}