import { useState } from "react";
import svgPaths from "../../../imports/svg-zdwmi91rdf";
import { LogoFull } from "../shared/LogoFull";
import { useNavigate } from "react-router";
import { ChatModal } from "../chat/ChatModal";
import { MapPin, ChevronDown } from "lucide-react";

export function MobileHeader() {
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);
  return (
    <>
    <div className="md:hidden sticky top-0 z-20 bg-[rgba(255,255,255,0.95)] backdrop-blur-[6px]" style={{ paddingTop: 'var(--safe-area-top, 0px)' }}>
      {/* Border bottom */}
      <div
        aria-hidden
        className="absolute border-[#f1f5f9] border-b border-solid inset-0 pointer-events-none"
      />

      {/* Logo + Location + Action Buttons */}
      <div className="flex items-center justify-between px-4 py-3">
        <LogoFull />

        <div className="flex items-center gap-3">
          {/* Location selector */}
          <button
            onClick={() => navigate("/add-location")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] bg-[#e0f0ff] hover:bg-[#cce5ff] active:bg-[#b8daff] transition-colors cursor-pointer"
          >
            <MapPin size={14} className="text-[#1975D2] shrink-0" strokeWidth={2.5} />
            <span className="font-['Lexend',sans-serif] font-medium text-[12px] text-[#1975D2] max-w-[100px] truncate leading-[16px]">
              Salt Lake
            </span>
            <ChevronDown size={12} className="text-[#1975D2] shrink-0" />
          </button>

          {/* AI Chat button */}
          <button
            className="bg-[#eef2ff] flex items-center justify-center p-2 rounded-full cursor-pointer"
            onClick={() => setIsChatOpen(true)}
          >
            <div className="relative size-[24px] overflow-clip">
              <svg
                className="absolute"
                style={{ top: "4.17%", left: "8.33%", width: "91.67%", height: "95.06%" }}
                fill="none"
                viewBox="0 0 22 22.814"
              >
                <path d={svgPaths.p28578080} fill="#1975D2" />
              </svg>
            </div>
          </button>

          {/* Notification button */}
          
        </div>
      </div>

    </div>
    <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
}