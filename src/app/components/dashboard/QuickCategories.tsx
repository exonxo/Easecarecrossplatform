import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronRight, ArrowLeft, Clock, IndianRupee, CheckCircle2 } from "lucide-react";
import svgPaths from "../../../imports/svg-y2c5f3iwq2";
import { ServiceBookingPopup, type ServiceItem as BookableService } from "./ServiceBookingPopup";
import { useBooking } from "../../context/BookingContext";
import { PrimaryButton } from "../shared/PrimaryButton";

// ─── Service data per category ───
interface ServiceItem {
  name: string;
  description: string;
  price: string;
  duration: string;
  included: string[];
}

const SERVICE_DATA: Record<string, ServiceItem[]> = {
  "Elder Care": [
    { name: "Personal Care Assistant", description: "Daily living assistance including bathing, grooming & mobility support", price: "Starting from ₹599/day", duration: "4-12 hrs/day", included: ["Bathing & grooming", "Mobility assistance", "Meal support", "Medication reminders"] },
    { name: "Medication Management", description: "Professional tracking and administration of medicines on schedule", price: "Starting from ₹499/day", duration: "2-4 hrs/day", included: ["Medicine schedule tracking", "Dose administration", "Doctor follow-ups", "Health reports"] },
    { name: "Companionship", description: "Friendly companion for conversation, activities & emotional support", price: "Starting from ₹449/day", duration: "4-8 hrs/day", included: ["Conversation & company", "Light activities", "Walk accompaniment", "Reading & games"] },
    { name: "Physical Therapy Support", description: "In-home physiotherapy exercises and rehabilitation support", price: "Starting from ₹799/day", duration: "1-2 hrs/session", included: ["Exercise routines", "Mobility training", "Progress tracking", "Weekly reports"] },
    { name: "Meal Preparation", description: "Nutritious home-cooked meals tailored to dietary requirements", price: "Starting from ₹399/day", duration: "2-3 hrs/day", included: ["Diet-specific meals", "Fresh cooking", "Kitchen cleanup", "Grocery management"] },
    { name: "Medical Escort", description: "Accompaniment for hospital visits, check-ups & medical appointments", price: "Starting from ₹699/visit", duration: "Per visit", included: ["Hospital accompaniment", "Report collection", "Pharmacy runs", "Transport coordination"] },
  ],
  Cleaning: [
    { name: "Deep Home Cleaning", description: "Thorough top-to-bottom cleaning of your entire home", price: "Starting from ₹1,499", duration: "4-6 hrs", included: ["All rooms", "Windows & fans", "Behind furniture", "Balcony cleaning"] },
    { name: "Regular Housekeeping", description: "Daily or weekly cleaning to maintain a tidy home", price: "Starting from ₹499/visit", duration: "2-3 hrs", included: ["Sweeping & mopping", "Dusting", "Dishwashing", "Bed making"] },
    { name: "Kitchen Cleaning", description: "Deep clean of kitchen including appliances and chimney", price: "Starting from ₹799", duration: "2-3 hrs", included: ["Appliance cleaning", "Chimney service", "Counter sanitization", "Cabinet wipe-down"] },
    { name: "Bathroom Sanitization", description: "Complete sanitization and descaling of bathrooms", price: "Starting from ₹599/bathroom", duration: "1-2 hrs", included: ["Tile scrubbing", "Fixture polishing", "Drain cleaning", "Sanitization"] },
    { name: "Post-Construction Cleanup", description: "Thorough removal of construction debris and dust", price: "Starting from ₹2,499", duration: "6-8 hrs", included: ["Debris removal", "Dust cleaning", "Floor polishing", "Paint spot removal"] },
    { name: "Sofa & Carpet Cleaning", description: "Professional shampooing and deep cleaning of upholstery", price: "Starting from ₹999", duration: "2-4 hrs", included: ["Sofa shampooing", "Carpet washing", "Stain removal", "Deodorizing"] },
  ],
  "Baby Care": [
    { name: "Babysitting", description: "Trusted and trained babysitters for infants and toddlers", price: "Starting from ₹499/hr", duration: "Flexible", included: ["Feeding support", "Diaper changes", "Play & engage", "Nap supervision"] },
    { name: "After School Care", description: "Supervised activities and care after school hours", price: "Starting from ₹599/session", duration: "3-5 hrs", included: ["Pickup from school", "Snack time", "Homework help", "Creative activities"] },
    { name: "Homework Help", description: "One-on-one tutoring and homework assistance", price: "Starting from ₹399/hr", duration: "1-2 hrs", included: ["Subject tutoring", "Assignment help", "Reading practice", "Exam prep"] },
    { name: "Activity-Based Learning", description: "Fun educational activities to boost creativity and skills", price: "Starting from ₹699/session", duration: "2-3 hrs", included: ["Art & craft", "Music exposure", "Science experiments", "Storytelling"] },
    { name: "Weekend Daycare", description: "Full-day supervised care on weekends", price: "Starting from ₹999/day", duration: "8-10 hrs", included: ["Meals included", "Outdoor play", "Group activities", "Nap time"] },
    { name: "Night Nanny", description: "Overnight care for newborns and infants", price: "Starting from ₹1,299/night", duration: "8-10 hrs", included: ["Night feeding", "Diaper changes", "Sleep training", "Parent rest support"] },
  ],
};

