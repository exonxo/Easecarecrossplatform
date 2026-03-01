import svgPaths from "./svg-a6gaa4sifl";
import imgProfileOfJaneWilliams from "figma:asset/c051f3d4c6787b99eea9c07c5a010f2c73794026.png";
import imgProfileOfJaneWilliams1 from "figma:asset/152b6e3920b3e2ffb6f14abef5f961bdeb6c14f8.png";

function ProfileOfJaneWilliams() {
  return (
    <div className="h-[513px] relative shrink-0 w-full" data-name="Profile of Jane Williams">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute h-full left-[-48.6%] max-w-none top-0 w-[197.19%]" src={imgProfileOfJaneWilliams} />
        </div>
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute h-full left-[-22.05%] max-w-none top-0 w-[144.1%]" src={imgProfileOfJaneWilliams1} />
        </div>
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="h-[10px] relative shrink-0 w-[12px]" data-name="Margin">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 10">
        <g id="Margin">
          <path d={svgPaths.p379d1600} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#22c55e] content-stretch flex items-center px-[8px] py-[4px] relative rounded-[6px] shrink-0" data-name="Background">
      <Margin />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-white tracking-[-0.5px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">Aadhar Verified</p>
      </div>
    </div>
  );
}

function Margin1() {
  return (
    <div className="h-[9.5px] mr-[-0.01px] relative shrink-0 w-[14px]" data-name="Margin">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 9.5">
        <g id="Margin">
          <path d={svgPaths.pc98bac0} fill="var(--fill-0, black)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#f79009] content-stretch flex items-center pl-[8px] pr-[8.01px] py-[4px] relative rounded-[6px] shrink-0" data-name="Background">
      <Margin1 />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] mr-[-0.01px] not-italic relative shrink-0 text-[10px] text-black tracking-[-0.5px] uppercase w-[14.5px]">
        <p className="leading-[15px] whitespace-pre-wrap">4.7</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[308px]" data-name="Container">
      <Background />
      <Background1 />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[308px]" data-name="Heading 2">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[36px] justify-center leading-[0] not-italic relative shrink-0 text-[30px] text-white w-[259.25px]">
        <p className="leading-[36px] whitespace-pre-wrap">Ravi Kumar, 35</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[308px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.8)] w-[218.2px]">
        <p className="leading-[20px] whitespace-pre-wrap">Gardening • 5yrs Experience</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.6)] w-full">
        <p className="leading-[16px] whitespace-pre-wrap">Duration</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white w-full">
        <p className="leading-[16px] whitespace-pre-wrap">6hrs / day</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[12px] relative w-full">
        <Container5 />
        <Container6 />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.6)] text-right whitespace-nowrap">
        <p className="leading-[16px]">Expected Pay</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-right text-white w-[83.27px]">
        <p className="leading-[28px] whitespace-pre-wrap">Rs. 2k-3k</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <Container8 />
        <Container9 />
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="content-stretch flex gap-[16px] items-start justify-center pt-[17px] relative shrink-0 w-[308px]" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.2)] border-solid border-t inset-0 pointer-events-none" />
      <Container4 />
      <Container7 />
    </div>
  );
}

function Container1() {
  return (
    <div className="-translate-x-1/2 absolute bg-gradient-to-b bottom-0 content-stretch flex flex-col from-[rgba(0,0,0,0)] gap-[10px] h-[235px] items-start justify-end left-1/2 p-[24px] to-black" data-name="Container">
      <Container2 />
      <Heading />
      <Container3 />
      <HorizontalBorder />
    </div>
  );
}

function Container10() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p6c8ea80} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute backdrop-blur-[6px] bg-[rgba(255,255,255,0.2)] content-stretch flex flex-col items-center justify-center p-[8px] right-[16px] rounded-[9999px] top-[16px]" data-name="Button">
      <Container10 />
    </div>
  );
}

function Container() {
  return (
    <div className="h-[508px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[inherit] size-full">
        <ProfileOfJaneWilliams />
        <div className="absolute bg-gradient-to-t from-[rgba(0,0,0,0.8)] inset-0 to-[rgba(0,0,0,0)] via-1/2 via-[rgba(0,0,0,0)]" data-name="Gradient" />
        <Container1 />
        <Button />
      </div>
    </div>
  );
}

