import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Sparkles, ShieldCheck, Stethoscope } from "lucide-react";

// ─── Banner data — all rendered via JSX (no image files needed) ──────────────

type Banner = {
  key: string;
  badge: string;
  badgeColor: string;
  badgeBg: string;
  title: React.ReactNode;
  highlight: string;
  bullets: string[];
  cta: string;
  caregiverImage: string;
  Icon: typeof Sparkles;
};

const BANNERS: Banner[] = [
  {
    key: "launch-offer",
    badge: "Launch Offer",
    badgeColor: "#EA580C",
    badgeBg: "rgba(255,237,213,0.95)",
    title: <>Special Launch Offers<br />for New Families</>,
    highlight: "Up to 90% Off",
    bullets: [
      "Limited-time launch pricing",
      "Try services risk-free",
      "Affordable first bookings",
    ],
    cta: "Claim Offer",
    caregiverImage:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700",
    Icon: Sparkles,
  },
  {
    key: "verified-profiles",
    badge: "Profile Verification",
    badgeColor: "#15803D",
    badgeBg: "rgba(220,252,231,0.95)",
    title: <>Verified Profiles<br />You Can Trust</>,
    highlight: "Real People. Real Reviews.",
    bullets: [
      "View verified caregiver details",
      "Check authentic ratings & reviews",
      "Book confidently, every time",
    ],
    cta: "Explore Verified Profiles",
    caregiverImage:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700",
    Icon: ShieldCheck,
  },
  {
    key: "hospital-partnership",
    badge: "Hospital Partnerships",
    badgeColor: "#0D9488",
    badgeBg: "rgba(204,251,241,0.95)",
    title: <>Connected with Trusted<br />Healthcare Partners</>,
    highlight: "Professional Support Network",
    bullets: [
      "Verified hospital partnerships",
      "Better support ecosystem",
      "Reliable care connections",
    ],
    cta: "Access Trusted Support",
    caregiverImage:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700",
    Icon: Stethoscope,
  },
];

// ─── Banner card ──────────────────────────────────────────────────────────────

function BannerCard({ banner }: { banner: Banner }) {
  const { Icon } = banner;
  return (
    <div className="absolute inset-0 rounded-[18px] overflow-hidden" style={{ backgroundColor: "#1975D2" }}>
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Soft glow ellipse */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 428, height: 428,
          top: -168, left: -178,
          background: "radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />

      {/* Caregiver image — right anchored */}
      <div className="absolute right-0 bottom-0 top-0 w-[44%] md:w-[46%] pointer-events-none">
        <img
          src={banner.caregiverImage}
          alt="Professional caregiver"
          className="w-full h-full object-cover object-center"
        />
        <div
          className="absolute inset-y-0 left-0 w-40 pointer-events-none"
          style={{ background: "linear-gradient(to right, #1975D2 0%, rgba(25,117,210,0.4) 50%, transparent 100%)" }}
        />
      </div>

      {/* Text content — left side */}
      <div className="absolute inset-0 flex flex-col justify-center pl-6 md:pl-10 pr-[44%] md:pr-[42%] z-10">
        {/* Badge */}
        <div
          className="self-start flex items-center gap-1.5 px-3 py-1 rounded-full mb-4 md:mb-5"
          style={{ backgroundColor: banner.badgeBg }}
        >
          <Icon size={12} style={{ color: banner.badgeColor }} strokeWidth={2.5} />
          <span
            className="font-['Lexend',sans-serif] font-semibold text-[10px] md:text-[11px] tracking-[0.3px]"
            style={{ color: banner.badgeColor }}
          >
            {banner.badge}
          </span>
        </div>

        {/* Title */}
        <h3
          className="font-['Lexend',sans-serif] font-extrabold text-white leading-[1.15] mb-2 md:mb-3"
          style={{ fontSize: "clamp(20px, 2.6vw, 36px)" }}
        >
          {banner.title}
        </h3>

        {/* Highlight */}
        <p
          className="font-['Lexend',sans-serif] font-semibold mb-3 md:mb-5"
          style={{ color: "#FCD34D", fontSize: "clamp(14px, 1.6vw, 22px)" }}
        >
          {banner.highlight}
        </p>

        {/* Bullets */}
        <ul className="flex flex-col gap-1.5 md:gap-2 mb-4 md:mb-6">
          {banner.bullets.map((b) => (
            <li
              key={b}
              className="flex items-center gap-2 font-['Inter',sans-serif] text-white/95"
              style={{ fontSize: "clamp(11px, 1vw, 14px)" }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: "#FCD34D" }}
              />
              {b}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          className="self-start bg-white text-[#1975D2] font-['Lexend',sans-serif] font-bold rounded-full hover:bg-[#f0f7fa] active:scale-[0.97] transition-all cursor-pointer shadow-[0_4px_14px_rgba(0,0,0,0.20)]"
          style={{
            fontSize: "clamp(12px, 1.1vw, 14px)",
            padding: "clamp(8px, 1vw, 12px) clamp(20px, 2vw, 28px)",
          }}
        >
          {banner.cta} →
        </button>
      </div>
    </div>
  );
}

// ─── Main HeroBanner — single large auto-rotating carousel ───────────────────

export function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const touchStart = useRef<number | null>(null);
  const touchEnd = useRef<number | null>(null);
  const minSwipeDistance = 50;

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? BANNERS.length - 1 : c - 1));
  }, []);

  const next = useCallback(() => {
    setCurrent((c) => (c === BANNERS.length - 1 ? 0 : c + 1));
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchEnd.current = null;
    touchStart.current = e.targetTouches[0].clientX;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };
  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    if (Math.abs(distance) >= minSwipeDistance) {
      distance > 0 ? next() : prev();
    }
    touchStart.current = null;
    touchEnd.current = null;
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Single large banner — auto rotates */}
      <div
        className="relative w-full rounded-[18px] overflow-hidden select-none group"
        style={{ aspectRatio: "16/7", minHeight: 280 }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={BANNERS[current].key}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <BannerCard banner={BANNERS[current]} />
          </motion.div>
        </AnimatePresence>

        {/* Desktop nav arrows — appear on hover */}
        <button
          onClick={prev}
          aria-label="Previous banner"
          className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 bg-white/85 hover:bg-white size-10 rounded-full items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all cursor-pointer z-20"
        >
          <ChevronLeft size={18} className="text-[#374151]" aria-hidden="true" />
        </button>
        <button
          onClick={next}
          aria-label="Next banner"
          className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 bg-white/85 hover:bg-white size-10 rounded-full items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all cursor-pointer z-20"
        >
          <ChevronRight size={18} className="text-[#374151]" aria-hidden="true" />
        </button>

      </div>

      {/* Mobile prev/next + counter */}
      <div className="flex md:hidden gap-4 items-center justify-center">
        <button
          onClick={prev}
          aria-label="Previous banner"
          className="size-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 active:scale-95 transition-all cursor-pointer"
        >
          <ChevronLeft size={18} className="text-gray-700" aria-hidden="true" />
        </button>
        <span className="text-[12px] font-['Inter',sans-serif] text-gray-400 min-w-[40px] text-center" aria-live="polite">
          {current + 1} / {BANNERS.length}
        </span>
        <button
          onClick={next}
          aria-label="Next banner"
          className="size-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 active:scale-95 transition-all cursor-pointer"
        >
          <ChevronRight size={18} className="text-gray-700" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
