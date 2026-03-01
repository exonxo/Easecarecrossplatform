import image_806bc01de58b7aa068e9cc391fe74c20c9980a44 from 'figma:asset/806bc01de58b7aa068e9cc391fe74c20c9980a44.png'
import svgPaths from "../../../imports/svg-zdwmi91rdf";
import { useId } from "react";

export function LogoFull({ size = "default" }: { size?: "default" | "small" }) {
  const uid = useId();
  const scale = size === "small" ? 0.85 : 1;
  return (
    <div className="flex items-center gap-2">
      <div
        className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
        style={{ transform: `scale(${scale})`, transformOrigin: "left center" }}
      >
        <div className="col-1 h-[8.697px] ml-[6.76px] mt-0 relative row-1 w-[21.229px]">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.2294 8.69733">
            <g clipPath="url(#clip_el_12)"><path d={svgPaths.p12137500} fill="#1975D2" /><path d={svgPaths.p2a293a00} fill="#1975D2" /></g>
            <defs><clipPath id="clip_el_12"><rect fill="white" height="8.69733" width="21.2294" /></clipPath></defs>
          </svg>
        </div>
        <div className="col-1 h-[36.351px] ml-0 mt-[2.83px] relative row-1 w-[36.983px]">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36.9834 36.3509">
            <g clipPath={`url(#clip_logo_${uid})`}>
              <g><path d={svgPaths.p2b662140} fill="white" /><path d={svgPaths.p2b662140} fill={`url(#paint_logo_${uid})`} /><path d={svgPaths.pf97a300} fill="white" /></g>
            </g>
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" id={`paint_logo_${uid}`} x1="18.4805" x2="18.4805" y1="0.0357277" y2="36.3195">
                <stop stopColor="#08C5EF" /><stop offset="0.879808" stopColor="#4B58E4" />
              </linearGradient>
              <clipPath id={`clip_logo_${uid}`}><rect fill="white" height="36.3509" width="36.9834" /></clipPath>
            </defs>
          </svg>
        </div>
        <div className="col-1 h-[3.657px] ml-[14.59px] mt-[15.24px] relative row-1 w-[13.727px]">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.7274 3.65683">
            <g clipPath="url(#clip_el_13)"><path d={svgPaths.p4e37d00} fill="black" /><path d={svgPaths.p8c79d00} fill="black" /></g>
            <defs><clipPath id="clip_el_13"><rect fill="white" height="3.65683" width="13.7274" /></clipPath></defs>
          </svg>
        </div>
        <div className="col-1 h-[2.57px] ml-[19.71px] mt-[17.43px] relative row-1 w-[4.637px]">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.63744 2.56966">
            <g clipPath="url(#clip_el_14)"><path d={svgPaths.p136a3700} fill="#F49514" /><path d={svgPaths.p18050400} fill="#F2911B" /></g>
            <defs><clipPath id="clip_el_14"><rect fill="white" height="2.56966" width="4.63744" /></clipPath></defs>
          </svg>
        </div>
        <div className="col-1 h-[15.477px] ml-[11.6px] mt-[19.79px] relative row-1 w-[25.005px]">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.0048 15.4773">
            <g clipPath="url(#clip_el_15)">
              <path d={svgPaths.p38332480} fill="#E35406" /><path d={svgPaths.p3a406280} fill="#F5AE31" />
              <path d={svgPaths.p394edd00} fill="#FAD896" /><path d={svgPaths.p2d32ab80} fill="#F5AE31" />
              <path d={svgPaths.p11f7a680} fill="#AC0601" /><path d={svgPaths.p3e71ac00} fill="#AC0601" />
            </g>
            <defs><clipPath id="clip_el_15"><rect fill="white" height="15.4773" width="25.0048" /></clipPath></defs>
          </svg>
        </div>
      </div>
      <div className="flex flex-col leading-[1.2]">
        <span className="font-['Lexend',sans-serif] font-semibold text-[24px] text-[#282828] tracking-[-0.48px]">Easecare</span>
        <span className="font-['Inter',sans-serif] font-medium text-[6.7px] text-[#787878] tracking-[-0.13px]">Care That Feels Like Family</span>
      </div>
    </div>
  );
}
