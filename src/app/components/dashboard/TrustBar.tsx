import svgPaths from "../../../imports/svg-g8zi2e9ir8";

const trustBadges = [
  {
    label: "Background Verified",
    bg: "#ecfdf5",
    border: "#d1fae5",
    textColor: "#065f46",
    iconColor: "#059669",
    iconPath: svgPaths.p2df2f500,
    iconViewBox: "0 0 12 15",
    iconW: 12,
    iconH: 15,
  },
  {
    label: "Negotiable Price",
    bg: "#eff6ff",
    border: "#dbeafe",
    textColor: "#1e40af",
    iconColor: "#2563EB",
    iconPath: svgPaths.p2cff6600,
    iconViewBox: "0 0 16.5075 15",
    iconW: 16.507,
    iconH: 15,
  },
  {
    label: "Real-time",
    bg: "#faf5ff",
    border: "#f3e8ff",
    textColor: "#6b21a8",
    iconColor: "#9333EA",
    iconPath: svgPaths.pc50600,
    iconViewBox: "0 0 12 15",
    iconW: 12,
    iconH: 15,
  },
  {
    label: "24/7 Support",
    bg: "#fff7ed",
    border: "#ffedd5",
    textColor: "#9a3412",
    iconColor: "#EA580C",
    iconPath: svgPaths.p134adb80,
    iconViewBox: "0 0 15 13.5",
    iconW: 15,
    iconH: 13.5,
  },
];

function Badge({ badge }: { badge: (typeof trustBadges)[0] }) {
  return (
    <div className="relative rounded-full shrink-0" style={{ backgroundColor: badge.bg }}>
      <div
        aria-hidden
        className="absolute inset-0 rounded-full pointer-events-none border"
        style={{ borderColor: badge.border }}
      />
      <div className="flex items-center gap-[6px] px-[13px] py-[7px]">
        <svg className="block shrink-0" width={badge.iconW} height={badge.iconH} viewBox={badge.iconViewBox} fill="none">
          <path d={badge.iconPath} fill={badge.iconColor} />
        </svg>
        <span
          className="font-['Lexend',sans-serif] font-semibold text-[12px] leading-[16px] whitespace-nowrap"
          style={{ color: badge.textColor }}
        >
          {badge.label}
        </span>
      </div>
    </div>
  );
}

export function TrustBar() {
  const items = [...trustBadges, ...trustBadges];

  return (
    <>
      {/* Mobile: marquee scroll */}
      <div className="relative w-full overflow-hidden md:hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#f6f8fc] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#f6f8fc] to-transparent z-10" />
        <div className="flex gap-3 w-max animate-[marquee_18s_linear_infinite] hover:[animation-play-state:paused]">
          {items.map((badge, i) => (
            <Badge key={`${badge.label}-${i}`} badge={badge} />
          ))}
        </div>
      </div>

      {/* Desktop: static 4-col grid */}
      <div className="hidden md:grid grid-cols-4 gap-3">
        {trustBadges.map((badge) => (
          <div
            key={badge.label}
            className="flex items-center gap-3 px-4 py-3 rounded-[14px] border"
            style={{ backgroundColor: badge.bg, borderColor: badge.border }}
          >
            <div
              className="size-9 rounded-[10px] flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${badge.iconColor}18` }}
            >
              <svg width={badge.iconW} height={badge.iconH} viewBox={badge.iconViewBox} fill="none">
                <path d={badge.iconPath} fill={badge.iconColor} />
              </svg>
            </div>
            <span
              className="font-['Lexend',sans-serif] font-semibold text-[13px] leading-[18px]"
              style={{ color: badge.textColor }}
            >
              {badge.label}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
