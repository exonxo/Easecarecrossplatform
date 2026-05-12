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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-2">
        {STATS.map(({ icon: Icon, value, label, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            className="flex items-center gap-3 md:justify-center"
          >
            <div
              className="size-10 md:size-11 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${color}15` }}
            >
              <Icon size={18} style={{ color }} strokeWidth={2} />
            </div>
            <div className="flex flex-col">
              <span className="font-['Lexend',sans-serif] font-extrabold text-[18px] md:text-[22px] text-[#0f172a] leading-[1.1]">
                {value}
              </span>
              <span className="font-['Inter',sans-serif] text-[11px] md:text-[12px] text-[#64748b] leading-[14px]">
                {label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
