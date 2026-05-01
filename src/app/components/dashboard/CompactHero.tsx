import { useState } from "react";
import { Search } from "lucide-react";
import { motion } from "motion/react";
import { useAuth } from "../../context/AuthContext";
import { SearchModal } from "../layout/SearchModal";

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export function CompactHero() {
  const { profile } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);

  const firstName = profile?.name?.split(" ")[0] ?? null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex flex-col gap-4"
      >
        {/* ── Row 1: Greeting + Location ── */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-['Inter',sans-serif] text-[13px] text-[#94a3b8] leading-none mb-1">
              {getGreeting()}
            </p>
            <h1 className="font-['Lexend',sans-serif] font-bold text-[22px] md:text-[26px] text-[#0f172a] tracking-[-0.5px] leading-[1.25]">
              {firstName ? `Welcome back, ${firstName} 👋` : "Welcome to Easecare 👋"}
            </h1>
          </div>

          </div>

        {/* ── Row 2: Search bar ── */}
        <button
          onClick={() => setSearchOpen(true)}
          className="w-full flex items-center gap-3 bg-white border border-[#e2e8f0] rounded-[16px] px-4 py-3.5 hover:border-[#1975D2] hover:shadow-[0_0_0_3px_rgba(25,117,210,0.08)] transition-all cursor-pointer group shadow-[0_1px_4px_rgba(0,0,0,0.06)]"
        >
          <Search size={18} className="text-[#94a3b8] group-hover:text-[#1975D2] transition-colors shrink-0" />
          <span className="font-['Inter',sans-serif] text-[15px] text-[#94a3b8] flex-1 text-left">
            Search for home services...
          </span>
          <kbd className="hidden md:flex items-center gap-1 text-[11px] text-[#94a3b8] bg-[#f1f5f9] border border-[#e2e8f0] px-2 py-1 rounded-[6px] font-['Inter',sans-serif] leading-none">
            ⌘K
          </kbd>
        </button>
      </motion.div>

      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
