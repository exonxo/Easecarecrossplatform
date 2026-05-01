import { useState } from "react";
import { MapPin, Check } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";

const ADDRESS_TYPES = [
  { key: "home", label: "Home" },
  { key: "work", label: "Work" },
  { key: "other", label: "Other" },
];

interface AddressForm {
  type: string;
  flatHouseNo: string;
  buildingName: string;
  streetColony: string;
  landmark: string;
  pinCode: string;
  mobile: string;
}

const EMPTY_FORM: AddressForm = {
  type: "home",
  flatHouseNo: "",
  buildingName: "",
  streetColony: "",
  landmark: "",
  pinCode: "",
  mobile: "",
};

function Field({
  label,
  required,
  hint,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-['Inter',sans-serif] font-medium text-[13px] text-[#374151]">
        {label}
        {required && <span className="text-[#ef4444] ml-0.5">*</span>}
        {hint && <span className="ml-1.5 font-normal text-[11px] text-[#9ca3af]">{hint}</span>}
      </label>
      {children}
      {error && <p className="text-[11px] text-[#ef4444] font-['Inter',sans-serif]">{error}</p>}
    </div>
  );
}

const inputCls = (hasError?: boolean) =>
  `w-full bg-[#f9fafb] border rounded-[10px] px-3.5 py-2.5 font-['Inter',sans-serif] text-[14px] text-[#111827] placeholder:text-[#9ca3af] outline-none focus:ring-2 transition-all ${
    hasError
      ? "border-[#ef4444] focus:border-[#ef4444] focus:ring-[rgba(239,68,68,0.12)]"
      : "border-[#e5e7eb] focus:border-[#1975D2] focus:ring-[rgba(25,117,210,0.12)]"
  }`;

interface AddressFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddressFormModal({ open, onOpenChange }: AddressFormModalProps) {
  const [form, setForm] = useState<AddressForm>(EMPTY_FORM);
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof AddressForm, string>>>({});

  const set = (key: keyof AddressForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const e: typeof errors = {};
    if (!form.flatHouseNo.trim()) e.flatHouseNo = "Required";
    if (!form.streetColony.trim()) e.streetColony = "Required";
    if (!/^\d{6}$/.test(form.pinCode)) e.pinCode = "Enter a valid 6-digit PIN code";
    if (!/^[6-9]\d{9}$/.test(form.mobile)) e.mobile = "Enter a valid 10-digit mobile number";
    return e;
  };

  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setForm(EMPTY_FORM);
      setErrors({});
      onOpenChange(false);
    }, 1200);
  };

  const handleClose = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    setSaved(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] w-[95vw] p-0 gap-0 overflow-hidden">
        <DialogTitle className="sr-only">Add Address Details</DialogTitle>

        {/* Header */}
        <div className="flex items-center gap-2.5 px-5 py-4 border-b border-[#f1f5f9]">
          <div className="size-8 rounded-full bg-[#EBF3FC] flex items-center justify-center shrink-0">
            <MapPin size={14} className="text-[#1975D2]" strokeWidth={2.2} />
          </div>
          <span className="font-['Lexend',sans-serif] font-semibold text-[15px] text-[#0f172a]">
            Add Address Details
          </span>
        </div>

        {/* Form */}
        <div className="px-5 py-5 flex flex-col gap-4 overflow-y-auto max-h-[70vh]">

          {/* Address type */}
          <Field label="Address Type" required>
            <div className="flex gap-2">
              {ADDRESS_TYPES.map((t) => (
                <button
                  key={t.key}
                  onClick={() => set("type", t.key)}
                  className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all cursor-pointer border ${
                    form.type === t.key
                      ? "bg-[#1975D2] text-white border-[#1975D2]"
                      : "bg-white text-[#64748b] border-[#e5e7eb] hover:border-[#1975D2] hover:text-[#1975D2]"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </Field>

          {/* Flat / House No + Building Name */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="Flat / House No." required error={errors.flatHouseNo}>
              <input
                type="text"
                placeholder="e.g. 4B, Flat 12"
                value={form.flatHouseNo}
                onChange={(e) => set("flatHouseNo", e.target.value)}
                className={inputCls(!!errors.flatHouseNo)}
              />
            </Field>
            <Field label="Building / Apartment" hint="(optional)">
              <input
                type="text"
                placeholder="e.g. Greenview Apts"
                value={form.buildingName}
                onChange={(e) => set("buildingName", e.target.value)}
                className={inputCls()}
              />
            </Field>
          </div>

          {/* Street / Colony */}
          <Field label="Street / Colony / Area" required error={errors.streetColony}>
            <input
              type="text"
              placeholder="e.g. Salt Lake Sector V"
              value={form.streetColony}
              onChange={(e) => set("streetColony", e.target.value)}
              className={inputCls(!!errors.streetColony)}
            />
          </Field>

          {/* Landmark */}
          <Field label="Landmark" hint="(optional)">
            <input
              type="text"
              placeholder="e.g. Near City Centre Mall"
              value={form.landmark}
              onChange={(e) => set("landmark", e.target.value)}
              className={inputCls()}
            />
          </Field>

          {/* PIN Code + Mobile */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="PIN Code" required error={errors.pinCode}>
              <input
                type="tel"
                inputMode="numeric"
                maxLength={6}
                placeholder="e.g. 700091"
                value={form.pinCode}
                onChange={(e) => set("pinCode", e.target.value.replace(/\D/g, "").slice(0, 6))}
                className={inputCls(!!errors.pinCode)}
              />
            </Field>
            <Field label="Mobile Number" required error={errors.mobile}>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-['Inter',sans-serif] text-[13px] text-[#374151] pointer-events-none">
                  +91
                </span>
                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="98765 43210"
                  value={form.mobile}
                  onChange={(e) => set("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))}
                  className={`${inputCls(!!errors.mobile)} pl-10`}
                />
              </div>
            </Field>
          </div>

        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-[#f1f5f9] flex gap-3">
          <button
            onClick={handleClose}
            className="flex-1 py-2.5 rounded-[10px] border border-[#e5e7eb] font-['Inter',sans-serif] font-medium text-[14px] text-[#374151] hover:bg-[#f9fafb] transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className={`flex-1 py-2.5 rounded-[10px] font-['Inter',sans-serif] font-semibold text-[14px] text-white transition-all cursor-pointer flex items-center justify-center gap-2 ${
              saved ? "bg-[#22c55e]" : "bg-[#1975D2] hover:bg-[#1565b8] active:scale-[0.98]"
            }`}
          >
            {saved ? <><Check size={15} strokeWidth={2.5} /> Saved!</> : "Save Address"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
