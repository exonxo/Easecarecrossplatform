import { motion } from "motion/react";
import { Users, UserCheck, Star, MapPin } from "lucide-react";

const STATS = [
  { icon: Users,     value: "50,000+", label: "Families Served",       color: "#1975D2" },
  { icon: UserCheck, value: "8,200+",  label: "Verified Caregivers",   color: "#059669" },
  { icon: Star,      value: "4.8",     label: "Average Rating",        color: "#F59E0B" },
  { icon: MapPin,    value: "Kolkata", label: "Exclusively Available", color: "#9333EA" },
];

export function StatsBar() {
  return (
    <section
      className="rounded-[20px] bg-white border border-[#eef2f7] px-5 md:px-8 py-5 md:py-6"
      style={{ boxShadow: "0px 2px 12px rgba(15,23,42,0.04)" }}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x md:divide-[#eef2f7]">
        {STATS.map(({ icon: Icon, value, label, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, transform: "translateY(8px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            className="flex flex-col gap-1 md:items-center md:px-4"
          >
            <div className="flex items-center gap-1.5">
              <Icon size={14} style={{ color }} strokeWidth={2.5} />
              <span className="font-['Inter',sans-serif] text-[11px] md:text-[12px] text-[#64748b] leading-[14px]">
                {label}
              </span>
            </div>
            <span className="font-['Lexend',sans-serif] font-extrabold text-[20px] md:text-[24px] text-[#0f172a] leading-[1.1] tracking-[-0.3px]">
              {value}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
