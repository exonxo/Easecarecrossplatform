/**
 * MobileAppPrompt — Bottom sheet shown on mobile devices on first visit.
 *
 * Offers two options:
 *   • Continue on browser → dismisses the sheet
 *   • Download the app    → navigates to the marketing site download page
 *
 * The "remember dismissal" is stored in localStorage so the sheet doesn't
 * pester returning users. Only renders on mobile (md:hidden).
 */
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Smartphone, X } from "lucide-react";

const STORAGE_KEY = "easecare_mobile_prompt_dismissed_at";
const DOWNLOAD_URL = "https://easecare-site.vercel.app/";

/** Show again after this many days even if previously dismissed. Set to Infinity for never. */
const REPROMPT_AFTER_DAYS = 7;

function shouldShowPrompt(): boolean {
  // Don't show on desktop / tablet — CSS already hides at md:, but skip work
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(min-width: 768px)").matches) return false;

  // Don't show inside the Capacitor native app shell — user already installed it
  const cap = (window as unknown as { Capacitor?: { isNativePlatform?: () => boolean } }).Capacitor;
  if (cap?.isNativePlatform?.()) return false;

  // Don't show in standalone PWA mode (user already installed via "Add to Home Screen")
  if (window.matchMedia("(display-mode: standalone)").matches) return false;

  try {
    const dismissedAt = localStorage.getItem(STORAGE_KEY);
    if (!dismissedAt) return true;

    const ageMs = Date.now() - Number(dismissedAt);
    const ageDays = ageMs / (1000 * 60 * 60 * 24);
    return ageDays >= REPROMPT_AFTER_DAYS;
  } catch {
    // localStorage blocked (private mode etc.) — show anyway
    return true;
  }
}

export function MobileAppPrompt() {
  const [open, setOpen] = useState(false);

  // Mount check (avoids hydration mismatch on SSR / static pre-render)
  useEffect(() => {
    // Small delay so the sheet doesn't fight the initial route render
    const t = setTimeout(() => {
      if (shouldShowPrompt()) setOpen(true);
    }, 600);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      // ignore storage errors
    }
    setOpen(false);
  };

  const handleDownload = () => {
    // Persist dismissal so the user doesn't see the sheet again on their next visit
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      // ignore storage errors
    }
    window.location.href = DOWNLOAD_URL;
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={dismiss}
            className="fixed inset-0 z-[60] bg-black/55 md:hidden"
            aria-hidden="true"
          />

          {/* Sheet */}
          <motion.div
            key="sheet"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 280 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-app-prompt-title"
            className="fixed bottom-0 left-0 right-0 z-[61] bg-white rounded-t-[24px] shadow-[0_-12px_40px_rgba(0,0,0,0.2)] md:hidden"
            style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1.5 rounded-full bg-[#e2e8f0]" aria-hidden="true" />
            </div>

            {/* Close button */}
            <button
              onClick={dismiss}
              aria-label="Close"
              className="absolute top-3 right-3 size-9 rounded-full flex items-center justify-center hover:bg-[#f1f5f9] active:scale-95 transition-all cursor-pointer"
            >
              <X size={18} className="text-[#64748b]" aria-hidden="true" />
            </button>

            <div className="px-6 pt-3 pb-7 flex flex-col items-center text-center gap-4">
              {/* Icon */}
              <div className="size-14 rounded-full bg-[#EFF6FF] flex items-center justify-center">
                <Smartphone size={26} className="text-[#1975D2]" strokeWidth={2} />
              </div>

              {/* Heading */}
              <div className="flex flex-col gap-1.5">
                <h2
                  id="mobile-app-prompt-title"
                  className="font-['Lexend',sans-serif] font-extrabold text-[20px] text-[#0f172a] leading-[1.2]"
                >
                  Get the best EaseCare experience
                </h2>
                <p className="font-['Inter',sans-serif] text-[13px] text-[#64748b] leading-[20px]">
                  Download our app for faster booking, real-time tracking, and exclusive in-app offers.
                </p>
              </div>

              {/* CTAs */}
              <div className="w-full flex flex-col gap-2.5 mt-1">
                <button
                  onClick={handleDownload}
                  className="w-full flex items-center justify-center gap-2 bg-[#1975D2] hover:bg-[#1561b0] active:scale-[0.98] text-white font-['Lexend',sans-serif] font-bold text-[14px] py-3.5 rounded-[14px] transition-all cursor-pointer shadow-[0_4px_14px_rgba(25,117,210,0.35)]"
                >
                  Download the App
                </button>
                <button
                  onClick={dismiss}
                  className="w-full font-['Lexend',sans-serif] font-semibold text-[13px] text-[#64748b] py-3 rounded-[14px] hover:bg-[#f8fafc] active:scale-[0.98] transition-all cursor-pointer"
                >
                  Continue on browser
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
