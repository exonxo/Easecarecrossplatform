import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useRequireAuth } from "../../hooks/useRequireAuth";
import { LoginModal } from "../auth/LoginModal";

export function PostRequirementStrip() {
  const navigate = useNavigate();
  const { requireAuth, loginOpen, setLoginOpen } = useRequireAuth();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full flex items-center justify-between gap-3 bg-[#EFF6FF] border border-[#DBEAFE] rounded-[16px] px-4 md:px-5 py-3.5"
      >
        {/* Left — pulsing dot + copy */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative shrink-0">
            <div className="size-2.5 rounded-full bg-[#1975D2]" />
            <motion.div
              className="absolute inset-0 rounded-full bg-[#1975D2]"
              animate={{ scale: [1, 2.4, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <p className="font-['Inter',sans-serif] text-[13px] md:text-[14px] text-[#1e40af] leading-[20px] min-w-0">
            <span className="font-semibold">Looking for care at home?</span>
            <span className="hidden sm:inline text-[#2563EB]">
              {" "}Post your requirement and get matched with verified providers in under 2 hours.
            </span>
          </p>
        </div>

        {/* Right — CTA pill */}
        <button
          onClick={() => requireAuth(() => navigate("/post-requirement"))}
          className="shrink-0 flex items-center gap-1.5 bg-[#1975D2] text-white font-['Lexend',sans-serif] font-semibold text-[12px] md:text-[13px] px-4 py-2 rounded-full hover:bg-[#1565b8] active:scale-[0.97] transition-all cursor-pointer whitespace-nowrap shadow-[0_2px_8px_rgba(25,117,210,0.25)]"
        >
          Post Requirement
          <ArrowRight size={13} strokeWidth={2.5} />
        </button>
      </motion.div>

      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
    </>
  );
}
