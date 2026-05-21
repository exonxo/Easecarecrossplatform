/**
 * HeroBanner — Auto-rotating image banner.
 *
 * Height is fully flexible — no fixed aspectRatio, no object-cover cropping.
 * The container grows/shrinks to match each image's natural dimensions.
 * Add or remove entries in BANNERS to change the number of slides.
 *
 * Image naming convention: save files to /public as
 *   banner-1.webp  (or .png / .jpg)
 *   banner-2.webp
 *   banner-3.webp  … etc.
 */
import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Banner = {
  key: string;
  src: string;
  alt: string;
};

const BANNERS: Banner[] = [
  { key: "banner-1", src: "/Banner 1-Hero.webp", alt: "EaseCare promotion banner 1" },
  { key: "banner-2", src: "/Banner 2-Hero.webp", alt: "EaseCare promotion banner 2" },
  { key: "banner-3", src: "/Banner 3-Hero.webp", alt: "EaseCare promotion banner 3" },
  { key: "banner-4", src: "/Banner 4-Hero.webp", alt: "EaseCare promotion banner 4" },
];

const AUTOPLAY_MS = 6000;

export function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const touchStart = useRef<number | null>(null);
  const touchEnd = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((index: number) => {
    setCurrent((index + BANNERS.length) % BANNERS.length);
  }, []);

  const prev = useCallback(() => go(current - 1), [current, go]);
  const next = useCallback(() => go(current + 1), [current, go]);

  // Reset timer on manual navigation so autoplay doesn't fire immediately after
  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, AUTOPLAY_MS);
  }, [next]);

  useEffect(() => {
    timerRef.current = setInterval(next, AUTOPLAY_MS);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [next]);

  const handlePrev = () => { prev(); resetTimer(); };
  const handleNext = () => { next(); resetTimer(); };
  const handleDot  = (i: number) => { go(i); resetTimer(); };

  const onTouchStart = (e: React.TouchEvent) => {
    touchEnd.current = null;
    touchStart.current = e.targetTouches[0].clientX;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };
  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const d = touchStart.current - touchEnd.current;
    if (Math.abs(d) >= 50) { d > 0 ? handleNext() : handlePrev(); }
    touchStart.current = null;
    touchEnd.current = null;
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* ── Banner container — height tracks current image naturally ── */}
      <div
        className="relative w-full rounded-[18px] overflow-hidden select-none group"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* All slides stacked; active one is relative (sets height), rest are absolute */}
        {BANNERS.map((banner, i) => (
          <motion.div
            key={banner.key}
            animate={{ opacity: i === current ? 1 : 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{
              position: i === current ? "relative" : "absolute",
              inset: 0,
              pointerEvents: i === current ? "auto" : "none",
            }}
          >
            <img
              src={banner.src}
              alt={banner.alt}
              className="w-full h-auto block"
              draggable={false}
            />
          </motion.div>
        ))}

        {/* Desktop prev/next arrows — appear on hover */}
        <button
          onClick={handlePrev}
          aria-label="Previous banner"
          className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white/85 hover:bg-white size-10 rounded-full items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
        >
          <ChevronLeft size={18} className="text-[#374151]" aria-hidden="true" />
        </button>
        <button
          onClick={handleNext}
          aria-label="Next banner"
          className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white/85 hover:bg-white size-10 rounded-full items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
        >
          <ChevronRight size={18} className="text-[#374151]" aria-hidden="true" />
        </button>

        {/* Dot indicators — bottom centre, always visible */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
          {BANNERS.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDot(i)}
              aria-label={`Go to banner ${i + 1}`}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                i === current
                  ? "bg-white w-5 h-1.5"
                  : "bg-white/50 hover:bg-white/75 w-1.5 h-1.5"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Mobile prev/next + counter */}
      <div className="flex md:hidden gap-4 items-center justify-center">
        <button
          onClick={handlePrev}
          aria-label="Previous banner"
          className="size-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 active:scale-95 transition-all cursor-pointer"
        >
          <ChevronLeft size={18} className="text-gray-700" aria-hidden="true" />
        </button>
        <span
          className="text-[12px] font-['Inter',sans-serif] text-gray-400 min-w-[40px] text-center"
          aria-live="polite"
        >
          {current + 1} / {BANNERS.length}
        </span>
        <button
          onClick={handleNext}
          aria-label="Next banner"
          className="size-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 active:scale-95 transition-all cursor-pointer"
        >
          <ChevronRight size={18} className="text-gray-700" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
