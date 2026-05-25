import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRequireAuth } from "../../hooks/useRequireAuth";
import { LoginModal } from "../auth/LoginModal";
import { PostRequirementModal } from "./PostRequirementModal";

// ─── Rotating hero banner images ─────────────────────────────────────────────

const HERO_BANNERS = [
  "/Banner 1-Hero.webp",
  "/Banner 2-Hero.webp",
  "/Banner 3-Hero.webp",
  "/Banner 4-Hero.webp",
];

// ─── Service categories (matches Figma 2×4 grid exactly) ─────────────────────

const CATEGORIES = [
  // Row 1
  { image: "/icon-elder-care.png",      label: "Elder Care",     bg: "#EEF2FF", border: "rgba(219,234,254,0.6)" },
  { image: "/icon-home-nursing.png",    label: "Home Nursing",   bg: "#FFF1F2", border: "rgba(254,205,211,0.6)" },
  { image: "/icon-baby-care.png",       label: "Baby Care",      bg: "#FAF5FF", border: "rgba(243,232,255,0.6)" },
  { image: "/icon-companion-care.png",  label: "Companion Care", bg: "#F0FDFA", border: "rgba(204,251,241,0.6)" },
  // Row 2
  { image: "/icon-physiotherapy.png",   label: "Physiotherapy",  bg: "#EEF2FF", border: "rgba(224,231,255,0.6)" },
  { image: "/icon-housekeeping.png",    label: "Housekeeping",   bg: "#ECFDF5", border: "rgba(209,250,229,0.6)" },
  { image: "/icon-personal-chef.png",   label: "Personal Chef",  bg: "#FFF7ED", border: "rgba(255,237,213,0.6)" },
  { image: "/icon-pet-care.png",        label: "Pet Care",       bg: "#FFFBEB", border: "rgba(254,243,199,0.6)" },
];

// ─── Checkmark icon for bullet points ────────────────────────────────────────

function Check() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="10" fill="rgba(255,255,255,0.2)" />
      <path d="M6 10l3 3 5-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Main PromoSection ────────────────────────────────────────────────────────

