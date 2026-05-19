/**
 * Services — Full-page service catalog.
 *
 * Layout:
 *   ┌──────────────────────────────────────────┐
 *   │ Header (back btn + title)                │  sticky
 *   │ Search bar                               │  sticky
 *   │ Horizontal category tab strip            │  sticky
 *   ├──────────────────────────────────────────┤
 *   │ Service cards grid (responsive)          │  scrolls
 *   └──────────────────────────────────────────┘
 *
 * URL state:
 *   /services             → "All" tab
 *   /services?category=X  → category tab pre-selected
 *
 * Clicking a service card opens ServiceBookingPopup (date picker + booking flow).
 */
import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { ArrowLeft, Search, Clock, Sparkles, Plus } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  categories,
  SERVICE_DATA,
  SYSTEM_PROVIDERS,
  type ServiceItem,
} from "../dashboard/QuickCategories";
import {
  ServiceBookingPopup,
  type ServiceItem as BookableService,
  type ServiceCategory,
} from "../dashboard/ServiceBookingPopup";
import { useBooking } from "../../context/BookingContext";
import { useRequireAuth } from "../../hooks/useRequireAuth";
import { LoginModal } from "../auth/LoginModal";
import { PostRequirementModal } from "../dashboard/PostRequirementModal";

type Category = (typeof categories)[number];

const FALLBACK_SERVICES: ServiceItem[] = [
  {
    name: "General Care Service",
    description: "Customized care tailored to your specific needs by a verified caregiver",
    price: "Starting from ₹499",
    duration: "Flexible",
    included: [
      "Verified, background-checked caregiver",
      "Flexible scheduling",
      "24/7 customer support",
      "Free cancellation up to 4 hours before",
    ],
    photo:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  },
  {
    name: "Premium Care Package",
    description: "Dedicated professional with priority booking and progress reports",
    price: "Starting from ₹999",
    duration: "Full day",
    included: [
      "Dedicated professional",
      "Priority booking",
      "Daily progress reports",
      "Family WhatsApp updates",
    ],
    photo:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  },
];

type EnrichedService = ServiceItem & { __category: string };

function servicesFor(label: string): ServiceItem[] {
  return SERVICE_DATA[label] ?? FALLBACK_SERVICES;
}