function Article() {
  return (
    <div className="bg-white h-[510px] relative rounded-[32px] shrink-0 w-[358px]" data-name="Article">
      <div className="content-stretch flex flex-col items-start justify-center overflow-clip p-px relative rounded-[inherit] size-full">
        <Container />
      </div>
      <div aria-hidden="true" className="absolute border border-[#727272] border-solid inset-0 pointer-events-none rounded-[32px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function ProfileOfJaneWilliams1() {
  return (
    <div className="h-[513px] relative shrink-0 w-full" data-name="Profile of Jane Williams">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute h-full left-[-48.6%] max-w-none top-0 w-[197.19%]" src={imgProfileOfJaneWilliams} />
        </div>
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute h-full left-[-22.05%] max-w-none top-0 w-[144.1%]" src={imgProfileOfJaneWilliams1} />
        </div>
      </div>
    </div>
  );
}

function Margin2() {
  return (
    <div className="h-[10px] relative shrink-0 w-[12px]" data-name="Margin">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 10">
        <g id="Margin">
          <path d={svgPaths.p379d1600} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#22c55e] content-stretch flex items-center px-[8px] py-[4px] relative rounded-[6px] shrink-0" data-name="Background">
      <Margin2 />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-white tracking-[-0.5px] uppercase w-[83.56px]">
        <p className="leading-[15px] whitespace-pre-wrap">Aadhar Verified</p>
      </div>
    </div>
  );
}

function Margin3() {
  return (
    <div className="h-[9.5px] mr-[-0.01px] relative shrink-0 w-[14px]" data-name="Margin">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 9.5">
        <g id="Margin">
          <path d={svgPaths.pc98bac0} fill="var(--fill-0, black)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#eab308] content-stretch flex items-center pl-[8px] pr-[8.01px] py-[4px] relative rounded-[6px] shrink-0" data-name="Background">
      <Margin3 />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] mr-[-0.01px] not-italic relative shrink-0 text-[10px] text-black tracking-[-0.5px] uppercase w-[14.5px]">
        <p className="leading-[15px] whitespace-pre-wrap">4.9</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[308px]" data-name="Container">
      <Background2 />
      <Background3 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[308px]" data-name="Heading 2">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[36px] justify-center leading-[0] not-italic relative shrink-0 text-[30px] text-white w-[259.25px]">
        <p className="leading-[36px] whitespace-pre-wrap">Meera Iyer, 29</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[308px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.8)] w-[218.2px]">
        <p className="leading-[20px] whitespace-pre-wrap">Cooking • 10yrs Experience</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.6)] w-full">
        <p className="leading-[16px] whitespace-pre-wrap">Duration</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white w-full">
        <p className="leading-[16px] whitespace-pre-wrap">8hrs / day</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[12px] relative w-full">
        <Container16 />
        <Container17 />
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.6)] text-right whitespace-nowrap">
        <p className="leading-[16px]">Expected Pay</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-right text-white w-[83.27px]">
        <p className="leading-[28px] whitespace-pre-wrap">Rs. 5k-6k</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <Container19 />
        <Container20 />
      </div>
    </div>
  );
}

function HorizontalBorder1() {
  return (
    <div className="content-stretch flex gap-[16px] items-start justify-center pt-[17px] relative shrink-0 w-[308px]" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.2)] border-solid border-t inset-0 pointer-events-none" />
      <Container15 />
      <Container18 />
    </div>
  );
}

function Container12() {
  return (
    <div className="-translate-x-1/2 absolute bg-gradient-to-b bottom-0 content-stretch flex flex-col from-[rgba(0,0,0,0)] gap-[10px] h-[235px] items-start justify-end left-1/2 p-[24px] to-black" data-name="Container">
      <Container13 />
      <Heading1 />
      <Container14 />
      <HorizontalBorder1 />
    </div>
  );
}

function Container21() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p6c8ea80} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute backdrop-blur-[6px] bg-[rgba(255,255,255,0.2)] content-stretch flex flex-col items-center justify-center p-[8px] right-[16px] rounded-[9999px] top-[16px]" data-name="Button">
      <Container21 />
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[508px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[inherit] size-full">
        <ProfileOfJaneWilliams1 />
        <div className="absolute bg-gradient-to-t from-[rgba(0,0,0,0.8)] inset-[51px_0_0_0] to-[rgba(0,0,0,0)] via-1/2 via-[rgba(0,0,0,0)]" data-name="Gradient" />
        <Container12 />
        <Button1 />
      </div>
    </div>
  );
}

