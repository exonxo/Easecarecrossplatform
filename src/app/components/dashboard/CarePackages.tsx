import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import svgPaths from "../../../imports/svg-zdwmi91rdf";
import { ImageWithFallback } from "../figma/ImageWithFallback";
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
    image: "https://images.unsplash.com/photo-1762237798221-a298c91e18a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3N0JTIwc3VyZ2VyeSUyMHJlY292ZXJ5JTIwbnVyc2luZyUyMGNhcmV8ZW58MXx8fHwxNzcyNjMwNjI3fDA&ixlib=rb-4.1.0&q=80&w=1080",
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
    image: "https://images.unsplash.com/photo-1770872938224-8e88ab44fe66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXdib3JuJTIwYmFieSUyMHBhcmVudCUyMGNhcmV8ZW58MXx8fHwxNzcyNjMwNjI3fDA&ixlib=rb-4.1.0&q=80&w=1080",
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
    image: "https://images.unsplash.com/photo-1765896387403-3e6e0e44d7cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGRlcmx5JTIwY29tcGFuaW9uJTIwY2FyZWdpdmVyJTIwaGFwcHl8ZW58MXx8fHwxNzcyNjMwNjI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
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
    image: "https://images.unsplash.com/photo-1717500252010-d708ec89a0a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaHlzaW90aGVyYXB5JTIwaG9tZSUyMGV4ZXJjaXNlJTIwcGF0aWVudHxlbnwxfHx8fDE3NzI2MzA2Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "Elder Care Monthly",
    description: "Dedicated caregiver for daily\nassistance & health monitoring.",
    originalPrice: "₹22,000",
    price: "₹18,700",
    save: "Save 15%",
    iconBg: "#FEF3C7",
    iconColor: "#D97706",
    iconPath: svgPaths.p134adb80,
    gradient: "linear-gradient(141.587deg, rgb(254,252,232) 0%, rgb(255,255,255) 100%)",
    borderColor: "#fde68a",
    accentBg: "rgba(217,119,6,0.1)",
    image: "https://images.unsplash.com/photo-1765896387387-0538bc9f997e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGRlcmx5JTIwc2VuaW9yJTIwY2FyZSUyMGFzc2lzdGFuY2V8ZW58MXx8fHwxNzcyNjMwNjI5fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "Night Nurse",
    description: "Overnight nursing care for\npatients needing night support.",
    originalPrice: "₹9,000",
    price: "₹7,650",
    save: "Save 15%",
    iconBg: "#E0E7FF",
    iconColor: "#4338CA",
    iconPath: svgPaths.p750fa00,
    gradient: "linear-gradient(141.587deg, rgb(238,242,255) 0%, rgb(255,255,255) 100%)",
    borderColor: "#c7d2fe",
    accentBg: "rgba(67,56,202,0.1)",
    image: "https://images.unsplash.com/photo-1676286168358-9b4ce60384d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdodCUyMG51cnNlJTIwaG9zcGl0YWwlMjBwYXRpZW50JTIwYmVkfGVufDF8fHx8MTc3MjYzMDYyOXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "Diabetes Management",
    description: "Blood sugar monitoring, diet\nplanning & medication support.",
    originalPrice: "₹11,000",
    price: "₹8,800",
    save: "Save 20%",
    iconBg: "#FCE7F3",
    iconColor: "#DB2777",
    iconPath: svgPaths.p750fa00,
    gradient: "linear-gradient(141.587deg, rgb(253,242,248) 0%, rgb(255,255,255) 100%)",
    borderColor: "#fbcfe8",
    accentBg: "rgba(219,39,119,0.1)",
    image: "https://images.unsplash.com/photo-1714642596931-2293df25c4a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFiZXRlcyUyMGJsb29kJTIwc3VnYXIlMjBtb25pdG9yaW5nJTIwaGVhbHRofGVufDF8fHx8MTc3MjYzMDYzMHww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "Maternity Care",
    description: "Pre & post delivery support\nwith trained midwife assistance.",
    originalPrice: "₹18,000",
    price: "₹14,400",
    save: "Save 20%",
    iconBg: "#CCFBF1",
    iconColor: "#0F766E",
    iconPath: svgPaths.p2648d600,
    gradient: "linear-gradient(141.587deg, rgb(240,253,250) 0%, rgb(255,255,255) 100%)",
    borderColor: "#99f6e4",
    accentBg: "rgba(15,118,110,0.1)",
    image: "https://images.unsplash.com/photo-1624013599885-6e5808855824?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRlcm5pdHklMjBwcmVnbmFudCUyMG1vdGhlciUyMGNhcmV8ZW58MXx8fHwxNzcyNjMwNjMwfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "Palliative Care",
    description: "Compassionate end-of-life\ncomfort & pain management.",
    originalPrice: "₹25,000",
    price: "₹21,250",
    save: "Save 15%",
    iconBg: "#F1F5F9",
    iconColor: "#475569",
    iconPath: svgPaths.p134adb80,
    gradient: "linear-gradient(141.587deg, rgb(248,250,252) 0%, rgb(255,255,255) 100%)",
    borderColor: "#e2e8f0",
    accentBg: "rgba(71,85,105,0.1)",
    image: "https://images.unsplash.com/photo-1765896387454-3c29c0473615?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWxsaWF0aXZlJTIwY2FyZSUyMGNvbWZvcnQlMjBlbGRlcmx5fGVufDF8fHx8MTc3MjYzMDYzMXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "Child Special Needs",
    description: "Trained support for children\nwith developmental needs.",
    originalPrice: "₹16,000",
    price: "₹12,800",
    save: "Save 20%",
    iconBg: "#DBEAFE",
    iconColor: "#2563EB",
    iconPath: svgPaths.p2648d600,
    gradient: "linear-gradient(141.587deg, rgb(239,246,255) 0%, rgb(255,255,255) 100%)",
    borderColor: "#bfdbfe",
    accentBg: "rgba(37,99,235,0.1)",
    image: "https://images.unsplash.com/photo-1709127347884-a106974ef58d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGVjaWFsJTIwbmVlZHMlMjBjaGlsZCUyMHRoZXJhcHklMjBzdXBwb3J0fGVufDF8fHx8MTc3MjYzMDYzMXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "Dementia Care",
    description: "Specialized memory care with\ncognitive activity support.",
    originalPrice: "₹20,000",
    price: "₹16,000",
    save: "Save 20%",
    iconBg: "#F3E8FF",
    iconColor: "#7C3AED",
    iconPath: svgPaths.p134adb80,
    gradient: "linear-gradient(141.587deg, rgb(250,245,255) 0%, rgb(255,255,255) 100%)",
    borderColor: "#ddd6fe",
    accentBg: "rgba(124,58,237,0.1)",
    image: "https://images.unsplash.com/photo-1740908900846-271f4f021b6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW1lbnRpYSUyMGFsemhlaW1lciUyMG1lbW9yeSUyMGNhcmUlMjBlbGRlcmx5fGVufDF8fHx8MTc3MjYzMDYzMXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "Weekend Respite",
    description: "Weekend caregiver relief so\nfamily caregivers can recharge.",
    originalPrice: "₹5,000",
    price: "₹3,750",
    save: "Save 25%",
    iconBg: "#DCFCE7",
    iconColor: "#16A34A",
    iconPath: svgPaths.p750fa00,
    gradient: "linear-gradient(141.587deg, rgb(240,253,244) 0%, rgb(255,255,255) 100%)",
    borderColor: "#bbf7d0",
    accentBg: "rgba(22,163,74,0.1)",
    image: "https://images.unsplash.com/photo-1558131717-1e68a57faf20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWVrZW5kJTIwY2FyZWdpdmVyJTIwcmVzcGl0ZSUyMHJlbGF4aW5nJTIwZmFtaWx5fGVufDF8fHx8MTc3MjYzMDYzMnww&ixlib=rb-4.1.0&q=80&w=1080",
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
  compact,
}: {
  pkg: (typeof packages)[0];
  onTap: () => void;
  compact?: boolean;
}) {
  return (
    <div
      onClick={onTap}
      className={`relative rounded-[20px] overflow-hidden hover:shadow-lg transition-shadow cursor-pointer shrink-0 active:scale-[0.98] flex flex-col ${
        compact ? "w-full" : "w-[220px] md:w-auto"
      }`}
      style={{
        border: `1px solid ${pkg.borderColor}`,
        boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05)",
      }}
    >
      {/* Banner image */}
      <div className="relative w-full h-[100px] overflow-hidden">
        <ImageWithFallback
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        {/* Save badge */}
        <span className="absolute top-2.5 right-2.5 bg-[#dcfce7] text-[#15803d] font-['Lexend',sans-serif] font-bold text-[10px] px-2 py-0.5 rounded-full leading-[14px]">
          {pkg.save}
        </span>
        {/* Icon circle */}
        <div
          className="absolute bottom-2.5 left-3 size-8 rounded-full flex items-center justify-center shadow-sm"
          style={{ backgroundColor: pkg.iconBg }}
        >
          <svg width="14" height="14" viewBox="0 0 40 40" fill="none">
            <path d={pkg.iconPath} fill={pkg.iconColor} />
          </svg>
        </div>
      </div>

      {/* Content area */}
      <div
        className="flex flex-col flex-1 px-3.5 pt-2.5 pb-3"
        style={{ backgroundImage: pkg.gradient }}
      >
        {/* Title */}
        <h4 className="font-['Lexend',sans-serif] font-bold text-[14px] text-[#0f172a] leading-[20px]">
          {pkg.title}
        </h4>

        {/* Description */}
        <p className="font-['Inter',sans-serif] font-normal text-[11px] text-[#64748b] leading-[15px] mt-1 whitespace-pre-line line-clamp-2">
          {pkg.description}
        </p>

        {/* Price row */}
        <div className="flex items-center justify-between mt-auto pt-2.5 border-t border-[#f1f5f9]">
          <div className="flex flex-col gap-[0.5px]">
            <span className="font-['Lexend',sans-serif] font-normal text-[11px] text-[#94a3b8] line-through leading-[14px]">
              {pkg.originalPrice}
            </span>
            <span className="font-['Lexend',sans-serif] font-bold text-[13px] text-[#1975d2] leading-[18px]">
              {pkg.price}
            </span>
          </div>
          <button className="bg-[#1975d2] rounded-full p-[5px] flex items-center justify-center hover:bg-[#1565b8] transition-colors cursor-pointer">
            <svg
              width="12"
              height="12"
              viewBox="0 0 13.3333 13.3333"
              fill="none"
            >
              <path d={svgPaths.p32510800} fill="white" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export function CarePackages() {
  const navigate = useNavigate();
  const { setBookedProvider } = useBooking();
  const [selectedPkg, setSelectedPkg] = useState<PackageDetail | null>(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

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

  // "See All" full-screen overlay
  if (showAll) {
    return (
      <>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 bg-white overflow-y-auto"
          style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-4 py-3 flex items-center gap-3">
            <button
              onClick={() => setShowAll(false)}
              className="size-10 flex items-center justify-center rounded-full hover:bg-gray-100 active:scale-95 transition-all cursor-pointer"
            >
              <ChevronLeft size={22} className="text-gray-700" />
            </button>
            <div>
              <h2 className="font-['Lexend',sans-serif] font-bold text-[18px] text-[#0f172a]">
                Care Packages
              </h2>
              <p className="font-['Inter',sans-serif] text-[12px] text-[#94a3b8]">
                {packages.length} packages available
              </p>
            </div>
          </div>

          {/* Grid of all packages */}
          <div className="px-4 py-4 pb-24 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 max-w-[1180px] mx-auto">
            {packages.map((pkg) => (
              <PackageCard
                key={pkg.title}
                pkg={pkg}
                onTap={() => handleCardTap(pkg.title)}
                compact
              />
            ))}
          </div>
        </motion.div>

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
      </>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between px-1 mb-3">
        <h3 className="font-['Lexend',sans-serif] font-bold text-[14px] text-[#64748b] tracking-[0.7px] uppercase leading-[20px]">
          Care Packages
        </h3>
        <button
          onClick={() => setShowAll(true)}
          className="font-['Lexend',sans-serif] font-medium text-[14px] text-[#1975d2] hover:underline cursor-pointer leading-[20px]"
        >
          See All
        </button>
      </div>

      {/* Mobile: horizontal scroll — show first 6 */}
      <div
        className="flex md:hidden gap-4 overflow-x-auto pb-2 -mx-4 px-4"
        style={
          {
            scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch",
          } as React.CSSProperties
        }
      >
        {packages.slice(0, 6).map((pkg) => (
          <PackageCard
            key={pkg.title}
            pkg={pkg}
            onTap={() => handleCardTap(pkg.title)}
          />
        ))}
      </div>

      {/* Desktop: grid — show first 4 */}
      <div className="hidden md:grid grid-cols-4 gap-5">
        {packages.slice(0, 4).map((pkg) => (
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