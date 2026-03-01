import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Check, Search, Zap } from "lucide-react";
import { PrimaryButton } from "../shared/PrimaryButton";

// ─── Types ───
export interface QuestionnaireData {
  careFor: string;
  patientAge: string;
  patientGender: string;
  serviceType: string;
  duration: string;
  language: string;
  budgetLevel: number;
}

export const STEPS = [
  "careFor",
  "patientInfo",
  "serviceType",
  "duration",
  "language",
  "budget",
  "review",
  "choose",
] as const;

// ─── Radio Option ───
function RadioOption({
  title,
  subtitle,
  selected,
  onSelect,
}: {
  title: string;
  subtitle: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`w-full rounded-[16px] relative cursor-pointer transition-all ${
        selected ? "bg-[#eff6ff]" : "bg-white hover:bg-[#fafbfc]"
      }`}
    >
      <div
        aria-hidden="true"
        className={`absolute inset-0 pointer-events-none rounded-[16px] border-2 transition-colors ${
          selected ? "border-[#1975d2]" : "border-[#f1f5f9]"
        }`}
      />
      <div className="flex items-center px-[18px] py-[16px]">
        <div className="flex-1 text-left">
          <p
            className={`font-['Lexend',sans-serif] font-semibold text-[16px] leading-[24px] ${
              selected ? "text-[#0f172a]" : "text-[#334155]"
            }`}
          >
            {title}
          </p>
          <p className="font-['Inter',sans-serif] text-[13px] leading-[19px] text-[#64748b]">
            {subtitle}
          </p>
        </div>
        <div
          className={`size-[24px] rounded-full shrink-0 flex items-center justify-center transition-all ${
            selected ? "bg-[#1975d2]" : "border-2 border-[#cbd5e1]"
          }`}
        >
          {selected && <Check size={14} strokeWidth={2.5} className="text-white" />}
        </div>
      </div>
    </button>
  );
}

