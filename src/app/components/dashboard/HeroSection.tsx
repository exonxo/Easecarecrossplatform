import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, MessageCircle, Clock, ArrowRight } from "lucide-react";
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

/* ─── Animated floating orb ─── */
function FloatingOrb({
  size,
  className,
  delay = 0,
}: {
  size: number;
  className: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.8, ease: "easeOut" }}
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Pulse ring */}
      <motion.div
        className="absolute inset-0 rounded-full bg-white/10"
        animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, delay }}
      />
      {/* Core */}
      <div className="absolute inset-0 rounded-full bg-white/15 backdrop-blur-[1px]" />
    </motion.div>
  );
}

/* ─── Pulse ring behind the CTA ─── */
function PulseRings() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden rounded-[20px] md:rounded-[24px]">
      {[0, 0.8, 1.6].map((delay, i) => (
        <motion.div
          key={i}
          className="absolute rounded-[20px] md:rounded-[24px] border border-white/20"
          style={{ width: "100%", height: "100%" }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.4, 0, 0.4],
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Animated trust badge ─── */
function TrustBadge({
  badge,
  index,
}: {
  badge: (typeof trustBadges)[0];
  index: number;
}) {
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
        className="flex items-center gap-1.5 md:gap-2 group"
      >
        {/* Dot with pulse */}
        <div className="relative">
          <div
            className="size-[6px] md:size-[7px] rounded-full"
            style={{ backgroundColor: badge.color }}
          />
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

      {/* Tooltip on hover — desktop only */}
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
            <span className="font-['Inter',sans-serif] text-[12px] text-[#334155] font-medium">
              {badge.desc}
            </span>
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

  // Load personalized name
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
      style={{
        backgroundImage:
          "linear-gradient(135deg, #1975D2 0%, #2563EB 50%, #1e40af 100%)",
      }}
    >
      {/* ── Shine border accent ── */}
      <ShineBorder shineColor={["#60A5FA", "#3B82F6", "#93C5FD"]} borderWidth={2} duration={10} />

      {/* ── Decorative floating orbs ── */}
      <FloatingOrb size={192} className="bottom-[-48px] right-[-48px]" delay={0.2} />
      <FloatingOrb size={100} className="top-[-20px] left-[-30px]" delay={0.5} />
      <FloatingOrb size={64} className="top-[30%] right-[15%] hidden md:block" delay={0.7} />

      {/* ── Border beam accent ── */}
      <BorderBeam size={300} duration={10} colorFrom="#60a5fa" colorTo="#10b981" borderWidth={2} />

      {/* ── Content wrapper ── */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center px-6 md:px-10 lg:px-14 pt-6 pb-10 md:py-10 gap-6 md:gap-10">
        {/* Left / Mobile — text + CTA */}
        <div className="flex-1 flex flex-col gap-4 md:gap-5">
          {/* Greeting */}
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

          {/* Get Started pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
          >
            
          </motion.div>

          {/* Big heading */}
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

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            className="relative w-full md:w-auto md:inline-flex mt-1"
          >
            <PulseRings />
            <motion.button
              onClick={() => navigate("/post-requirement")}
              className="relative w-full md:w-auto rounded-[20px] md:rounded-[24px] flex items-center justify-center gap-2 px-8 py-4 md:py-4 cursor-pointer active:scale-[0.97] transition-all group overflow-hidden"
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
              transition={{
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              whileHover={{
                boxShadow:
                  "0px 25px 30px -5px rgba(0,0,0,0.2), 0px 8px 10px -6px rgba(0,0,0,0.1), 0 0 0 6px rgba(255,255,255,0.35)",
              }}
            >
              {/* Rainbow glow effect behind button */}
              <span
                className="absolute inset-[-2px] rounded-[20px] md:rounded-[24px] opacity-40 blur-md -z-10"
                style={{
                  backgroundImage:
                    "linear-gradient(var(--rainbow-angle, 0deg), #1975D2, #60A5FA, #A78BFA, #F472B6, #FBBF24, #34D399, #1975D2)",
                  animation: "rainbow-rotate 3s linear infinite",
                }}
              />
              {/* Plus circle icon from Figma */}
              <div className="size-[20px] shrink-0">
                <svg className="block size-full" fill="none" viewBox="0 0 20 20">
                  <path d={svgPaths.p2d8e4cc0} fill="#1975D2" />
                </svg>
              </div>
              <span className="font-['Lexend',sans-serif] font-bold text-[17px] md:text-[18px] text-[#1975D2] leading-[28px]">
                Post Requirement
              </span>
              <ArrowRight
                size={18}
                className="text-[#1975D2] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 hidden md:block"
              />
            </motion.button>
          </motion.div>

          {/* Trust badges */}
          <div className="flex items-center gap-5 md:gap-6 mt-1">
            {trustBadges.map((badge, i) => (
              <TrustBadge key={badge.label} badge={badge} index={i} />
            ))}
          </div>
        </div>

        {/* Right — Desktop illustration area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 160 }}
          className="hidden md:flex shrink-0 items-center justify-center relative"
        >
          {/* Abstract care illustration with animated rings */}
          <div className="relative w-[220px] lg:w-[260px] aspect-square">
            {/* Outer pulsing ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white/10"
              animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.1, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Middle ring */}
            <motion.div
              className="absolute inset-4 rounded-full border border-white/15"
              animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.15, 0.4] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
            {/* Inner glow circle */}
            <motion.div
              className="absolute inset-8 lg:inset-10 rounded-full bg-white/10 backdrop-blur-[4px] flex flex-col items-center justify-center gap-2"
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            >
              <div className="text-[40px] lg:text-[48px] leading-none">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <span className="font-['Lexend',sans-serif] font-bold text-[11px] text-white/80 tracking-[1.5px] uppercase">
                Care
              </span>
            </motion.div>
            {/* Floating mini badges around the circle */}
            {[
              { emoji: "🏥", angle: -30, dist: 92 },
              { emoji: "👶", angle: 60, dist: 88 },
              { emoji: "👵", angle: 150, dist: 92 },
              { emoji: "💊", angle: 240, dist: 88 },
            ].map((item, i) => {
              const rad = (item.angle * Math.PI) / 180;
              const x = Math.cos(rad) * item.dist;
              const y = Math.sin(rad) * item.dist;
              return (
                null
              );
            })}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}