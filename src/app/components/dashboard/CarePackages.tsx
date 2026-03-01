import { useState } from "react";
import { useNavigate } from "react-router";
import svgPaths from "../../../imports/svg-zdwmi91rdf";
import {
  PackageDetailPopup,
  PACKAGE_DETAILS,
  type PackageDetail,
} from "./PackageDetailPopup";
import { useBooking } from "../../context/BookingContext";

const packages = [
  {
    title: "Post-Op Recovery",
    description: "Complete 7-day nursing &\nphysiotherapy assistance bundle.",
    originalPrice: "₹8,500",
    price: "₹7,225",
    save: "Save 15%",
    iconBg: "#DBEAFE",
    iconColor: "#1975D2",
    iconPath: svgPaths.p750fa00,
    gradient: "linear-gradient(141.587deg, rgb(239,246,255) 0%, rgb(255,255,255) 100%)",
    borderColor: "#dbeafe",
    accentBg: "rgba(59,130,246,0.1)",
  },
  {
    title: "New Parents Help",
    description: "Infant care + cooking + cleaning for\none month.",
    originalPrice: "₹15,000",
    price: "₹13,500",
    save: "Save 10%",
    iconBg: "#CCFBF1",
    iconColor: "#0D9488",
    iconPath: svgPaths.p2648d600,
    gradient: "linear-gradient(141.587deg, rgb(240,253,250) 0%, rgb(255,255,255) 100%)",
    borderColor: "#ccfbf1",
    accentBg: "rgba(20,184,166,0.1)",
  },
  {
    title: "Daily Companion",
    description: "Full-time helper for daily\nactivities & companionship.",
    originalPrice: "₹12,000",
    price: "₹9,600",
    save: "Save 20%",
    iconBg: "#F3E8FF",
    iconColor: "#9333EA",
    iconPath: svgPaths.p750fa00,
    gradient: "linear-gradient(141.587deg, rgb(250,245,255) 0%, rgb(255,255,255) 100%)",
    borderColor: "#e9d5ff",
    accentBg: "rgba(147,51,234,0.1)",
  },
  {
    title: "Physio at Home",
    description: "10-session physiotherapy\npackage with certified therapist.",
    originalPrice: "₹10,000",
    price: "₹8,500",
    save: "Save 15%",
    iconBg: "#FFEDD5",
    iconColor: "#EA580C",
    iconPath: svgPaths.p750fa00,
    gradient: "linear-gradient(141.587deg, rgb(255,247,237) 0%, rgb(255,255,255) 100%)",
    borderColor: "#fed7aa",
    accentBg: "rgba(234,88,12,0.1)",
  },
];

// ─── System-assigned providers (random pool) ───
const SYSTEM_PROVIDERS = [
  {
    name: "Anjali Sharma",
    photo:
      "https://images.unsplash.com/photo-1710425804836-a1de39056b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    rating: 4.9,
    agency: "CareFirst Agency",
  },
  {
    name: "Priya Dasgupta",
    photo:
      "https://images.unsplash.com/photo-1590905707155-17c680dd7867?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    rating: 4.8,
    agency: "Bright Cleaners Agency",
  },
  {
    name: "Rekha Nair",
    photo:
      "https://images.unsplash.com/photo-1667382137969-a11fd256717d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    rating: 4.7,
    agency: "HomeCare Plus",
  },
];

