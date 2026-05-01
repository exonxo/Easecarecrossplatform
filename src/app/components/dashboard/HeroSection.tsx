import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck, MessageCircle, Clock, ArrowRight,
  Users, Sparkles, Heart, Utensils, Star, Dumbbell, Shield, PawPrint,
} from "lucide-react";
import svgPaths from "../../../imports/svg-rtfda4itg5";
import { BorderBeam } from "../ui/border-beam";
import { ShineBorder } from "../ui/shine-border";
import { dataService } from "../../services/DataService";

/* ─── Trust badge definitions ─── */
const trustBadges = [
  { label: "Verified", color: "#10b981", icon: ShieldCheck, desc: "Background-checked agencies" },
  { label: "Negotiable", color: "#1975D2", icon: MessageCircle, desc: "Compare & negotiate rates" },
  { label: "24/7", color: "#f97316", icon: Clock, desc: "Round-the-clock support" },
];

/* ─── Services for left panel ─── */
const SERVICE_PANEL = [
  { label: "Elder Care",   Icon: Users,    color: "#2563EB", bg: "rgba(37,99,235,0.18)" },
  { label: "Cleaning",     Icon: Sparkles, color: "#059669", bg: "rgba(5,150,105,0.18)" },
  { label: "Nursing",      Icon: Heart,    color: "#E11D48", bg: "rgba(225,29,72,0.18)" },
  { label: "Cooking",      Icon: Utensils, color: "#EA580C", bg: "rgba(234,88,12,0.18)" },
  { label: "Baby Care",    Icon: Star,     color: "#9333EA", bg: "rgba(147,51,234,0.18)" },
  { label: "Physio",       Icon: Dumbbell, color: "#4F46E5", bg: "rgba(79,70,229,0.18)" },
  { label: "Security",     Icon: Shield,   color: "#94a3b8", bg: "rgba(148,163,184,0.18)" },
  { label: "Pet Care",     Icon: PawPrint, color: "#D97706", bg: "rgba(217,119,6,0.18)" },
];

/* ─── Floating orb ─── */
function FloatingOrb({ size, className, delay = 0 }: { size: number; className: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.8, ease: "easeOut" }}
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{ width: size, height: size }}
    >
      <motion.div
        className="absolute inset-0 rounded-full bg-white/10"
        animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, delay }}
      />
      <div className="absolute inset-0 rounded-full bg-white/15 backdrop-blur-[1px]" />
    </motion.div>
  );
}

