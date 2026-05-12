import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  ChevronRight, Users, Sparkles, Heart, Utensils,
  Star, Dumbbell, Shield, PawPrint,
} from "lucide-react";
import { useRequireAuth } from "../../hooks/useRequireAuth";
import { LoginModal } from "../auth/LoginModal";
import { PostRequirementModal } from "./PostRequirementModal";

// ─── Service categories (matches Figma 2×4 grid exactly) ─────────────────────

const CATEGORIES = [
  { icon: Users,    label: "Elder Care",  color: "#2563EB", bg: "#EEF2FF", border: "rgba(219,234,254,0.6)" },
  { icon: Sparkles, label: "Cleaning",    color: "#059669", bg: "#F1F5F9", border: "rgba(209,250,229,0.6)" },
  { icon: Heart,    label: "Nursing",     color: "#E11D48", bg: "#EEF2FF", border: "rgba(243,232,255,0.6)" },
  { icon: Utensils, label: "Cooking",     color: "#EA580C", bg: "#F1F5F9", border: "rgba(255,237,213,0.6)" },
  { icon: Star,     label: "Baby Care",   color: "#9333EA", bg: "#FAF5FF", border: "rgba(243,232,255,0.6)" },
  { icon: Dumbbell, label: "Physio",      color: "#4F46E5", bg: "#EEF2FF", border: "rgba(224,231,255,0.6)" },
  { icon: Shield,   label: "Security",    color: "#64748B", bg: "#F1F5F9", border: "rgba(226,232,240,0.6)" },
  { icon: PawPrint, label: "Pet Care",    color: "#D97706", bg: "#F1F5F9", border: "rgba(254,243,199,0.6)" },
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

  // Opens the Post Requirement modal — ONLY for the "Tell us what you need" link
  const handlePostRequirement = () => requireAuth(() => setPostReqOpen(true));

  // Navigate to services list filtered by category — for category tile clicks
  const handleCategoryClick = (label: string) => {
    navigate(`/services?category=${encodeURIComponent(label)}`);
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
              {CATEGORIES.map(({ icon: Icon, label, color, bg, border }) => (
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
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: bg }}
                  >
                    <Icon size={22} style={{ color }} strokeWidth={1.8} />
                  </div>
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
                Tell us what you need →
              </button>
            </p>
          </div>
        </div>

        {/* RIGHT — pre-designed hero pricing panel image */}
        <div
          className="flex-1 relative rounded-[18px] overflow-hidden bg-[#1975D2]"
          style={{ aspectRatio: "1740 / 1240" }}
        >
          <img
            src="/hero-pricing-panel.webp"
            alt="Better pricing for every home — Platform fee only 10%"
            className="absolute inset-0 w-full h-full object-cover"
          />
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

        {/* Hero pricing panel image — mobile */}
        <div className="relative rounded-[18px] overflow-hidden bg-[#1975D2] w-full">
          <img
            src="/hero-pricing-panel.webp"
            alt="Better pricing for every home — Platform fee only 10%"
            className="w-full h-auto block"
          />
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
            {CATEGORIES.map(({ icon: Icon, label, color, bg }) => (
              <button
                key={label}
                onClick={() => handleCategoryClick(label)}
                aria-label={`Browse ${label} services`}
                className="flex flex-col items-center gap-1.5 rounded-[16px] py-3 px-1 cursor-pointer active:scale-95 transition-transform"
                style={{ backgroundColor: bg }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/60">
                  <Icon size={16} style={{ color }} strokeWidth={2} />
                </div>
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
              Tell us what you need →
            </button>
          </p>
        </div>
      </div>

      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
      <PostRequirementModal open={postReqOpen} onOpenChange={setPostReqOpen} />
    </>
  );
}
