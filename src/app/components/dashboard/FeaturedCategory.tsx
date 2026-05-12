import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { ServiceBookingPopup, type ServiceItem as BookableService } from "./ServiceBookingPopup";
import { useBooking } from "../../context/BookingContext";
import { useRequireAuth } from "../../hooks/useRequireAuth";
import { LoginModal } from "../auth/LoginModal";
import {
  SERVICE_DATA,
  categories,
  SYSTEM_PROVIDERS,
  type ServiceItem,
} from "./QuickCategories";

// ─── Single service card ──────────────────────────────────────────────────────

function ServiceCard({
  service,
  categoryColor,
  onBook,
  index,
}: {
  service: ServiceItem;
  categoryColor: string;
  onBook: (s: ServiceItem) => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group bg-white rounded-[16px] border border-[#f1f5f9] overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.09)] hover:border-[#e2e8f0] transition-all flex flex-col shrink-0"
      style={{ minWidth: "160px", maxWidth: "200px" }}
    >
      {/* Photo */}
      <div className="relative h-[110px] overflow-hidden bg-[#f1f5f9]">
        <ImageWithFallback
          src={service.photo}
          alt={service.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Body */}
      <div className="flex flex-col gap-2 p-3 flex-1">
        <h4 className="font-['Lexend',sans-serif] font-semibold text-[12px] text-[#0f172a] leading-[17px] line-clamp-2 group-hover:text-[#1975D2] transition-colors">
          {service.name}
        </h4>
        <p
          className="font-['Lexend',sans-serif] font-bold text-[11px] mt-auto"
          style={{ color: categoryColor }}
        >
          {service.price}
        </p>
      </div>

      {/* Book button */}
      <button
        onClick={() => onBook(service)}
        className="mx-3 mb-3 py-2 rounded-[10px] font-['Inter',sans-serif] font-semibold text-[12px] text-white transition-all cursor-pointer active:scale-[0.97]"
        style={{ backgroundColor: categoryColor }}
      >
        Book
      </button>
    </motion.div>
  );
}

// ─── Desktop service card — Figma horizontal split (image-left, text-right) ───

function ServiceCardDesktop({
  service,
  categoryColor,
  onBook,
  index,
}: {
  service: ServiceItem;
  categoryColor: string;
  onBook: (s: ServiceItem) => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="group bg-white rounded-[16px] border border-[#f1f5f9] overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.09)] hover:border-[#e2e8f0] transition-all flex flex-row cursor-pointer h-[120px]"
      onClick={() => onBook(service)}
    >
      {/* Left — image */}
      <div className="relative w-[120px] shrink-0 overflow-hidden bg-[#f1f5f9]">
        <ImageWithFallback
          src={service.photo}
          alt={service.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Right — text content */}
      <div className="flex flex-col justify-between flex-1 p-4">
        <div className="flex flex-col gap-1">
          <h4 className="font-['Lexend',sans-serif] font-semibold text-[13px] text-[#0f172a] leading-[19px] line-clamp-2 group-hover:text-[#1975D2] transition-colors">
            {service.name}
          </h4>
          <p className="font-['Inter',sans-serif] text-[11px] text-[#94a3b8] line-clamp-2 leading-[16px]">
            {service.description}
          </p>
        </div>
        <div className="flex flex-col gap-0.5 border-t border-[#faf5ff] pt-2">
          <span
            className="font-['Lexend',sans-serif] font-bold text-[12px] leading-[18px]"
            style={{ color: categoryColor }}
          >
            Starting from {service.price}
          </span>
          <span className="font-['Inter',sans-serif] text-[10px] text-[#94a3b8]">
            {service.duration}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Featured Category Section ────────────────────────────────────────────────

interface FeaturedCategoryProps {
  categoryLabel: string;
}

export function FeaturedCategory({ categoryLabel }: FeaturedCategoryProps) {
  const navigate = useNavigate();
  const { setBookedProvider } = useBooking();

  const category = categories.find((c) => c.label === categoryLabel);
  const services = SERVICE_DATA[categoryLabel] ?? [];

  const { requireAuth, loginOpen, setLoginOpen } = useRequireAuth();
  const [bookingService, setBookingService] = useState<ServiceItem | null>(null);
  const [bookingPopupOpen, setBookingPopupOpen] = useState(false);

  const handleBook = (service: ServiceItem) => {
    requireAuth(() => {
      setBookingService(service);
      setBookingPopupOpen(true);
    });
  };

  const handleBookingComplete = () => {
    if (!bookingService || !category) return;
    const provider = SYSTEM_PROVIDERS[Math.floor(Math.random() * SYSTEM_PROVIDERS.length)];
    setBookedProvider({
      providerName: provider.name,
      providerPhoto: provider.photo,
      service: bookingService.name,
      rating: provider.rating,
      agency: provider.agency,
      timeSlot: "Scheduled",
      bidAmount: bookingService.price,
      isPackageBooking: true,
      packageStage: "confirming",
      packageTitle: bookingService.name,
    });
    setBookingPopupOpen(false);
    setBookingService(null);
    navigate("/");
  };

  if (!category || services.length === 0) return null;

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* Section header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="size-9 rounded-[10px] flex items-center justify-center shrink-0"
              style={{ backgroundColor: category.bg, border: `1.5px solid ${category.border}` }}
            >
              <svg
                fill="none"
                preserveAspectRatio="xMidYMid meet"
                viewBox={category.viewBox}
                style={{ width: category.iconW * 0.65, height: category.iconH * 0.65 }}
              >
                <path d={category.icon} fill={category.color} />
              </svg>
            </div>
            <h2 className="font-['Lexend',sans-serif] font-bold text-[18px] md:text-[20px] text-[#0f172a]">
              {categoryLabel}
            </h2>
          </div>
          <button
            onClick={() => navigate("/services")}
            className="flex items-center gap-0.5 font-['Lexend',sans-serif] font-semibold text-[13px] cursor-pointer hover:underline"
            style={{ color: category.color }}
          >
            See all
            <ChevronRight size={14} />
          </button>
        </div>

        {/* Mobile: horizontal scroll row */}
        <div
          className="flex md:hidden gap-3 overflow-x-auto -mx-4 px-4 pb-2"
          style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
        >
          {services.map((service, i) => (
            <ServiceCard
              key={service.name}
              service={service}
              categoryColor={category.color}
              onBook={handleBook}
              index={i}
            />
          ))}
        </div>

        {/* Desktop: 3-col grid (6 services = 2 rows × 3 cols) */}
        <div className="hidden md:grid grid-cols-3 gap-3">
          {services.map((service, i) => (
            <ServiceCardDesktop
              key={service.name}
              service={service}
              categoryColor={category.color}
              onBook={handleBook}
              index={i}
            />
          ))}
        </div>
      </div>

      <ServiceBookingPopup
        service={bookingService as BookableService | null}
        category={
          category
            ? {
                label: category.label,
                color: category.color,
                bg: category.bg,
                icon: category.icon,
                viewBox: category.viewBox,
              }
            : null
        }
        isOpen={bookingPopupOpen}
        onClose={() => {
          setBookingPopupOpen(false);
          setBookingService(null);
        }}
        onComplete={handleBookingComplete}
      />

      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
    </>
  );
}
