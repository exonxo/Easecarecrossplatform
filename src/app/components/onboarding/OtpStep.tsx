/**
 * OtpStep (OtpVerificationScreen) - Step 2 of onboarding.
 * 6-digit OTP input with auto-focus, paste support, and resend timer.
 * Shows BrandPanel on desktop. Simulated verification (no real backend).
 */
import { useState, useEffect, useRef } from "react";
import { BrandPanel } from "./BrandPanel";
import svgPaths from "../../../imports/svg-0m5g8zl04i";
import { PrimaryButton } from "../shared/PrimaryButton";

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 60; // seconds

interface OtpVerificationScreenProps {
  phone: string;
  onVerify: () => void;
  onBack: () => void;
  onChangeNumber: () => void;
}

export function OtpVerificationScreen({
  phone,
  onVerify,
  onBack,
  onChangeNumber,
}: OtpVerificationScreenProps) {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [timer, setTimer] = useState(RESEND_COOLDOWN);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const formattedPhone = `+91 ${phone.slice(0, 5)} ${phone.slice(5)}`;

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (error) setError("");

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (pastedData.length > 0) {
      const newOtp = Array(OTP_LENGTH).fill("");
      for (let i = 0; i < pastedData.length; i++) {
        newOtp[i] = pastedData[i];
      }
      setOtp(newOtp);
      if (error) setError("");
      const focusIndex = Math.min(pastedData.length, OTP_LENGTH - 1);
      inputRefs.current[focusIndex]?.focus();
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError("");
    setTimeout(() => {
      setTimer(RESEND_COOLDOWN);
      setCanResend(false);
      setOtp(Array(OTP_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
      setResending(false);
    }, 500);
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length !== OTP_LENGTH) return;

    onVerify();
  };

  const isComplete = otp.every((d) => d !== "");
  const timerMin = Math.floor(timer / 60);
  const timerSec = timer % 60;
  const timerStr = `${timerMin.toString().padStart(2, "0")}:${timerSec.toString().padStart(2, "0")}`;

  return (
    <div className="bg-white overflow-hidden size-full flex flex-col md:flex-row">
      <BrandPanel />

      <div className="bg-white flex-1 flex flex-col md:h-full md:rounded-l-[24px] relative">
        <div className="flex flex-col size-full md:justify-center md:p-16">
          {/* Top Bar */}
          <div className="flex items-center p-4">
            <button
              onClick={onBack}
              className="flex items-center justify-center size-10 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <svg width="12" height="20" viewBox="0 0 11.775 20" fill="none">
                <path d={svgPaths.p225a8cc0} fill="#0F172A" />
              </svg>
            </button>
            <div className="flex-1 pr-10">
              <p className="font-['Lexend',sans-serif] font-bold text-[18px] text-[#0f172a] text-center">
                Verify Phone
              </p>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 flex flex-col items-center px-6 pt-8 pb-6 justify-between">
            <div className="w-full flex flex-col items-center">
              {/* Icon */}
              <div className="mb-8">
                <div className="bg-[rgba(25,117,210,0.1)] rounded-full size-20 flex items-center justify-center">
                  <svg width="33" height="33" viewBox="0 0 33.3333 33.3333" fill="none">
                    <path d={svgPaths.p154eec00} fill="#1975D2" />
                  </svg>
                </div>
              </div>

              {/* Headers */}
              <div className="mb-10 text-center">
                <h2 className="font-['Lexend',sans-serif] font-bold text-[24px] text-[#0f172a] mb-3">
                  Enter Verification Code
                </h2>
                <p className="font-['Lexend',sans-serif] text-[16px] text-[#64748b] leading-[26px]">
                  Enter the 6-digit code sent to
                  <br />
                  <span className="font-semibold text-[#1e293b]">{formattedPhone}</span>
                </p>
                <button
                  onClick={onChangeNumber}
                  className="mt-2 font-['Lexend',sans-serif] font-medium text-[14px] text-[#1975d2] cursor-pointer hover:underline"
                >
                  Change Number
                </button>
              </div>

              {/* OTP Input */}
              <div className="flex gap-2.5 sm:gap-3 mb-8" onPaste={handlePaste}>
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => {
                      inputRefs.current[i] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    className={`w-11 h-14 sm:w-12 sm:h-16 rounded-[16px] sm:rounded-[20px] text-center font-['Lexend',sans-serif] font-bold text-[22px] text-[#0f172a] bg-[#f8fafc] outline-none transition-all ${
                      digit
                        ? "border-2 border-[#1975d2] shadow-[0px_0px_0px_4px_rgba(25,117,210,0.15)]"
                        : "border-2 border-[#e2e8f0]"
                    } ${error ? "border-[#ef4444]" : ""}`}
                  />
                ))}
              </div>

              {/* Timer + Resend */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2">
                  <svg width="10.5" height="12.25" viewBox="0 0 10.5 12.25" fill="none">
                    <path d={svgPaths.p13490000} fill="#64748B" />
                  </svg>
                  <span className="font-['Lexend',sans-serif] font-medium text-[16px] text-[#64748b]">
                    {canResend ? (
                      "You can resend now"
                    ) : (
                      <>
                        Resend OTP in{" "}
                        <span className="text-[#0f172a]">{timerStr}</span>
                      </>
                    )}
                  </span>
                </div>
                <button
                  onClick={handleResend}
                  disabled={!canResend || resending}
                  className={`font-['Lexend',sans-serif] font-semibold text-[14px] cursor-pointer ${
                    canResend && !resending
                      ? "text-[#1975d2] hover:underline"
                      : "text-[#94a3b8] cursor-not-allowed"
                  }`}
                >
                  {resending ? "Sending..." : "Resend Code"}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="w-full bg-[#fef2f2] border border-[#fecaca] rounded-[12px] px-4 py-3 mt-4">
                <p className="font-['Lexend',sans-serif] text-[13px] text-[#dc2626] leading-[18px] text-center">
                  {error}
                </p>
              </div>
            )}

            {/* Verify Button */}
            <div className="w-full pt-6">
              <PrimaryButton
                onClick={handleVerify}
                disabled={!isComplete || loading}
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.928l3-2.647z"
                      />
                    </svg>
                    <span>Verifying...</span>
                  </div>
                ) : (
                  <>
                    Verify & Login
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d={svgPaths.p304eaa0} fill="white" />
                    </svg>
                  </>
                )}
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
