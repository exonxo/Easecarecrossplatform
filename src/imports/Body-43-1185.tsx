import svgPaths from "./svg-qj8qsh80fb";
import imgWorkerSelfie from "figma:asset/6a706695bf4ba31384f9e1118334cc6a5be30471.png";

function Container2() {
  return (
    <div className="h-[18px] relative shrink-0 w-[16px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 18">
        <g id="Container">
          <path d={svgPaths.p12a32500} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex h-[32px] items-center justify-center relative shrink-0 w-[40px]" data-name="Container">
      <Container2 />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Lexend:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[#64748b] text-[10px] w-[29.69px]">
        <p className="leading-[15px] whitespace-pre-wrap">Home</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center justify-center relative shrink-0 w-[64px]" data-name="Link">
      <Container1 />
      <Container3 />
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[20px] relative shrink-0 w-[18px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 20">
        <g id="Container">
          <path d={svgPaths.p3c95900} fill="var(--fill-0, #1975D2)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex h-[32px] items-center justify-center relative shrink-0 w-[40px]" data-name="Container">
      <Container5 />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Lexend:Medium',sans-serif] font-medium h-[15px] justify-center leading-[0] relative shrink-0 text-[#1975d2] text-[10px] w-[45.58px]">
        <p className="leading-[15px] whitespace-pre-wrap">Bookings</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center justify-center relative shrink-0 w-[64px]" data-name="Link">
      <Container4 />
      <Container6 />
    </div>
  );
}

function Container8() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p1fe7b600} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex h-[32px] items-center justify-center relative shrink-0 w-[40px]" data-name="Container">
      <Container8 />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Lexend:Medium',sans-serif] font-medium h-[15px] justify-center leading-[0] relative shrink-0 text-[#64748b] text-[10px] w-[47.95px]">
        <p className="leading-[15px] whitespace-pre-wrap">Messages</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center justify-center relative shrink-0 w-[64px]" data-name="Link">
      <Container7 />
      <Container9 />
    </div>
  );
}

function Container11() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Container">
          <path d={svgPaths.p85bff00} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex h-[32px] items-center justify-center relative shrink-0 w-[40px]" data-name="Container">
      <Container11 />
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Lexend:Medium',sans-serif] font-medium h-[15px] justify-center leading-[0] relative shrink-0 text-[#64748b] text-[10px] w-[31.8px]">
        <p className="leading-[15px] whitespace-pre-wrap">Profile</p>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center justify-center relative shrink-0 w-[64px]" data-name="Link">
      <Container10 />
      <Container12 />
    </div>
  );
}

function Container() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-[16px] pr-[0.03px] relative size-full">
          <Link />
          <Link1 />
          <Link2 />
          <Link3 />
        </div>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <div className="backdrop-blur-[12px] bg-[rgba(255,255,255,0.95)] content-stretch flex flex-col h-[84px] items-start justify-center pointer-events-auto pt-[9px] px-[24px] sticky top-0 w-[390px] z-[3]" data-name="Nav">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-solid border-t inset-0 pointer-events-none" />
      <Container />
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[15px] relative shrink-0 w-[12px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 15">
        <g id="Container">
          <path d={svgPaths.p1a900f00} fill="var(--fill-0, #1975D2)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Lexend:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1975d2] text-[14px] whitespace-nowrap">
        <p className="[text-decoration-skip-ink:none] decoration-[rgba(25,117,210,0.4)] decoration-solid leading-[20px] underline">Salt Lake, Kolkata</p>
      </div>
    </div>
  );
}

function Location() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-[242px]" data-name="Location">
      <Container14 />
      <Container15 />
    </div>
  );
}

function Container16() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Container">
          <path d={svgPaths.p12b59a00} fill="var(--fill-0, #1975D2)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-h-px min-w-px relative" data-name="Container">
      <Location />
      <Container16 />
    </div>
  );
}

