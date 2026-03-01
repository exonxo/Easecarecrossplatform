import svgPaths from "./svg-6cbwsvbvc1";
import imgImageBackgroundShadow from "figma:asset/9993cb21c2b590b10a8340e790d7b18afe9e7dc6.png";
import imgImageBackgroundShadow1 from "figma:asset/a7455de5788187d982477500c5a3d5a62af17dfd.png";
import imgOverlayImage from "figma:asset/ea1647a0fa0c866a7d71d5f9feeeadf8c374265d.png";

function BackgroundBorderShadow() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start px-[13px] py-[5px] relative rounded-[9999px] self-stretch shrink-0" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[9999px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] w-[87.72px]">
        <p className="leading-[16px] whitespace-pre-wrap">Today, 9:41 AM</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch flex items-start justify-center left-[24px] right-[24px] top-[24px]" data-name="Container">
      <BackgroundBorderShadow />
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col h-[36px] items-end pb-[4px] relative shrink-0 w-[32px]" data-name="Margin">
      <div className="relative rounded-[9999px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0 size-[32px]" data-name="Image+Background+Shadow">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[9999px]">
          <div className="absolute bg-[#e2e8f0] inset-0 rounded-[9999px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[9999px]">
            <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImageBackgroundShadow} />
          </div>
        </div>
      </div>
    </div>
  );
}

function MarginAlignFlexEnd() {
  return (
    <div className="content-stretch flex items-end relative self-stretch shrink-0" data-name="Margin:align-flex-end">
      <Margin />
    </div>
  );
}

