/**
 * PolicyAcceptanceStep — seeker Terms of Service acceptance.
 *
 * Fetches the active `seeker_tos` policy (version + content) and requires an
 * explicit checkbox before continuing. The accepted version string is handed up
 * and threaded into POST /auth/register-seeker (backend enforces "no acceptance,
 * no account" and 409s on a stale version).
 *
 * Styled to match the existing onboarding screens (RegistrationStep / LocationStep):
 * same header (back + EasecareSmallLogo), title, scrollable body, sticky footer CTA.
 */
import { useEffect, useState } from "react";
import { EasecareSmallLogo } from "./EasecareSmallLogo";
import { PrimaryButton } from "../shared/PrimaryButton";
import { useAuth } from "../../context/AuthContext";
import type { SeekerPolicy } from "../../context/AuthContext";

interface PolicyAcceptanceStepProps {
  onAccept: (version: string) => void;
  onBack: () => void;
}

export function PolicyAcceptanceStep({ onAccept, onBack }: PolicyAcceptanceStepProps) {
  const { getSeekerPolicy } = useAuth();
  const [policy, setPolicy] = useState<SeekerPolicy | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getSeekerPolicy()
      .then((p) => {
        if (!cancelled) {
          setPolicy(p);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError("Couldn't load the terms. Please go back and try again.");
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [getSeekerPolicy]);

  const handleAccept = () => {
    if (!policy || !agreed) return;
    onAccept(policy.version);
  };

  return (
    <div className="bg-white overflow-hidden size-full flex flex-col">
      {/* Header */}
      <div className="w-full">
        <div className="flex items-center justify-between px-4 pt-6 pb-2">
          <button
            onClick={onBack}
            className="flex items-center justify-center size-10 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
              <path d="M8.5 1L1 8.5L8.5 16" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <EasecareSmallLogo />
          <div className="size-10" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto flex flex-col items-center">
        <div className="w-full max-w-[702px] px-6 md:px-16 pb-[160px] md:pb-8">
          <div className="pb-3">
            <h1 className="font-['Lexend',sans-serif] font-bold text-[30px] leading-[37.5px] text-[#0f172a] tracking-[-0.75px]">
              {policy?.title || "Terms of Service"}
            </h1>
          </div>
          <div className="pb-6">
            <p className="font-['Lexend',sans-serif] text-[16px] text-[#64748b] leading-[26px]">
              Please review and accept our terms to continue.
            </p>
          </div>

          {/* Policy body */}
          <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-[16px] p-5 max-h-[42vh] overflow-y-auto">
            {loading ? (
              <div className="flex items-center gap-3 py-6 justify-center">
                <div className="animate-spin size-5 border-2 border-[#1975d2] border-t-transparent rounded-full" />
                <span className="font-['Lexend',sans-serif] text-[14px] text-[#64748b]">Loading terms…</span>
              </div>
            ) : (
              <p className="font-['Lexend',sans-serif] text-[14px] text-[#334155] leading-[24px] whitespace-pre-wrap">
                {policy?.content_md}
              </p>
            )}
          </div>

          {/* Consent checkbox */}
          <label className="flex items-start gap-3 mt-5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              disabled={loading || !policy}
              className="mt-0.5 size-5 accent-[#1975d2] cursor-pointer"
            />
            <span className="font-['Lexend',sans-serif] text-[14px] text-[#334155] leading-[22px]">
              I have read and agree to the {policy?.title || "Terms of Service"}
              {policy?.version ? <span className="text-[#94a3b8]"> (v{policy.version})</span> : null}.
            </span>
          </label>

          {error && (
            <div className="mt-4 w-full bg-[#fef2f2] border border-[#fecaca] rounded-[12px] px-4 py-3">
              <p className="font-['Lexend',sans-serif] text-[13px] text-[#dc2626] leading-[18px]">{error}</p>
            </div>
          )}

          {/* CTA - inline on desktop */}
          <div className="hidden md:flex justify-center pt-10">
            <PrimaryButton onClick={handleAccept} disabled={!agreed || loading} fullWidth={false} className="px-12 text-[18px]">
              Accept &amp; Continue
            </PrimaryButton>
          </div>
        </div>
      </div>

      {/* Sticky Footer - mobile only */}
      <div className="md:hidden absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent pt-12 pb-6 px-6">
        <PrimaryButton onClick={handleAccept} disabled={!agreed || loading}>
          Accept &amp; Continue
        </PrimaryButton>
      </div>
    </div>
  );
}