// Fallback for categories without specific data
const DEFAULT_SERVICES: ServiceItem[] = [
  { name: "Basic Service", description: "Standard assistance tailored to your needs", price: "Starting from ₹499", duration: "Flexible", included: ["Customized support", "Verified professionals", "Flexible scheduling"] },
  { name: "Premium Package", description: "Comprehensive care with dedicated professionals", price: "Starting from ₹999", duration: "Full day", included: ["Dedicated professional", "Priority booking", "Progress reports", "24/7 support"] },
];

// ─── Category definitions ───
interface Category {
  label: string;
  icon: string;
  viewBox: string;
  iconW: number;
  iconH: number;
  color: string;
  bg: string;
  border: string;
  isViewAll?: boolean;
}

const categories: Category[] = [
  { label: "Elder Care", icon: svgPaths.p3f3a9b80, viewBox: "0 0 28 27.3333", iconW: 28, iconH: 27.333, color: "#2563EB", bg: "#eff6ff", border: "rgba(219,234,254,0.5)" },
  { label: "Cleaning", icon: svgPaths.p3eb40d60, viewBox: "0 0 24 29.3333", iconW: 24, iconH: 29.333, color: "#059669", bg: "#ecfdf5", border: "rgba(209,250,229,0.5)" },
  { label: "Nursing", icon: svgPaths.p23d8d00, viewBox: "0 0 26.6667 26.6667", iconW: 26.667, iconH: 26.667, color: "#E11D48", bg: "#fff1f2", border: "rgba(255,228,230,0.5)" },
  { label: "Cooking", icon: svgPaths.p3dfaed00, viewBox: "0 0 20 26.6667", iconW: 20, iconH: 26.667, color: "#EA580C", bg: "#fff7ed", border: "rgba(255,237,213,0.5)" },
  { label: "Baby Care", icon: svgPaths.p282fd600, viewBox: "0 0 24 24", iconW: 24, iconH: 24, color: "#9333EA", bg: "#faf5ff", border: "rgba(243,232,255,0.5)" },
  { label: "Physio", icon: svgPaths.p2d11f400, viewBox: "0 0 26.4 26.4", iconW: 26.4, iconH: 26.4, color: "#4F46E5", bg: "#eef2ff", border: "rgba(224,231,255,0.5)" },
  { label: "Security", icon: svgPaths.p286fe780, viewBox: "0 0 21.3333 26.6667", iconW: 21.333, iconH: 26.667, color: "#475569", bg: "#f1f5f9", border: "rgba(226,232,240,0.5)" },
  { label: "Pet Care", icon: svgPaths.p15b38ee0, viewBox: "0 0 26.6667 25.3333", iconW: 26.667, iconH: 25.333, color: "#D97706", bg: "#fffbeb", border: "rgba(254,243,199,0.5)" },
  { label: "View All", icon: svgPaths.p16732380, viewBox: "0 0 24 24", iconW: 24, iconH: 24, color: "#1975D2", bg: "#f8fafc", border: "#e2e8f0", isViewAll: true },
];