function Overlay() {
  return (
    <div className="bg-[#e0f0ff] relative shrink-0 w-full" data-name="Overlay">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[16px] py-[8px] relative w-full">
          <Container13 />
        </div>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[16.523px] relative shrink-0 w-[13.5px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.5 16.5234">
        <g id="Container">
          <path d={svgPaths.p1e6496b0} fill="var(--fill-0, #111827)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] items-center px-[17px] py-[9px] relative rounded-[9999px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <Container18 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#111827] text-[14px] text-center w-[30.84px]">
        <p className="leading-[20px] whitespace-pre-wrap">Help</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between px-[16px] py-[12px] relative w-full">
          <div className="flex flex-col font-['Lexend:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#0f172a] text-[30px] tracking-[-0.75px] whitespace-nowrap">
            <p className="leading-[37.5px]">Bookings</p>
          </div>
          <Button />
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center pb-[13.5px] pt-[0.5px] relative w-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[14px] text-center whitespace-nowrap">
          <p className="leading-[20px]">My Active Requests</p>
        </div>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#2077cf] border-b-2 border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center pb-[14px] relative w-full">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#2077cf] text-[14px] text-center w-[134.33px]">
          <p className="leading-[20px] whitespace-pre-wrap">History</p>
        </div>
      </div>
    </div>
  );
}

function Section() {
  return (
    <div className="relative shrink-0 w-full" data-name="Section">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-center pb-px pt-[12px] relative w-full">
        <Button1 />
        <Button2 />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="backdrop-blur-[6px] bg-[rgba(255,255,255,0.95)] content-stretch flex flex-col items-start pb-px relative shrink-0 w-full z-[2]" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#f1f5f9] border-b border-solid inset-0 pointer-events-none" />
      <Overlay />
      <Container17 />
      <Section />
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[12px] w-[154.58px]">
        <p className="leading-[16px] whitespace-pre-wrap">{`25/01/2026 `}</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container21 />
    </div>
  );
}

function WorkerSelfie() {
  return (
    <div className="pointer-events-none relative rounded-[16px] shrink-0 size-[64px]" data-name="Worker Selfie">
      <div className="absolute inset-0 overflow-hidden rounded-[16px]">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgWorkerSelfie} />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 rounded-[16px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="absolute bottom-[-4px] h-[16.75px] right-[-4px] w-[17.18px]" data-name="Background+Border">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.1797 16.75">
        <g id="Background+Border">
          <rect fill="var(--fill-0, #3B82F6)" height="14.75" rx="7.375" width="15.1797" x="1" y="1" />
          <rect height="14.75" rx="7.375" stroke="var(--stroke-0, white)" strokeWidth="2" width="15.1797" x="1" y="1" />
          <path d={svgPaths.p3136b280} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <WorkerSelfie />
      <BackgroundBorder />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#111827] text-[18px] w-full">
        <p className="leading-[28px] whitespace-pre-wrap">Jane Williams</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[14px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Housekeeping</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="h-[11.074px] relative shrink-0 w-[11.648px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6484 11.0742">
        <g id="Container">
          <path d={svgPaths.p2ad35b00} fill="var(--fill-0, #FACC15)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#111827] text-[12px] w-[18.38px]">
        <p className="leading-[16px] whitespace-pre-wrap">4.8</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[12px] w-[144.2px]">
        <p className="leading-[16px] whitespace-pre-wrap">• Bright Cleaners Agency</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex gap-[4px] items-center pt-[4px] relative shrink-0 w-full" data-name="Container">
      <Container27 />
      <Container28 />
      <Container29 />
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Container">
      <Heading />
      <Container25 />
      <Container26 />
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Container23 />
      <Container24 />
    </div>
  );
}

function Container19() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start p-[20px] relative w-full">
        <Container20 />
        <Container22 />
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[8px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-px py-[11px] relative w-full">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#111827] text-[14px] text-center whitespace-nowrap">
          <p className="leading-[20px]">Report an Issue</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundHorizontalBorder() {
  return (
    <div className="bg-[#f9fafb] relative shrink-0 w-full" data-name="Background+HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-center pb-[12px] pt-[13px] px-[20px] relative w-full">
          <Button3 />
        </div>
      </div>
    </div>
  );
}

function BackgroundBorderShadow() {
  return (
    <div className="bg-white relative rounded-[16px] shrink-0 w-[358px] z-[1]" data-name="Background+Border+Shadow">
      <div className="content-stretch flex flex-col items-start overflow-clip pb-px pt-[9px] px-px relative rounded-[inherit] w-full">
        <Container19 />
        <BackgroundHorizontalBorder />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_4px_20px_-2px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

export default function Body() {
  return (
    <div className="bg-[#f6f8fc] content-stretch flex flex-col gap-[16px] isolate items-center relative size-full" data-name="Body">
      <div className="absolute bottom-0 h-[84.16999999999996px] left-0 pointer-events-none top-[799.83px]">
        <Nav />
      </div>
      <Header />
      <BackgroundBorderShadow />
    </div>
  );
}