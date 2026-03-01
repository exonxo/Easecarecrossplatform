import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router";
import { MessageSquare, Radio, X, Phone, ChevronUp, MapPin, Clock, Shield, CheckCircle2, Loader2, Package } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import svgPaths from "../../../imports/svg-zdwmi91rdf";
import { useBooking } from "../../context/BookingContext";
import { motion, AnimatePresence, useMotionValue, useTransform } from "motion/react";
import L from "leaflet";

// Custom pin icon for Leaflet
const locationIcon = L.divIcon({
  className: "",
  html: `<div style="display:flex;align-items:center;justify-content:center;width:36px;height:36px;background:#1975D2;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid white;box-shadow:0 4px 12px rgba(0,0,0,0.3);">
    <div style="width:10px;height:10px;background:white;border-radius:50%;transform:rotate(45deg);"></div>
  </div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36],
});

// Salt Lake Sector V, Kolkata coords
const SERVICE_LOCATION: [number, number] = [22.5726, 88.4379];

// ─── Plain Leaflet Map Component ───
function LeafletMap({ isVisible }: { isVisible: boolean }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!isVisible || !mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: SERVICE_LOCATION,
      zoom: 15,
      scrollWheelZoom: false,
      zoomControl: false,
      attributionControl: false,
      dragging: true,
    });

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    ).addTo(map);

    L.marker(SERVICE_LOCATION, { icon: locationIcon })
      .addTo(map)
      .bindPopup(
        '<span style="font-family:Lexend,sans-serif;font-size:13px">Service Location</span>'
      );

    mapInstanceRef.current = map;

    // Invalidate size after a short delay to ensure container is rendered
    setTimeout(() => map.invalidateSize(), 200);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [isVisible]);

  return (
    <div
      ref={mapRef}
      className="h-full w-full"
      style={{ background: "#1a1a1a" }}
    />
  );
}

export function OngoingServiceCard() {
  const navigate = useNavigate();
  const { bookedProvider, setBookedProvider, completeGig } = useBooking();
  const [isExpanded, setIsExpanded] = useState(false);
  const [elapsedMinutes, setElapsedMinutes] = useState(12);

  // Slide-to-finish state
  const sliderRef = useRef<HTMLDivElement>(null);
  const [sliderX, setSliderX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const sliderTrackWidth = useRef(0);

  const THUMB_SIZE = 52;
  const COMPLETE_THRESHOLD = 0.85;

  const handleSliderStart = useCallback(() => {
    if (isCompleting || !sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    sliderTrackWidth.current = rect.width - THUMB_SIZE;
    setIsDragging(true);
  }, [isCompleting]);

  const handleSliderMove = useCallback((clientX: number) => {
    if (!isDragging || !sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const maxX = rect.width - THUMB_SIZE;
    const newX = Math.max(0, Math.min(clientX - rect.left - THUMB_SIZE / 2, maxX));
    setSliderX(newX);
  }, [isDragging]);

  const handleSliderEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    const maxX = sliderTrackWidth.current;
    const progress = maxX > 0 ? sliderX / maxX : 0;

    if (progress >= COMPLETE_THRESHOLD) {
      setSliderX(maxX);
      setIsCompleting(true);
      setTimeout(() => {
        completeGig();
        setIsExpanded(false);
        setIsCompleting(false);
        setSliderX(0);
        navigate("/bookings");
      }, 1200);
    } else {
      setSliderX(0);
    }
  }, [isDragging, sliderX, completeGig, navigate]);

  // Mouse events for desktop slider
  useEffect(() => {
    if (!isDragging) return;
    const onMouseMove = (e: MouseEvent) => handleSliderMove(e.clientX);
    const onMouseUp = () => handleSliderEnd();
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging, handleSliderMove, handleSliderEnd]);

  const sliderProgress = sliderTrackWidth.current > 0 ? sliderX / sliderTrackWidth.current : 0;

  // Drag to dismiss
  const dragY = useMotionValue(0);
  const backdropOpacity = useTransform(dragY, (v) => {
    const val = 1 - Math.min(Math.max(v, 0), 300) / 300;
    return isNaN(val) ? 1 : val;
  });
  const sheetScale = useTransform(dragY, (v) => {
    const val = 1 - (Math.min(Math.max(v, 0), 300) / 300) * 0.08;
    return isNaN(val) ? 1 : val;
  });

  // Reset drag position when expanding/collapsing
  useEffect(() => {
    dragY.set(0);
  }, [isExpanded, dragY]);

  // Simulate elapsed time ticking
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedMinutes((prev) => prev + 1);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // ─── Package booking: auto-progress through assignment stages ───
  useEffect(() => {
    if (!bookedProvider?.isPackageBooking) return;
    const stage = bookedProvider.packageStage;
    if (!stage || stage === "ongoing") return;

    const delays: Record<string, { next: "assigning" | "assigned" | "ongoing"; ms: number }> = {
      confirming: { next: "assigning", ms: 4000 },
      assigning: { next: "assigned", ms: 6000 },
      assigned: { next: "ongoing", ms: 3000 },
    };
    const transition = delays[stage];
    if (!transition) return;

    const timer = setTimeout(() => {
      setBookedProvider({ ...bookedProvider, packageStage: transition.next });
    }, transition.ms);
    return () => clearTimeout(timer);
  }, [bookedProvider?.packageStage, bookedProvider?.isPackageBooking]);

  if (!bookedProvider) return null;

  const isPackage = bookedProvider.isPackageBooking === true;
  const pkgStage = bookedProvider.packageStage || "ongoing";
  const isAssigning = isPackage && (pkgStage === "confirming" || pkgStage === "assigning" || pkgStage === "assigned");

  // Snackbar label & color for package stages
  const snackbarLabel = isPackage
    ? pkgStage === "confirming"
      ? "Confirming your request..."
      : pkgStage === "assigning"
        ? "Agency is assigning a worker..."
        : pkgStage === "assigned"
          ? "Worker assigned!"
          : "Service Ongoing"
    : "Service Ongoing";

  const snackbarPillColor = isPackage && pkgStage !== "ongoing"
    ? pkgStage === "assigned" ? "#10b981" : "#f59e0b"
    : "#1975D2";

  const snackbarSubtext = isPackage && pkgStage !== "ongoing"
    ? `${bookedProvider.packageTitle || bookedProvider.service}`
    : `${bookedProvider.providerName} • ${bookedProvider.service}`;

  const totalDuration = 60;
  const progress = Math.min(elapsedMinutes / totalDuration, 1);
  const remainingMins = Math.max(totalDuration - elapsedMinutes, 0);

  // Status steps
  const steps = [
    { label: "Booking Confirmed", done: true, time: "2 min ago" },
    { label: "Caregiver En Route", done: true, time: "Just now" },
    { label: "Service In Progress", done: elapsedMinutes >= 10, time: elapsedMinutes >= 10 ? "Ongoing" : "Pending" },
    { label: "Service Complete", done: false, time: `~${remainingMins} min` },
  ];

  return (
    <>
      {/* ──── MOBILE SNACKBAR (minimized) ──── */}
      <AnimatePresence>
        {!isExpanded && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="md:hidden fixed bottom-[88px] left-4 right-4 z-40"
          >
            <button
              onClick={() => setIsExpanded(true)}
              className="w-full bg-[#1a1a1a] rounded-[18px] px-4 py-3 flex items-center gap-3 shadow-[0_8px_32px_rgba(0,0,0,0.25)] border border-[#2d2d2d] cursor-pointer active:scale-[0.98] transition-transform"
            >
              {/* Provider photo */}
              <div className="size-[40px] rounded-[12px] overflow-hidden shrink-0 border border-white/20">
                {isAssigning ? (
                  <div className="size-full flex items-center justify-center bg-[#f59e0b]/20">
                    <Package size={18} className="text-[#f59e0b]" />
                  </div>
                ) : (
                  <ImageWithFallback
                    src={bookedProvider.providerPhoto}
                    alt={bookedProvider.providerName}
                    className="size-full object-cover"
                  />
                )}
              </div>

              {/* Status info */}
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center gap-1.5">
                  {isAssigning && pkgStage !== "assigned" ? (
                    <Loader2 size={10} className="text-[#f59e0b] animate-spin shrink-0" />
                  ) : (
                    <div className={`rounded-full size-[6px] animate-pulse shrink-0 ${pkgStage === "assigned" ? "bg-[#10b981]" : "bg-[#10b981]"}`} />
                  )}
                  <span className="font-['Lexend',sans-serif] font-semibold text-[13px] text-white truncate">
                    {snackbarLabel}
                  </span>
                </div>
                <p className="font-['Inter',sans-serif] text-[11px] text-white/50 truncate mt-0.5">
                  {snackbarSubtext}
                </p>
              </div>

              {/* Right pill */}
              {isAssigning ? (
                <div className="rounded-[10px] px-3 py-1.5 shrink-0" style={{ backgroundColor: snackbarPillColor }}>
                  <span className="font-['Lexend',sans-serif] font-bold text-[11px] text-white whitespace-nowrap">
                    {pkgStage === "confirming" ? "Please wait" : pkgStage === "assigning" ? "Assigning..." : "Ready!"}
                  </span>
                </div>
              ) : (
                <div className="bg-[#1975D2] rounded-[10px] px-3 py-1.5 shrink-0">
                  <span className="font-['Lexend',sans-serif] font-bold text-[13px] text-white whitespace-nowrap">
                    {remainingMins} min
                  </span>
                </div>
              )}

              <ChevronUp size={16} className="text-white/40 shrink-0" />
            </button>

            {/* Progress bar */}
            <div className="mx-4 mt-[-1px]">
              <div className="bg-[#2d2d2d] rounded-b-[8px] h-[3px] overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#1975D2] to-[#10b981] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress * 100}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ──── DESKTOP SIDEBAR SNACKBAR ──── */}
      <AnimatePresence>
        {!isExpanded && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="hidden md:block fixed bottom-4 left-3 w-[236px] z-40"
          >
            <button
              onClick={() => setIsExpanded(true)}
              className="w-full bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-[16px] p-3.5 flex flex-col gap-3 shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-[#2d2d2d] cursor-pointer hover:border-[#3d3d3d] active:scale-[0.98] transition-all group"
            >
              {/* Top row: photo + info */}
              <div className="flex items-center gap-3 w-full">
                <div className="size-[38px] rounded-[10px] overflow-hidden shrink-0 border border-white/15 shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
                  {isAssigning ? (
                    <div className="size-full flex items-center justify-center bg-[#f59e0b]/20">
                      <Package size={16} className="text-[#f59e0b]" />
                    </div>
                  ) : (
                    <ImageWithFallback
                      src={bookedProvider.providerPhoto}
                      alt={bookedProvider.providerName}
                      className="size-full object-cover"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center gap-1.5">
                    {isAssigning && pkgStage !== "assigned" ? (
                      <Loader2 size={8} className="text-[#f59e0b] animate-spin shrink-0" />
                    ) : (
                      <div className="bg-[#10b981] rounded-full size-[6px] animate-pulse shrink-0" />
                    )}
                    <span className="font-['Lexend',sans-serif] font-semibold text-[12px] text-white truncate">
                      {isAssigning ? snackbarLabel : "Live Service"}
                    </span>
                  </div>
                  <p className="font-['Inter',sans-serif] text-[10px] text-white/45 truncate mt-0.5">
                    {bookedProvider.providerName}
                  </p>
                </div>
                <ChevronUp size={14} className="text-white/30 shrink-0 group-hover:text-white/60 transition-colors" />
              </div>

              {/* Service + time row */}
              <div className="flex items-center justify-between w-full">
                <span className="font-['Inter',sans-serif] text-[10px] text-white/40 truncate">
                  {bookedProvider.service}
                </span>
                {isAssigning ? (
                  <div className="rounded-[8px] px-2.5 py-1 shrink-0" style={{ backgroundColor: snackbarPillColor }}>
                    <span className="font-['Lexend',sans-serif] font-bold text-[10px] text-white whitespace-nowrap">
                      {pkgStage === "confirming" ? "Wait..." : pkgStage === "assigning" ? "Assigning" : "Ready!"}
                    </span>
                  </div>
                ) : (
                  <div className="bg-[#1975D2] rounded-[8px] px-2.5 py-1 shrink-0">
                    <span className="font-['Lexend',sans-serif] font-bold text-[11px] text-white whitespace-nowrap">
                      {remainingMins} min left
                    </span>
                  </div>
                )}
              </div>

              {/* Progress bar */}
              <div className="w-full">
                <div className="bg-white/8 rounded-full h-[3px] overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#1975D2] to-[#10b981] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ──── FULL-SCREEN POPUP (expanded) ──── */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col md:items-center md:justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              style={{ opacity: backdropOpacity }}
              onClick={() => setIsExpanded(false)}
            />

            {/* Sheet */}
            <motion.div
              className="relative mt-auto md:mt-0 bg-[#111111] rounded-t-[28px] md:rounded-[28px] max-h-[92vh] md:max-h-[85vh] md:w-full md:max-w-[520px] overflow-y-auto flex flex-col no-scrollbar"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.4}
              style={{ y: dragY, scale: sheetScale }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 120 || info.velocity.y > 500) {
                  setIsExpanded(false);
                }
              }}
            >
              {/* Drag handle */}
              <div className="flex justify-center pt-3 pb-1 md:hidden">
                <div className="w-[36px] h-[4px] bg-white/20 rounded-full" />
              </div>

              {/* Header bar */}
              <div className="px-5 pt-2 pb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-[#10b981] rounded-full size-[8px] animate-pulse" />
                  <span className="font-['Lexend',sans-serif] font-bold text-[18px] text-white">
                    Live Service
                  </span>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="bg-white/10 rounded-full size-[36px] flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors"
                >
                  <X size={18} className="text-white" />
                </button>
              </div>

              {/* Provider card */}
              <div className="mx-5 bg-[#1a1a1a] rounded-[20px] border border-[#2a2a2a] p-4">
                <div className="flex items-center gap-4">
                  <div className="size-[72px] rounded-[18px] overflow-hidden shrink-0 border-2 border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
                    <ImageWithFallback
                      src={bookedProvider.providerPhoto}
                      alt={bookedProvider.providerName}
                      className="size-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-['Lexend',sans-serif] font-bold text-[20px] text-white leading-[28px] truncate">
                      {bookedProvider.providerName}
                    </h3>
                    <p className="font-['Inter',sans-serif] text-[14px] text-white/70 leading-[20px]">
                      {bookedProvider.service}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        <svg width={12} height={11} viewBox="0 0 11.6484 11.0742" fill="none">
                          <path d={svgPaths.p2ad35b00} fill="#FACC15" />
                        </svg>
                        <span className="font-['Inter',sans-serif] font-medium text-[12px] text-white">
                          {bookedProvider.rating}
                        </span>
                      </div>
                      {bookedProvider.agency && (
                        <>
                          <div className="size-[3px] rounded-full bg-white/30" />
                          <span className="font-['Inter',sans-serif] text-[12px] text-white/50">
                            {bookedProvider.agency}
                          </span>
                        </>
                      )}
                      <div className="size-[3px] rounded-full bg-white/30" />
                      <div className="flex items-center gap-1">
                        <Shield size={10} className="text-[#10b981]" />
                        <span className="font-['Inter',sans-serif] text-[11px] text-[#10b981]">Verified</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Time remaining banner */}
              <div className="mx-5 mt-4 bg-gradient-to-r from-[#1975D2] to-[#1565c0] rounded-[16px] p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 rounded-[10px] p-2">
                    <Clock size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="font-['Inter',sans-serif] text-[12px] text-white/70">Time Remaining</p>
                    <p className="font-['Lexend',sans-serif] font-bold text-[24px] text-white leading-[30px]">
                      {remainingMins} mins
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-['Inter',sans-serif] text-[12px] text-white/70">Slot</p>
                  <p className="font-['Lexend',sans-serif] font-semibold text-[14px] text-white">
                    {bookedProvider.timeSlot}
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mx-5 mt-3">
                <div className="bg-white/10 rounded-full h-[6px] overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#10b981] to-[#34d399] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
                <div className="flex justify-between mt-1.5">
                  <span className="font-['Inter',sans-serif] text-[10px] text-white/40">Started</span>
                  <span className="font-['Inter',sans-serif] text-[10px] text-white/40">Completed</span>
                </div>
              </div>

              {/* Status timeline */}
              <div className="mx-5 mt-5 mb-2">
                <h4 className="font-['Lexend',sans-serif] font-semibold text-[14px] text-white/80 mb-4">Service Status</h4>
                <div className="flex flex-col gap-0">
                  {steps.map((step, i) => (
                    <div key={step.label} className="flex items-start gap-3">
                      {/* Timeline dot + line */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`size-[14px] rounded-full border-2 flex items-center justify-center shrink-0 ${
                            step.done
                              ? "bg-[#10b981] border-[#10b981]"
                              : "bg-transparent border-white/20"
                          }`}
                        >
                          {step.done && (
                            <svg width={8} height={8} viewBox="0 0 8 8" fill="none">
                              <path d="M1.5 4L3.2 5.7L6.5 2.3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                        {i < steps.length - 1 && (
                          <div className={`w-[2px] h-[32px] ${step.done ? "bg-[#10b981]" : "bg-white/10"}`} />
                        )}
                      </div>
                      {/* Label */}
                      <div className="pb-4">
                        <p className={`font-['Inter',sans-serif] text-[13px] leading-[14px] ${step.done ? "text-white" : "text-white/40"}`}>
                          {step.label}
                        </p>
                        <p className="font-['Inter',sans-serif] text-[11px] text-white/30 mt-1">{step.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location mock */}
              <div className="mx-5 mb-4 bg-[#1a1a1a] rounded-[16px] border border-[#2a2a2a] overflow-hidden">
                {/* Map */}
                <div className="h-[180px] w-full relative">
                  <LeafletMap isVisible={true} />
                </div>

                {/* Location label */}
                <div className="px-4 py-3 flex items-center gap-3">
                  <div className="bg-[#1975D2]/20 rounded-[10px] p-2 shrink-0">
                    <MapPin size={16} className="text-[#1975D2]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-['Inter',sans-serif] text-[11px] text-white/40">Service Location</p>
                    <p className="font-['Lexend',sans-serif] font-medium text-[13px] text-white truncate">
                      Salt Lake, Sector V, Kolkata
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-[8px] px-2.5 py-1 border border-white/10">
                    <span className="font-['Inter',sans-serif] text-[11px] text-white/60">Live</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="px-5 pb-4 flex gap-3">
                <button
                  onClick={() => {
                    setIsExpanded(false);
                    navigate("/messages");
                  }}
                  className="flex-1 bg-white/5 border border-white/10 rounded-[14px] py-3.5 flex items-center justify-center gap-2 cursor-pointer hover:bg-white/10 transition-colors"
                >
                  <MessageSquare size={16} className="text-white" />
                  <span className="font-['Inter',sans-serif] font-semibold text-[14px] text-white">Contact&nbsp;&nbsp;Agency</span>
                </button>
                <button className="flex-1 bg-white/5 border border-white/10 rounded-[14px] py-3.5 flex items-center justify-center gap-2 cursor-pointer hover:bg-white/10 transition-colors">
                  <Phone size={16} className="text-white" />
                  <span className="font-['Inter',sans-serif] font-semibold text-[14px] text-white">
                    Call
                  </span>
                </button>
              </div>

              {/* ──── Slide to Finish GIG ──── */}
              <div className="px-5 pb-8">
                <div
                  ref={sliderRef}
                  className={`relative h-[56px] rounded-[16px] overflow-hidden select-none ${
                    isCompleting
                      ? "bg-[#10b981]"
                      : "bg-gradient-to-r from-[#1975D2]/30 to-[#1975D2]/10 border border-[#1975D2]/30"
                  } transition-colors duration-500`}
                  style={{ touchAction: "none" }}
                >
                  {/* Filled track */}
                  {!isCompleting && (
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#1975D2] to-[#1975D2]/80 rounded-[16px] transition-none"
                      style={{ width: sliderX + THUMB_SIZE }}
                    />
                  )}

                  {/* Label text */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {isCompleting ? (
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle2 size={20} className="text-white" />
                        <span className="font-['Lexend',sans-serif] font-bold text-[15px] text-white">
                          GIG Completed!
                        </span>
                      </motion.div>
                    ) : (
                      <span
                        className="font-['Lexend',sans-serif] font-semibold text-[14px] text-white/70 transition-opacity"
                        style={{ opacity: Math.max(0.3, 1 - sliderProgress * 1.5) }}
                      >
                        Slide to Finish the GIG →
                      </span>
                    )}
                  </div>

                  {/* Draggable thumb */}
                  {!isCompleting && (
                    <div
                      className={`absolute top-[4px] left-[4px] size-[48px] rounded-[13px] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.3)] flex items-center justify-center cursor-grab active:cursor-grabbing z-10 ${
                        isDragging ? "scale-105" : ""
                      } transition-transform`}
                      style={{
                        transform: `translateX(${sliderX}px)`,
                        transition: isDragging ? "none" : "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleSliderStart();
                      }}
                      onTouchStart={(e) => {
                        handleSliderStart();
                      }}
                      onTouchMove={(e) => {
                        const touch = e.touches[0];
                        handleSliderMove(touch.clientX);
                      }}
                      onTouchEnd={() => handleSliderEnd()}
                    >
                      <svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                        <path d="M9 5l7 7-7 7" stroke="#1975D2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}