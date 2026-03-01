import { Search, MessageSquare, MapPin, ChevronDown } from "lucide-react";
import svgPaths from "../../../imports/svg-zdwmi91rdf";
import { useNavigate } from "react-router";

export function TopHeader() {
  const navigate = useNavigate();
  return (
    <header className="h-[72px] bg-white border-b border-[#f1f5f9] flex items-center justify-between px-8 sticky top-0 z-20">
      {/* Left: Location Selector */}
      <button
        onClick={() => navigate("/add-location")}
        className="flex items-center gap-2 px-4 py-2.5 rounded-[12px] hover:bg-[#f0f7fa] transition-colors cursor-pointer group"
      >
        <MapPin size={16} className="text-[#1975D2]" strokeWidth={2} />
        <span className="font-['Lexend',sans-serif] font-medium text-[14px] text-[#1975D2] underline decoration-[rgba(25,117,210,0.3)]">
          Salt Lake, Kolkata
        </span>
        <ChevronDown size={14} className="text-[#1975D2] group-hover:translate-y-0.5 transition-transform" />
      </button>

      {/* Center: Search Bar */}
      <div className="flex-1 max-w-[480px] mx-8">
        <div className="relative">
          
          
        </div>
      </div>

      {/* Right: Action Buttons */}
      <div className="flex items-center gap-3">
        {/* Chat AI Button */}
        <button className="bg-[#eef2ff] size-10 rounded-full flex items-center justify-center hover:bg-[#e0e7ff] transition-colors cursor-pointer relative">
          <svg width="22" height="23" viewBox="0 0 21.9988 22.814" fill="none">
            <path d={svgPaths.p28578080} fill="#1975D2" />
          </svg>
        </button>
        {/* Notification Button */}
        
      </div>
    </header>
  );
}