function Article1() {
  return (
    <div className="bg-white h-[510px] relative rounded-[32px] shrink-0 w-[358px]" data-name="Article">
      <div className="content-stretch flex flex-col items-start justify-center overflow-clip p-px relative rounded-[inherit] size-full">
        <Container11 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#727272] border-solid inset-0 pointer-events-none rounded-[32px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function ProfileOfJaneWilliams2() {
  return (
    <div className="h-[513px] relative shrink-0 w-full" data-name="Profile of Jane Williams">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute h-full left-[-48.6%] max-w-none top-0 w-[197.19%]" src={imgProfileOfJaneWilliams} />
        </div>
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute h-full left-[-22.05%] max-w-none top-0 w-[144.1%]" src={imgProfileOfJaneWilliams1} />
        </div>
      </div>
    </div>
  );
}

function Margin4() {
  return (
    <div className="h-[10px] relative shrink-0 w-[12px]" data-name="Margin">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 10">
        <g id="Margin">
          <path d={svgPaths.p379d1600} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-[#22c55e] content-stretch flex items-center px-[8px] py-[4px] relative rounded-[6px] shrink-0" data-name="Background">
      <Margin4 />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-white tracking-[-0.5px] uppercase w-[83.56px]">
        <p className="leading-[15px] whitespace-pre-wrap">Aadhar Verified</p>
      </div>
    </div>
  );
}

function Margin5() {
  return (
    <div className="h-[9.5px] mr-[-0.01px] relative shrink-0 w-[14px]" data-name="Margin">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 9.5">
        <g id="Margin">
          <path d={svgPaths.pc98bac0} fill="var(--fill-0, black)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background5() {
  return (
    <div className="bg-[#eab308] content-stretch flex items-center pl-[8px] pr-[8.01px] py-[4px] relative rounded-[6px] shrink-0" data-name="Background">
      <Margin5 />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] mr-[-0.01px] not-italic relative shrink-0 text-[10px] text-black tracking-[-0.5px] uppercase w-[14.5px]">
        <p className="leading-[15px] whitespace-pre-wrap">4.6</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[308px]" data-name="Container">
      <Background4 />
      <Background5 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[308px]" data-name="Heading 2">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[36px] justify-center leading-[0] not-italic relative shrink-0 text-[30px] text-white w-[259.25px]">
        <p className="leading-[36px] whitespace-pre-wrap">Anil Singh, 50</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[308px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.8)] w-[218.2px]">
        <p className="leading-[20px] whitespace-pre-wrap">Plumbing • 15yrs Experience</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.6)] w-full">
        <p className="leading-[16px] whitespace-pre-wrap">Duration</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white w-full">
        <p className="leading-[16px] whitespace-pre-wrap">4hrs / day</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[12px] relative w-full">
        <Container27 />
        <Container28 />
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.6)] text-right whitespace-nowrap">
        <p className="leading-[16px]">Expected Pay</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-right text-white w-[83.27px]">
        <p className="leading-[28px] whitespace-pre-wrap">Rs. 3k-4k</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <Container30 />
        <Container31 />
      </div>
    </div>
  );
}

function HorizontalBorder2() {
  return (
    <div className="content-stretch flex gap-[16px] items-start justify-center pt-[17px] relative shrink-0 w-[308px]" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.2)] border-solid border-t inset-0 pointer-events-none" />
      <Container26 />
      <Container29 />
    </div>
  );
}

function Container23() {
  return (
    <div className="-translate-x-1/2 absolute bg-gradient-to-b bottom-0 content-stretch flex flex-col from-[rgba(0,0,0,0)] gap-[10px] h-[235px] items-start justify-end left-1/2 p-[24px] to-black" data-name="Container">
      <Container24 />
      <Heading2 />
      <Container25 />
      <HorizontalBorder2 />
    </div>
  );
}

function Container32() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p6c8ea80} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute backdrop-blur-[6px] bg-[rgba(255,255,255,0.2)] content-stretch flex flex-col items-center justify-center p-[8px] right-[16px] rounded-[9999px] top-[16px]" data-name="Button">
      <Container32 />
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[508px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[inherit] size-full">
        <ProfileOfJaneWilliams2 />
        <div className="absolute bg-gradient-to-t from-[rgba(0,0,0,0.8)] inset-[51px_0_0_0] to-[rgba(0,0,0,0)] via-1/2 via-[rgba(0,0,0,0)]" data-name="Gradient" />
        <Container23 />
        <Button2 />
      </div>
    </div>
  );
}

