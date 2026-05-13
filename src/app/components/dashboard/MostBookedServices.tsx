import { useRef } from "react";
import { useNavigate } from "react-router";
import { ChevronRight, Star } from "lucide-react";
import { motion } from "motion/react";

// ─── Data ─────────────────────────────────────────────────────────────────────

type Badge = { label: string; bg: string; color: string };

const POPULAR: Badge   = { label: "🔥 Popular",   bg: "#FFEDD5", color: "#C2410C" };
const TRENDING: Badge  = { label: "📈 Trending",  bg: "#DBEAFE", color: "#1E40AF" };
const TOP_RATED: Badge = { label: "⭐ Top Rated", bg: "#FEF3C7", color: "#92400E" };
const NEW_BADGE: Badge = { label: "✨ New",       bg: "#DCFCE7", color: "#15803D" };

// Maps the short tag used on each card to the canonical category label used
// across the rest of the app (categories array in QuickCategories.tsx).
// Keep these aligned — they drive the deep-link into /services?category=…
const CATEGORY_NAV_MAP: Record<string, string> = {
  "Elder Care":  "Elder Care",
  "Nursing":     "Home Nursing",
  "Baby Care":   "Baby Care",
  "Physio":      "Physiotherapy",
  "Cleaning":    "Housekeeping",
  "Cooking":     "Personal Chef",
};

const SERVICES = [
  {
    name: "Elder Companion Care",
    category: "Elder Care",
    image: "https://images.unsplash.com/photo-1765896387403-3e6e0e44d7cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    rating: 4.8,
    reviews: "2,341",
    price: "₹499",
    originalPrice: "₹599",
    unit: "/day",
    badge: POPULAR,
  },
  {
    name: "Post-Surgery Home Nursing",
    category: "Nursing",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    rating: 4.7,
    reviews: "1,892",
    price: "₹899",
    originalPrice: "₹1,099",
    unit: "/visit",
    badge: TRENDING,
  },
  {
    name: "Newborn Baby Care",
    category: "Baby Care",
    image: "https://images.unsplash.com/photo-1770872938224-8e88ab44fe66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    rating: 4.9,
    reviews: "3,107",
    price: "₹649",
    originalPrice: "₹799",
    unit: "/day",
    badge: TOP_RATED,
  },
  {
    name: "Physiotherapy at Home",
    category: "Physio",
    image: "https://images.unsplash.com/photo-1717500252010-d708ec89a0a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    rating: 4.7,
    reviews: "987",
    price: "₹699",
    originalPrice: "₹899",
    unit: "/session",
    badge: POPULAR,
  },
  {
    name: "Deep Home Cleaning",
    category: "Cleaning",
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    rating: 4.6,
    reviews: "4,521",
    price: "₹799",
    originalPrice: "₹999",
    unit: "/session",
    badge: TRENDING,
  },
  {
    name: "Diabetic Patient Care",
    category: "Elder Care",
    image: "https://images.unsplash.com/photo-1714642596931-2293df25c4a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    rating: 4.8,
    reviews: "1,203",
    price: "₹599",
    originalPrice: "₹749",
    unit: "/day",
    badge: NEW_BADGE,
  },
  {
    name: "Home Cooked Meals",
    category: "Cooking",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    rating: 4.7,
    reviews: "2,678",
    price: "₹299",
    originalPrice: "₹399",
    unit: "/day",
    badge: POPULAR,
  },
  {
    name: "Dementia & Memory Care",
    category: "Nursing",
    image: "https://images.unsplash.com/photo-1740908900846-271f4f021b6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    rating: 4.9,
    reviews: "763",
    price: "₹999",
    originalPrice: "₹1,199",
    unit: "/day",
    badge: TOP_RATED,
  },
];

// ─── Single service card ──────────────────────────────────────────────────────