/* ─── Pulse rings behind CTA ─── */
function PulseRings() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden rounded-[20px] md:rounded-[24px]">
      {[0, 0.8, 1.6].map((delay, i) => (
        <motion.div
          key={i}
          className="absolute rounded-[20px] md:rounded-[24px] border border-white/20"
          style={{ width: "100%", height: "100%" }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2.4, repeat: Infinity, delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ─── Animated trust badge ─── */
function TrustBadge({ badge, index }: { badge: (typeof trustBadges)[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = badge.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 + index * 0.12, type: "spring", stiffness: 200 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative cursor-pointer"
    >
      <motion.div
        animate={isHovered ? { scale: 1.08, y: -2 } : { scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="flex items-center gap-1.5 md:gap-2"
      >
        <div className="relative">
          <div className="size-[6px] md:size-[7px] rounded-full" style={{ backgroundColor: badge.color }} />
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: badge.color }}
            animate={{ scale: [1, 2.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.6 }}
          />
        </div>
        <span className="font-['Lexend',sans-serif] font-bold text-[10px] md:text-[11px] text-white tracking-[1px] uppercase">
          {badge.label}
        </span>
      </motion.div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="hidden md:flex absolute top-full mt-2 left-1/2 -translate-x-1/2 items-center gap-2 bg-white rounded-[12px] px-3 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.15)] whitespace-nowrap z-20"
          >
            <Icon size={14} style={{ color: badge.color }} />
            <span className="font-['Inter',sans-serif] text-[12px] text-[#334155] font-medium">{badge.desc}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  HERO SECTION
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export function HeroSection() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    dataService
      .getProfile()
      .then((p) => {
        if (p?.name && typeof p.name === "string") setUserName(p.name.split(" ")[0]);
      })
      .catch(() => {});
  }, []);

  const greeting = userName ? `Welcome back, ${userName}` : "Welcome to Easy Care";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative w-full rounded-[28px] md:rounded-[32px] overflow-hidden"
      style={{ backgroundImage: "linear-gradient(135deg, #1975D2 0%, #2563EB 50%, #1e40af 100%)" }}
    >
      <ShineBorder shineColor={["#60A5FA", "#3B82F6", "#93C5FD"]} borderWidth={2} duration={10} />
      <FloatingOrb size={192} className="bottom-[-48px] right-[-48px]" delay={0.2} />
      <FloatingOrb size={100} className="top-[-20px] left-[-30px]" delay={0.5} />
      <FloatingOrb size={64} className="top-[30%] right-[15%] hidden md:block" delay={0.7} />
      <BorderBeam size={300} duration={10} colorFrom="#60a5fa" colorTo="#10b981" borderWidth={2} />

      {/* ── Two-column outer wrapper on lg+ ── */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-stretch">

        {/* LEFT PANEL — services list, lg+ only */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="hidden lg:flex flex-col w-[210px] shrink-0 border-r border-white/15 px-4 py-8 gap-0.5"
        >
          <p className="font-['Lexend',sans-serif] font-bold text-[9px] text-white/50 uppercase tracking-[1.8px] mb-3 px-2">
            Our Services
          </p>
          {SERVICE_PANEL.map(({ label, Icon, color, bg }) => (
            <button
              key={label}
              onClick={() => navigate("/services")}
              className="flex items-center gap-2.5 px-2 py-2 rounded-[10px] hover:bg-white/10 transition-colors cursor-pointer group text-left"
            >
              <div
                className="size-7 rounded-[8px] flex items-center justify-center shrink-0"
                style={{ background: bg }}
              >
                <Icon size={13} style={{ color }} />
              </div>
              <span className="font-['Lexend',sans-serif] font-medium text-[13px] text-white/85 group-hover:text-white transition-colors">
                {label}
              </span>
            </button>
          ))}
          <button
            onClick={() => navigate("/services")}
            className="flex items-center gap-2 px-2 pt-3 mt-1 border-t border-white/10 cursor-pointer group"
          >
            <span className="font-['Lexend',sans-serif] font-semibold text-[11px] text-white/50 group-hover:text-white/80 transition-colors">
              View all services →
            </span>
          </button>
        </motion.div>

        {/* RIGHT — main hero content */}
        <div className="flex flex-1 flex-col md:flex-row md:items-center px-6 md:px-10 lg:px-10 pt-6 pb-10 md:py-10 gap-6 md:gap-10">

          {/* Text + CTA */}
          <div className="flex-1 flex flex-col gap-4 md:gap-5">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col gap-1"
            >
              <p className="font-['Lexend',sans-serif] font-bold text-[22px] md:text-[26px] text-white leading-[30px] md:leading-[34px] tracking-[-0.4px]">
                {greeting}
              </p>
              <p className="font-['Lexend',sans-serif] font-normal text-[14px] md:text-[15px] text-[#dbeafe] opacity-90 leading-[20px]">
                Let's find the best care for you today.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <h2 className="font-['Lexend',sans-serif] font-extrabold text-[28px] md:text-[34px] lg:text-[38px] text-white leading-[36px] md:leading-[44px] lg:leading-[48px]">
                Post Your Care{"\n"}Requirement
              </h2>
              <p className="font-['Lexend',sans-serif] font-medium text-[15px] md:text-[16px] text-[#eff6ff] opacity-90 leading-[24px] md:leading-[26px] mt-2 max-w-[340px]">
                Get responses from verified agencies in minutes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="relative w-full md:w-auto md:inline-flex mt-1"
            >
              <PulseRings />
              <motion.button
                onClick={() => navigate("/post-requirement")}
                className="relative w-full md:w-auto rounded-[20px] md:rounded-[24px] flex items-center justify-center gap-2 px-8 py-4 cursor-pointer active:scale-[0.97] transition-all group overflow-hidden"
                style={{
                  backgroundImage:
                    "linear-gradient(white, white), linear-gradient(var(--rainbow-angle, 0deg), #1975D2, #60A5FA, #A78BFA, #F472B6, #FBBF24, #34D399, #1975D2)",
                  backgroundOrigin: "border-box",
                  backgroundClip: "padding-box, border-box",
                  border: "2px solid transparent",
                  animation: "rainbow-rotate 3s linear infinite",
                }}
                animate={{
                  boxShadow: [
                    "0px 20px 25px -5px rgba(0,0,0,0.15), 0px 8px 10px -6px rgba(0,0,0,0.1), 0 0 0 0px rgba(255,255,255,0)",
                    "0px 20px 25px -5px rgba(0,0,0,0.15), 0px 8px 10px -6px rgba(0,0,0,0.1), 0 0 0 4px rgba(255,255,255,0.3)",
                    "0px 20px 25px -5px rgba(0,0,0,0.15), 0px 8px 10px -6px rgba(0,0,0,0.1), 0 0 0 0px rgba(255,255,255,0)",
                  ],
                }}
                transition={{ boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
                whileHover={{ boxShadow: "0px 25px 30px -5px rgba(0,0,0,0.2), 0px 8px 10px -6px rgba(0,0,0,0.1), 0 0 0 6px rgba(255,255,255,0.35)" }}
              >
                <span
                  className="absolute inset-[-2px] rounded-[20px] md:rounded-[24px] opacity-40 blur-md -z-10"
                  style={{
                    backgroundImage: "linear-gradient(var(--rainbow-angle, 0deg), #1975D2, #60A5FA, #A78BFA, #F472B6, #FBBF24, #34D399, #1975D2)",
                    animation: "rainbow-rotate 3s linear infinite",
                  }}
                />
                <div className="size-[20px] shrink-0">
                  <svg className="block size-full" fill="none" viewBox="0 0 20 20">
                    <path d={svgPaths.p2d8e4cc0} fill="#1975D2" />
                  </svg>
                </div>
                <span className="font-['Lexend',sans-serif] font-bold text-[17px] md:text-[18px] text-[#1975D2] leading-[28px]">
                  Post Requirement
                </span>
                <ArrowRight size={18} className="text-[#1975D2] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 hidden md:block" />
              </motion.button>
            </motion.div>

            <div className="flex items-center gap-5 md:gap-6 mt-1">
              {trustBadges.map((badge, i) => (
                <TrustBadge key={badge.label} badge={badge} index={i} />
              ))}
            </div>
          </div>

          {/* Desktop illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 160 }}
            className="hidden md:flex shrink-0 items-center justify-center relative"
          >
            <div className="relative w-[200px] lg:w-[240px] aspect-square">
              <motion.div
                className="absolute inset-0 rounded-full border-[2px] border-white/10"
                animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.1, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute inset-4 rounded-full border border-white/15"
                animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.15, 0.4] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />
              <motion.div
                className="absolute inset-8 lg:inset-10 rounded-full bg-white/10 backdrop-blur-[4px] flex flex-col items-center justify-center gap-2"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              >
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                <span className="font-['Lexend',sans-serif] font-bold text-[11px] text-white/80 tracking-[1.5px] uppercase">
                  Care
                </span>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}
