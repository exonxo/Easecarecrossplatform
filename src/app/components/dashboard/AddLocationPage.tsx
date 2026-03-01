import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Search, MapPin, Navigation, Home, Briefcase, Heart, Plus, Check, X, LocateFixed, Pencil, Trash2, Star, MoreVertical } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import L from "leaflet";
import { dataService, type AddressRecord } from "../../services/DataService";
import { PrimaryButton } from "../shared/PrimaryButton";

// Custom pin icon
const locationIcon = L.divIcon({
  className: "",
  html: `<div style="display:flex;align-items:center;justify-content:center;width:40px;height:40px;background:#1975D2;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid white;box-shadow:0 4px 16px rgba(25,117,210,0.4);">
    <div style="width:12px;height:12px;background:white;border-radius:50%;transform:rotate(45deg);"></div>
  </div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

interface SavedAddress {
  id: string;
  label: string;
  icon: "home" | "work" | "favorite" | "other";
  address: string;
  coords: [number, number];
  isDefault?: boolean;
}

const MOCK_SAVED_ADDRESSES: SavedAddress[] = [
  {
    id: "1",
    label: "Home",
    icon: "home",
    address: "Flat 4B, Greenview Apartments, Salt Lake Sector V, Kolkata 700091",
    coords: [22.5726, 88.4379],
    isDefault: true,
  },
  {
    id: "2",
    label: "Work",
    icon: "work",
    address: "DLF IT Park, Block B, 3rd Floor, Rajarhat, Kolkata 700156",
    coords: [22.5958, 88.4847],
  },
  {
    id: "3",
    label: "Mom's Place",
    icon: "favorite",
    address: "12/A, Ballygunge Circular Road, Kolkata 700019",
    coords: [22.5289, 88.3638],
  },
];

const MOCK_SEARCH_RESULTS = [
  {
    id: "s1",
    title: "Salt Lake City Centre",
    subtitle: "Central Park, Sector III, Salt Lake, Kolkata",
    coords: [22.5806, 88.4207] as [number, number],
  },
  {
    id: "s2",
    title: "Salt Lake Stadium",
    subtitle: "Vivekananda Yuba Bharati Krirangan, Kolkata",
    coords: [22.5645, 88.4113] as [number, number],
  },
  {
    id: "s3",
    title: "Salt Lake Sector V",
    subtitle: "IT Hub, Bidhannagar, Kolkata 700091",
    coords: [22.5726, 88.4379] as [number, number],
  },
  {
    id: "s4",
    title: "New Town, Rajarhat",
    subtitle: "Action Area I, New Town, Kolkata 700156",
    coords: [22.5958, 88.4847] as [number, number],
  },
];

const LABEL_OPTIONS = [
  { key: "home" as const, label: "Home", icon: Home },
  { key: "work" as const, label: "Work", icon: Briefcase },
  { key: "favorite" as const, label: "Favorite", icon: Heart },
  { key: "other" as const, label: "Other", icon: MapPin },
];

function getIconForLabel(icon: SavedAddress["icon"]) {
  switch (icon) {
    case "home": return Home;
    case "work": return Briefcase;
    case "favorite": return Heart;
    default: return MapPin;
  }
}

export function AddLocationPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>(MOCK_SAVED_ADDRESSES);
  const [selectedAddress, setSelectedAddress] = useState<SavedAddress | null>(
    MOCK_SAVED_ADDRESSES.find((a) => a.isDefault) || null
  );
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<SavedAddress | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [newLabel, setNewLabel] = useState<SavedAddress["icon"]>("home");
  const [newAddress, setNewAddress] = useState("");
  const [newCustomLabel, setNewCustomLabel] = useState("");
  const [mapCenter, setMapCenter] = useState<[number, number]>([22.5726, 88.4379]);
  const [isLocating, setIsLocating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close active menu when clicking outside
  useEffect(() => {
    if (!activeMenu) return;
    const handler = () => setActiveMenu(null);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [activeMenu]);

  // Escape key to close form modal
  useEffect(() => {
    if (!showAddForm) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeForm();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [showAddForm]);

  // Track desktop breakpoint for animation variants
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(min-width: 768px)").matches : false
  );
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // Load addresses from Supabase on mount
  useEffect(() => {
    let cancelled = false;
    dataService
      .getAddresses()
      .then((remote) => {
        if (cancelled) return;
        if (remote.length > 0) {
          const mapped: SavedAddress[] = remote.map((a) => ({
            id: a.id,
            label: a.label,
            icon: a.icon,
            address: a.address,
            coords: a.coords,
            isDefault: a.isDefault,
          }));
          setSavedAddresses(mapped);
          const def = mapped.find((a) => a.isDefault) || mapped[0];
          setSelectedAddress(def);
          if (def) setMapCenter(def.coords);
        }
      })
      .catch((err) => console.error("[AddLocationPage] Failed to load addresses:", err))
      .finally(() => { if (!cancelled) setIsLoading(false); });
    return () => { cancelled = true; };
  }, []);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: mapCenter,
      zoom: 15,
      zoomControl: false,
      attributionControl: false,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 19,
    }).addTo(map);

    const marker = L.marker(mapCenter, { icon: locationIcon }).addTo(map);
    markerRef.current = marker;
    mapInstanceRef.current = map;

    // Add pulsing circle
    const pulseCircle = L.circleMarker(mapCenter, {
      radius: 30,
      color: "#1975D2",
      fillColor: "#1975D2",
      fillOpacity: 0.1,
      weight: 1,
      opacity: 0.3,
    }).addTo(map);

    // Animate pulse
    let growing = true;
    const pulseInterval = setInterval(() => {
      const r = pulseCircle.getRadius();
      if (r >= 40) growing = false;
      if (r <= 20) growing = true;
      pulseCircle.setRadius(r + (growing ? 0.5 : -0.5));
    }, 50);

    return () => {
      clearInterval(pulseInterval);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update map when center changes
  useEffect(() => {
    if (mapInstanceRef.current && markerRef.current) {
      mapInstanceRef.current.flyTo(mapCenter, 16, { duration: 1 });
      markerRef.current.setLatLng(mapCenter);
    }
  }, [mapCenter]);

  const handleSelectAddress = (addr: SavedAddress) => {
    setSelectedAddress(addr);
    setMapCenter(addr.coords);
    setIsSearchFocused(false);
    setSearchQuery("");
  };

  const handleSearchSelect = (result: (typeof MOCK_SEARCH_RESULTS)[0]) => {
    setMapCenter(result.coords);
    setIsSearchFocused(false);
    setSearchQuery(result.title);
  };

  const handleSetDefault = (id: string) => {
    setSavedAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id }))
    );
    const addr = savedAddresses.find((a) => a.id === id);
    if (addr) {
      setSelectedAddress({ ...addr, isDefault: true });
      setMapCenter(addr.coords);
    }
  };

  const handleDeleteAddress = (id: string) => {
    setSavedAddresses((prev) => prev.filter((a) => a.id !== id));
    if (selectedAddress?.id === id) {
      setSelectedAddress(null);
    }

    // Persist deletion to Supabase
    dataService
      .removeAddress(id)
      .then(() => console.log("[AddLocationPage] Address deleted from Supabase"))
      .catch((err) => console.error("[AddLocationPage] Failed to delete address:", err));
  };

  const handleAddAddress = () => {
    if (!newAddress.trim()) return;
    const id = Date.now().toString();
    const label = newLabel === "other" && newCustomLabel ? newCustomLabel : LABEL_OPTIONS.find((l) => l.key === newLabel)?.label || "Other";
    const newAddr: SavedAddress = {
      id,
      label,
      icon: newLabel,
      address: newAddress,
      coords: mapCenter,
    };
    setSavedAddresses((prev) => [...prev, newAddr]);
    setShowAddForm(false);
    setNewAddress("");
    setNewCustomLabel("");
    setNewLabel("home");

    // Persist to Supabase
    dataService
      .saveAddress({ id, label, icon: newLabel, address: newAddress, coords: mapCenter })
      .then(() => console.log("[AddLocationPage] Address saved to Supabase"))
      .catch((err) => console.error("[AddLocationPage] Failed to save address:", err));
  };

  const handleEditAddress = (addr: SavedAddress) => {
    setEditingAddress(addr);
    setNewLabel(addr.icon);
    setNewAddress(addr.address);
    setNewCustomLabel(LABEL_OPTIONS.some((l) => l.label === addr.label) ? "" : addr.label);
    setShowAddForm(true);
    setActiveMenu(null);
  };

  const handleSaveEdit = () => {
    if (!newAddress.trim() || !editingAddress) return;
    const label = newLabel === "other" && newCustomLabel ? newCustomLabel : LABEL_OPTIONS.find((l) => l.key === newLabel)?.label || "Other";
    const updated: SavedAddress = {
      ...editingAddress,
      label,
      icon: newLabel,
      address: newAddress,
    };
    setSavedAddresses((prev) => prev.map((a) => (a.id === editingAddress.id ? updated : a)));
    if (selectedAddress?.id === editingAddress.id) {
      setSelectedAddress(updated);
    }
    closeForm();

    // Persist to Supabase
    dataService
      .saveAddress({ id: updated.id, label, icon: newLabel, address: newAddress, coords: updated.coords })
      .then(() => console.log("[AddLocationPage] Address updated in Supabase"))
      .catch((err) => console.error("[AddLocationPage] Failed to update address:", err));
  };

  const closeForm = () => {
    setShowAddForm(false);
    setEditingAddress(null);
    setNewAddress("");
    setNewCustomLabel("");
    setNewLabel("home");
  };

  const handleLocateMe = () => {
    setIsLocating(true);
    // Simulate geolocation
    setTimeout(() => {
      setMapCenter([22.5726, 88.4379]);
      setIsLocating(false);
    }, 1500);
  };

  const filteredResults = searchQuery.length > 0
    ? MOCK_SEARCH_RESULTS.filter(
        (r) =>
          r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen bg-[#f6f8fc] font-['Inter',sans-serif] pb-[80px] md:pb-0">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-30 bg-white border-b border-[#f1f5f9]"
      >
        <div className="flex items-center gap-3 px-4 md:px-8 py-3 mx-[0px] mt-[56px] mb-[0px]">
          <button
            onClick={() => navigate(-1)}
            className="size-10 rounded-full flex items-center justify-center hover:bg-[#f0f7fa] transition-colors cursor-pointer"
          >
            <ArrowLeft size={20} className="text-[#0f172a]" />
          </button>
          <h1 className="font-['Lexend',sans-serif] font-semibold text-[20px] text-[#0f172a] tracking-[-0.3px]">
            Manage Locations
          </h1>
        </div>
      </motion.header>

      <div className="flex flex-col md:flex-row md:h-[calc(100vh-60px)]">
        {/* Left Panel - Search & Saved Addresses */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="md:w-[420px] md:border-r md:border-[#f1f5f9] md:overflow-y-auto bg-white md:bg-[#f6f8fc] no-scrollbar order-2 md:order-1"
        >
          {/* Search Bar */}
          <div className="p-4 bg-white">
            <div className="relative">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search for area, street name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full pl-10 pr-10 py-3 bg-[#f6f8fc] rounded-[14px] text-[14px] text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:ring-2 focus:ring-[#1975D2]/20 transition-all font-['Inter',sans-serif]"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setIsSearchFocused(false);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 size-6 rounded-full bg-[#e2e8f0] flex items-center justify-center cursor-pointer"
                >
                  <X size={12} className="text-[#64748b]" />
                </button>
              )}
            </div>

            {/* Use Current Location */}
            <button
              onClick={handleLocateMe}
              className="flex items-center gap-3 mt-3 w-full px-3 py-2.5 rounded-[12px] hover:bg-[#f0f7fa] transition-colors cursor-pointer"
            >
              <div className={`size-8 rounded-full bg-[#e0f0ff] flex items-center justify-center ${isLocating ? "animate-pulse" : ""}`}>
                <LocateFixed size={16} className="text-[#1975D2]" />
              </div>
              <span className="font-['Inter',sans-serif] font-medium text-[14px] text-[#1975D2]">
                {isLocating ? "Locating..." : "Use current location"}
              </span>
            </button>
          </div>

          {/* Search Results */}
          <AnimatePresence>
            {isSearchFocused && filteredResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="bg-white border-t border-[#f1f5f9]"
              >
                {filteredResults.map((result, i) => (
                  <motion.button
                    key={result.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleSearchSelect(result)}
                    className="flex items-start gap-3 w-full px-4 py-3 hover:bg-[#f8fafc] transition-colors cursor-pointer text-left"
                  >
                    <div className="size-8 rounded-full bg-[#f1f5f9] flex items-center justify-center mt-0.5 shrink-0">
                      <MapPin size={14} className="text-[#64748b]" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-['Inter',sans-serif] font-medium text-[14px] text-[#0f172a] truncate">
                        {result.title}
                      </p>
                      <p className="font-['Inter',sans-serif] text-[12px] text-[#94a3b8] truncate mt-0.5">
                        {result.subtitle}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Saved Addresses */}
          {!isSearchFocused && (
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-['Lexend',sans-serif] font-semibold text-[16px] text-[#0f172a]">
                  Saved Addresses
                </h2>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1975D2] text-white text-[12px] font-medium hover:bg-[#1565C0] transition-colors cursor-pointer"
                >
                  <Plus size={14} />
                  Add New
                </button>
              </div>

              <div className="space-y-3">
                {savedAddresses.map((addr, i) => {
                  const Icon = getIconForLabel(addr.icon);
                  const isSelected = selectedAddress?.id === addr.id;
                  return (
                    <motion.div
                      key={addr.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                      onClick={() => handleSelectAddress(addr)}
                      className={`relative bg-white rounded-[20px] p-4 cursor-pointer transition-all ${
                        isSelected
                          ? "ring-2 ring-[#1975D2] shadow-[0_4px_20px_rgba(25,117,210,0.12)]"
                          : "shadow-[0_1px_4px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`size-10 rounded-[12px] flex items-center justify-center shrink-0 ${
                            isSelected ? "bg-[#1975D2]" : "bg-[#f0f7fa]"
                          }`}
                        >
                          <Icon
                            size={18}
                            className={isSelected ? "text-white" : "text-[#1975D2]"}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-['Lexend',sans-serif] font-semibold text-[14px] text-[#0f172a]">
                              {addr.label}
                            </span>
                            {addr.isDefault && (
                              <span className="px-2 py-0.5 rounded-full bg-[#e0f2fe] text-[10px] font-medium text-[#1975D2]">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="font-['Inter',sans-serif] text-[12px] text-[#64748b] mt-1 leading-[18px] line-clamp-2">
                            {addr.address}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveMenu(addr.id);
                            }}
                            className="size-6 rounded-full bg-[#f1f5f9] flex items-center justify-center cursor-pointer"
                          >
                            <MoreVertical size={14} className="text-[#64748b]" />
                          </button>
                          <AnimatePresence>
                            {activeMenu === addr.id && (
                              <motion.div
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                className="absolute right-0 top-10 bg-white border border-[#f1f5f9] rounded-[12px] shadow-[0_4px_12px_rgba(0,0,0,0.06)] z-10"
                              >
                                <button
                                  onClick={() => handleEditAddress(addr)}
                                  className="flex items-center gap-2 w-full px-4 py-2 hover:bg-[#f8fafc] transition-colors cursor-pointer"
                                >
                                  <Pencil size={14} className="text-[#1975D2]" />
                                  Edit
                                </button>
                                {!addr.isDefault && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleSetDefault(addr.id);
                                      setActiveMenu(null);
                                    }}
                                    className="flex items-center gap-2 w-full px-4 py-2 hover:bg-[#f8fafc] transition-colors cursor-pointer"
                                  >
                                    <Star size={14} className="text-[#f59e0b]" />
                                    Set Default
                                  </button>
                                )}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteAddress(addr.id);
                                    setActiveMenu(null);
                                  }}
                                  className="flex items-center gap-2 w-full px-4 py-2 hover:bg-[#f8fafc] transition-colors cursor-pointer"
                                >
                                  <Trash2 size={14} className="text-[#ff5757]" />
                                  Delete
                                </button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      {isSelected && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          className="mt-3 pt-3 border-t border-[#f1f5f9]"
                        >
                          <div className="flex items-center gap-2">
                            <div className="size-2 rounded-full bg-[#22c55e]" />
                            <span className="font-['Inter',sans-serif] text-[12px] text-[#22c55e] font-medium">
                              Currently selected
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>

        {/* Right Panel - Map */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex-1 relative h-[250px] md:h-full order-1 md:order-2 isolate"
        >
          <div ref={mapRef} className="w-full h-full" />
        </motion.div>
      </div>

      {/* Confirm Button - Mobile only */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-[#f1f5f9] z-30">
        <PrimaryButton onClick={() => navigate(-1)}>
          Confirm Location
        </PrimaryButton>
      </div>

      {/* Add/Edit Address — bottom sheet (mobile) · centered modal (desktop) */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end md:items-center md:justify-center"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 md:bg-black/50 backdrop-blur-[2px]"
              onClick={closeForm}
            />

            {/* Panel */}
            <motion.div
              initial={isDesktop ? { opacity: 0, scale: 0.95, y: 0 } : { opacity: 0, y: 100, scale: 1 }}
              animate={isDesktop ? { opacity: 1, scale: 1, y: 0 } : { opacity: 1, y: 0, scale: 1 }}
              exit={isDesktop ? { opacity: 0, scale: 0.95, y: 0 } : { opacity: 0, y: 100, scale: 1 }}
              transition={
                isDesktop
                  ? { type: "spring", damping: 28, stiffness: 350 }
                  : { type: "spring", damping: 25, stiffness: 300 }
              }
              className="relative w-full md:max-w-[480px] bg-white rounded-t-[24px] md:rounded-[20px] p-6 z-10 md:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] md:border md:border-[#f1f5f9]"
            >
              {/* Drag handle — mobile only */}
              <div className="md:hidden w-10 h-1 rounded-full bg-[#e2e8f0] mx-auto mb-4" />

              <div className="flex items-center justify-between mb-5">
                <h3 className="font-['Lexend',sans-serif] font-semibold text-[18px] text-[#0f172a]">
                  {editingAddress ? "Edit Address" : "Add New Address"}
                </h3>
                <button
                  onClick={closeForm}
                  className="size-8 rounded-full bg-[#f1f5f9] flex items-center justify-center cursor-pointer"
                >
                  <X size={16} className="text-[#64748b]" />
                </button>
              </div>

              {/* Label Selector */}
              <p className="font-['Inter',sans-serif] font-medium text-[13px] text-[#64748b] mb-2">
                Label
              </p>
              <div className="flex gap-2 mb-4">
                {LABEL_OPTIONS.map((opt) => {
                  const isActive = newLabel === opt.key;
                  return (
                    <button
                      key={opt.key}
                      onClick={() => setNewLabel(opt.key)}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[13px] font-medium transition-all cursor-pointer ${
                        isActive
                          ? "bg-[#1975D2] text-white"
                          : "bg-[#f1f5f9] text-[#64748b] hover:bg-[#e2e8f0]"
                      }`}
                    >
                      <opt.icon size={14} />
                      {opt.label}
                    </button>
                  );
                })}
              </div>

              {/* Custom Label */}
              {newLabel === "other" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="mb-4"
                >
                  <input
                    type="text"
                    placeholder="Custom label (e.g. Gym, Studio)"
                    value={newCustomLabel}
                    onChange={(e) => setNewCustomLabel(e.target.value)}
                    className="w-full px-4 py-3 bg-[#f6f8fc] rounded-[12px] text-[14px] text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:ring-2 focus:ring-[#1975D2]/20 font-['Inter',sans-serif]"
                  />
                </motion.div>
              )}

              {/* Address Input */}
              <p className="font-['Inter',sans-serif] font-medium text-[13px] text-[#64748b] mb-2">
                Full Address
              </p>
              <textarea
                placeholder="Enter complete address with flat/house no., street, area, city, pincode"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-[#f6f8fc] rounded-[14px] text-[14px] text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:ring-2 focus:ring-[#1975D2]/20 resize-none font-['Inter',sans-serif]"
              />

              {/* Save Button */}
              <PrimaryButton
                onClick={editingAddress ? handleSaveEdit : handleAddAddress}
                disabled={!newAddress.trim()}
                className="mt-5"
              >
                {editingAddress ? "Save Changes" : "Save Address"}
              </PrimaryButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}