function PackageCard({
  pkg,
  onTap,
}: {
  pkg: (typeof packages)[0];
  onTap: () => void;
}) {
  return (
    <div
      onClick={onTap}
      className="relative rounded-[24px] overflow-hidden hover:shadow-lg transition-shadow cursor-pointer shrink-0 w-[256px] md:w-auto active:scale-[0.98]"
      style={{
        backgroundImage: pkg.gradient,
        border: `1px solid ${pkg.borderColor}`,
        boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05)",
      }}
    >
      {/* Accent circle */}
      <div
        className="absolute -top-[15px] -right-[15px] size-16 rounded-bl-full"
        style={{ backgroundColor: pkg.accentBg }}
      />

      <div className="relative overflow-hidden rounded-[inherit] h-full">
        {/* Top row */}
        <div className="absolute flex items-start justify-between left-[17px] right-[17px] top-[17px]">
          <div
            className="size-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: pkg.iconBg }}
          >
            <svg width="18" height="18" viewBox="0 0 40 40" fill="none">
              <path d={pkg.iconPath} fill={pkg.iconColor} />
            </svg>
          </div>
          <span className="bg-[#dcfce7] text-[#15803d] font-['Lexend',sans-serif] font-bold text-[12px] px-2 py-1 rounded-full leading-[16px]">
            {pkg.save}
          </span>
        </div>

        {/* Title */}
        <div className="absolute left-[17px] right-[17px] top-[65px]">
          <h4 className="font-['Lexend',sans-serif] font-bold text-[16px] text-[#0f172a] leading-[24px]">
            {pkg.title}
          </h4>
        </div>

        {/* Description */}
        <div className="absolute left-[17px] right-[17px] top-[93px] overflow-clip">
          <p className="font-['Inter',sans-serif] font-normal text-[12px] text-[#64748b] leading-[16px] whitespace-pre-line">
            {pkg.description}
          </p>
        </div>

        {/* Bottom: price + arrow */}
        <div className="absolute bottom-[17px] left-[17px] right-[17px] flex items-center justify-between pt-[13px]">
          <div className="absolute inset-x-0 top-0 border-t border-[#f1f5f9]" />
          <div className="flex flex-col gap-[0.5px]">
            <span className="font-['Lexend',sans-serif] font-normal text-[12px] text-[#94a3b8] line-through leading-[16px]">
              {pkg.originalPrice}
            </span>
            <span className="font-['Lexend',sans-serif] font-bold text-[14px] text-[#1975d2] leading-[20px]">
              {pkg.price}
            </span>
          </div>
          <button className="bg-[#1975d2] rounded-[16px] p-[6px] flex items-center justify-center hover:bg-[#1565b8] transition-colors cursor-pointer">
            <svg
              width="13.333"
              height="13.333"
              viewBox="0 0 13.3333 13.3333"
              fill="none"
            >
              <path d={svgPaths.p32510800} fill="white" />
            </svg>
          </button>
        </div>

        {/* Spacer for positioning */}
        <div className="h-[200px]" />
      </div>
    </div>
  );
}

export function CarePackages() {
  const navigate = useNavigate();
  const { setBookedProvider } = useBooking();
  const [selectedPkg, setSelectedPkg] = useState<PackageDetail | null>(null);
  const [popupOpen, setPopupOpen] = useState(false);

  const handleCardTap = (title: string) => {
    const detail = PACKAGE_DETAILS[title];
    if (detail) {
      setSelectedPkg(detail);
      setPopupOpen(true);
    }
  };

  const handleProceed = (pkg: PackageDetail) => {
    // Called after payment is confirmed inside the popup flow
    // Pick a random system-assigned provider
    const provider =
      SYSTEM_PROVIDERS[Math.floor(Math.random() * SYSTEM_PROVIDERS.length)];

    // Set booking context with package mode — starts as "confirming"
    setBookedProvider({
      providerName: provider.name,
      providerPhoto: provider.photo,
      service: pkg.title,
      rating: provider.rating,
      agency: provider.agency,
      timeSlot: "Scheduled",
      bidAmount: pkg.price,
      isPackageBooking: true,
      packageStage: "confirming",
      packageTitle: pkg.title,
    });

    // Close popup and navigate to dashboard so user sees the assignment snackbar
    setPopupOpen(false);
    setSelectedPkg(null);
    navigate("/");
  };

  return (
    <div>
      <div className="flex items-center justify-between px-1 mb-3">
        <h3 className="font-['Lexend',sans-serif] font-bold text-[14px] text-[#64748b] tracking-[0.7px] uppercase leading-[20px]">
          Care Packages
        </h3>
        <button className="font-['Lexend',sans-serif] font-medium text-[14px] text-[#1975d2] hover:underline cursor-pointer leading-[20px]">
          See All
        </button>
      </div>

      {/* Mobile: horizontal scroll */}
      <div
        className="flex md:hidden gap-4 overflow-x-auto pb-2 -mx-4 px-4"
        style={
          {
            scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch",
          } as React.CSSProperties
        }
      >
        {packages.map((pkg) => (
          <PackageCard
            key={pkg.title}
            pkg={pkg}
            onTap={() => handleCardTap(pkg.title)}
          />
        ))}
      </div>

      {/* Desktop: grid */}
      <div className="hidden md:grid grid-cols-4 gap-5">
        {packages.map((pkg) => (
          <PackageCard
            key={pkg.title}
            pkg={pkg}
            onTap={() => handleCardTap(pkg.title)}
          />
        ))}
      </div>

      {/* Package Detail Popup */}
      <PackageDetailPopup
        pkg={selectedPkg}
        isOpen={popupOpen}
        onClose={() => {
          setPopupOpen(false);
          setSelectedPkg(null);
        }}
        onProceed={handleProceed}
      />
    </div>
  );
}