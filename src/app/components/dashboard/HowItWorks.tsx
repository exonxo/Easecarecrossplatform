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
    <section className="rounded-[22px] bg-[#EBF4FF] px-5 py-8 md:px-8 md:py-10 flex flex-col gap-7">

      {/* Header */}
      <div className="flex flex-col gap-1.5">
        <span className="font-['Lexend',sans-serif] font-semibold text-[12px] tracking-[1px] text-[#1975D2] uppercase">
          How It Works
        </span>
        <h2 className="font-['Lexend',sans-serif] font-extrabold text-[24px] md:text-[28px] text-[#0f172a] leading-[1.2] tracking-[-0.4px]">
          Care, simplified in 4 steps
        </h2>
      </div>

      {/* Steps */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">

        {/* Dashed connector line — desktop only, runs through icon centres */}
        <div
          className="hidden lg:block absolute z-0 top-[28px] left-[12.5%] right-[12.5%] h-px"
          style={{ borderTop: "2px dashed rgba(25,117,210,0.2)" }}
          aria-hidden="true"
        />

        {STEPS.map(({ icon: Icon, number, title, desc, color, bg }, i) => (
          <motion.div
            key={number}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.1, duration: 0.35 }}
            className="relative z-10 bg-white rounded-[18px] p-5 md:p-6 flex flex-col gap-3"
            style={{ boxShadow: "0 1px 4px rgba(15,23,42,0.06)" }}
          >
            {/* Step badge + icon row */}
            <div className="flex items-center justify-between">
              <div
                className="size-11 rounded-[12px] flex items-center justify-center shrink-0"
                style={{ backgroundColor: bg }}
              >
                <Icon size={20} style={{ color }} strokeWidth={2} />
              </div>
              <span
                className="font-['Lexend',sans-serif] font-extrabold text-[36px] leading-none"
                style={{ color, opacity: 0.12 }}
              >
                {number}
              </span>
            </div>

            {/* Thin colored top-border accent */}
            <div
              className="w-8 h-[3px] rounded-full"
              style={{ backgroundColor: color, opacity: 0.6 }}
            />

            {/* Title */}
            <h3 className="font-['Lexend',sans-serif] font-bold text-[15px] text-[#0f172a] leading-[21px]">
              {title}
            </h3>

            {/* Description */}
            <p className="font-['Inter',sans-serif] text-[13px] text-[#64748b] leading-[19px]">
              {desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