export function Services() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const urlCategory = searchParams.get("category");

  const [active, setActive] = useState<string>(urlCategory ?? "All");
  const [query, setQuery] = useState("");

  // Keep URL ↔ tab in sync
  useEffect(() => {
    if (active === "All") {
      if (searchParams.has("category")) setSearchParams({}, { replace: true });
    } else if (searchParams.get("category") !== active) {
      setSearchParams({ category: active }, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  // React to URL changes (e.g. back/forward, deep links)
  useEffect(() => {
    const fromUrl = urlCategory ?? "All";
    setActive((prev) => (prev === fromUrl ? prev : fromUrl));
  }, [urlCategory]);

  // Scroll active tab into view
  const activeTabRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    activeTabRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [active]);

  // ── Auth + booking ────────────────────────────────────────────────────────
  const { setBookedProvider } = useBooking();
  const { requireAuth, loginOpen, setLoginOpen } = useRequireAuth();
  const [bookingService, setBookingService] = useState<ServiceItem | null>(null);
  const [bookingCategory, setBookingCategory] = useState<Category | null>(null);
  const [bookingPopupOpen, setBookingPopupOpen] = useState(false);
  const [postReqOpen, setPostReqOpen] = useState(false);

  const handlePostRequirement = () => requireAuth(() => setPostReqOpen(true));

  const handleBook = (service: ServiceItem, catLabel: string) => {
    const cat = categories.find((c) => c.label === catLabel);
    if (!cat) return;
    requireAuth(() => {
      setBookingService(service);
      setBookingCategory(cat);
      setBookingPopupOpen(true);
    });
  };

  const handleComplete = () => {
    if (!bookingService) return;
    const provider = SYSTEM_PROVIDERS[Math.floor(Math.random() * SYSTEM_PROVIDERS.length)];
    setBookedProvider({
      providerName: provider.name,
      providerPhoto: provider.photo,
      service: bookingService.name,
      rating: provider.rating,
      agency: provider.agency,
      timeSlot: "Scheduled",
      bidAmount: bookingService.price,
    });
    setBookingPopupOpen(false);
    setBookingService(null);
    setBookingCategory(null);
    navigate("/");
  };

  // ── Service list ──────────────────────────────────────────────────────────
  const services: EnrichedService[] = useMemo(() => {
    const base: EnrichedService[] =
      active === "All"
        ? categories.flatMap((c) =>
            servicesFor(c.label).map((s) => ({ ...s, __category: c.label }))
          )
        : servicesFor(active).map((s) => ({ ...s, __category: active }));

    if (!query.trim()) return base;
    const q = query.toLowerCase();
    return base.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.__category.toLowerCase().includes(q)
    );
  }, [active, query]);

  const activeCategory =
    active === "All" ? null : categories.find((c) => c.label === active) ?? null;

  return (
    <div className="min-h-screen bg-[#f6f8fc]">
      {/* ── Sticky top band ─────────────────────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#f1f5f9]">
        {/* Header row */}
        <div className="max-w-[1180px] mx-auto px-4 md:px-8 flex items-center gap-3 h-14 md:h-16">
          <button
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="size-9 rounded-full bg-[#f1f5f9] hover:bg-[#e2e8f0] flex items-center justify-center transition-colors cursor-pointer"
          >
            <ArrowLeft size={18} className="text-[#334155]" />
          </button>
          <h1 className="font-['Lexend',sans-serif] font-bold text-[16px] md:text-[18px] text-[#0f172a]">
            {activeCategory ? activeCategory.label : "All Services"}
          </h1>
          <span className="hidden sm:inline font-['Inter',sans-serif] text-[12px] text-[#94a3b8]">
            · {services.length} {services.length === 1 ? "result" : "results"}
          </span>
          <button
            onClick={handlePostRequirement}
            aria-label="Post your requirement"
            className="ml-auto flex items-center gap-1.5 bg-[#1975D2] hover:bg-[#1561b0] active:scale-95 text-white font-['Lexend',sans-serif] font-semibold text-[12px] md:text-[13px] px-3 md:px-4 py-2 rounded-full transition-all cursor-pointer shadow-[0_2px_8px_rgba(25,117,210,0.3)]"
          >
            <Plus size={14} strokeWidth={2.5} aria-hidden="true" />
            <span className="hidden sm:inline">Post Requirement</span>
            <span className="sm:hidden">Post</span>
          </button>
        </div>

        {/* Search */}
        <div className="max-w-[1180px] mx-auto px-4 md:px-8 pb-3">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8]"
            />
            <input
              type="text"
              placeholder="Search across all services..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-[#f8fafc] border border-[#e5e7eb] rounded-[12px] pl-9 pr-4 py-2.5 font-['Inter',sans-serif] text-[14px] text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:border-[#1975D2] focus:bg-white focus:ring-[2px] focus:ring-[rgba(25,117,210,0.12)] transition-all"
            />
          </div>
        </div>

        {/* Tab strip */}
        <div className="max-w-[1180px] mx-auto">
          <div
            className="flex gap-2 overflow-x-auto px-4 md:px-8 pb-3"
            style={{ scrollbarWidth: "none" }}
          >
            {[{ label: "All" as const }, ...categories].map((cat) => {
              const isActive = active === cat.label;
              const isAll = cat.label === "All";
              return (
                <button
                  key={cat.label}
                  ref={isActive ? activeTabRef : undefined}
                  onClick={() => setActive(cat.label)}
                  className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full font-['Lexend',sans-serif] font-semibold text-[12px] md:text-[13px] cursor-pointer transition-all ${
                    isActive
                      ? "bg-[#1975D2] text-white shadow-[0_2px_8px_rgba(25,117,210,0.3)]"
                      : "bg-white text-[#475569] border border-[#e5e7eb] hover:border-[#cbd5e1] hover:text-[#0f172a]"
                  }`}
                >
                  {isAll ? (
                    <Sparkles
                      size={14}
                      strokeWidth={2.2}
                      className={isActive ? "text-white" : "text-[#1975D2]"}
                    />
                  ) : (
                    <img
                      src={(cat as Category).image}
                      alt={(cat as Category).label}
                      className="w-4 h-4 object-contain"
                      style={isActive ? { filter: "brightness(0) invert(1)" } : undefined}
                    />
                  )}
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Service grid ───────────────────────────────────────────────── */}
      <div className="max-w-[1180px] mx-auto px-4 md:px-8 py-5 md:py-7">
        {services.length === 0 ? (
          <EmptyState query={query} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {services.map((service, idx) => (
              <ServiceRow
                key={`${service.__category}-${service.name}-${idx}`}
                service={service}
                index={idx}
                onBook={() => handleBook(service, service.__category)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Booking flow */}
      <ServiceBookingPopup
        service={bookingService as BookableService | null}
        category={
          bookingCategory
            ? {
                label: bookingCategory.label,
                color: bookingCategory.color,
                bg: bookingCategory.bg,
                icon: bookingCategory.icon,
                viewBox: bookingCategory.viewBox,
                image: bookingCategory.image,
              }
            : null
        }
        isOpen={bookingPopupOpen}
        onClose={() => {
          setBookingPopupOpen(false);
          setBookingService(null);
          setBookingCategory(null);
        }}
        onComplete={handleComplete as (svc: BookableService, cat: ServiceCategory) => void}
      />

      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
      <PostRequirementModal open={postReqOpen} onOpenChange={setPostReqOpen} />
    </div>
  );
}

// ─── Service row card ────────────────────────────────────────────────────────

function ServiceRow({
  service,
  index,
  onBook,
}: {
  service: EnrichedService;
  index: number;
  onBook: () => void;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.02, 0.25) }}
      onClick={onBook}
      className="group bg-white rounded-[16px] border border-[#f1f5f9] overflow-hidden text-left cursor-pointer hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.1)] hover:border-[#e2e8f0] active:scale-[0.99] transition-all flex"
    >
      <div className="w-[110px] sm:w-[130px] shrink-0 bg-[#f8fafc] overflow-hidden">
        <ImageWithFallback
          src={service.photo}
          alt={service.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex-1 min-w-0 p-3.5 flex flex-col gap-1">
        <span className="font-['Inter',sans-serif] text-[10px] font-semibold uppercase tracking-wider text-[#94a3b8]">
          {service.__category}
        </span>
        <h3 className="font-['Lexend',sans-serif] font-bold text-[14px] text-[#0f172a] leading-[20px] line-clamp-2 group-hover:text-[#1975D2] transition-colors">
          {service.name}
        </h3>
        <p className="font-['Inter',sans-serif] text-[12px] text-[#64748b] leading-[18px] line-clamp-2">
          {service.description}
        </p>
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-[#f8fafc]">
          <span className="font-['Lexend',sans-serif] font-bold text-[13px] text-[#1975D2]">
            {service.price}
          </span>
          <span className="flex items-center gap-1 font-['Inter',sans-serif] text-[11px] text-[#94a3b8]">
            <Clock size={11} aria-hidden="true" />
            {service.duration}
          </span>
        </div>
      </div>
    </motion.button>
  );
}

// ─── Empty state ─────────────────────────────────────────────────────────────

function EmptyState({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <Search size={36} className="text-[#cbd5e1] mb-3" aria-hidden="true" />
      <p className="font-['Lexend',sans-serif] font-semibold text-[15px] text-[#94a3b8]">
        {query ? `No services found for "${query}"` : "No services available yet"}
      </p>
      {query && (
        <p className="font-['Inter',sans-serif] text-[13px] text-[#94a3b8] mt-1">
          Try a different keyword or browse another category.
        </p>
      )}
    </div>
  );
}
