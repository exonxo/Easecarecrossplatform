/**
 * PhoneStep (PhoneEntryScreen) - Step 1 of onboarding.
 * Collects the user's 10-digit Indian mobile number.
 * Shows a branded left panel on desktop and a phone input with +91 prefix.
 * Validates Indian mobile numbers (starting with 6-9).
 */
import { useState } from "react";
import svgPaths from "../../../imports/svg-ctgj09v4o8";
import svgPaths2 from "../../../imports/svg-28jjub1fiy";
import { PrimaryButton } from "../shared/PrimaryButton";

function Logo() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      {/* Layer 12 */}
      <div className="col-1 h-[29.472px] ml-[22.91px] mt-0 relative row-1 w-[71.939px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 71.9392 29.4723">
          <g clipPath="url(#clip0_phone_757)">
            <path d={svgPaths.p30cb2000} fill="#1975D2" />
            <path d={svgPaths.p2b2e83e0} fill="#1975D2" />
          </g>
          <defs><clipPath id="clip0_phone_757"><rect fill="white" height="29.4723" width="71.9392" /></clipPath></defs>
        </svg>
      </div>
      {/* Layer 11 */}
      <div className="col-1 h-[123.181px] ml-0 mt-[9.58px] relative row-1 w-[125.324px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 125.324 123.181">
          <g clipPath="url(#clip0_phone_754)">
            <g>
              <path d={svgPaths.p279ee3c0} fill="white" />
              <path d={svgPaths.p279ee3c0} fill="url(#paint0_linear_phone_754)" />
              <path d={svgPaths.p3cb2b480} fill="white" />
            </g>
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_phone_754" x1="62.6245" x2="62.6245" y1="0.120939" y2="123.074">
              <stop stopColor="#08C5EF" />
              <stop offset="0.879808" stopColor="#4B58E4" />
            </linearGradient>
            <clipPath id="clip0_phone_754"><rect fill="white" height="123.181" width="125.324" /></clipPath>
          </defs>
        </svg>
      </div>
      {/* Layer 13 */}
      <div className="col-1 h-[12.392px] ml-[49.43px] mt-[51.64px] relative row-1 w-[46.517px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 46.5175 12.3918">
          <g clipPath="url(#clip0_phone_747)">
            <path d={svgPaths.p3a5d4480} fill="black" />
            <path d={svgPaths.p1314ecf0} fill="black" />
          </g>
          <defs><clipPath id="clip0_phone_747"><rect fill="white" height="12.3918" width="46.5175" /></clipPath></defs>
        </svg>
      </div>
      {/* Layer 14 */}
      <div className="col-1 h-[8.708px] ml-[66.78px] mt-[59.08px] relative row-1 w-[15.715px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.7147 8.70772">
          <g clipPath="url(#clip0_phone_743)">
            <path d={svgPaths.p2afdb00} fill="#F49514" />
            <path d={svgPaths.p561b2f0} fill="#F2911B" />
          </g>
          <defs><clipPath id="clip0_phone_743"><rect fill="white" height="8.70772" width="15.7147" /></clipPath></defs>
        </svg>
      </div>
      {/* Layer 15 */}
      <div className="col-1 h-[52.447px] ml-[39.32px] mt-[67.05px] relative row-1 w-[84.733px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 84.7328 52.4473">
          <g clipPath="url(#clip0_phone_761)">
            <path d={svgPaths.p8251800} fill="#E35406" />
            <path d={svgPaths.p25968080} fill="#F5AE31" />
            <path d={svgPaths.p1684f400} fill="#FAD896" />
            <path d={svgPaths.pdd43900} fill="#F5AE31" />
            <path d={svgPaths.p1635d000} fill="#AC0601" />
            <path d={svgPaths.p14def300} fill="#AC0601" />
          </g>
          <defs><clipPath id="clip0_phone_761"><rect fill="white" height="52.4473" width="84.7328" /></clipPath></defs>
        </svg>
      </div>
    </div>
  );
}

const RECAPTCHA_BUTTON_ID = "recaptcha-send-otp";

interface PhoneEntryScreenProps {
  onNext: (phone: string) => void | Promise<void>;
}