export function PromoSection() {
  const navigate = useNavigate();
  const { requireAuth, loginOpen, setLoginOpen } = useRequireAuth();
  const [postReqOpen, setPostReqOpen] = useState(false);

  // ── Hero banner carousel ──────────────────────────────────────────────────
  const [heroCurrent, setHeroCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((index: number, dir: number) => {
    setDirection(dir);
    setHeroCurrent((index + HERO_BANNERS.length) % HERO_BANNERS.length);
  }, []);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDirection(1);
      setHeroCurrent((c) => (c + 1) % HERO_BANNERS.length);
    }, 6000);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [resetTimer]);

  const heroPrev = () => { goTo(heroCurrent - 1, -1); resetTimer(); };
  const heroNext = () => { goTo(heroCurrent + 1,  1); resetTimer(); };

  // Opens the Post Requirement modal — ONLY for the "Tell us what you need" link
  const handlePostRequirement = () => requireAuth(() => setPostReqOpen(true));

  // Navigate to services list filtered by category — gated behind auth
  const handleCategoryClick = (label: string) => {
    requireAuth(() => navigate(`/services?category=${encodeURIComponent(label)}`));
  };

  return (
    <>
      {/* ── DESKTOP ─────────────────────────────────────────────────────────── */}
      <div className="hidden lg:flex flex-col gap-5">

        {/* Full-width heading row */}
        <div className="flex flex-col gap-2">
          <h2 className="font-['Lexend',sans-serif] font-extrabold text-[34px] xl:text-[40px] text-[#0f172a] leading-[1.15] tracking-[-0.5px]">
            Your Loved Ones Deserve{" "}
            <span className="text-[#1975D2]">Better Care.</span>
          </h2>
          <p className="font-['Inter',sans-serif] text-[15px] xl:text-[16px] text-[#64748b] leading-[24px]">
            Find verified, trained caregivers within minutes.
          </p>
        </div>

        {/* Two-column row: left card + right blue panel */}
        <div className="flex gap-6 xl:gap-8 items-start">

        {/* LEFT — service selector card */}
        <div className="flex flex-col gap-4 w-[44%] xl:w-[42%] shrink-0">
          {/* Service selector card */}
          <div
            className="flex-1 bg-white rounded-[22px] flex flex-col gap-4 p-5"
            style={{
              border: "1px solid #DCFCE7",
              boxShadow: "0px 2px 8px rgba(0,0,0,0.07)",
            }}
          >
            <p className="font-['Lexend',sans-serif] font-semibold text-[15px] text-[#0f172a]">
              What are you looking for?
            </p>

            {/* 2×4 category grid */}
            <div className="grid grid-cols-4 gap-3">
              {CATEGORIES.map(({ image, label, bg, border }) => (
                <motion.button
                  key={label}
                  whileHover={{ y: -2, boxShadow: "0px 4px 7px rgba(0,0,0,0.10)" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  onClick={() => handleCategoryClick(label)}
                  aria-label={`Browse ${label} services`}
                  className="flex flex-col items-center gap-2.5 rounded-[20px] py-[24px] px-2 cursor-pointer transition-colors bg-white"
                  style={{
                    border: `1px solid ${border}`,
                    boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
                  }}
                >
                  <img src={image} alt={label} className="w-14 h-14 object-contain" />
                  <span className="font-['Lexend',sans-serif] font-semibold text-[12px] text-[#1e293b] text-center leading-[16px]">
                    {label}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Divider + special request */}
            <div className="border-t border-[#f1f5f9]" />
            <p className="font-['Inter',sans-serif] text-[13px] text-[#64748b] text-center">
              Got a special request?{" "}
              <button onClick={handlePostRequirement} className="text-[#1975D2] font-medium cursor-pointer hover:underline">
                Book a Verified Caregiver →
              </button>
            </p>
          </div>
        </div>

        {/* RIGHT — rotating hero banner carousel */}
        <div
          className="flex-1 relative rounded-[18px] overflow-hidden bg-[#1975D2] group"
          style={{ aspectRatio: "1740 / 1240" }}
        >
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={heroCurrent}
              custom={direction}
              initial={{ x: direction > 0 ? "100%" : "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: direction > 0 ? "-100%" : "100%" }}
              transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <img
                src={HERO_BANNERS[heroCurrent]}
                alt={`EaseCare banner ${heroCurrent + 1}`}
                className="w-full h-full object-contain"
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>

          {/* Arrows */}
          <button
            onClick={heroPrev}
            aria-label="Previous banner"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 size-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          >
            <ChevronLeft size={16} className="text-[#374151]" />
          </button>
          <button
            onClick={heroNext}
            aria-label="Next banner"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 size-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          >
            <ChevronRight size={16} className="text-[#374151]" />
          </button>
        </div>

        </div>
      </div>

      {/* ── MOBILE ──────────────────────────────────────────────────────────── */}
      <div className="flex lg:hidden flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <h2 className="font-['Lexend',sans-serif] font-extrabold text-[26px] text-[#0f172a] leading-[1.15] tracking-[-0.4px]">
            Your Loved Ones Deserve{" "}
            <span className="text-[#1975D2]">Better Care.</span>
          </h2>
          <p className="font-['Inter',sans-serif] text-[13px] text-[#64748b] leading-[20px]">
            Find verified, trained caregivers within minutes.
          </p>
        </div>

        {/* Hero banner carousel — mobile */}
        <div className="relative rounded-[18px] overflow-hidden bg-[#1975D2] w-full">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={`m-${heroCurrent}`}
              custom={direction}
              initial={{ x: direction > 0 ? "100%" : "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: direction > 0 ? "-100%" : "100%" }}
              transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
              className="w-full"
            >
              <img
                src={HERO_BANNERS[heroCurrent]}
                alt={`EaseCare banner ${heroCurrent + 1}`}
                className="w-full h-auto block"
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>

          {/* Arrows — always visible on mobile */}
          <button
            onClick={heroPrev}
            aria-label="Previous banner"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 size-7 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow cursor-pointer"
          >
            <ChevronLeft size={14} className="text-[#374151]" />
          </button>
          <button
            onClick={heroNext}
            aria-label="Next banner"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 size-7 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow cursor-pointer"
          >
            <ChevronRight size={14} className="text-[#374151]" />
          </button>
        </div>

        {/* Service selector card */}
        <div
          className="bg-white rounded-[20px] flex flex-col gap-4 p-4"
          style={{ border: "1px solid #DCFCE7", boxShadow: "0px 2px 8px rgba(0,0,0,0.07)" }}
        >
          <p className="font-['Lexend',sans-serif] font-semibold text-[14px] text-[#0f172a]">
            What are you looking for?
          </p>
          <div className="grid grid-cols-4 gap-2">
            {CATEGORIES.map(({ image, label }) => (
              <button
                key={label}
                onClick={() => handleCategoryClick(label)}
                aria-label={`Browse ${label} services`}
                className="flex flex-col items-center gap-1.5 rounded-[16px] py-3 px-1 cursor-pointer active:scale-95 transition-transform"
              >
                <img src={image} alt={label} className="w-12 h-12 object-contain" />
                <span className="font-['Lexend',sans-serif] font-semibold text-[10px] text-[#1e293b] text-center leading-[13px]">
                  {label}
                </span>
              </button>
            ))}
          </div>
          <div className="border-t border-[#f1f5f9]" />
          <p className="font-['Inter',sans-serif] text-[12px] text-[#64748b] text-center">
            Got a special request?{" "}
            <button onClick={handlePostRequirement} className="text-[#1975D2] font-medium cursor-pointer hover:underline">
              Book a Verified Caregiver →
            </button>
          </p>
        </div>
      </div>

      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
      <PostRequirementModal open={postReqOpen} onOpenChange={setPostReqOpen} />
    </>
  );
}