function Article2() {
  return (
    <div className="bg-white h-[510px] relative rounded-[32px] shrink-0 w-[358px]" data-name="Article">
      <div className="content-stretch flex flex-col items-start justify-center overflow-clip p-px relative rounded-[inherit] size-full">
        <Container22 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#727272] border-solid inset-0 pointer-events-none rounded-[32px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function ProfileOfJaneWilliams3() {
  return (
    <div className="h-[513px] relative shrink-0 w-full" data-name="Profile of Jane Williams">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute h-full left-[-48.6%] max-w-none top-0 w-[197.19%]" src={imgProfileOfJaneWilliams} />
        </div>
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute h-full left-[-22.05%] max-w-none top-0 w-[144.1%]" src={imgProfileOfJaneWilliams1} />
        </div>
      </div>
    </div>
  );
}

function Margin6() {
  return (
    <div className="h-[10px] relative shrink-0 w-[12px]" data-name="Margin">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 10">
        <g id="Margin">
          <path d={svgPaths.p379d1600} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background6() {
  return (
    <div className="bg-[#22c55e] content-stretch flex items-center px-[8px] py-[4px] relative rounded-[6px] shrink-0" data-name="Background">
      <Margin6 />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-white tracking-[-0.5px] uppercase w-[83.56px]">
        <p className="leading-[15px] whitespace-pre-wrap">Aadhar Verified</p>
      </div>
    </div>
  );
}

function Margin7() {
  return (
    <div className="h-[9.5px] mr-[-0.01px] relative shrink-0 w-[14px]" data-name="Margin">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 9.5">
        <g id="Margin">
          <path d={svgPaths.pc98bac0} fill="var(--fill-0, black)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background7() {
  return (
    <div className="bg-[#eab308] content-stretch flex items-center pl-[8px] pr-[8.01px] py-[4px] relative rounded-[6px] shrink-0" data-name="Background">
      <Margin7 />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] mr-[-0.01px] not-italic relative shrink-0 text-[10px] text-black tracking-[-0.5px] uppercase w-[14.5px]">
        <p className="leading-[15px] whitespace-pre-wrap">4.5</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[308px]" data-name="Container">
      <Background6 />
      <Background7 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[308px]" data-name="Heading 2">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[36px] justify-center leading-[0] not-italic relative shrink-0 text-[30px] text-white w-[259.25px]">
        <p className="leading-[36px] whitespace-pre-wrap">Priya Rao, 38</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[308px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.8)] w-[218.2px]">
        <p className="leading-[20px] whitespace-pre-wrap">Childcare • 6yrs Experience</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.6)] w-full">
        <p className="leading-[16px] whitespace-pre-wrap">Duration</p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white w-full">
        <p className="leading-[16px] whitespace-pre-wrap">12hrs / day</p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[12px] relative w-full">
        <Container38 />
        <Container39 />
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.6)] text-right whitespace-nowrap">
        <p className="leading-[16px]">Expected Pay</p>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-right text-white w-[83.27px]">
        <p className="leading-[28px] whitespace-pre-wrap">Rs. 5k-7k</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <Container41 />
        <Container42 />
      </div>
    </div>
  );
}

function HorizontalBorder3() {
  return (
    <div className="content-stretch flex gap-[16px] items-start justify-center pt-[17px] relative shrink-0 w-[308px]" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.2)] border-solid border-t inset-0 pointer-events-none" />
      <Container37 />
      <Container40 />
    </div>
  );
}

function Container34() {
  return (
    <div className="-translate-x-1/2 absolute bg-gradient-to-b bottom-0 content-stretch flex flex-col from-[rgba(0,0,0,0)] gap-[10px] h-[235px] items-start justify-end left-1/2 p-[24px] to-black" data-name="Container">
      <Container35 />
      <Heading3 />
      <Container36 />
      <HorizontalBorder3 />
    </div>
  );
}

function Container43() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p6c8ea80} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute backdrop-blur-[6px] bg-[rgba(255,255,255,0.2)] content-stretch flex flex-col items-center justify-center p-[8px] right-[16px] rounded-[9999px] top-[16px]" data-name="Button">
      <Container43 />
    </div>
  );
}

function Container33() {
  return (
    <div className="h-[508px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[inherit] size-full">
        <ProfileOfJaneWilliams3 />
        <div className="absolute bg-gradient-to-t from-[rgba(0,0,0,0.8)] inset-[51px_0_0_0] to-[rgba(0,0,0,0)] via-1/2 via-[rgba(0,0,0,0)]" data-name="Gradient" />
        <Container34 />
        <Button3 />
      </div>
    </div>
  );
}