export function PhoneEntryScreen({ onNext }: PhoneEntryScreenProps) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    if (digits.length > 5) {
      return digits.slice(0, 5) + " " + digits.slice(5);
    }
    return digits;
  };

  const handleSubmit = async () => {
    const digits = phone.replace(/\D/g, "");

    if (digits.length !== 10) {
      setError("Phone number must be 10 digits.");
      return;
    }
    if (!/^[6-9]/.test(digits)) {
      setError("Enter a valid Indian mobile number (starting with 6-9).");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await onNext(digits);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isValid = phone.replace(/\D/g, "").length === 10;

  return (
    <div className="bg-white overflow-hidden size-full flex flex-col md:flex-row">
      {/* Left Brand Panel */}
      <div className="bg-[#1e5ab3] flex-1 relative flex flex-col items-center justify-center min-h-[280px] md:min-h-0 md:h-full">
        <div className="absolute bg-[#60a5fa] blur-[32px] left-[-16px] mix-blend-multiply opacity-20 rounded-full size-[384px] top-0 pointer-events-none" />
        <div className="absolute bg-[#93c5fd] blur-[32px] bottom-0 mix-blend-multiply opacity-20 right-[16px] rounded-full size-[384px] pointer-events-none" />
        <div className="absolute bg-gradient-to-t bottom-0 from-[rgba(0,0,0,0.1)] h-[96px] left-0 right-0 to-transparent pointer-events-none" />

        <div className="flex flex-col gap-[12.76px] items-center p-12 relative z-10">
          <Logo />
          <div className="inline-grid leading-[1.2] place-items-start text-white text-center">
            <p className="font-['Lexend',sans-serif] font-semibold text-[40px] md:text-[55.843px] tracking-[-1.1169px]">Easecare</p>
            <p className="font-['Inter',sans-serif] font-medium text-[13.008px] tracking-[-0.2602px] mt-1 self-center">Care That Feels Like Family</p>
          </div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="bg-white flex-1 flex flex-col justify-center relative md:h-full">
        <div className="flex flex-col items-start justify-center px-6 py-8 md:p-16 w-full max-w-[448px] mx-auto">
          <div className="hidden md:flex flex-col gap-2 mb-8">
            <h1 className="font-['Poppins',sans-serif] font-bold text-[30px] leading-[36px] text-[#111827]">Welcome Back</h1>
            <p className="font-['Poppins',sans-serif] text-[16px] leading-[24px] text-[#6b7280]">Please enter your details to sign in.</p>
          </div>

          <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col gap-2">
              <label className="font-['Poppins',sans-serif] font-medium text-[14px] text-[#374151] leading-[20px]">Phone Number</label>
              <div className="relative flex items-center">
                <input
                  type="tel"
                  value={formatPhone(phone)}
                  onChange={(e) => {
                    setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
                    if (error) setError("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && isValid && !loading) handleSubmit();
                  }}
                  placeholder="98765 43210"
                  className="w-full bg-[#f9fafb] border border-[#d1d5db] rounded-[16px] pl-[105px] pr-[44px] py-[17px] text-[18px] font-['Poppins',sans-serif] text-[#0f172a] placeholder:text-[#6b7280] outline-none focus:border-[#1975d2] focus:ring-2 focus:ring-[rgba(25,117,210,0.2)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] transition-all"
                />
                <div className="absolute left-0 top-0 bottom-0 w-[88px] rounded-l-[16px]">
                  <div className="absolute left-[13px] top-1/2 -translate-y-1/2">
                    <span className="font-['Poppins',sans-serif] font-medium text-[14px] text-[#111827] leading-[20px]">{"\u{1F1EE}\u{1F1F3}"} +91</span>
                  </div>
                  <div className="absolute right-[9px] top-1/2 -translate-y-1/2 flex items-center justify-center">
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
                      <path d="M6.3 8.4L10.5 12.6L14.7 8.4" stroke="#6B7280" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.575" />
                    </svg>
                  </div>
                </div>
                <div className="absolute right-4 flex items-center">
                  <svg width="14" height="22" viewBox="0 0 13.9688 22.0312" fill="none">
                    <path d={svgPaths2.p153642c0} fill="#9CA3AF" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Get OTP Button */}
            <PrimaryButton
              id={RECAPTCHA_BUTTON_ID}
              onClick={handleSubmit}
              disabled={!isValid || loading}
              className="relative text-[18px]"
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.928l3-2.647z" />
                  </svg>
                  <span>Sending OTP...</span>
                </div>
              ) : (
                "Get OTP"
              )}
              {!loading && (
                <div className="absolute right-[17px] top-1/2 -translate-y-1/2 flex items-center">
                  <svg width="16" height="16" viewBox="0 0 16.0312 16.0312" fill="none">
                    <path d={svgPaths2.p8beb700} fill="white" />
                  </svg>
                </div>
              )}
            </PrimaryButton>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-3 w-full bg-[#fef2f2] border border-[#fecaca] rounded-[12px] px-4 py-3">
              <p className="font-['Poppins',sans-serif] text-[13px] text-[#dc2626] leading-[18px]">{error}</p>
            </div>
          )}

          {/* Terms */}
          <div className="mt-8 text-center w-full">
            <p className="font-['Poppins',sans-serif] text-[12px] text-[#6b7280] leading-[16px]">
              By continuing, you agree to our{" "}
              <span className="font-medium text-[#1d64c5] underline decoration-[#93c5fd] cursor-pointer">Terms of Service</span>
              {" "}and{" "}
              <span className="font-medium text-[#1d64c5] underline decoration-[#93c5fd] cursor-pointer">Privacy Policy</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