function ServiceCard({
  service,
  onOpen,
}: {
  service: (typeof SERVICES)[0];
  onOpen: () => void;
}) {
  return (
    <motion.div
      whileHover={{ y: -3, boxShadow: "0 12px 28px rgba(0,0,0,0.10)" }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      onClick={onOpen}
      className="flex flex-col shrink-0 cursor-pointer bg-white rounded-[16px] overflow-hidden"
      style={{
        width: 220,
        border: "1px solid #eef2f7",
        boxShadow: "0px 2px 6px rgba(15,23,42,0.05)",
      }}
    >
      {/* Image — fills card top */}
      <div className="relative w-full h-[180px] overflow-hidden bg-[#f1f5f9]">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {/* Badge — top-left */}
        <span
          className="absolute top-2.5 left-2.5 font-['Lexend',sans-serif] font-bold text-[10px] tracking-[0.2px] px-2 py-1 rounded-full"
          style={{ backgroundColor: service.badge.bg, color: service.badge.color }}
        >
          {service.badge.label}
        </span>
      </div>

      {/* Body — padded content */}
      <div className="flex flex-col gap-1.5 p-4">
        <h4
          className="font-['Lexend',sans-serif] font-semibold text-[#0f172a] leading-[20px] line-clamp-2 min-h-[40px]"
          style={{ fontSize: 14 }}
        >
          {service.name}
        </h4>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <Star size={12} fill="#F59E0B" color="#F59E0B" />
          <span className="font-['Inter',sans-serif] text-[12px] text-[#0f172a] font-medium">
            {service.rating.toFixed(1)}
          </span>
          <span className="font-['Inter',sans-serif] text-[12px] text-[#94a3b8]">
            ({service.reviews})
          </span>
        </div>

        {/* Price + strikethrough */}
        <div className="flex items-baseline gap-1.5 pt-1 mt-1 border-t border-[#f1f5f9]">
          <span className="font-['Lexend',sans-serif] text-[14px] text-[#0f172a] font-bold">
            {service.price}
          </span>
          <span className="font-['Inter',sans-serif] text-[11px] text-[#94a3b8] font-normal">
            {service.unit}
          </span>
          <span className="font-['Inter',sans-serif] text-[11px] text-[#94a3b8] line-through ml-auto">
            {service.originalPrice}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function MostBookedServices() {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Clicking a service card takes the user to the Services page with the
  // matching category tab pre-selected — booking happens on that page.
  const handleOpen = (service: (typeof SERVICES)[0]) => {
    const target = CATEGORY_NAV_MAP[service.category] ?? service.category;
    navigate(`/services?category=${encodeURIComponent(target)}`);
  };

  const scrollBy = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 440, behavior: "smooth" });
  };

  return (
    <section className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-['Lexend',sans-serif] font-bold text-[20px] md:text-[22px] text-[#0f172a] leading-[1.3]">
          Most Booked Services
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Scroll services left"
            className="hidden md:flex size-8 items-center justify-center rounded-full bg-[#f1f5f9] hover:bg-[#e2e8f0] transition-colors cursor-pointer"
          >
            <ChevronRight size={16} className="rotate-180 text-[#374151]" aria-hidden="true" />
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label="Scroll services right"
            className="hidden md:flex size-8 items-center justify-center rounded-full bg-[#f1f5f9] hover:bg-[#e2e8f0] transition-colors cursor-pointer"
          >
            <ChevronRight size={16} className="text-[#374151]" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Horizontal scroll row — aligned with page padding (no bleed-to-edge) */}
      <div
        ref={scrollRef}
        className="flex gap-4 md:gap-5 overflow-x-auto pb-2"
        style={{ scrollbarWidth: "none", scrollSnapType: "x mandatory" }}
      >
        {SERVICES.map((service) => (
          <div key={service.name} style={{ scrollSnapAlign: "start" }}>
            <ServiceCard service={service} onOpen={() => handleOpen(service)} />
          </div>
        ))}
      </div>
    </section>
  );
}
