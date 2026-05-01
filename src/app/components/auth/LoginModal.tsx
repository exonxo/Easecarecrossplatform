import { useState, useEffect, useRef, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "../ui/dialog";
import { useAuth } from "../../context/AuthContext";
import { LogoFull } from "../shared/LogoFull";

type Step = "phone" | "otp" | "registration";

const SKIP_PHONE = "8670803180";
const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 60;
const GENDER_OPTIONS = ["Male", "Female", "Non-binary", "Prefer not to say"];

// ── Phone Step ────────────────────────────────────────────────────────────────

function PhoneStep({ onNext }: { onNext: (phone: string) => void }) {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    return digits.length > 5 ? digits.slice(0, 5) + " " + digits.slice(5) : digits;
  };

  const handleSubmit = () => {
    const digits = phone.replace(/\D/g, "");
    if (digits.length !== 10) {
      setError("Phone number must be 10 digits.");
      return;
    }
    if (!/^[6-9]/.test(digits)) {
      setError("Enter a valid Indian mobile number (starting with 6–9).");
      return;
    }
    onNext(digits);
  };

  const isValid = phone.replace(/\D/g, "").length === 10;

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-['Lexend',sans-serif] font-bold text-[22px] text-[#0f172a]">
          Welcome to Easecare
        </h2>
        <p className="font-['Lexend',sans-serif] text-[14px] text-[#64748b] mt-1">
          Enter your mobile number to continue
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="font-['Lexend',sans-serif] font-semibold text-[13px] text-[#0f172a]">
          Phone Number
        </label>
        <div className="relative flex items-center">
          <input
            type="tel"
            value={formatPhone(phone)}
            onChange={(e) => {
              setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
              setError("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && isValid) handleSubmit();
            }}
            placeholder="98765 43210"
            className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-[14px] pl-[90px] pr-4 py-[14px] font-['Lexend',sans-serif] text-[15px] text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:border-[#1975d2] focus:ring-2 focus:ring-[rgba(25,117,210,0.15)] transition-all"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 font-['Lexend',sans-serif] font-medium text-[13px] text-[#111827] pointer-events-none">
            🇮🇳 +91
          </span>
          <div className="absolute left-[76px] top-1/2 -translate-y-1/2 h-5 w-px bg-[#e2e8f0]" />
        </div>
        {error && (
          <p className="text-[12px] text-[#dc2626] font-['Lexend',sans-serif]">{error}</p>
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!isValid}
        className="w-full bg-[#1975D2] disabled:opacity-40 disabled:cursor-not-allowed text-white font-['Lexend',sans-serif] font-semibold text-[15px] py-3 rounded-[14px] hover:bg-[#1565b8] transition-colors cursor-pointer"
      >
        Get OTP
      </button>

      <p className="text-center font-['Lexend',sans-serif] text-[11px] text-[#94a3b8]">
        By continuing, you agree to our{" "}
        <span className="text-[#1975d2] cursor-pointer">Terms of Service</span>
        {" "}and{" "}
        <span className="text-[#1975d2] cursor-pointer">Privacy Policy</span>.
      </p>
    </div>
  );
}

// ── OTP Step ──────────────────────────────────────────────────────────────────

function OtpStep({
  phone,
  onVerify,
  onBack,
}: {
  phone: string;
  onVerify: () => void;
  onBack: () => void;
}) {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [timer, setTimer] = useState(RESEND_COOLDOWN);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const id = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(id);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < OTP_LENGTH - 1) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0)
      inputRefs.current[index - 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted.length) return;
    const newOtp = Array(OTP_LENGTH).fill("");
    for (let i = 0; i < pasted.length; i++) newOtp[i] = pasted[i];
    setOtp(newOtp);
    inputRefs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
  };

  const timerStr = `${Math.floor(timer / 60).toString().padStart(2, "0")}:${(timer % 60).toString().padStart(2, "0")}`;
  const formattedPhone = `+91 ${phone.slice(0, 5)} ${phone.slice(5)}`;
  const isComplete = otp.every((d) => d !== "");

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="size-8 rounded-full hover:bg-[#f1f5f9] flex items-center justify-center transition-colors cursor-pointer shrink-0"
        >
          <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
            <path
              d="M8.5 1L1 8.5L8.5 16"
              stroke="#0F172A"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div>
          <h2 className="font-['Lexend',sans-serif] font-bold text-[22px] text-[#0f172a]">
            Verify OTP
          </h2>
          <p className="font-['Lexend',sans-serif] text-[13px] text-[#64748b]">
            Sent to{" "}
            <span className="font-semibold text-[#1e293b]">{formattedPhone}</span>
          </p>
        </div>
      </div>

      <div className="flex gap-2 justify-center" onPaste={handlePaste}>
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={(el) => { inputRefs.current[i] = el; }}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className={`w-10 h-12 rounded-[12px] text-center font-['Lexend',sans-serif] font-bold text-[20px] text-[#0f172a] bg-[#f8fafc] outline-none transition-all ${
              digit
                ? "border-2 border-[#1975d2] shadow-[0_0_0_3px_rgba(25,117,210,0.12)]"
                : "border-2 border-[#e2e8f0]"
            }`}
          />
        ))}
      </div>

      <div className="text-center font-['Lexend',sans-serif] text-[13px] text-[#64748b]">
        {canResend ? (
          <button
            onClick={() => {
              setTimer(RESEND_COOLDOWN);
              setCanResend(false);
              setOtp(Array(OTP_LENGTH).fill(""));
              inputRefs.current[0]?.focus();
            }}
            className="text-[#1975d2] font-semibold hover:underline cursor-pointer"
          >
            Resend OTP
          </button>
        ) : (
          <>
            Resend in{" "}
            <span className="text-[#0f172a] font-semibold">{timerStr}</span>
          </>
        )}
      </div>

      <button
        onClick={onVerify}
        disabled={!isComplete}
        className="w-full bg-[#1975D2] disabled:opacity-40 disabled:cursor-not-allowed text-white font-['Lexend',sans-serif] font-semibold text-[15px] py-3 rounded-[14px] hover:bg-[#1565b8] transition-colors cursor-pointer"
      >
        Verify & Continue
      </button>
    </div>
  );
}