// ─── Service Detail View (Mobile full-screen / Desktop inner panel) ───
function ServiceDetailView({
  service,
  category,
  onBack,
  onBook,
}: {
  service: ServiceItem;
  category: Category;
  onBack: () => void;
  onBook: () => void;
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-5 pb-4 border-b border-[#f1f5f9]">
        <button
          onClick={onBack}
          className="size-9 rounded-full bg-[#f1f5f9] flex items-center justify-center cursor-pointer hover:bg-[#e2e8f0] transition-colors"
        >
          <ArrowLeft size={16} className="text-[#334155]" />
        </button>
        <h3 className="font-['Lexend',sans-serif] font-bold text-[18px] text-[#0f172a] truncate">
          {service.name}
        </h3>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-5">
        {/* Category badge */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
          style={{ backgroundColor: category.bg }}
        >
          <div style={{ width: 14, height: 14 }}>
            <svg className="block size-full" fill="none" viewBox={category.viewBox}>
              <path d={category.icon} fill={category.color} />
            </svg>
          </div>
          <span className="font-['Inter',sans-serif] font-semibold text-[11px]" style={{ color: category.color }}>
            {category.label}
          </span>
        </div>

        {/* Description */}
        <p className="font-['Inter',sans-serif] text-[15px] text-[#475569] leading-[24px] mb-6">
          {service.description}
        </p>

        {/* Price & Duration */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 bg-[#f8fafc] rounded-[14px] p-4 border border-[#f1f5f9]">
            <div className="flex items-center gap-2 mb-1">
              <IndianRupee size={14} className="text-[#1975D2]" />
              <span className="font-['Inter',sans-serif] text-[11px] text-[#94a3b8] font-medium uppercase tracking-wide">Pricing</span>
            </div>
            <p className="font-['Lexend',sans-serif] font-bold text-[15px] text-[#0f172a]">{service.price}</p>
          </div>
          <div className="flex-1 bg-[#f8fafc] rounded-[14px] p-4 border border-[#f1f5f9]">
            <div className="flex items-center gap-2 mb-1">
              <Clock size={14} className="text-[#1975D2]" />
              <span className="font-['Inter',sans-serif] text-[11px] text-[#94a3b8] font-medium uppercase tracking-wide">Duration</span>
            </div>
            <p className="font-['Lexend',sans-serif] font-bold text-[15px] text-[#0f172a]">{service.duration}</p>
          </div>
        </div>

        {/* What's included */}
        <h4 className="font-['Lexend',sans-serif] font-bold text-[14px] text-[#0f172a] mb-3">What's Included</h4>
        <div className="flex flex-col gap-2.5">
          {service.included.map((item) => (
            <div key={item} className="flex items-center gap-2.5">
              <CheckCircle2 size={16} className="text-[#22c55e] shrink-0" />
              <span className="font-['Inter',sans-serif] text-[14px] text-[#334155]">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Book Now */}
      <div className="shrink-0 px-5 pb-6 pt-4 border-t border-[#f1f5f9] bg-white">
        <PrimaryButton onClick={onBook}>
          Book Now
        </PrimaryButton>
      </div>
    </div>
  );
}

// ─── Desktop Modal ───
function DesktopServiceModal({
  category,
  onClose,
  onBookService,
}: {
  category: Category;
  onClose: () => void;
  onBookService: (service: ServiceItem, cat: Category) => void;
}) {
  const services = SERVICE_DATA[category.label] || DEFAULT_SERVICES;
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Escape to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedService) setSelectedService(null);
        else onClose();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [selectedService, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={() => {
          if (selectedService) setSelectedService(null);
          else onClose();
        }}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        transition={{ type: "spring", damping: 28, stiffness: 350 }}
        className="relative bg-white rounded-[24px] w-full max-w-[680px] max-h-[85vh] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border border-[#f1f5f9] flex flex-col"
      >
        <AnimatePresence mode="wait">
          {selectedService ? (
            <motion.div
              key="detail"
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 80, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col h-full max-h-[85vh]"
            >
              <ServiceDetailView
                service={selectedService}
                category={category}
                onBack={() => setSelectedService(null)}
                onBook={() => onBookService(selectedService, category)}
              />
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ x: -80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -80, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col h-full max-h-[85vh]"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-[#f1f5f9] shrink-0">
                <div className="flex items-center gap-3">
                  <div
                    className="size-10 rounded-[12px] flex items-center justify-center"
                    style={{ backgroundColor: category.bg }}
                  >
                    <svg width={20} height={20} fill="none" viewBox={category.viewBox}>
                      <path d={category.icon} fill={category.color} />
                    </svg>
                  </div>
                  <div>
                    <h2 className="font-['Lexend',sans-serif] font-bold text-[20px] text-[#0f172a]">
                      {category.label} Services
                    </h2>
                    <p className="font-['Inter',sans-serif] text-[13px] text-[#94a3b8]">
                      {services.length} services available
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="size-9 rounded-full bg-[#f1f5f9] flex items-center justify-center cursor-pointer hover:bg-[#e2e8f0] transition-colors"
                >
                  <X size={16} className="text-[#64748b]" />
                </button>
              </div>

              {/* Grid */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {services.map((service, idx) => (
                    <motion.button
                      key={service.name}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => setSelectedService(service)}
                      className="bg-white rounded-[18px] border border-[#f1f5f9] p-5 text-left cursor-pointer hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.08)] hover:border-[#e2e8f0] active:scale-[0.98] transition-all group flex flex-col gap-3"
                    >
                      {/* Icon placeholder */}
                      <div
                        className="size-10 rounded-[10px] flex items-center justify-center"
                        style={{ backgroundColor: category.bg }}
                      >
                        <svg width={18} height={18} fill="none" viewBox={category.viewBox}>
                          <path d={category.icon} fill={category.color} />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-['Lexend',sans-serif] font-bold text-[14px] text-[#0f172a] leading-[20px] mb-1 group-hover:text-[#1975D2] transition-colors">
                          {service.name}
                        </h4>
                        <p className="font-['Inter',sans-serif] text-[12px] text-[#94a3b8] leading-[18px] line-clamp-2">
                          {service.description}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-['Lexend',sans-serif] font-semibold text-[12px] text-[#1975D2]">
                          {service.price}
                        </span>
                        <span className="font-['Inter',sans-serif] text-[11px] text-[#1975D2] font-medium group-hover:translate-x-0.5 transition-transform">
                          View Details →
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

// ─── Mobile Bottom Sheet ───
function MobileServiceSheet({
  category,
  onClose,
  onBookService,
}: {
  category: Category;
  onClose: () => void;
  onBookService: (service: ServiceItem, cat: Category) => void;
}) {
  const services = SERVICE_DATA[category.label] || DEFAULT_SERVICES;
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col justify-end"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/40"
        onClick={() => {
          if (selectedService) setSelectedService(null);
          else onClose();
        }}
      />

      <AnimatePresence mode="wait">
        {selectedService ? (
          /* Full-screen detail */
          <motion.div
            key="detail"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="relative bg-white h-[95vh] rounded-t-[24px] flex flex-col"
          >
            <ServiceDetailView
              service={selectedService}
              category={category}
              onBack={() => setSelectedService(null)}
              onBook={() => onBookService(selectedService, category)}
            />
          </motion.div>
        ) : (
          /* Service list sheet */
          <motion.div
            key="list"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="relative bg-white rounded-t-[24px] max-h-[85vh] flex flex-col"
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-[36px] h-[4px] bg-[#e2e8f0] rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center gap-3 px-5 pt-2 pb-4 border-b border-[#f1f5f9]">
              <div
                className="size-10 rounded-[12px] flex items-center justify-center"
                style={{ backgroundColor: category.bg }}
              >
                <svg width={20} height={20} fill="none" viewBox={category.viewBox}>
                  <path d={category.icon} fill={category.color} />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="font-['Lexend',sans-serif] font-bold text-[18px] text-[#0f172a]">
                  {category.label} Services
                </h2>
                <p className="font-['Inter',sans-serif] text-[12px] text-[#94a3b8]">
                  {services.length} services available
                </p>
              </div>
              <button
                onClick={onClose}
                className="size-8 rounded-full bg-[#f1f5f9] flex items-center justify-center cursor-pointer"
              >
                <X size={14} className="text-[#64748b]" />
              </button>
            </div>

            {/* Service list */}
            <div className="flex-1 overflow-y-auto">
              {services.map((service, idx) => (
                <motion.button
                  key={service.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  onClick={() => setSelectedService(service)}
                  className="w-full flex items-center gap-4 px-5 py-4 border-b border-[#f8fafc] cursor-pointer hover:bg-[#f8fafc] active:bg-[#f1f5f9] transition-colors text-left"
                >
                  {/* Icon */}
                  <div
                    className="size-11 rounded-[12px] flex items-center justify-center shrink-0"
                    style={{ backgroundColor: category.bg }}
                  >
                    <svg width={18} height={18} fill="none" viewBox={category.viewBox}>
                      <path d={category.icon} fill={category.color} />
                    </svg>
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-['Lexend',sans-serif] font-bold text-[14px] text-[#0f172a] leading-[20px] truncate">
                      {service.name}
                    </h4>
                    <p className="font-['Inter',sans-serif] text-[12px] text-[#94a3b8] leading-[18px] truncate mt-0.5">
                      {service.description}
                    </p>
                    <p className="font-['Lexend',sans-serif] font-semibold text-[12px] text-[#1975D2] mt-1">
                      {service.price}
                    </p>
                  </div>
                  <ChevronRight size={16} className="text-[#cbd5e1] shrink-0" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── System-assigned providers (random pool for service bookings) ───
const SYSTEM_PROVIDERS = [
  { name: "Anjali Sharma", photo: "https://images.unsplash.com/photo-1710425804836-a1de39056b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", rating: 4.9, agency: "CareFirst Agency" },
  { name: "Priya Dasgupta", photo: "https://images.unsplash.com/photo-1590905707155-17c680dd7867?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", rating: 4.8, agency: "Bright Cleaners Agency" },
  { name: "Rekha Nair", photo: "https://images.unsplash.com/photo-1667382137969-a11fd256717d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", rating: 4.7, agency: "HomeCare Plus" },
];

// ─── Main QuickCategories Component ───
export function QuickCategories() {
  const navigate = useNavigate();
  const { setBookedProvider } = useBooking();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  // Service booking popup state
  const [bookingService, setBookingService] = useState<ServiceItem | null>(null);
  const [bookingCategory, setBookingCategory] = useState<Category | null>(null);
  const [bookingPopupOpen, setBookingPopupOpen] = useState(false);

  // Track desktop breakpoint
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(min-width: 768px)").matches : false
  );
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const handleCategoryClick = (cat: Category) => {
    if (cat.isViewAll) {
      navigate("/services");
      return;
    }
    setSelectedCategory(cat);
  };

  // Called from service detail "Book Now" — receives the service
  const handleBookService = (service: ServiceItem, cat: Category) => {
    setSelectedCategory(null); // Close the category list modal
    setBookingService(service as unknown as ServiceItem);
    setBookingCategory(cat);
    setBookingPopupOpen(true);
  };

  // Called after payment is complete
  const handleBookingComplete = () => {
    if (!bookingService || !bookingCategory) return;
    const provider = SYSTEM_PROVIDERS[Math.floor(Math.random() * SYSTEM_PROVIDERS.length)];
    setBookedProvider({
      providerName: provider.name,
      providerPhoto: provider.photo,
      service: bookingService.name,
      rating: provider.rating,
      agency: provider.agency,
      timeSlot: "Scheduled",
      bidAmount: bookingService.price,
      isPackageBooking: true,
      packageStage: "confirming",
      packageTitle: bookingService.name,
    });
    setBookingPopupOpen(false);
    setBookingService(null);
    setBookingCategory(null);
    navigate("/");
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* Heading */}
        <div>
          <h2 className="font-['Lexend',sans-serif] font-bold text-[18px] md:text-[22px] text-[#0f172a] leading-[28px]">
            What do you need?
          </h2>
          <p className="font-['Inter',sans-serif] text-[13px] md:text-[14px] text-[#94a3b8] mt-1 hidden md:block">
            Choose a category to explore available services
          </p>
        </div>

        {/* Responsive Grid: 3 cols mobile → 3 cols tablet → 4 cols desktop */}
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 md:gap-4">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => handleCategoryClick(cat)}
              className="relative flex flex-col items-center justify-center gap-2.5 rounded-[24px] py-[26px] md:py-[30px] px-2 cursor-pointer transition-all duration-150 active:scale-[0.96] hover:shadow-md"
              style={{ backgroundColor: cat.bg }}
            >
              {/* Subtle border overlay */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-[24px] pointer-events-none border"
                style={{ borderColor: cat.border }}
              />

              {/* Icon */}
              <div className="shrink-0" style={{ width: cat.iconW, height: cat.iconH }}>
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox={cat.viewBox}
                >
                  <path d={cat.icon} fill={cat.color} />
                </svg>
              </div>

              {/* Label */}
              <span
                className="font-['Lexend',sans-serif] font-bold text-[12px] md:text-[13px] leading-[16px] text-center"
                style={{ color: cat.isViewAll ? "#1975d2" : "#1e293b" }}
              >
                {cat.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Modal / Bottom Sheet */}
      <AnimatePresence>
        {selectedCategory && (
          isDesktop ? (
            <DesktopServiceModal
              key="desktop-modal"
              category={selectedCategory}
              onClose={() => setSelectedCategory(null)}
              onBookService={handleBookService}
            />
          ) : (
            <MobileServiceSheet
              key="mobile-sheet"
              category={selectedCategory}
              onClose={() => setSelectedCategory(null)}
              onBookService={handleBookService}
            />
          )
        )}
      </AnimatePresence>

      {/* Service Booking Popup (date range + checkout + payment) */}
      <ServiceBookingPopup
        service={bookingService as BookableService | null}
        category={bookingCategory ? {
          label: bookingCategory.label,
          color: bookingCategory.color,
          bg: bookingCategory.bg,
          icon: bookingCategory.icon,
          viewBox: bookingCategory.viewBox,
        } : null}
        isOpen={bookingPopupOpen}
        onClose={() => {
          setBookingPopupOpen(false);
          setBookingService(null);
          setBookingCategory(null);
        }}
        onComplete={handleBookingComplete}
      />
    </>
  );
}