// ─── Progress Bar ───
function ProgressBar({ step, total }: { step: number; total: number }) {
  const pct = ((step + 1) / total) * 100;
  return (
    <div className="bg-[#e2e8f0] h-[6px] rounded-full w-full overflow-hidden">
      <motion.div
        className="bg-gradient-to-r from-[#1975d2] to-[#2563eb] h-full rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}

// ─── Budget Slider ───
export const BUDGET_TIERS = [
  { label: "Basic", range: "₹100–150", desc: "Entry-level caregivers" },
  { label: "Experienced", range: "₹150–250", desc: "Experienced professionals" },
  { label: "Medical", range: "₹250–400", desc: "Medical-trained caregivers" },
];

function BudgetSlider({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const tier = BUDGET_TIERS[value];
  return (
    <div className="w-full pt-4">
      <div className="relative pb-4">
        <input
          type="range"
          min={0}
          max={2}
          step={1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-[8px] appearance-none bg-[#e2e8f0] rounded-full outline-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-[28px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-[#0f172b] [&::-webkit-slider-thumb]:shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1)]"
        />
      </div>
      <div className="bg-[#f8fafc] border border-[#f1f5f9] rounded-[14px] p-6 text-center">
        <p className="font-['Inter',sans-serif] font-semibold text-[18px] text-[#0f172b]">
          {tier.range}
        </p>
        <p className="font-['Inter',sans-serif] font-semibold text-[16px] text-[#0f172b] mt-1">
          {tier.label}
        </p>
        <p className="font-['Inter',sans-serif] text-[14px] text-[#62748e] mt-1">
          {tier.desc}
        </p>
      </div>
      <div className="flex justify-between mt-2 px-1">
        {BUDGET_TIERS.map((t) => (
          <span
            key={t.label}
            className="font-['Inter',sans-serif] text-[12px] text-[#90a1b9]"
          >
            {t.label}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Review Summary ───
function ReviewSummary({
  data,
  onEdit,
}: {
  data: QuestionnaireData;
  onEdit: () => void;
}) {
  const rows = [
    { label: "Care For", value: data.careFor },
    {
      label: "Patient",
      value: `${data.patientAge} years old, ${data.patientGender}`,
    },
    { label: "Service", value: data.serviceType },
    { label: "Duration", value: data.duration },
    { label: "Language", value: data.language },
    { label: "Budget", value: BUDGET_TIERS[data.budgetLevel].label },
  ];

  return (
    <div className="w-full">
      <div className="bg-[#f8fafc] rounded-[14px] p-6">
        {rows.map((row, idx) => (
          <div
            key={row.label}
            className={`flex items-start justify-between pb-3 ${
              idx < rows.length - 1 ? "mb-4 border-b border-[#e2e8f0]" : ""
            }`}
          >
            <span className="font-['Inter',sans-serif] font-semibold text-[14px] text-[#62748e]">
              {row.label}
            </span>
            <span className="font-['Inter',sans-serif] font-semibold text-[16px] text-[#0f172b] capitalize text-right">
              {row.value || "—"}
            </span>
          </div>
        ))}
      </div>
      <button
        onClick={onEdit}
        className="w-full mt-4 bg-white border border-[#e2e8f0] rounded-[14px] py-3 font-['Inter',sans-serif] font-semibold text-[16px] text-[#0f172b] cursor-pointer hover:bg-[#f9fafb] transition-colors shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)]"
      >
        Edit
      </button>
    </div>
  );
}

// ─── Success Screen ───
function SuccessScreen({
  data,
  onDone,
}: {
  data: QuestionnaireData;
  onDone: () => void;
}) {
  const gigId = `#${String(Math.floor(Math.random() * 90000) + 10000)}`;
  const rows = [
    { label: "Gig ID", value: gigId },
    { label: "Care For", value: data.careFor },
    {
      label: "Patient",
      value: `${data.patientAge} years old, ${data.patientGender}`,
    },
    { label: "Duration", value: data.duration },
    { label: "Language", value: data.language },
    { label: "Budget", value: BUDGET_TIERS[data.budgetLevel].label },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center pt-10 pb-8 px-8"
    >
      <div className="size-[92px] flex items-center justify-center mb-4">
        <svg width={92} height={92} viewBox="0 0 92 92" fill="none">
          <path
            clipRule="evenodd"
            d="M46 92C71.4051 92 92 71.4051 92 46C92 20.5949 71.4051 0 46 0C20.5949 0 0 20.5949 0 46C0 71.4051 20.5949 92 46 92ZM64.2929 38.2929C65.0739 37.5119 65.0739 36.2881 64.2929 35.5071C63.5119 34.7261 62.2881 34.7261 61.5071 35.5071L41.4 55.6142L30.4929 44.7071C29.7119 43.9261 28.4881 43.9261 27.7071 44.7071C26.9261 45.4881 26.9261 46.7119 27.7071 47.4929L40.0071 59.7929C40.7881 60.5739 42.0119 60.5739 42.7929 59.7929L64.2929 38.2929Z"
            fill="#0f172b"
            fillRule="evenodd"
          />
        </svg>
      </div>
      <h2 className="font-['Inter',sans-serif] font-semibold text-[24px] text-[#0f172b] mb-8">
        Request Posted!
      </h2>
      <div className="bg-[#f8fafc] rounded-[14px] p-6 w-full">
        {rows.map((row, idx) => (
          <div
            key={row.label}
            className={`flex items-start justify-between pb-3 ${
              idx < rows.length - 1 ? "mb-4 border-b border-[#e2e8f0]" : ""
            }`}
          >
            <span className="font-['Inter',sans-serif] font-semibold text-[14px] text-[#62748e]">
              {row.label}
            </span>
            <span className="font-['Inter',sans-serif] font-semibold text-[16px] text-[#0f172b] capitalize text-right">
              {row.value}
            </span>
          </div>
        ))}
      </div>
      <button
        onClick={onDone}
        className="w-full mt-8 bg-[#0f172b] rounded-[14px] py-3 font-['Inter',sans-serif] font-semibold text-[16px] text-white cursor-pointer shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)] active:scale-[0.98] transition-transform"
      >
        Done
      </button>
    </motion.div>
  );
}

// ─── Main Questionnaire ───
export function CareQuestionnaire({
  onClose,
  onQuickFind,
  onBidPost,
}: {
  onClose: () => void;
  onQuickFind: (data: QuestionnaireData) => void;
  onBidPost?: (data: QuestionnaireData) => void;
}) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [data, setData] = useState<QuestionnaireData>({
    careFor: "",
    patientAge: "",
    patientGender: "Male",
    serviceType: "",
    duration: "",
    language: "",
    budgetLevel: 0,
  });

  const update = useCallback(
    (field: keyof QuestionnaireData, value: string | number) => {
      setData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const goNext = () => {
    if (step < STEPS.length - 1) {
      setDirection(1);
      setStep((s) => s + 1);
    }
  };
  const goBack = () => {
    if (step > 0) {
      setDirection(-1);
      setStep((s) => s - 1);
    }
  };
  const goToStep = (s: number) => {
    setDirection(s > step ? 1 : -1);
    setStep(s);
  };

  const canNext = (): boolean => {
    switch (STEPS[step]) {
      case "careFor":
        return !!data.careFor;
      case "patientInfo":
        return !!data.patientAge;
      case "serviceType":
        return !!data.serviceType;
      case "duration":
        return !!data.duration;
      case "language":
        return !!data.language;
      case "budget":
        return true;
      case "review":
        return true;
      case "choose":
        return true;
      default:
        return true;
    }
  };

  const renderStep = () => {
    switch (STEPS[step]) {
      case "careFor":
        return (
          <StepLayout
            title="Who is this care for?"
            subtitle="We'll tailor the experience for them."
          >
            <div className="flex flex-col gap-3">
              {[
                { v: "Parent", s: "Mom or Dad" },
                { v: "Grandparent", s: "Grandma or Grandpa" },
                { v: "Myself", s: "For my own care" },
                { v: "Spouse", s: "Husband or Wife" },
              ].map((opt) => (
                <RadioOption
                  key={opt.v}
                  title={`My ${opt.v === "Myself" ? "" : ""}${opt.v}`}
                  subtitle={opt.s}
                  selected={data.careFor === opt.v}
                  onSelect={() => update("careFor", opt.v)}
                />
              ))}
            </div>
          </StepLayout>
        );

      case "patientInfo":
        return (
          <StepLayout
            title={`How old is the ${data.careFor.toLowerCase()}?`}
            subtitle="This helps us find caregivers with the right experience."
          >
            <div className="bg-white rounded-[24px] border border-[#f1f5f9] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)] p-8 mt-4">
              <input
                type="number"
                value={data.patientAge}
                onChange={(e) => update("patientAge", e.target.value)}
                placeholder="Eg. 78"
                className="w-full text-center font-['Inter',sans-serif] font-semibold text-[36px] text-[#0f172b] placeholder-[#cad5e2] outline-none border-b-2 border-[#e2e8f0] pb-3 bg-transparent"
              />
              <div className="flex gap-3 mt-6 justify-center">
                {["Male", "Female"].map((g) => (
                  <button
                    key={g}
                    onClick={() => update("patientGender", g)}
                    className={`px-5 py-2 rounded-full font-['Inter',sans-serif] font-semibold text-[14px] cursor-pointer transition-all ${
                      data.patientGender === g
                        ? "bg-[#0f172b] text-white"
                        : "bg-[#f1f5f9] text-[#64748b] hover:bg-[#e2e8f0]"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </StepLayout>
        );

      case "serviceType":
        return (
          <StepLayout
            title="What type of care do you need?"
            subtitle="Select the primary service."
          >
            <div className="flex flex-col gap-3">
              {[
                { v: "Housekeeping", s: "Cleaning & home maintenance" },
                { v: "Parental Care", s: "Daily eldercare support" },
                { v: "Medical Care", s: "Nursing & medical attention" },
                { v: "Child Education", s: "Tutoring & childcare" },
              ].map((opt) => (
                <RadioOption
                  key={opt.v}
                  title={opt.v}
                  subtitle={opt.s}
                  selected={data.serviceType === opt.v}
                  onSelect={() => update("serviceType", opt.v)}
                />
              ))}
            </div>
          </StepLayout>
        );

      case "duration":
        return (
          <StepLayout
            title="How long do you need care?"
            subtitle="Select the daily duration."
          >
            <div className="flex flex-col gap-3">
              {[
                { v: "4 Hours", s: "Part-time assistance" },
                { v: "8 Hours", s: "Full day support" },
                { v: "12 Hours", s: "Extended day support" },
                { v: "24 Hours", s: "Live-in care" },
              ].map((opt) => (
                <RadioOption
                  key={opt.v}
                  title={opt.v}
                  subtitle={opt.s}
                  selected={data.duration === opt.v}
                  onSelect={() => update("duration", opt.v)}
                />
              ))}
            </div>
          </StepLayout>
        );

      case "language":
        return (
          <StepLayout
            title="Language preference?"
            subtitle="Select preferred caregiver language."
          >
            <div className="flex flex-col gap-3">
              {[
                { v: "No Preference", s: "Any language is fine" },
                { v: "Hindi", s: "Hindi speaking" },
                { v: "English", s: "English speaking" },
                { v: "Bengali", s: "Bengali speaking" },
              ].map((opt) => (
                <RadioOption
                  key={opt.v}
                  title={opt.v}
                  subtitle={opt.s}
                  selected={data.language === opt.v}
                  onSelect={() => update("language", opt.v)}
                />
              ))}
            </div>
          </StepLayout>
        );

      case "budget":
        return (
          <StepLayout
            title="What is your budget?"
            subtitle="Per hour rates. You can change this later."
          >
            <BudgetSlider
              value={data.budgetLevel}
              onChange={(v) => update("budgetLevel", v)}
            />
          </StepLayout>
        );

      case "review":
        return (
          <StepLayout
            title="Please check once"
            subtitle="Make sure everything looks right."
          >
            <ReviewSummary data={data} onEdit={() => goToStep(0)} />
          </StepLayout>
        );

      case "choose":
        return (
          <StepLayout
            title="How would you like to proceed?"
            subtitle="Choose your preferred way to find care."
          >
            <div className="flex flex-col gap-4 mt-2">
              <button
                onClick={() => onQuickFind(data)}
                className="relative bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] rounded-[16px] px-6 py-5 flex items-center gap-4 cursor-pointer shadow-[0px_4px_14px_-2px_rgba(25,117,210,0.35)] hover:shadow-[0px_6px_20px_-2px_rgba(25,117,210,0.45)] active:scale-[0.98] transition-all overflow-hidden"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
                <div className="size-[44px] rounded-[12px] bg-white/15 backdrop-blur-sm flex items-center justify-center shrink-0 relative">
                  <Zap size={22} className="text-white" />
                </div>
                <div className="text-left relative">
                  <p className="font-['Lexend',sans-serif] font-bold text-[16px] text-white leading-[24px]">
                    Quick Find
                  </p>
                  <p className="font-['Inter',sans-serif] text-[12px] text-white/70 leading-[18px]">
                    Instant match with available caregivers
                  </p>
                </div>
              </button>
              <button
                onClick={() => {
                  if (onBidPost) {
                    onBidPost(data);
                  } else {
                    setShowSuccess(true);
                  }
                }}
                className="bg-white rounded-[16px] px-6 py-5 flex items-center gap-4 cursor-pointer border border-[#e2e8f0] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.06)] hover:border-[#cbd5e1] hover:shadow-[0px_4px_12px_-2px_rgba(0,0,0,0.08)] active:scale-[0.98] transition-all"
              >
                <div className="size-[44px] rounded-[12px] bg-[#f0fdf4] flex items-center justify-center shrink-0">
                  <Search size={22} className="text-[#16a34a]" />
                </div>
                <div className="text-left">
                  <p className="font-['Lexend',sans-serif] font-bold text-[16px] text-[#0f172a] leading-[24px]">
                    Post as Bid
                  </p>
                  <p className="font-['Inter',sans-serif] text-[12px] text-[#64748b] leading-[18px]">
                    Get competitive offers from agencies
                  </p>
                </div>
              </button>
            </div>
          </StepLayout>
        );

      default:
        return null;
    }
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex flex-col">
        <SuccessScreen data={data} onDone={onClose} />
      </div>
    );
  }

  const isChooseStep = STEPS[step] === "choose";

  return (
    <div className="fixed inset-0 z-50 bg-[#f6f8fc] flex flex-col">
      {/* Top bar */}
      <div className="shrink-0 px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onClose}
            className="size-[42px] rounded-full bg-white border border-[#f1f5f9] flex items-center justify-center cursor-pointer hover:bg-[#f8fafc] transition-colors shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
          >
            <X size={22} className="text-[#0f172a]" />
          </button>
          <span className="font-['Lexend',sans-serif] font-semibold text-[12px] text-[#94a3b8] tracking-[0.5px] uppercase">
            Step {step + 1} of {STEPS.length}
          </span>
          <div className="size-[42px]" />
        </div>
        <ProgressBar step={step} total={STEPS.length} />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait" custom={direction}>
          {isChooseStep ? (
            <motion.div
              key="choose-popup"
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center"
            >
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
                onClick={onClose}
              />
              {/* Popup card */}
              <div className="relative w-full max-w-[380px] mx-4 mb-4 sm:mb-0 bg-white rounded-[24px] shadow-[0px_24px_48px_-12px_rgba(0,0,0,0.25)] overflow-hidden">
                <div className="px-6 pt-6 pb-2">
                  <h2 className="font-['Lexend',sans-serif] font-bold text-[20px] text-[#0f172a] leading-[28px]">
                    How would you like to proceed?
                  </h2>
                  <p className="font-['Inter',sans-serif] text-[14px] text-[#64748b] leading-[22px] mt-1">
                    Choose your preferred way to find care.
                  </p>
                </div>
                <div className="px-6 pb-6 pt-3 flex flex-col gap-3">
                  <button
                    onClick={() => onQuickFind(data)}
                    className="relative bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] rounded-[16px] px-5 py-4 flex items-center gap-4 cursor-pointer shadow-[0px_4px_14px_-2px_rgba(25,117,210,0.35)] hover:shadow-[0px_6px_20px_-2px_rgba(25,117,210,0.45)] active:scale-[0.98] transition-all overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
                    <div className="size-[40px] rounded-[12px] bg-white/15 backdrop-blur-sm flex items-center justify-center shrink-0 relative">
                      <Zap size={20} className="text-white" />
                    </div>
                    <div className="text-left relative">
                      <p className="font-['Lexend',sans-serif] font-bold text-[15px] text-white leading-[22px]">
                        Quick Find
                      </p>
                      <p className="font-['Inter',sans-serif] text-[11px] text-white/70 leading-[16px]">
                        Instant match with available caregivers
                      </p>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      if (onBidPost) {
                        onBidPost(data);
                      } else {
                        setShowSuccess(true);
                      }
                    }}
                    className="bg-white rounded-[16px] px-5 py-4 flex items-center gap-4 cursor-pointer border border-[#e2e8f0] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.06)] hover:border-[#cbd5e1] hover:shadow-[0px_4px_12px_-2px_rgba(0,0,0,0.08)] active:scale-[0.98] transition-all"
                  >
                    <div className="size-[40px] rounded-[12px] bg-[#f0fdf4] flex items-center justify-center shrink-0">
                      <Search size={20} className="text-[#16a34a]" />
                    </div>
                    <div className="text-left">
                      <p className="font-['Lexend',sans-serif] font-bold text-[15px] text-[#0f172a] leading-[22px]">
                        Post as Bid
                      </p>
                      <p className="font-['Inter',sans-serif] text-[11px] text-[#64748b] leading-[16px]">
                        Get competitive offers from agencies
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={step}
              custom={direction}
              initial={{ x: direction * 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction * -80, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="h-full"
            >
              {renderStep()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom buttons */}
      {!isChooseStep && (
        <div className="shrink-0 px-8 pb-8 pt-4">
          <div className="flex gap-4">
            {step > 0 && (
              <button
                onClick={goBack}
                className="flex-1 h-[50px] bg-white rounded-[14px] font-['Lexend',sans-serif] font-semibold text-[15px] text-[#0f172a] cursor-pointer border border-[#e2e8f0] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.06)] hover:bg-[#f8fafc] transition-colors"
              >
                Back
              </button>
            )}
            <PrimaryButton
              onClick={goNext}
              disabled={!canNext()}
              className="flex-1 h-[50px]"
            >
              {STEPS[step] === "review" ? "Continue" : "Next"}
            </PrimaryButton>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Step Layout wrapper ───
function StepLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="px-8 pt-6 pb-8">
      <h2 className="font-['Lexend',sans-serif] font-bold text-[24px] text-[#0f172a] leading-[30px]">
        {title}
      </h2>
      <p className="font-['Inter',sans-serif] text-[15px] text-[#64748b] leading-[24px] mt-2">
        {subtitle}
      </p>
      <div className="mt-6">{children}</div>
    </div>
  );
}