function BackgroundBorderShadow1() {
  return (
    <div className="bg-white relative rounded-bl-[2px] rounded-br-[16px] rounded-tl-[16px] rounded-tr-[16px] shrink-0 w-full" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border border-[rgba(226,232,240,0.6)] border-solid inset-0 pointer-events-none rounded-bl-[2px] rounded-br-[16px] rounded-tl-[16px] rounded-tr-[16px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col items-start p-[17px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[122px] justify-center leading-[24.38px] not-italic relative shrink-0 text-[#334155] text-[15px] w-[146.36px] whitespace-pre-wrap">
          <p className="mb-0">{`Hello! I'm reviewing`}</p>
          <p className="mb-0">{`your file now. I'll be`}</p>
          <p className="mb-0">heading over to your</p>
          <p className="mb-0">location shortly for</p>
          <p>the check-up.</p>
        </div>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <BackgroundBorderShadow1 />
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute content-stretch flex gap-[16px] items-start left-[24px] max-w-[275.3999938964844px] right-[65.41px] top-[82px]" data-name="Container">
      <MarginAlignFlexEnd />
      <Container2 />
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#0055d4] content-stretch flex flex-col items-start pl-[16px] pr-[37.43px] py-[16px] relative rounded-bl-[16px] rounded-br-[2px] rounded-tl-[16px] rounded-tr-[16px] shrink-0" data-name="Background">
      <div className="absolute bg-[rgba(255,255,255,0)] inset-[0_0_0.5px_0] shadow-[0px_4px_6px_-1px_rgba(59,130,246,0.1),0px_2px_4px_-2px_rgba(59,130,246,0.1)]" data-name="Overlay+Shadow" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[98px] justify-center leading-[24.38px] not-italic relative shrink-0 text-[15px] text-white w-[181.16px] whitespace-pre-wrap">
        <p className="mb-0">Hi Dr. Smith! Thanks for</p>
        <p className="mb-0">letting me know. Is there</p>
        <p className="mb-0">anything specific I should</p>
        <p>prepare?</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-end relative self-stretch shrink-0" data-name="Container">
      <Background1 />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex items-start left-[24px] max-w-[275.3999938964844px] right-[65.41px] top-[269.88px]" data-name="Container">
      <Container4 />
    </div>
  );
}

function Margin1() {
  return (
    <div className="content-stretch flex flex-col h-[36px] items-end pb-[4px] relative shrink-0 w-[32px]" data-name="Margin">
      <div className="relative rounded-[9999px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0 size-[32px]" data-name="Image+Background+Shadow">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[9999px]">
          <div className="absolute bg-[#e2e8f0] inset-0 rounded-[9999px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[9999px]">
            <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImageBackgroundShadow1} />
          </div>
        </div>
      </div>
    </div>
  );
}

function MarginAlignFlexEnd1() {
  return (
    <div className="content-stretch flex items-end relative self-stretch shrink-0" data-name="Margin:align-flex-end">
      <Margin1 />
    </div>
  );
}

function BackgroundBorderShadow2() {
  return (
    <div className="bg-white relative rounded-bl-[2px] rounded-br-[16px] rounded-tl-[16px] rounded-tr-[16px] shrink-0 w-full" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border border-[rgba(226,232,240,0.6)] border-solid inset-0 pointer-events-none rounded-bl-[2px] rounded-br-[16px] rounded-tl-[16px] rounded-tr-[16px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col items-start pb-[17.255px] pt-[15.875px] px-[17px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[74px] justify-center leading-[24.38px] not-italic relative shrink-0 text-[#334155] text-[15px] w-[249.34px] whitespace-pre-wrap">
          <p className="mb-0">Just your previous medical records</p>
          <p className="mb-0">{`if you have them handy. I'm on my`}</p>
          <p>way now!</p>
        </div>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[12px] relative shrink-0 w-[13.5px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.5 12">
        <g id="Container">
          <path d={svgPaths.p22eb5380} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundBorderOverlayBlur() {
  return (
    <div className="backdrop-blur-[2px] bg-[#0055d4] content-stretch flex items-center justify-center p-[4px] relative rounded-[9999px] shrink-0 size-[40px]" data-name="Background+Border+OverlayBlur">
      <div aria-hidden="true" className="absolute border-4 border-[rgba(255,255,255,0.3)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[rgba(255,255,255,0)] left-1/2 rounded-[9999px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] size-[40px] top-1/2" data-name="Overlay+Shadow" />
      <Container8 />
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex inset-px items-center justify-center" data-name="Container">
      <BackgroundBorderOverlayBlur />
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-[#f1f5f9] h-[112px] relative rounded-[8px] shrink-0 w-full" data-name="Background+Border">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute inset-px opacity-90" data-name="Overlay+Image">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 overflow-hidden">
              <img alt="" className="absolute h-[236.36%] left-0 max-w-none top-[-68.18%] w-full" src={imgOverlayImage} />
            </div>
            <div className="absolute bg-[rgba(255,255,255,0.2)] inset-0 mix-blend-saturation" />
          </div>
        </div>
        <Container7 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#f1f5f9] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] tracking-[0.6px] uppercase w-[88.2px]">
        <p className="leading-[16px] whitespace-pre-wrap">Est. Arrival</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#0055d4] text-[20px] w-[74.17px]">
        <p className="leading-[28px] whitespace-pre-wrap">10 mins</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0" data-name="Container">
      <Container11 />
      <Container12 />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] text-right w-[50.3px]">
        <p className="leading-[16px] whitespace-pre-wrap">Distance</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[16px] text-right w-[53.28px]">
        <p className="leading-[24px] whitespace-pre-wrap">2.4 km</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container14 />
      <Container15 />
    </div>
  );
}

function Container9() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between px-[4px] relative w-full">
          <Container10 />
          <Container13 />
        </div>
      </div>
    </div>
  );
}

function BackgroundBorderShadow3() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[12px] items-start p-[13px] relative rounded-[12px] shrink-0 w-[288px]" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border border-[rgba(226,232,240,0.6)] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <BackgroundBorder />
      <Container9 />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col gap-[7.99px] items-start relative self-stretch shrink-0" data-name="Container">
      <BackgroundBorderShadow2 />
      <BackgroundBorderShadow3 />
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute content-stretch flex gap-[16px] items-start left-[54.3px] max-w-[275.3999938964844px] right-[-5.7px] top-[431.38px]" data-name="Container">
      <MarginAlignFlexEnd1 />
      <Container6 />
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#0055d4] content-stretch flex flex-col items-start pb-[16.38px] pt-[15px] px-[16px] relative rounded-bl-[16px] rounded-br-[2px] rounded-tl-[16px] rounded-tr-[16px] shrink-0" data-name="Background">
      <div className="absolute bg-[rgba(255,255,255,0)] inset-0 shadow-[0px_4px_6px_-1px_rgba(59,130,246,0.1),0px_2px_4px_-2px_rgba(59,130,246,0.1)]" data-name="Overlay+Shadow" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[25px] justify-center leading-[0] not-italic relative shrink-0 text-[15px] text-white w-[147.03px]">
        <p className="leading-[24.38px] whitespace-pre-wrap">Got it. See you soon!</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[11px] w-[79.03px]">
        <p className="leading-[16.5px] whitespace-pre-wrap">Read 10:05 AM</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[7.015px] relative shrink-0 w-[12.775px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.775 7.01458">
        <g id="Container">
          <path d={svgPaths.pfb5e518} fill="var(--fill-0, #0055D4)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <Container19 />
      <Container20 />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-end relative self-stretch shrink-0" data-name="Container">
      <Background2 />
      <Container18 />
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute content-stretch flex items-start left-[24px] max-w-[275.3999938964844px] pl-[55.56px] right-[65.41px] top-[774.5px]" data-name="Container">
      <Container17 />
    </div>
  );
}

export default function Background() {
  return (
    <div className="bg-[#f4f8fb] relative size-full" data-name="Background">
      <Container />
      <Container1 />
      <Container3 />
      <Container5 />
      <Container16 />
    </div>
  );
}