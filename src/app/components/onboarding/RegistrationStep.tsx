/**
 * RegistrationStep (RegistrationScreen) - Step 4 of onboarding.
 * Collects: Full Name (required), Email (optional), Relationship dropdown.
 * Sticky CTA on mobile, inline on desktop.
 */
import { useState, useRef, useEffect } from "react";
import { EasecareSmallLogo } from "./EasecareSmallLogo";
import svgPaths from "../../../imports/svg-umiqh991x3";
import { PrimaryButton } from "../shared/PrimaryButton";

interface RegistrationScreenProps {
  onNext: () => void;
  onBack: () => void;
}

export function RegistrationScreen({ onNext, onBack }: RegistrationScreenProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [relationship, setRelationship] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const relationships = ["Son / Daughter", "Spouse", "Parent", "Sibling", "Friend", "Professional Caregiver", "Other"];

  // Click-outside handler for dropdown
  useEffect(() => {
    if (!showDropdown) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  const handleRegister = async () => {
    if (!name.trim()) return;
    onNext();
  };

  return (
    <div className="bg-white overflow-hidden size-full flex flex-col">
      {/* Header */}
      <div className="w-full">
        <div className="flex items-center justify-between px-4 pt-6 pb-2">
          <button onClick={onBack} className="flex items-center justify-center size-10 rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
            <svg width="12" height="20" viewBox="0 0 11.775 20" fill="none">
              <path d={svgPaths.p225a8cc0} fill="#0F172A" />
            </svg>
          </button>
          <EasecareSmallLogo />
          <div className="size-10" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto flex flex-col items-center">
        <div className="w-full max-w-[702px] px-6 md:px-16 pb-[140px] md:pb-8">
          {/* Title */}
          <div className="pb-3">
            <h1 className="font-['Lexend',sans-serif] font-bold text-[30px] leading-[37.5px] text-[#0f172a] tracking-[-0.75px]">
              Tell us a bit about you
            </h1>
          </div>
          <div className="pb-8">
            <p className="font-['Lexend',sans-serif] text-[16px] text-[#64748b] leading-[26px]">
              We need these details to verify your account and connect you with the best agencies in your area.
            </p>
          </div>

          {/* Form Fields */}
          <div className="flex flex-col gap-6 w-full">
            {/* Full Name */}
            <div className="flex flex-col gap-[8.5px]">
              <label className="font-['Lexend',sans-serif] font-semibold text-[14px] text-[#0f172a]">
                Full Name <span className="text-[#ef4444]">*</span>
              </label>
              <div className="relative">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Rahul Roy"
                  className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-[24px] pl-[45px] pr-4 py-[17px] font-['Lexend',sans-serif] text-[16px] text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:border-[#1975d2] focus:ring-2 focus:ring-[rgba(25,117,210,0.2)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] transition-all" />
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <svg width="17" height="17" viewBox="0 0 16.6667 16.6667" fill="none"><path d={svgPaths.pc17f800} fill="#94A3B8" /></svg>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <div className="flex items-baseline justify-between">
                <label className="font-['Lexend',sans-serif] font-semibold text-[14px] text-[#0f172a]">Email Address</label>
                <span className="font-['Lexend',sans-serif] font-medium text-[12px] text-[#94a3b8]">Optional</span>
              </div>
              <div className="relative">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="rahul@example.com"
                  className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-[24px] pl-[45px] pr-4 py-[17px] font-['Lexend',sans-serif] text-[16px] text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:border-[#1975d2] focus:ring-2 focus:ring-[rgba(25,117,210,0.2)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] transition-all" />
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <svg width="17" height="13" viewBox="0 0 16.6667 13.3333" fill="none"><path d={svgPaths.p68cd680} fill="#94A3B8" /></svg>
                </div>
              </div>
            </div>

            {/* Relationship Dropdown */}
            <div className="flex flex-col gap-[8.5px]">
              <label className="font-['Lexend',sans-serif] font-semibold text-[14px] text-[#0f172a]">
                How do you know the care recipient?
              </label>
              <div className="relative" ref={dropdownRef}>
                <button onClick={() => setShowDropdown(!showDropdown)}
                  className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-[24px] pl-[45px] pr-10 py-[17px] font-['Lexend',sans-serif] text-[16px] text-left outline-none focus:border-[#1975d2] focus:ring-2 focus:ring-[rgba(25,117,210,0.2)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] transition-all cursor-pointer">
                  <span className={relationship ? "text-[#0f172a]" : "text-[#94a3b8]"}>{relationship || "Select relationship"}</span>
                </button>
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <svg width="17" height="17" viewBox="0 0 17.0833 16.6667" fill="none"><path d={svgPaths.p28c67600} fill="#94A3B8" /></svg>
                </div>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M7.2 9.6L12 14.4L16.8 9.6" stroke="#6B7280" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /></svg>
                </div>
                {showDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#e2e8f0] rounded-[16px] shadow-lg z-50 overflow-hidden">
                    {relationships.map((r) => (
                      <button key={r} onClick={() => { setRelationship(r); setShowDropdown(false); }}
                        className={`w-full px-5 py-3 text-left font-['Lexend',sans-serif] text-[15px] hover:bg-[#f1f5f9] transition-colors cursor-pointer ${relationship === r ? "text-[#1975d2] bg-[#eff6ff]" : "text-[#334155]"}`}>
                        {r}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 w-full bg-[#fef2f2] border border-[#fecaca] rounded-[12px] px-4 py-3">
              <p className="font-['Lexend',sans-serif] text-[13px] text-[#dc2626] leading-[18px]">{error}</p>
            </div>
          )}

          {/* CTA - inline on desktop */}
          <div className="hidden md:flex justify-center pt-10">
            <PrimaryButton onClick={handleRegister} disabled={!name.trim()} fullWidth={false} className="px-12 text-[18px]">
              Complete Registration
              <svg width="17" height="17" viewBox="0 0 16.6667 16.6667" fill="none"><path d={svgPaths.p6e98980} fill="white" /></svg>
            </PrimaryButton>
          </div>
        </div>
      </div>

      {/* Sticky Footer - mobile only */}
      <div className="md:hidden absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent pt-12 pb-6 px-6">
        <PrimaryButton onClick={handleRegister} disabled={!name.trim()}>
          Complete Registration
          <svg width="17" height="17" viewBox="0 0 16.6667 16.6667" fill="none"><path d={svgPaths.p6e98980} fill="white" /></svg>
        </PrimaryButton>
      </div>
    </div>
  );
}