function Article3() {
  return (
    <div className="bg-white h-[510px] relative rounded-[32px] shrink-0 w-[358px]" data-name="Article">
      <div className="content-stretch flex flex-col items-start justify-center overflow-clip p-px relative rounded-[inherit] size-full">
        <Container33 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#727272] border-solid inset-0 pointer-events-none rounded-[32px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[356px]">
      <Article />
      <Article1 />
      <Article2 />
      <Article3 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[17px] top-[187px] z-[3]">
      <Frame />
    </div>
  );
}

function FluentDismiss12Filled() {
  return (
    <div className="absolute left-[347.57px] size-[18px] top-[19px]" data-name="fluent:dismiss-12-filled">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="fluent:dismiss-12-filled">
          <path d={svgPaths.p182b7700} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container44() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[2.14px] items-center justify-center px-[16px] py-[12px] relative w-full">
          <div className="flex flex-col font-['Lexend:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[20px] text-white tracking-[0.15px] whitespace-nowrap">
            <p className="leading-[1.6]">Bids</p>
          </div>
          <FluentDismiss12Filled />
        </div>
      </div>
    </div>
  );
}

function Background8() {
  return (
    <div className="bg-[#e0f0ff] h-[6px] overflow-clip relative rounded-[9999px] shrink-0 w-full" data-name="Background">
      <div className="absolute bg-[#1975d2] inset-[0_91.73%_0_0] rounded-[9999px]" data-name="Background" />
    </div>
  );
}

function Background9() {
  return (
    <div className="bg-[#0f172a] content-stretch flex flex-col items-start px-[8px] py-[2px] relative rounded-[9999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-white whitespace-nowrap">
        <p className="leading-[15px]">1 of 16 Remaining</p>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex items-end justify-center relative shrink-0 w-full" data-name="Container">
      <Background9 />
    </div>
  );
}

function Container45() {
  return (
    <div className="max-w-[448px] relative shrink-0 w-[181px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start max-w-[inherit] p-[24px] relative w-full">
        <Background8 />
        <Container46 />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="backdrop-blur-[6px] content-stretch flex flex-col h-[56px] items-center relative shrink-0 w-full z-[2]" data-name="Header">
      <Container44 />
      <Container45 />
    </div>
  );
}

function Container48() {
  return (
    <div className="relative shrink-0 size-[23.4px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.4 23.4">
        <g id="Container">
          <path d={svgPaths.pc0fef00} fill="var(--fill-0, #EF4444)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[#0f172a] content-stretch flex items-center justify-center p-[4px] relative rounded-[9999px] shrink-0 size-[64px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-4 border-[#0f172a] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[#0f172a] left-1/2 rounded-[9999px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] size-[64px] top-1/2" data-name="Button:shadow" />
      <Container48 />
    </div>
  );
}

function Container49() {
  return (
    <div className="h-[27.3px] relative shrink-0 w-[35.8px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35.8 27.3">
        <g id="Container">
          <path d={svgPaths.p1700f100} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[80px]" data-name="Button" style={{ backgroundImage: "linear-gradient(-62.5022deg, rgb(6, 181, 70) 13.113%, rgb(0, 212, 78) 37.765%, rgb(0, 223, 89) 54.452%, rgb(2, 201, 75) 73.035%)" }}>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[rgba(255,255,255,0)] left-1/2 rounded-[9999px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] size-[80px] top-1/2" data-name="Button:shadow" />
      <Container49 />
    </div>
  );
}

function Container50() {
  return (
    <div className="relative shrink-0 size-[27.125px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.125 27.125">
        <g id="Container">
          <path d={svgPaths.p3afa7e00} fill="var(--fill-0, #3B82F6)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center p-[4px] relative rounded-[9999px] shrink-0 size-[64px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-4 border-[#f9fafb] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[#0f172a] left-1/2 rounded-[9999px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] size-[64px] top-1/2" data-name="Button:shadow" />
      <Container50 />
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex gap-[32px] items-center justify-center py-[24px] relative shrink-0 w-[390px] z-[1]" data-name="Container">
      <Button4 />
      <Button5 />
      <Button6 />
    </div>
  );
}

export default function Body() {
  return (
    <div className="content-stretch flex flex-col isolate items-center justify-between relative size-full" data-name="Body" style={{ backgroundImage: "linear-gradient(rgb(0, 0, 0) 0%, rgb(20, 25, 30) 59.615%, rgb(28, 36, 43) 67.308%, rgb(24, 49, 75) 85.096%, rgb(9, 95, 181) 100%)" }}>
      <Frame1 />
      <Header />
      <Container47 />
    </div>
  );
}