// ── Registration Step ─────────────────────────────────────────────────────────

function RegistrationStep({
  onComplete,
}: {
  onComplete: (data: { name: string; gender: string; email: string }) => void;
}) {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [showGenderDrop, setShowGenderDrop] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showGenderDrop) return;
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node))
        setShowGenderDrop(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showGenderDrop]);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-['Lexend',sans-serif] font-bold text-[22px] text-[#0f172a]">
          Tell us about you
        </h2>
        <p className="font-['Lexend',sans-serif] text-[14px] text-[#64748b] mt-1">
          Just a few details to set up your account
        </p>
      </div>

      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label className="font-['Lexend',sans-serif] font-semibold text-[13px] text-[#0f172a]">
          Full Name <span className="text-[#ef4444]">*</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Rahul Roy"
          className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-[14px] px-4 py-[13px] font-['Lexend',sans-serif] text-[15px] text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:border-[#1975d2] focus:ring-2 focus:ring-[rgba(25,117,210,0.15)] transition-all"
        />
      </div>

      {/* Gender */}
      <div className="flex flex-col gap-1.5" ref={dropRef}>
        <label className="font-['Lexend',sans-serif] font-semibold text-[13px] text-[#0f172a]">
          Gender <span className="text-[#ef4444]">*</span>
        </label>
        <div className="relative">
          <button
            onClick={() => setShowGenderDrop(!showGenderDrop)}
            className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-[14px] px-4 py-[13px] font-['Lexend',sans-serif] text-[15px] text-left outline-none transition-all cursor-pointer flex justify-between items-center"
          >
            <span className={gender ? "text-[#0f172a]" : "text-[#94a3b8]"}>
              {gender || "Select gender"}
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M7.2 9.6L12 14.4L16.8 9.6"
                stroke="#6B7280"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
              />
            </svg>
          </button>
          {showGenderDrop && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#e2e8f0] rounded-[12px] shadow-lg z-50 overflow-hidden">
              {GENDER_OPTIONS.map((g) => (
                <button
                  key={g}
                  onClick={() => { setGender(g); setShowGenderDrop(false); }}
                  className={`w-full px-4 py-2.5 text-left font-['Lexend',sans-serif] text-[14px] hover:bg-[#f1f5f9] transition-colors cursor-pointer ${
                    gender === g ? "text-[#1975d2] bg-[#eff6ff]" : "text-[#334155]"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-baseline">
          <label className="font-['Lexend',sans-serif] font-semibold text-[13px] text-[#0f172a]">
            Email Address
          </label>
          <span className="font-['Lexend',sans-serif] text-[11px] text-[#94a3b8]">
            Optional
          </span>
        </div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="rahul@example.com"
          className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-[14px] px-4 py-[13px] font-['Lexend',sans-serif] text-[15px] text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:border-[#1975d2] focus:ring-2 focus:ring-[rgba(25,117,210,0.15)] transition-all"
        />
      </div>

      <button
        onClick={() => onComplete({ name, gender, email })}
        disabled={!name.trim() || !gender}
        className="w-full bg-[#1975D2] disabled:opacity-40 disabled:cursor-not-allowed text-white font-['Lexend',sans-serif] font-semibold text-[15px] py-3 rounded-[14px] hover:bg-[#1565b8] transition-colors cursor-pointer"
      >
        Complete Registration
      </button>
    </div>
  );
}

// ── LoginModal ────────────────────────────────────────────────────────────────

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginModal({ open, onOpenChange }: LoginModalProps) {
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const { login, completeOnboarding, profile } = useAuth();

  const handleClose = useCallback(() => {
    onOpenChange(false);
    setTimeout(() => { setStep("phone"); setPhone(""); }, 300);
  }, [onOpenChange]);

  const handleOtpVerify = useCallback(() => {
    login(phone);
    if (phone === SKIP_PHONE) {
      handleClose();
    } else {
      setStep("registration");
    }
  }, [phone, login, handleClose]);

  // Returning user: profile restored as complete after login() — skip registration
  useEffect(() => {
    if (step === "registration" && profile?.onboardingComplete) {
      handleClose();
    }
  }, [step, profile?.onboardingComplete, handleClose]);

  const handleRegistrationComplete = useCallback(
    (data: { name: string; gender: string; email: string }) => {
      completeOnboarding(data);
      handleClose();
    },
    [completeOnboarding, handleClose]
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px] p-6 gap-0">
        <DialogTitle className="sr-only">Login to Easecare</DialogTitle>

        <div className="flex justify-center mb-6">
          <LogoFull size="small" />
        </div>

        {step === "phone" && (
          <PhoneStep
            onNext={(p) => { setPhone(p); setStep("otp"); }}
          />
        )}
        {step === "otp" && (
          <OtpStep
            phone={phone}
            onVerify={handleOtpVerify}
            onBack={() => setStep("phone")}
          />
        )}
        {step === "registration" && (
          <RegistrationStep onComplete={handleRegistrationComplete} />
        )}
      </DialogContent>
    </Dialog>
  );
}
