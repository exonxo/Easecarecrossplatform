import { useState, useRef, useEffect } from "react";
import {
  Search, MapPin, Navigation, Home, Briefcase, Heart, Plus,
  X, LocateFixed, Pencil, Trash2, Star, MoreVertical, Check,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import L from "leaflet";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { dataService } from "../../services/DataService";
import { PrimaryButton } from "../shared/PrimaryButton";
import { AddressFormModal } from "./AddressFormModal";

// ─── Leaflet pin icon ─────────────────────────────────────────────────────────

const locationIcon = L.divIcon({
  className: "",
  html: `<div style="display:flex;align-items:center;justify-content:center;width:40px;height:40px;background:#1975D2;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid white;box-shadow:0 4px 16px rgba(25,117,210,0.4);">
    <div style="width:12px;height:12px;background:white;border-radius:50%;transform:rotate(45deg);"></div>
  </div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

// ─── Types ────────────────────────────────────────────────────────────────────

interface SavedAddress {
  id: string;
  label: string;
  icon: "home" | "work" | "favorite" | "other";
  address: string;
  coords: [number, number];
  isDefault?: boolean;
}

const MOCK_SAVED_ADDRESSES: SavedAddress[] = [
  { id: "1", label: "Home", icon: "home", address: "Flat 4B, Greenview Apartments, Salt Lake Sector V, Kolkata 700091", coords: [22.5726, 88.4379], isDefault: true },
  { id: "2", label: "Work", icon: "work", address: "DLF IT Park, Block B, 3rd Floor, Rajarhat, Kolkata 700156", coords: [22.5958, 88.4847] },
  { id: "3", label: "Mom's Place", icon: "favorite", address: "12/A, Ballygunge Circular Road, Kolkata 700019", coords: [22.5289, 88.3638] },
];

const MOCK_SEARCH_RESULTS = [
  { id: "s1", title: "Salt Lake City Centre", subtitle: "Central Park, Sector III, Salt Lake, Kolkata", coords: [22.5806, 88.4207] as [number, number] },
  { id: "s2", title: "Salt Lake Stadium", subtitle: "Vivekananda Yuba Bharati Krirangan, Kolkata", coords: [22.5645, 88.4113] as [number, number] },
  { id: "s3", title: "Salt Lake Sector V", subtitle: "IT Hub, Bidhannagar, Kolkata 700091", coords: [22.5726, 88.4379] as [number, number] },
  { id: "s4", title: "New Town, Rajarhat", subtitle: "Action Area I, New Town, Kolkata 700156", coords: [22.5958, 88.4847] as [number, number] },
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

// ─── Map Panel ────────────────────────────────────────────────────────────────

function MapPanel({ mapCenter, open }: { mapCenter: [number, number]; open: boolean }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const pulseIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Init map when modal opens
  useEffect(() => {
    if (!open || !mapRef.current || mapInstanceRef.current) return;

    // Small delay to ensure the dialog's DOM is fully rendered + sized
    const timer = setTimeout(() => {
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

      const pulseCircle = L.circleMarker(mapCenter, {
        radius: 30, color: "#1975D2", fillColor: "#1975D2",
        fillOpacity: 0.1, weight: 1, opacity: 0.3,
      }).addTo(map);

      let growing = true;
      const pulseInterval = setInterval(() => {
        const r = pulseCircle.getRadius();
        if (r >= 40) growing = false;
        if (r <= 20) growing = true;
        pulseCircle.setRadius(r + (growing ? 0.5 : -0.5));
      }, 50);

      // Store interval ID on a ref to avoid unsafe any-cast
      pulseIntervalRef.current = pulseInterval;
    }, 120);

    return () => clearTimeout(timer);
  }, [open]);

  // Cleanup on close
  useEffect(() => {
    if (!open && mapInstanceRef.current) {
      if (pulseIntervalRef.current !== null) {
        clearInterval(pulseIntervalRef.current);
        pulseIntervalRef.current = null;
      }
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
      markerRef.current = null;
    }
  }, [open]);

  // Pan map when center changes
  useEffect(() => {
    if (mapInstanceRef.current && markerRef.current) {
      mapInstanceRef.current.flyTo(mapCenter, 16, { duration: 1 });
      markerRef.current.setLatLng(mapCenter);
    }
  }, [mapCenter]);

  return <div ref={mapRef} className="w-full h-full" />;
}

// ─── Location Modal ───────────────────────────────────────────────────────────

interface LocationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LocationModal({ open, onOpenChange }: LocationModalProps) {
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
  const [addressFormOpen, setAddressFormOpen] = useState(false);

  // Load addresses from Supabase on open
  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    dataService.getAddresses()
      .then((remote) => {
        if (cancelled || remote.length === 0) return;
        const mapped: SavedAddress[] = remote.map((a) => ({
          id: a.id, label: a.label, icon: a.icon,
          address: a.address, coords: a.coords, isDefault: a.isDefault,
        }));
        setSavedAddresses(mapped);
        const def = mapped.find((a) => a.isDefault) || mapped[0];
        if (def) { setSelectedAddress(def); setMapCenter(def.coords); }
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [open]);

  // Close active menu on outside click
  useEffect(() => {
    if (!activeMenu) return;
    const handler = () => setActiveMenu(null);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [activeMenu]);

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
    setSavedAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
    const addr = savedAddresses.find((a) => a.id === id);
    if (addr) { setSelectedAddress({ ...addr, isDefault: true }); setMapCenter(addr.coords); }
  };

  const handleDeleteAddress = (id: string) => {
    setSavedAddresses((prev) => prev.filter((a) => a.id !== id));
    if (selectedAddress?.id === id) setSelectedAddress(null);
    dataService.removeAddress(id).catch(() => {});
  };

  const handleAddAddress = () => {
    if (!newAddress.trim()) return;
    const id = Date.now().toString();
    const label = newLabel === "other" && newCustomLabel
      ? newCustomLabel
      : LABEL_OPTIONS.find((l) => l.key === newLabel)?.label || "Other";
    const newAddr: SavedAddress = { id, label, icon: newLabel, address: newAddress, coords: mapCenter };
    setSavedAddresses((prev) => [...prev, newAddr]);
    closeForm();
    dataService.saveAddress({ id, label, icon: newLabel, address: newAddress, coords: mapCenter }).catch(() => {});
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
    const label = newLabel === "other" && newCustomLabel
      ? newCustomLabel
      : LABEL_OPTIONS.find((l) => l.key === newLabel)?.label || "Other";
    const updated: SavedAddress = { ...editingAddress, label, icon: newLabel, address: newAddress };
    setSavedAddresses((prev) => prev.map((a) => (a.id === editingAddress.id ? updated : a)));
    if (selectedAddress?.id === editingAddress.id) setSelectedAddress(updated);
    closeForm();
    dataService.saveAddress({ id: updated.id, label, icon: newLabel, address: newAddress, coords: updated.coords }).catch(() => {});
  };

  const closeForm = () => {
    setShowAddForm(false);
    setEditingAddress(null);
    setNewAddress("");
    setNewCustomLabel("");
    setNewLabel("home");
  };

  const handleLocateMe = () => {
    if (!navigator.geolocation) return;
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setMapCenter([pos.coords.latitude, pos.coords.longitude]);
        setIsLocating(false);
      },
      () => {
        // Permission denied or unavailable — fall back to default
        setMapCenter([22.5726, 88.4379]);
        setIsLocating(false);
      },
      { timeout: 8000 }
    );
  };

  const filteredResults = searchQuery.length > 0
    ? MOCK_SEARCH_RESULTS.filter(
        (r) =>
          r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[60vw] max-w-[60vw] sm:max-w-[60vw] h-[82vh] p-0 gap-0 overflow-hidden flex flex-col">
        <DialogTitle className="sr-only">Manage Locations</DialogTitle>

        {/* Modal header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#f1f5f9] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-full bg-[#EBF3FC] flex items-center justify-center">
              <MapPin size={15} className="text-[#1975D2]" strokeWidth={2.2} />
            </div>
            <span className="font-['Lexend',sans-serif] font-semibold text-[16px] text-[#0f172a]">
              Manage Locations
            </span>
          </div>
        </div>

        {/* Two-panel body */}
        <div className="flex flex-col md:flex-row flex-1 min-h-0">

          {/* Left panel — search + saved addresses */}
          <div className="md:w-[400px] md:shrink-0 md:border-r md:border-[#f1f5f9] flex flex-col overflow-hidden bg-white order-2 md:order-1">

            {/* Search */}
            <div className="p-4 border-b border-[#f1f5f9]">
              <div className="relative">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
                <input
                  type="text"
                  placeholder="Search for area, street name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  className="w-full pl-10 pr-9 py-2.5 bg-[#f6f8fc] rounded-[12px] text-[13px] text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:ring-2 focus:ring-[#1975D2]/20 font-['Inter',sans-serif]"
                />
                {searchQuery && (
                  <button
                    onClick={() => { setSearchQuery(""); setIsSearchFocused(false); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 size-5 rounded-full bg-[#e2e8f0] flex items-center justify-center cursor-pointer"
                  >
                    <X size={10} className="text-[#64748b]" />
                  </button>
                )}
              </div>
              <button
                onClick={handleLocateMe}
                className="flex items-center gap-2.5 mt-3 w-full px-3 py-2 rounded-[10px] hover:bg-[#f0f7fa] transition-colors cursor-pointer"
              >
                <div className={`size-7 rounded-full bg-[#e0f0ff] flex items-center justify-center shrink-0 ${isLocating ? "animate-pulse" : ""}`}>
                  <LocateFixed size={14} className="text-[#1975D2]" />
                </div>
                <span className="font-['Inter',sans-serif] font-medium text-[13px] text-[#1975D2]">
                  {isLocating ? "Locating…" : "Use current location"}
                </span>
              </button>
            </div>

            {/* Search results */}
            <AnimatePresence>
              {isSearchFocused && filteredResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="border-b border-[#f1f5f9] bg-white"
                >
                  {filteredResults.map((result, i) => (
                    <button
                      key={result.id}
                      onClick={() => handleSearchSelect(result)}
                      className="flex items-start gap-3 w-full px-4 py-2.5 hover:bg-[#f8fafc] transition-colors cursor-pointer text-left"
                    >
                      <div className="size-7 rounded-full bg-[#f1f5f9] flex items-center justify-center mt-0.5 shrink-0">
                        <MapPin size={12} className="text-[#64748b]" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-['Inter',sans-serif] font-medium text-[13px] text-[#0f172a] truncate">{result.title}</p>
                        <p className="font-['Inter',sans-serif] text-[11px] text-[#94a3b8] truncate mt-0.5">{result.subtitle}</p>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Saved addresses */}
            {!isSearchFocused && (
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-['Lexend',sans-serif] font-semibold text-[14px] text-[#0f172a]">
                    Saved Addresses
                  </span>
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#1975D2] text-white text-[12px] font-medium hover:bg-[#1565C0] transition-colors cursor-pointer"
                  >
                    <Plus size={12} />
                    Add New
                  </button>
                </div>

                {savedAddresses.map((addr) => {
                  const Icon = getIconForLabel(addr.icon);
                  const isSelected = selectedAddress?.id === addr.id;
                  return (
                    <div
                      key={addr.id}
                      onClick={() => handleSelectAddress(addr)}
                      className={`relative bg-white rounded-[16px] p-3.5 cursor-pointer transition-all border ${
                        isSelected
                          ? "border-[#1975D2] shadow-[0_4px_16px_rgba(25,117,210,0.12)]"
                          : "border-[#f1f5f9] shadow-[0_1px_4px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`size-9 rounded-[10px] flex items-center justify-center shrink-0 ${isSelected ? "bg-[#1975D2]" : "bg-[#f0f7fa]"}`}>
                          <Icon size={16} className={isSelected ? "text-white" : "text-[#1975D2]"} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-['Lexend',sans-serif] font-semibold text-[13px] text-[#0f172a]">{addr.label}</span>
                            {addr.isDefault && (
                              <span className="px-1.5 py-0.5 rounded-full bg-[#e0f2fe] text-[10px] font-medium text-[#1975D2]">Default</span>
                            )}
                          </div>
                          <p className="font-['Inter',sans-serif] text-[11px] text-[#64748b] mt-0.5 leading-[16px] line-clamp-2">{addr.address}</p>
                        </div>
                        <div className="relative shrink-0">
                          <button
                            onClick={(e) => { e.stopPropagation(); setActiveMenu(addr.id); }}
                            className="size-6 rounded-full bg-[#f1f5f9] flex items-center justify-center cursor-pointer"
                          >
                            <MoreVertical size={12} className="text-[#64748b]" />
                          </button>
                          <AnimatePresence>
                            {activeMenu === addr.id && (
                              <motion.div
                                initial={{ opacity: 0, y: -6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                className="absolute right-0 top-8 bg-white border border-[#f1f5f9] rounded-[12px] shadow-[0_4px_12px_rgba(0,0,0,0.08)] z-10 min-w-[140px]"
                              >
                                <button onClick={() => handleEditAddress(addr)} className="flex items-center gap-2 w-full px-3 py-2 hover:bg-[#f8fafc] text-[13px] cursor-pointer rounded-t-[12px]">
                                  <Pencil size={12} className="text-[#1975D2]" /> Edit
                                </button>
                                {!addr.isDefault && (
                                  <button onClick={(e) => { e.stopPropagation(); handleSetDefault(addr.id); setActiveMenu(null); }} className="flex items-center gap-2 w-full px-3 py-2 hover:bg-[#f8fafc] text-[13px] cursor-pointer">
                                    <Star size={12} className="text-[#f59e0b]" /> Set Default
                                  </button>
                                )}
                                <button onClick={(e) => { e.stopPropagation(); handleDeleteAddress(addr.id); setActiveMenu(null); }} className="flex items-center gap-2 w-full px-3 py-2 hover:bg-[#f8fafc] text-[13px] text-[#ef4444] cursor-pointer rounded-b-[12px]">
                                  <Trash2 size={12} /> Delete
                                </button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="mt-2.5 pt-2.5 border-t border-[#f1f5f9] flex items-center gap-1.5">
                          <Check size={12} className="text-[#22c55e]" />
                          <span className="font-['Inter',sans-serif] text-[11px] text-[#22c55e] font-medium">Currently selected</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Confirm button */}
            <div className="p-4 border-t border-[#f1f5f9] shrink-0">
              <PrimaryButton onClick={() => setAddressFormOpen(true)}>
                Confirm Location
              </PrimaryButton>
            </div>
          </div>

          {/* Right panel — map */}
          <div className="flex-1 relative h-[220px] md:h-full order-1 md:order-2 isolate">
            <MapPanel mapCenter={mapCenter} open={open} />
          </div>
        </div>

        {/* Add / Edit address form */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 flex items-end md:items-center md:justify-center"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
                onClick={closeForm}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 10 }}
                transition={{ type: "spring", damping: 28, stiffness: 350 }}
                className="relative w-full md:max-w-[460px] bg-white rounded-t-[24px] md:rounded-[20px] p-6 z-10 md:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] md:border md:border-[#f1f5f9]"
              >
                <div className="md:hidden w-10 h-1 rounded-full bg-[#e2e8f0] mx-auto mb-4" />
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-['Lexend',sans-serif] font-semibold text-[17px] text-[#0f172a]">
                    {editingAddress ? "Edit Address" : "Add New Address"}
                  </h3>
                  <button onClick={closeForm} className="size-8 rounded-full bg-[#f1f5f9] flex items-center justify-center cursor-pointer">
                    <X size={15} className="text-[#64748b]" />
                  </button>
                </div>

                <p className="font-['Inter',sans-serif] font-medium text-[12px] text-[#64748b] mb-2">Label</p>
                <div className="flex gap-2 mb-4 flex-wrap">
                  {LABEL_OPTIONS.map((opt) => {
                    const isActive = newLabel === opt.key;
                    return (
                      <button key={opt.key} onClick={() => setNewLabel(opt.key)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium transition-all cursor-pointer ${isActive ? "bg-[#1975D2] text-white" : "bg-[#f1f5f9] text-[#64748b] hover:bg-[#e2e8f0]"}`}>
                        <opt.icon size={12} />{opt.label}
                      </button>
                    );
                  })}
                </div>

                {newLabel === "other" && (
                  <input type="text" placeholder="Custom label (e.g. Gym, Studio)" value={newCustomLabel}
                    onChange={(e) => setNewCustomLabel(e.target.value)}
                    className="w-full px-4 py-2.5 mb-4 bg-[#f6f8fc] rounded-[12px] text-[13px] text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:ring-2 focus:ring-[#1975D2]/20 font-['Inter',sans-serif]"
                  />
                )}

                <p className="font-['Inter',sans-serif] font-medium text-[12px] text-[#64748b] mb-2">Full Address</p>
                <textarea placeholder="Enter complete address with flat/house no., street, area, city, pincode"
                  value={newAddress} onChange={(e) => setNewAddress(e.target.value)} rows={3}
                  className="w-full px-4 py-3 bg-[#f6f8fc] rounded-[14px] text-[13px] text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:ring-2 focus:ring-[#1975D2]/20 resize-none font-['Inter',sans-serif]"
                />
                <PrimaryButton onClick={editingAddress ? handleSaveEdit : handleAddAddress} disabled={!newAddress.trim()} className="mt-4">
                  {editingAddress ? "Save Changes" : "Save Address"}
                </PrimaryButton>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>

      <AddressFormModal
        open={addressFormOpen}
        onOpenChange={(v) => {
          setAddressFormOpen(v);
          if (!v) onOpenChange(false); // close location modal too after saving
        }}
      />
    </Dialog>
  );
}
