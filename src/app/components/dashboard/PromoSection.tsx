import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useRequireAuth } from "../../hooks/useRequireAuth";
import { LoginModal } from "../auth/LoginModal";
import { PostRequirementModal } from "./PostRequirementModal";

// ─── Promotional slides (shared with mobile carousel) ────────────────────────

const PROMO_SLIDES = [
  {
    badge: "LIMITED OFFER",
    title: "First 3 Bookings — 15% OFF",
    subtitle: "Use code: WELCOME15",
    cta: "Claim Now",
    image: "https://images.unsplash.com/photo-1762237798221-a298c91e18a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    badgeColor: "#f97316",
  },
  {
    badge: "NEW",
    title: "Verified Home Nursing Care",
    subtitle: "Background checked & certified nurses",
    cta: "Explore",
    image: "https://images.unsplash.com/photo-1721114989769-0423619f03d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxudXJzZSUyMHBhdGllbnQlMjBjYXJlJTIwaG9zcGl0YWx8ZW58MXx8fHwxNzcxOTM3ODg1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    badgeColor: "#2563eb",
  },
  {
    badge: "POPULAR",
    title: "Elder Care Packages",
    subtitle: "Starting from ₹7,225/week",
    cta: "View Packages",
    image: "https://images.unsplash.com/photo-1667184087086-ac955d1f300d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmYW1pbHklMjBlbGRlciUyMGNhcmUlMjBoYXBweXxlbnwxfHx8fDE3NzIwMDQwNDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    badgeColor: "#7c3aed",
  },
  {
    badge: "TRENDING",
    title: "Baby Sitter On Demand",
    subtitle: "Trusted & verified sitters near you",
    cta: "Book Now",
    image: "https://images.unsplash.com/photo-1765896387493-b473e1c0fb78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGRlcmx5JTIwY2FyZSUyMG51cnNpbmclMjBob21lJTIwcGVhY2VmdWx8ZW58MXx8fHwxNzcyMDA0MDQ0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    badgeColor: "#059669",
  },
];

// ─── Service shortcut cards data ──────────────────────────────────────────────
// 3D icons from Microsoft Fluent UI Emoji (MIT licensed)

const SHORTCUTS = [
  {
    id: "on-demand",
    title: "On Demand Care",
    description: "Get a verified caregiver at home within 2 hours. Up to 4 hr session.",
    icon3d: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Zap/3D/zap_3d.png",
    emoji: "⚡",
    bg: "#FFFBEB",
    border: "#FDE68A",
    accent: "#D97706",
  },
  {
    id: "prebook",
    title: "Pre-book Service",
    description: "Schedule care 2–12 hours ahead of time for a single day service.",
    icon3d: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Spiral%20calendar/3D/spiral_calendar_3d.png",
    emoji: "🗓️",
    bg: "#EFF6FF",
    border: "#BFDBFE",
    accent: "#2563EB",
  },
  {
    id: "monthly",
    title: "Monthly Care Plan",
    description: "Hire a dedicated caregiver on a monthly basis. Zero brokerage fees.",
    icon3d: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/House/3D/house_3d.png",
    emoji: "🏠",
    bg: "#F0FDF4",
    border: "#BBF7D0",
    accent: "#16A34A",
  },
];

// ─── Shortcut card ────────────────────────────────────────────────────────────

function ShortcutCard({
  shortcut,
  onBook,
}: {
  shortcut: (typeof SHORTCUTS)[0];
  onBook: () => void;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="flex flex-col bg-white rounded-[20px] border p-4 shadow-[0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.09)] transition-shadow h-full"
      style={{ borderColor: shortcut.border }}
    >
      {/* 3D icon */}
      <div className="mb-2.5">
        {imgError ? (
          <span className="text-[36px] leading-none">{shortcut.emoji}</span>
        ) : (
          <img
            src={shortcut.icon3d}
            alt={shortcut.title}
            className="w-[44px] h-[44px] object-contain"
            onError={() => setImgError(true)}
          />
        )}
      </div>

      {/* Text */}
      <h3 className="font-['Lexend',sans-serif] font-bold text-[14px] text-[#0f172a] mb-1 leading-[20px]">
        {shortcut.title}
      </h3>
      <p className="font-['Inter',sans-serif] text-[11px] text-[#64748b] leading-[17px] flex-1 mb-3">
        {shortcut.description}
      </p>

      {/* CTA */}
      <button
        onClick={onBook}
        className="w-full flex items-center justify-center gap-1.5 bg-[#0f172a] text-white font-['Lexend',sans-serif] font-semibold text-[12px] py-2 rounded-[10px] hover:bg-[#1e293b] active:scale-[0.98] transition-all cursor-pointer"
      >
        Book Now
        <ChevronRight size={13} strokeWidth={2.5} />
      </button>
    </motion.div>
  );
}

// ─── Mobile carousel ──────────────────────────────────────────────────────────

function MobileCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const touchStart = useRef<number | null>(null);
  const touchEnd = useRef<number | null>(null);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c === 0 ? PROMO_SLIDES.length - 1 : c - 1));
  }, []);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c === PROMO_SLIDES.length - 1 ? 0 : c + 1));
  }, []);

  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next]);

  const slide = PROMO_SLIDES[current];

  return (
    <div className="lg:hidden flex flex-col gap-3">
      <div
        className="relative w-full aspect-[2/1] min-h-[180px] max-h-[260px] rounded-[18px] overflow-hidden select-none"
        onTouchStart={(e) => { touchEnd.current = null; touchStart.current = e.targetTouches[0].clientX; }}
        onTouchMove={(e) => { touchEnd.current = e.targetTouches[0].clientX; }}
        onTouchEnd={() => {
          if (!touchStart.current || !touchEnd.current) return;
          const d = touchStart.current - touchEnd.current;
          if (Math.abs(d) >= 50) { if (d > 0) next(); else prev(); }
          touchStart.current = null; touchEnd.current = null;
        }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <ImageWithFallback src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
        <div className="absolute inset-0 z-10 flex flex-col justify-end p-4">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={current} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <span className="text-white font-['Lexend',sans-serif] font-bold text-[9px] px-2.5 py-1 rounded-full mb-2 inline-block tracking-[0.5px]" style={{ backgroundColor: slide.badgeColor }}>{slide.badge}</span>
              <h2 className="font-['Lexend',sans-serif] font-bold text-[18px] text-white leading-[1.2] mb-1">{slide.title}</h2>
              <p className="font-['Inter',sans-serif] text-[11px] text-white/80">{slide.subtitle}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/25 backdrop-blur-sm size-7 rounded-full flex items-center justify-center cursor-pointer"><ChevronLeft size={14} className="text-white" /></button>
        <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/25 backdrop-blur-sm size-7 rounded-full flex items-center justify-center cursor-pointer"><ChevronRight size={14} className="text-white" /></button>
      </div>
    </div>
  );
}

// ─── Main PromoSection ────────────────────────────────────────────────────────

export function PromoSection() {
  const { requireAuth, loginOpen, setLoginOpen } = useRequireAuth();
  const [postReqOpen, setPostReqOpen] = useState(false);

  const handleBook = () => requireAuth(() => setPostReqOpen(true));

  return (
    <>
      {/* ── DESKTOP: full-width heading, then split layout ── */}
      <div className="hidden lg:flex flex-col gap-5">

        {/* Full-width heading row */}
        <div>
          <h2 className="font-['Lexend',sans-serif] font-extrabold text-[28px] xl:text-[32px] text-[#0f172a] leading-[1.2] tracking-[-0.5px]">
            Your Home Care{" "}
            <span className="text-[#1975D2]">Experts</span>
          </h2>
          <p className="font-['Inter',sans-serif] text-[14px] text-[#64748b] mt-1.5 leading-[22px]">
            At Easecare, we connect you with verified caregivers. Say goodbye to stress and hello to comfort at home.
          </p>
        </div>

        {/* Cards + banners side by side */}
        <div className="flex gap-5 h-[420px]">

          {/* LEFT — top 2 cards + 1 full-width below */}
          <div className="grid grid-cols-2 grid-rows-2 gap-3 w-[45%] shrink-0 h-full">
            {SHORTCUTS.slice(0, 2).map((s) => (
              <ShortcutCard key={s.id} shortcut={s} onBook={handleBook} />
            ))}
            <div className="col-span-2 h-full">
              <ShortcutCard shortcut={SHORTCUTS[2]} onBook={handleBook} />
            </div>
          </div>

          {/* RIGHT — 1 large banner + 2 smaller ones below */}
          <div className="flex-1 flex flex-col gap-3 min-h-0 overflow-hidden">

            {/* Large banner */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              onClick={handleBook}
              className="relative flex-[3] rounded-[18px] overflow-hidden cursor-pointer group"
            >
              <ImageWithFallback
                src={PROMO_SLIDES[0].image}
                alt={PROMO_SLIDES[0].title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/5" />
              <div className="absolute inset-0 z-10 flex flex-col justify-end p-5">
                <span
                  className="text-white font-['Lexend',sans-serif] font-bold text-[10px] px-2.5 py-1 rounded-full w-fit tracking-[0.5px] mb-2"
                  style={{ backgroundColor: PROMO_SLIDES[0].badgeColor }}
                >
                  {PROMO_SLIDES[0].badge}
                </span>
                <h3 className="font-['Lexend',sans-serif] font-bold text-[20px] text-white leading-[1.2] mb-1">
                  {PROMO_SLIDES[0].title}
                </h3>
                <p className="font-['Inter',sans-serif] text-[12px] text-white/80">
                  {PROMO_SLIDES[0].subtitle}
                </p>
              </div>
            </motion.div>

            {/* Two smaller banners */}
            <div className="flex gap-3 flex-[2] min-h-0">
              {PROMO_SLIDES.slice(1, 3).map((slide) => (
                <motion.div
                  key={slide.badge}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  onClick={handleBook}
                  className="relative flex-1 rounded-[16px] overflow-hidden cursor-pointer group"
                >
                  <ImageWithFallback
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute inset-0 z-10 flex flex-col justify-end p-3">
                    <span
                      className="text-white font-['Lexend',sans-serif] font-bold text-[9px] px-2 py-0.5 rounded-full w-fit tracking-[0.5px] mb-1.5"
                      style={{ backgroundColor: slide.badgeColor }}
                    >
                      {slide.badge}
                    </span>
                    <p className="font-['Lexend',sans-serif] font-bold text-[13px] text-white leading-[18px] line-clamp-2">
                      {slide.title}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* ── MOBILE: shortcut cards + carousel stacked ── */}
      <div className="flex lg:hidden flex-col gap-5">
        {/* Shortcut cards — horizontal scroll on mobile */}
        <div className="flex gap-3 overflow-x-auto -mx-4 px-4 pb-1" style={{ scrollbarWidth: "none" } as React.CSSProperties}>
          {SHORTCUTS.map((s) => (
            <div key={s.id} className="shrink-0 w-[220px]">
              <ShortcutCard shortcut={s} onBook={handleBook} />
            </div>
          ))}
        </div>

        {/* Promo carousel */}
        <MobileCarousel />
      </div>

      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
      <PostRequirementModal open={postReqOpen} onOpenChange={setPostReqOpen} />
    </>
  );
}
