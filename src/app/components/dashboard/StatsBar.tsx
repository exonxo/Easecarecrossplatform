const stats = [
  { value: "2,400+", label: "Verified Providers", color: "#1975D2" },
  { value: "98%", label: "Satisfaction Rate", color: "#059669" },
  { value: "12+", label: "Cities Covered", color: "#7c3aed" },
  { value: "24/7", label: "Support Available", color: "#f97316" },
];

export function StatsBar() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-center md:items-start gap-0.5 py-3 px-4 bg-white rounded-[14px] border border-[#f1f5f9] shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
        >
          <span
            className="font-['Lexend',sans-serif] font-bold text-[22px] md:text-[24px] leading-[30px]"
            style={{ color: stat.color }}
          >
            {stat.value}
          </span>
          <span className="font-['Inter',sans-serif] text-[11px] text-[#64748b] text-center md:text-left leading-[16px]">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
