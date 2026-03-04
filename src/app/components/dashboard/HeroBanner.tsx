import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import imgElderlyCarePeacefulMoment from "figma:asset/57d14312abfea6d53affec2e13993c9e59a386f5.png";

const slides = [
  {
    badge: "LIMITED OFFER",
    title: "First 3 Bookings — 15% OFF",
    subtitle: "Use code: WELCOME15",
    cta: "Claim Now",
    image: imgElderlyCarePeacefulMoment,
    badgeColor: "#f97316",
  },
  {
    badge: "NEW",
    title: "Verified Home Nursing Care",
    subtitle: "Background checked & certified nurses",
    cta: "Explore",
    image:
      "https://images.unsplash.com/photo-1721114989769-0423619f03d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxudXJzZSUyMHBhdGllbnQlMjBjYXJlJTIwaG9zcGl0YWx8ZW58MXx8fHwxNzcxOTM3ODg1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    badgeColor: "#2563eb",
  },
  {
    badge: "POPULAR",
    title: "Elder Care Packages",
    subtitle: "Starting from ₹7,225/week",
    cta: "View Packages",
    image:
      "https://images.unsplash.com/photo-1667184087086-ac955d1f300d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmYW1pbHklMjBlbGRlciUyMGNhcmUlMjBoYXBweXxlbnwxfHx8fDE3NzIwMDQwNDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    badgeColor: "#7c3aed",
  },
  {
    badge: "TRENDING",
    title: "Baby Sitter On Demand",
    subtitle: "Trusted & verified sitters near you",
    cta: "Book Now",
    image:
      "https://images.unsplash.com/photo-1765896387493-b473e1c0fb78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGRlcmx5JTIwY2FyZSUyMG51cnNpbmclMjBob21lJTIwcGVhY2VmdWx8ZW58MXx8fHwxNzcyMDA0MDQ0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    badgeColor: "#059669",
  },
];

export function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const touchStart = useRef<number | null>(null);
  const touchEnd = useRef<number | null>(null);

  const minSwipeDistance = 50;

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
  }, []);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));
  }, []);

  // Auto-advance every 5s
  useEffect(() => {
    const timer = setInterval(next, 5000);
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
      if (distance > 0) next();
      else prev();
    }
    touchStart.current = null;
    touchEnd.current = null;
  };

  const slide = slides[current];

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* ── Banner container ── */}
      <div
        className="relative w-full aspect-[16/9] sm:aspect-[2/1] md:aspect-[5/2] lg:aspect-[3/1] min-h-[180px] max-h-[360px] rounded-[18px] md:rounded-[24px] overflow-hidden group select-none"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Background image with crossfade */}
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <ImageWithFallback
              src={slide.image}
              alt="Hero banner"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/5" />

        {/* ── Content — bottom-aligned, responsive ── */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end p-5 sm:p-6 md:p-8 lg:p-10">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-2 sm:gap-2.5 md:gap-3 max-w-[520px]"
            >
              {/* Badge */}
              <span
                className="text-white font-['Lexend',sans-serif] font-bold text-[9px] sm:text-[10px] md:text-[11px] px-2.5 py-[3px] md:px-3 md:py-1 rounded-full w-fit tracking-[0.5px] leading-none"
                style={{ backgroundColor: slide.badgeColor }}
              >
                {slide.badge}
              </span>

              {/* Title — no forced line breaks, let it wrap naturally */}
              <h2 className="font-['Lexend',sans-serif] font-bold text-[22px] sm:text-[26px] md:text-[32px] lg:text-[36px] text-white leading-[1.2] tracking-[-0.3px]">
                {slide.title}
              </h2>

              {/* Subtitle */}
              <p className="font-['Inter',sans-serif] text-[12px] sm:text-[13px] md:text-[15px] text-white/80 leading-[1.4]">
                {slide.subtitle}
              </p>

              {/* CTA — always auto-width, properly sized */}
              <div className="pt-1">
                <button className="bg-white text-[#1975D2] font-['Lexend',sans-serif] font-bold text-[12px] sm:text-[13px] md:text-[14px] px-5 py-2 sm:px-6 sm:py-2.5 md:px-7 md:py-3 rounded-full hover:bg-[#f0f7fa] hover:shadow-lg active:scale-[0.97] transition-all cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
                  {slide.cta}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Nav arrows — desktop only ── */}
        <button
          onClick={prev}
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/40 size-10 rounded-full items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
        >
          <ChevronLeft size={20} className="text-white" />
        </button>
        <button
          onClick={next}
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/40 size-10 rounded-full items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
        >
          <ChevronRight size={20} className="text-white" />
        </button>

        {/* ── Desktop dots inside banner ── */}
        <div className="hidden md:flex absolute bottom-5 left-1/2 -translate-x-1/2 gap-2 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                i === current
                  ? "bg-white w-5 h-[3px]"
                  : "bg-white/40 size-[3px] hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── Mobile dots below banner ── */}
      <div className="flex md:hidden gap-1.5 items-center justify-center">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > current ? 1 : -1);
              setCurrent(i);
            }}
            className={`rounded-full transition-all duration-300 cursor-pointer ${
              i === current
                ? "bg-[#0f172a] w-4 h-[3px]"
                : "bg-[#d1d5db] w-[3px] h-[3px]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}