import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";

const SERVICES = [
  { id: "1", name: "Home Nursing Care", category: "Medical" },
  { id: "2", name: "Physiotherapy at Home", category: "Medical" },
  { id: "3", name: "Doctor Visit", category: "Medical" },
  { id: "4", name: "Elder Care Companion", category: "Care" },
  { id: "5", name: "Post-Surgery Care", category: "Medical" },
  { id: "6", name: "Dementia Care", category: "Specialised" },
  { id: "7", name: "Palliative Care", category: "Specialised" },
  { id: "8", name: "Daily Living Assistance", category: "Care" },
  { id: "9", name: "Medication Management", category: "Medical" },
  { id: "10", name: "Lab Tests at Home", category: "Diagnostics" },
  { id: "11", name: "ECG at Home", category: "Diagnostics" },
  { id: "12", name: "Wound Care & Dressing", category: "Medical" },
];

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SERVICES;
    return SERVICES.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
    );
  }, [query]);

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => setQuery(""), 200);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 gap-0 overflow-hidden">
        <DialogTitle className="sr-only">Search Services</DialogTitle>

        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[#f1f5f9]">
          <Search size={16} className="text-[#94a3b8] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services or packages..."
            autoFocus
            className="flex-1 bg-transparent font-['Lexend',sans-serif] text-[15px] text-[#0f172a] placeholder:text-[#94a3b8] outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="size-5 rounded-full bg-[#e2e8f0] flex items-center justify-center hover:bg-[#cbd5e1] transition-colors cursor-pointer"
            >
              <X size={11} className="text-[#64748b]" />
            </button>
          )}
        </div>

        {/* Results */}
        <div className="max-h-[360px] overflow-y-auto py-2">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 gap-2">
              <Search size={24} className="text-[#cbd5e1]" />
              <p className="font-['Lexend',sans-serif] text-[13px] text-[#94a3b8]">
                No services found for "{query}"
              </p>
            </div>
          ) : (
            filtered.map((service) => (
              <button
                key={service.id}
                onClick={handleClose}
                className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-[#f8fafc] transition-colors cursor-pointer group"
              >
                <span className="font-['Lexend',sans-serif] text-[14px] text-[#1e293b] font-medium group-hover:text-[#1975D2] transition-colors text-left">
                  {service.name}
                </span>
                <span className="font-['Lexend',sans-serif] text-[11px] text-[#94a3b8] bg-[#f1f5f9] px-2 py-0.5 rounded-full shrink-0 ml-3">
                  {service.category}
                </span>
              </button>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
