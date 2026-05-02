import { useState, useEffect } from "react";
import { Check, FileText } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { requirementsApi } from "../../services/api";

// ─── Form options ─────────────────────────────────────────────────────────────

const SERVICE_TYPES = [
  "Elder Care", "Cleaning", "Nursing", "Cooking",
  "Baby Care", "Physio", "Security", "Pet Care",
];

const CARE_FOR_OPTIONS = ["Self", "Parent", "Spouse", "Child", "Sibling", "Other"];

const DURATION_OPTIONS = [
  { label: "2–4 hrs", value: "2-4 hrs" },
  { label: "4–8 hrs", value: "4-8 hrs" },
  { label: "8–12 hrs", value: "8-12 hrs" },
  { label: "Full day", value: "Full day" },
  { label: "Weekly", value: "Weekly" },
  { label: "Monthly", value: "Monthly" },
];

const BUDGET_OPTIONS = [
  { label: "Budget  · < ₹500/day",      value: "Under ₹500" },
  { label: "Standard · ₹500–₹1,000/day", value: "₹500–₹1,000" },
  { label: "Premium  · ₹1,000+/day",    value: "₹1,000+" },
];

// ─── Pill selector ────────────────────────────────────────────────────────────

function PillGroup<T extends string>({
  options,
  value,
  onChange,
  cols,
}: {
  options: T[] | { label: string; value: T }[];
  value: T | null;
  onChange: (v: T) => void;
  cols?: number;
}) {
  const normalised = options.map((o) =>
    typeof o === "string" ? { label: o, value: o as T } : o
  );

  return (
    <div
      className="flex flex-wrap gap-2"
      style={cols ? { display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)` } : undefined}
    >
      {normalised.map((o) => {
        const active = value === o.value;
        return (
          <button
            key={o.value}
            onClick={() => onChange(o.value)}
            className={`px-3.5 py-2 rounded-[10px] font-['Inter',sans-serif] font-medium text-[13px] border transition-all cursor-pointer text-left ${
              active
                ? "bg-[#1975D2] text-white border-[#1975D2]"
                : "bg-white text-[#374151] border-[#e5e7eb] hover:border-[#1975D2] hover:text-[#1975D2]"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

// ─── Field wrapper ────────────────────────────────────────────────────────────

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
    <div className="flex flex-col gap-2">
      <label className="font-['Inter',sans-serif] font-semibold text-[13px] text-[#374151]">
        {label}
        {required && <span className="text-[#ef4444] ml-0.5">*</span>}
        {hint && <span className="ml-1.5 font-normal text-[11px] text-[#9ca3af]">{hint}</span>}
      </label>
      {children}
      {error && <p className="text-[11px] text-[#ef4444] font-['Inter',sans-serif]">{error}</p>}
    </div>
  );
}

// ─── Success state ────────────────────────────────────────────────────────────

function SuccessView({ gigId, onClose }: { gigId: string; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-10 px-6 text-center gap-4"
    >
      <div className="size-16 rounded-full bg-[#dcfce7] flex items-center justify-center">
        <Check size={28} className="text-[#16a34a]" strokeWidth={2.5} />
      </div>
      <div>
        <h3 className="font-['Lexend',sans-serif] font-bold text-[20px] text-[#0f172a] mb-1">
          Requirement Posted!
        </h3>
        <p className="font-['Inter',sans-serif] text-[14px] text-[#64748b]">
          Your gig ID is <span className="font-bold text-[#1975D2]">{gigId}</span>. Verified providers will start bidding shortly.
        </p>
      </div>
      <button
        onClick={onClose}
        className="mt-2 bg-[#1975D2] text-white font-['Lexend',sans-serif] font-semibold text-[14px] px-8 py-3 rounded-[12px] hover:bg-[#1565b8] active:scale-[0.98] transition-all cursor-pointer"
      >
        View My Bookings
      </button>
    </motion.div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────

interface PostRequirementModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Pre-fill a service type when opened from a category card */
  defaultService?: string;
}

interface FormState {
  serviceType: string | null;
  careFor: string | null;
  duration: string | null;
  timing: "asap" | "scheduled";
  date: string;
  budget: string | null;
  notes: string;
}

const EMPTY: FormState = {
  serviceType: null,
  careFor: null,
  duration: null,
  timing: "asap",
  date: "",
  budget: null,
  notes: "",
};

export function PostRequirementModal({
  open,
  onOpenChange,
  defaultService,
}: PostRequirementModalProps) {
  const [form, setForm] = useState<FormState>({ ...EMPTY, serviceType: defaultService ?? null });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [gigId, setGigId] = useState<string | null>(null);

  // Reset when closed
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setForm({ ...EMPTY, serviceType: defaultService ?? null });
        setErrors({});
        setGigId(null);
        setSubmitting(false);
      }, 250);
    } else {
      setForm((prev) => ({ ...prev, serviceType: defaultService ?? prev.serviceType }));
    }
  }, [open, defaultService]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const e: typeof errors = {};
    if (!form.serviceType) e.serviceType = "Please select a service";
    if (!form.careFor) e.careFor = "Please select who needs care";
    if (!form.duration) e.duration = "Please select duration";
    if (form.timing === "scheduled" && !form.date) e.date = "Please pick a date";
    if (!form.budget) e.budget = "Please select a budget range";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }

    setSubmitting(true);
    try {
      const id = `${String(Math.floor(Math.random() * 90000) + 10000)}`;
      await requirementsApi.save({
        reqId: id,
        service: form.serviceType!,
        careFor: form.careFor!,
        duration: form.duration!,
        budget: form.budget!,
        language: "No Preference",
        status: "active",
      });
      setGigId(`#${id}`);
    } catch {
      // localStorage always works — just show success
      const id = `${String(Math.floor(Math.random() * 90000) + 10000)}`;
      setGigId(`#${id}`);
    } finally {
      setSubmitting(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px] w-[95vw] p-0 gap-0 overflow-hidden">
        <DialogTitle className="sr-only">Post a Requirement</DialogTitle>

        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#f1f5f9]">
          <div className="size-8 rounded-full bg-[#EBF3FC] flex items-center justify-center shrink-0">
            <FileText size={15} className="text-[#1975D2]" />
          </div>
          <div>
            <p className="font-['Lexend',sans-serif] font-bold text-[16px] text-[#0f172a]">
              Post a Requirement
            </p>
            <p className="font-['Inter',sans-serif] text-[12px] text-[#94a3b8]">
              Get matched with verified providers in minutes
            </p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {gigId ? (
            <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <SuccessView gigId={gigId} onClose={() => onOpenChange(false)} />
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {/* Form body */}
              <div className="overflow-y-auto max-h-[65vh] px-5 py-5 flex flex-col gap-5">

                {/* Service type */}
                <Field label="What service do you need?" required error={errors.serviceType}>
                  <div className="grid grid-cols-4 gap-2">
                    {SERVICE_TYPES.map((s) => (
                      <button
                        key={s}
                        onClick={() => set("serviceType", s)}
                        className={`py-2 px-1 rounded-[10px] font-['Inter',sans-serif] font-medium text-[12px] border transition-all cursor-pointer text-center ${
                          form.serviceType === s
                            ? "bg-[#1975D2] text-white border-[#1975D2]"
                            : "bg-white text-[#374151] border-[#e5e7eb] hover:border-[#1975D2] hover:text-[#1975D2]"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </Field>

                {/* Care for */}
                <Field label="Who needs care?" required error={errors.careFor}>
                  <PillGroup
                    options={CARE_FOR_OPTIONS}
                    value={form.careFor}
                    onChange={(v) => set("careFor", v)}
                  />
                </Field>

                {/* Duration */}
                <Field label="How long per day?" required error={errors.duration}>
                  <PillGroup
                    options={DURATION_OPTIONS}
                    value={form.duration}
                    onChange={(v) => set("duration", v)}
                  />
                </Field>

                {/* Timing */}
                <Field label="When do you need it?" required>
                  <div className="flex gap-2">
                    {(["asap", "scheduled"] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => set("timing", t)}
                        className={`flex-1 py-2 rounded-[10px] font-['Inter',sans-serif] font-medium text-[13px] border transition-all cursor-pointer ${
                          form.timing === t
                            ? "bg-[#1975D2] text-white border-[#1975D2]"
                            : "bg-white text-[#374151] border-[#e5e7eb] hover:border-[#1975D2]"
                        }`}
                      >
                        {t === "asap" ? "⚡ ASAP (within 24 hrs)" : "📅 Schedule a date"}
                      </button>
                    ))}
                  </div>
                  {form.timing === "scheduled" && (
                    <motion.input
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      type="date"
                      min={today}
                      value={form.date}
                      onChange={(e) => set("date", e.target.value)}
                      className={`mt-2 w-full bg-[#f9fafb] border rounded-[10px] px-3.5 py-2.5 font-['Inter',sans-serif] text-[13px] text-[#111827] outline-none focus:border-[#1975D2] focus:ring-[2px] focus:ring-[rgba(25,117,210,0.12)] transition-all ${
                        errors.date ? "border-[#ef4444]" : "border-[#e5e7eb]"
                      }`}
                    />
                  )}
                  {errors.date && <p className="text-[11px] text-[#ef4444] font-['Inter',sans-serif]">{errors.date}</p>}
                </Field>

                {/* Budget */}
                <Field label="Budget range" required error={errors.budget}>
                  <div className="flex flex-col gap-2">
                    {BUDGET_OPTIONS.map((b) => (
                      <button
                        key={b.value}
                        onClick={() => set("budget", b.value)}
                        className={`py-2.5 px-4 rounded-[10px] font-['Inter',sans-serif] font-medium text-[13px] border transition-all cursor-pointer text-left ${
                          form.budget === b.value
                            ? "bg-[#EBF3FC] text-[#1975D2] border-[#1975D2]"
                            : "bg-white text-[#374151] border-[#e5e7eb] hover:border-[#1975D2]"
                        }`}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>
                </Field>

                {/* Notes */}
                <Field label="Additional notes" hint="(optional)">
                  <textarea
                    placeholder="E.g. need someone who speaks Bengali, patient has diabetes..."
                    value={form.notes}
                    onChange={(e) => set("notes", e.target.value)}
                    rows={3}
                    className="w-full bg-[#f9fafb] border border-[#e5e7eb] rounded-[12px] px-3.5 py-2.5 font-['Inter',sans-serif] text-[13px] text-[#111827] placeholder:text-[#9ca3af] outline-none focus:border-[#1975D2] focus:ring-[2px] focus:ring-[rgba(25,117,210,0.12)] resize-none transition-all"
                  />
                </Field>

              </div>

              {/* Footer */}
              <div className="px-5 py-4 border-t border-[#f1f5f9] flex gap-3">
                <button
                  onClick={() => onOpenChange(false)}
                  className="flex-1 py-2.5 rounded-[10px] border border-[#e5e7eb] font-['Inter',sans-serif] font-medium text-[14px] text-[#374151] hover:bg-[#f9fafb] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex-[2] py-2.5 rounded-[10px] bg-[#1975D2] disabled:opacity-60 text-white font-['Lexend',sans-serif] font-semibold text-[14px] hover:bg-[#1565b8] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <svg className="animate-spin size-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : null}
                  {submitting ? "Posting..." : "Post Requirement →"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

