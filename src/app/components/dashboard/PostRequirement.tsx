import svgPaths from "../../../imports/svg-zdwmi91rdf";
import { BorderBeam } from "../ui/border-beam";
import { RainbowButton } from "../ui/rainbow-button";
import { useNavigate } from "react-router";

export function PostRequirement() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full">
      {/* Card */}
      <div className="bg-white rounded-[40px] md:rounded-[28px] border border-[#f1f5f9] shadow-[0px_25px_50px_-12px_rgba(219,234,254,0.5)] overflow-hidden relative">
        <div className="flex flex-col items-center text-center md:flex-row md:text-left md:items-center px-8 py-8 md:px-10 md:py-8 gap-6 md:gap-10 relative z-10">
          {/* Icon */}
          <div className="shrink-0 pb-2 md:pb-0">
            <div className="bg-[rgba(25,117,210,0.1)] rounded-[16px] size-16 flex items-center justify-center">
              <svg width="24" height="21.333" viewBox="0 0 24 21.3333" fill="none">
                <path d={svgPaths.p2fb83680} fill="#1975D2" />
              </svg>
            </div>
          </div>

          {/* Text */}
          <div className="flex-1 flex flex-col items-center md:items-start gap-2">
            <h3 className="font-['Lexend',sans-serif] font-extrabold text-[24px] md:text-[22px] text-[#0f172a] leading-[30px] md:leading-tight">
              Post Your Care{"\n"}Requirement
            </h3>
            <p className="font-['Inter',sans-serif] text-[14px] text-[#64748b] leading-[20px] max-w-[240px] md:max-w-none">
              Get responses from verified{"\n"}agencies in minutes.
            </p>
          </div>

          {/* CTA + Badges */}
          <div className="shrink-0 flex flex-col items-center gap-4 pt-4 md:pt-0">
            <RainbowButton
              onClick={() => navigate("/post-requirement")}
              className="font-['Lexend',sans-serif] font-bold text-[16px] md:text-[15px] px-6 md:px-7 py-4 md:py-3.5 rounded-[16px] h-auto active:scale-[0.97] transition-all"
            >
              <span className="relative z-10">Post Requirements</span>
            </RainbowButton>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <div className="bg-[#10b981] rounded-full size-[6px]" />
                <span className="font-['Lexend',sans-serif] font-bold text-[10px] text-[#94a3b8] tracking-[1px] uppercase">Verified</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="bg-[#1975d2] rounded-full size-[6px]" />
                <span className="font-['Lexend',sans-serif] font-bold text-[10px] text-[#94a3b8] tracking-[1px] uppercase">Negotiable</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="bg-[#f97316] rounded-full size-[6px]" />
                <span className="font-['Lexend',sans-serif] font-bold text-[10px] text-[#94a3b8] tracking-[1px] uppercase">24/7</span>
              </div>
            </div>
          </div>
        </div>
        <BorderBeam size={250} duration={8} colorFrom="#1975D2" colorTo="#10b981" borderWidth={3} />
      </div>

      {/* Floating Bubbles */}
      <div className="absolute -top-[3px] left-[42px] md:left-[60px] size-[34px] z-10 pointer-events-none">
        
      </div>
      <div className="absolute top-[71px] md:-top-4 right-[36px] md:right-[120px] size-[48px] z-10 pointer-events-none">
        
      </div>
      <div className="absolute bottom-[204px] md:bottom-[-10px] left-[25px] md:left-[30px] size-[40px] z-10 pointer-events-none">
        
      </div>
      <div className="absolute bottom-[163px] md:bottom-[-8px] right-[25px] md:right-[80px] size-[37px] z-10 pointer-events-none">
        
      </div>
    </div>
  );
}