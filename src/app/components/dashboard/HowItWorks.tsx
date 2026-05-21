import { motion } from "motion/react";
import { Search, UserCheck, Calendar, ThumbsUp } from "lucide-react";

const STEPS = [
  {
    icon: Search,
    number: "01",
    title: "Tell us what you need",
    desc: "Share your care requirement — type of help, hours, language, location.",
    color: "#1975D2",
    bg: "#EFF6FF",
  },
  {
    icon: UserCheck,
    number: "02",
    title: "We match you instantly",
    desc: "Get matched with verified caregivers in your area within 2 hours.",
    color: "#059669",
    bg: "#ECFDF5",
  },
  {
    icon: Calendar,
    number: "03",
    title: "Book on your schedule",
    desc: "Choose on-demand, pre-book, or a monthly plan. Cancel anytime.",
    color: "#9333EA",
    bg: "#FAF5FF",
  },
  {
    icon: ThumbsUp,
    number: "04",
    title: "Pay only after the service",
    desc: "Rate your caregiver and pay securely. No hidden fees — only 10% platform fee.",
    color: "#EA580C",
    bg: "#FFF7ED",
  },
];

export function HowItWorks() {
  return (
    <section className="rounded-[22px] bg-[#F0F7FA] px-5 py-8 md:px-8 md:py-10 flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-1.5 text-center md:text-left">
        <span className="font-['Lexend',sans-serif] font-semibold text-[12px] tracking-[1px] text-[#1975D2] uppercase">
          How It Works
        </span>
        <h2 className="font-['Lexend',sans-serif] font-extrabold text-[24px] md:text-[30px] text-[#0f172a] leading-[1.2] tracking-[-0.4px]">
          Care, simplified in 4 steps
        </h2>
      </div>

      {/* Steps grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 relative">
        {STEPS.map(({ icon: Icon, number, title, desc, color, bg }, i) => (
          <motion.div
            key={number}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="relative rounded-[18px] p-5 md:p-6 flex flex-col gap-3"
          >
            {/* Step number — large faded */}
            <span
              className="absolute top-3 right-4 font-['Lexend',sans-serif] font-extrabold text-[42px] leading-none opacity-10"
              style={{ color }}
            >
              {number}
            </span>

            {/* Icon circle */}
            <div
              className="size-12 rounded-[14px] flex items-center justify-center"
              style={{ backgroundColor: bg }}
            >
              <Icon size={22} style={{ color }} strokeWidth={2} />
            </div>

            {/* Title */}
            <h3 className="font-['Lexend',sans-serif] font-bold text-[16px] text-[#0f172a] leading-[22px]">
              {title}
            </h3>

            {/* Description */}
            <p className="font-['Inter',sans-serif] text-[13px] text-[#64748b] leading-[19px]">
              {desc}
            </p>

            {/* Connector arrow — desktop only, between cards */}
            {i < STEPS.length - 1 && (
              <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 size-6 rounded-full bg-white border border-[#eef2f7] items-center justify-center shadow-sm">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
