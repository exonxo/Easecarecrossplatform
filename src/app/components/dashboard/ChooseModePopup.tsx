import { motion, AnimatePresence } from "motion/react";
import { Zap, Megaphone, ArrowRight, X } from "lucide-react";
import { useModalOverlay } from "../../context/ModalContext";

export function ChooseModePopup({
  open,
  onQuickFind,
  onBidPost,
  onClose,
}: {
  open: boolean;
  onQuickFind: () => void;
  onBidPost: () => void;
  onClose: () => void;
}) {
  useModalOverlay(open);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/40 touch-none"
          />

          {/* Bottom sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 md:bottom-auto md:left-auto md:right-auto md:fixed md:inset-0 md:m-auto md:h-fit z-[61] bg-[#f6f8fc] rounded-t-[28px] md:rounded-[28px] shadow-[0_-8px_40px_-8px_rgba(0,0,0,0.15)] max-h-[85vh] md:max-w-[480px] md:w-full flex flex-col"
            style={{ willChange: "transform", overscrollBehavior: "contain" }}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1 shrink-0 md:hidden">
              <div className="w-[36px] h-[4px] rounded-full bg-[#cbd5e1]" />
            </div>

            {/* Header */}
            <div className="px-5 pt-2 pb-4 flex items-center justify-between shrink-0">
              <div>
                <h2 className="font-['Lexend',sans-serif] font-bold text-[22px] text-[#0f172a]">
                  How should we proceed?
                </h2>
                <p className="font-['Inter',sans-serif] text-[13px] text-[#94a3b8] mt-0.5">
                  Choose how you'd like to find care
                </p>
              </div>
              <button
                onClick={onClose}
                className="size-[36px] rounded-full bg-white flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.06)] cursor-pointer hover:bg-[#f5f5f5] transition-colors"
              >
                <X size={16} className="text-[#64748b]" />
              </button>
            </div>

            {/* Cards */}
            <div className="px-5 pb-8 flex flex-col gap-3.5 overflow-y-auto">
              {/* Quick Find */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={onQuickFind}
                className="w-full bg-white rounded-[24px] p-5 text-left shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] border border-[#f1f5f9] cursor-pointer hover:shadow-[0_8px_28px_-4px_rgba(0,0,0,0.12)] transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="size-[52px] rounded-[16px] bg-gradient-to-br from-[#1975D2] to-[#1565C0] flex items-center justify-center shrink-0 shadow-[0_4px_12px_-2px_rgba(25,117,210,0.35)]">
                    <Zap size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-['Lexend',sans-serif] font-bold text-[18px] text-[#0f172a] mb-1">
                      Quick Find
                    </h3>
                    <p className="font-['Inter',sans-serif] text-[13px] text-[#64748b] leading-[20px]">
                      We'll show you matched providers instantly. Swipe through profiles, pick your favourite, and book right away.
                    </p>
                    <div className="flex items-center gap-1.5 mt-3">
                      <span className="font-['Lexend',sans-serif] font-semibold text-[12px] text-[#1975D2]">
                        Browse providers
                      </span>
                      <ArrowRight size={13} className="text-[#1975D2]" />
                    </div>
                  </div>
                </div>
              </motion.button>

              {/* Post as Bid */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={onBidPost}
                className="w-full bg-white rounded-[24px] p-5 text-left shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] border border-[#f1f5f9] cursor-pointer hover:shadow-[0_8px_28px_-4px_rgba(0,0,0,0.12)] transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="size-[52px] rounded-[16px] bg-gradient-to-br from-[#1975D2] to-[#1565C0] flex items-center justify-center shrink-0 shadow-[0_4px_12px_-2px_rgba(25,117,210,0.35)]">
                    <Megaphone size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-['Lexend',sans-serif] font-bold text-[18px] text-[#0f172a] mb-1">
                      Post as Bid
                    </h3>
                    <p className="font-['Inter',sans-serif] text-[13px] text-[#64748b] leading-[20px]">
                      Post your requirement publicly and let verified providers send you competitive offers. Sit back and compare.
                    </p>
                    <div className="flex items-center gap-1.5 mt-3">
                      <span className="font-['Lexend',sans-serif] font-semibold text-[12px] text-[#1975D2]">
                        Post requirement
                      </span>
                      <ArrowRight size={13} className="text-[#1975D2]" />
                    </div>
                  </div>
                </div>
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}