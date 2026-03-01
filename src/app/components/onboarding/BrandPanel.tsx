/**
 * BrandPanel - Left-side branded panel shown on desktop during onboarding.
 * Displays the Easecare logo with gradient background and decorative blurs.
 * Hidden on mobile (md:flex).
 */
import svgPaths from "../../../imports/svg-ctgj09v4o8";

function Logo() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="col-1 h-[29.472px] ml-[22.91px] mt-0 relative row-1 w-[71.939px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 71.9392 29.4723">
          <g clipPath="url(#clip_bp_12)"><path d={svgPaths.p30cb2000} fill="#1975D2" /><path d={svgPaths.p2b2e83e0} fill="#1975D2" /></g>
          <defs><clipPath id="clip_bp_12"><rect fill="white" height="29.4723" width="71.9392" /></clipPath></defs>
        </svg>
      </div>
      <div className="col-1 h-[123.181px] ml-0 mt-[9.58px] relative row-1 w-[125.324px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 125.324 123.181">
          <g clipPath="url(#clip_bp_11)"><g><path d={svgPaths.p279ee3c0} fill="white" /><path d={svgPaths.p279ee3c0} fill="url(#paint_bp_11)" /><path d={svgPaths.p3cb2b480} fill="white" /></g></g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint_bp_11" x1="62.6245" x2="62.6245" y1="0.120939" y2="123.074"><stop stopColor="#08C5EF" /><stop offset="0.879808" stopColor="#4B58E4" /></linearGradient>
            <clipPath id="clip_bp_11"><rect fill="white" height="123.181" width="125.324" /></clipPath>
          </defs>
        </svg>
      </div>
      <div className="col-1 h-[12.392px] ml-[49.43px] mt-[51.64px] relative row-1 w-[46.517px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 46.5175 12.3918">
          <g clipPath="url(#clip_bp_13)"><path d={svgPaths.p3a5d4480} fill="black" /><path d={svgPaths.p1314ecf0} fill="black" /></g>
          <defs><clipPath id="clip_bp_13"><rect fill="white" height="12.3918" width="46.5175" /></clipPath></defs>
        </svg>
      </div>
      <div className="col-1 h-[8.708px] ml-[66.78px] mt-[59.08px] relative row-1 w-[15.715px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.7147 8.70772">
          <g clipPath="url(#clip_bp_14)"><path d={svgPaths.p2afdb00} fill="#F49514" /><path d={svgPaths.p561b2f0} fill="#F2911B" /></g>
          <defs><clipPath id="clip_bp_14"><rect fill="white" height="8.70772" width="15.7147" /></clipPath></defs>
        </svg>
      </div>
      <div className="col-1 h-[52.447px] ml-[39.32px] mt-[67.05px] relative row-1 w-[84.733px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 84.7328 52.4473">
          <g clipPath="url(#clip_bp_15)"><path d={svgPaths.p8251800} fill="#E35406" /><path d={svgPaths.p25968080} fill="#F5AE31" /><path d={svgPaths.p1684f400} fill="#FAD896" /><path d={svgPaths.pdd43900} fill="#F5AE31" /><path d={svgPaths.p1635d000} fill="#AC0601" /><path d={svgPaths.p14def300} fill="#AC0601" /></g>
          <defs><clipPath id="clip_bp_15"><rect fill="white" height="52.4473" width="84.7328" /></clipPath></defs>
        </svg>
      </div>
    </div>
  );
}

export function BrandPanel() {
  return (
    <div className="bg-[#1e5ab3] flex-1 relative flex-col items-center justify-center min-h-[280px] md:min-h-0 md:h-full hidden md:flex">
      <div className="absolute bg-[#60a5fa] blur-[32px] left-[-16px] mix-blend-multiply opacity-20 rounded-full size-[384px] top-0 pointer-events-none" />
      <div className="absolute bg-[#93c5fd] blur-[32px] bottom-0 mix-blend-multiply opacity-20 right-[16px] rounded-full size-[384px] pointer-events-none" />
      <div className="absolute bg-gradient-to-t bottom-0 from-[rgba(0,0,0,0.1)] h-[96px] left-0 right-0 to-transparent pointer-events-none" />
      <div className="flex flex-col gap-[12.76px] items-center p-12 relative z-10">
        <Logo />
        <div className="inline-grid leading-[1.2] place-items-start text-white text-center">
          <p className="font-['Lexend',sans-serif] font-semibold text-[55.843px] tracking-[-1.1169px]">Easecare</p>
          <p className="font-['Inter',sans-serif] font-medium text-[13.008px] tracking-[-0.2602px] mt-1 self-center">Care That Feels Like Family</p>
        </div>
      </div>
    </div>
  );
}
