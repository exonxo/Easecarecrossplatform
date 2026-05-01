import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
const slides = [
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

  const featuredSlide = slides[0];

  return (
    <div className="flex flex-col gap-3 w-full">

      {/* ── DESKTOP: vertical stack — big banner on top, 3 thumbnails in a row below ── */}
      <div className="hidden lg:flex flex-col gap-3">

        {/* Big featured banner — full width */}
        <div className="relative w-full h-[280px] rounded-[20px] overflow-hidden">
          <ImageWithFallback
            src={featuredSlide.image}
            alt="Featured promotion"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/5" />
          <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 max-w-[560px]">
            <span
              className="text-white font-['Lexend',sans-serif] font-bold text-[10px] px-2.5 py-1 rounded-full w-fit tracking-[0.5px] mb-3"
              style={{ backgroundColor: featuredSlide.badgeColor }}
            >
              {featuredSlide.badge}
            </span>
            <h2 className="font-['Lexend',sans-serif] font-bold text-[30px] text-white leading-[1.2] mb-1">
              {featuredSlide.title}
            </h2>
            <p className="font-['Inter',sans-serif] text-[14px] text-white/80 mb-4">
              {featuredSlide.subtitle}
            </p>
            <button className="bg-white text-[#1975D2] font-['Lexend',sans-serif] font-bold text-[13px] px-6 py-2.5 rounded-full hover:bg-[#f0f7fa] transition-colors cursor-pointer w-fit shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
              {featuredSlide.cta}
            </button>
          </div>
        </div>

        {/* Smaller slides — 3-col horizontal row below */}
        <div className="grid grid-cols-3 gap-3">
          {slides.slice(1).map((slide) => (
            <div
              key={slide.badge}
              className="relative h-[140px] rounded-[16px] overflow-hidden cursor-pointer group"
            >
              <ImageWithFallback
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-0 z-10 flex flex-col justify-end p-3.5">
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
            </div>
          ))}
        </div>

      </div>

      {/* ── MOBILE: swipeable carousel ── */}
      <div
        className="lg:hidden relative w-full aspect-[16/9] sm:aspect-[2/1] md:aspect-[5/2] min-h-[180px] max-h-[320px] rounded-[18px] md:rounded-[24px] overflow-hidden group select-none"
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

      </div>

      {/* ── Mobile chevron nav below carousel ── */}
      <div className="flex lg:hidden gap-4 items-center justify-center">
        <button
          onClick={prev}
          className="size-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 active:scale-95 transition-all cursor-pointer"
        >
          <ChevronLeft size={18} className="text-gray-700" />
        </button>
        <button
          onClick={next}
          className="size-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 active:scale-95 transition-all cursor-pointer"
        >
          <ChevronRight size={18} className="text-gray-700" />
        </button>
      </div>
    </div>
  );
}