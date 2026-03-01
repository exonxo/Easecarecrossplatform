import svgPaths from "./svg-9pqhkf0kbs";
import imgJohnArowokaAvatar from "figma:asset/218aa78e6debc065dda9dcce46b424a2eb00c59a.png";

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 1">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[36px] justify-center leading-[0] not-italic relative shrink-0 text-[#111827] text-[30px] w-[149.06px]">
        <p className="leading-[36px] whitespace-pre-wrap">My Profile</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.p3e9df400} fill="var(--fill-0, #EF4444)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex items-center px-[16px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
      <Container1 />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading />
      <Button />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Heading 2">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[32px] justify-center leading-[0] not-italic relative shrink-0 text-[#111827] text-[24px] text-center w-[168.47px]">
        <p className="leading-[32px] whitespace-pre-wrap">John Arowoka</p>
      </div>
    </div>
  );
}

function Heading2Margin() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[94.77px] pb-[4px] top-[185px]" data-name="Heading 2:margin">
      <Heading1 />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[14px] text-center w-[162.78px]">
        <p className="leading-[20px] whitespace-pre-wrap">johnarowoka1@mail.com</p>
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[97.61px] pb-[24px] top-[221px]" data-name="Margin">
      <Container3 />
    </div>
  );
}

function Container4() {
  return (
    <div className="relative shrink-0 size-[10.5px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.5 10.5">
        <g id="Container">
          <path d={svgPaths.p2cbc1080} fill="var(--fill-0, #111827)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#111827] text-[14px] text-center w-[72.34px]">
        <p className="leading-[20px] whitespace-pre-wrap">Edit Profile</p>
      </div>
    </div>
  );
}

function Margin1() {
  return (
    <div className="relative shrink-0" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pl-[8px] relative">
        <Container5 />
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-[#f9fafb] content-stretch flex items-center justify-center left-[33px] px-[17px] py-[11px] right-[33px] rounded-[8px] top-[265px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Container4 />
      <Margin1 />
    </div>
  );
}

function JohnArowokaAvatar() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="John Arowoka Avatar">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgJohnArowokaAvatar} />
      </div>
    </div>
  );
}

function OverlayBorderShadow() {
  return (
    <div className="bg-[rgba(255,255,255,0)] relative rounded-[9999px] shrink-0 size-[128px]" data-name="Overlay+Border+Shadow">
      <div className="content-stretch flex flex-col items-start justify-center overflow-clip p-[4px] relative rounded-[inherit] size-full">
        <JohnArowokaAvatar />
      </div>
      <div aria-hidden="true" className="absolute border-4 border-[#f9fafb] border-solid inset-0 pointer-events-none rounded-[9999px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <OverlayBorderShadow />
      <div className="absolute bg-[#10b981] bottom-[8px] right-[8px] rounded-[9999px] size-[24px]" data-name="Background+Border">
        <div aria-hidden="true" className="absolute border-4 border-solid border-white inset-0 pointer-events-none rounded-[9999px]" />
      </div>
    </div>
  );
}

function Margin2() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[115px] pb-[24px] top-[33px]" data-name="Margin">
      <Container6 />
    </div>
  );
}

function BackgroundBorderShadow() {
  return (
    <div className="bg-white h-[340px] relative rounded-[16px] shrink-0 w-full" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <Heading2Margin />
      <Margin />
      <Button1 />
      <Margin2 />
    </div>
  );
}

function Background() {
  return (
    <div className="h-[40px] relative shrink-0 w-[36px]" data-name="Background">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 40">
        <g id="Background">
          <rect fill="var(--fill-0, #F9FAFB)" height="40" rx="12" width="36" />
          <path d={svgPaths.p3fb31340} fill="var(--fill-0, #247BD3)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Margin3() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[16px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#111827] text-[16px] w-[185.64px]">
        <p className="leading-[24px] whitespace-pre-wrap">Notification Preferences</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Container">
      <Background />
      <Margin3 />
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[12px] relative shrink-0 w-[7.4px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.4 12">
        <g id="Container">
          <path d={svgPaths.p28c84800} fill="var(--fill-0, #9CA3AF)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Link() {
  return (
    <div className="relative shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between p-[20px] relative w-full">
          <Container8 />
          <Container9 />
        </div>
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="h-[40px] relative shrink-0 w-[36px]" data-name="Background">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 40">
        <g id="Background">
          <rect fill="var(--fill-0, #F9FAFB)" height="40" rx="12" width="36" />
          <path d={svgPaths.p2ebddf00} fill="var(--fill-0, #247BD3)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Margin4() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[16px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#111827] text-[16px] w-[107.22px]">
        <p className="leading-[24px] whitespace-pre-wrap">Privacy Policy</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative">
        <Background1 />
        <Margin4 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[12px] relative shrink-0 w-[7.4px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.4 12">
        <g id="Container">
          <path d={svgPaths.p28c84800} fill="var(--fill-0, #9CA3AF)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Link1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Link">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-[20px] pt-[21px] px-[20px] relative w-full">
          <Container10 />
          <Container11 />
        </div>
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="h-[41px] relative shrink-0 w-[38px]" data-name="Background">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 41">
        <g id="Background">
          <rect fill="var(--fill-0, #F9FAFB)" height="41" rx="12" width="38" />
          <path d={svgPaths.p383ac100} fill="var(--fill-0, #247BD3)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Margin5() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[16px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#111827] text-[16px] w-[133.69px]">
        <p className="leading-[24px] whitespace-pre-wrap">Help and Support</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative">
        <Background2 />
        <Margin5 />
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[12px] relative shrink-0 w-[7.4px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.4 12">
        <g id="Container">
          <path d={svgPaths.p28c84800} fill="var(--fill-0, #9CA3AF)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Link2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Link">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-[20px] pt-[21px] px-[20px] relative w-full">
          <Container12 />
          <Container13 />
        </div>
      </div>
    </div>
  );
}

function Background3() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="Background">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Background">
          <rect fill="var(--fill-0, #F9FAFB)" height="40" rx="12" width="40" />
          <path d={svgPaths.p97bb880} fill="var(--fill-0, #247BD3)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Margin6() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[16px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#111827] text-[16px] w-[75.7px]">
        <p className="leading-[24px] whitespace-pre-wrap">Language</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative">
        <Background3 />
        <Margin6 />
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[14px] w-[81.28px]">
        <p className="leading-[20px] whitespace-pre-wrap">English (US)</p>
      </div>
    </div>
  );
}

function Margin7() {
  return (
    <div className="h-[12px] relative shrink-0 w-[15.4px]" data-name="Margin">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.4 12">
        <g id="Margin">
          <path d={svgPaths.p35bea300} fill="var(--fill-0, #9CA3AF)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container15() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative">
        <Container16 />
        <Margin7 />
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Link">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-[20px] pt-[21px] px-[20px] relative w-full">
          <Container14 />
          <Container15 />
        </div>
      </div>
    </div>
  );
}

function BackgroundBorderShadow1() {
  return (
    <div className="bg-white relative rounded-[16px] shrink-0 w-full" data-name="Background+Border+Shadow">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] w-full">
        <Link />
        <Link1 />
        <Link2 />
        <Link3 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Section() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Section">
      <BackgroundBorderShadow1 />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Section />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="Container">
      <BackgroundBorderShadow />
      <Container7 />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-center pt-[16px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[14px] text-center w-[106.14px]">
        <p className="leading-[20px] whitespace-pre-wrap">Easecare v4.0.2</p>
      </div>
    </div>
  );
}

function Main() {
  return (
    <div className="max-w-[1280px] relative shrink-0 w-full z-[1]" data-name="Main">
      <div className="content-stretch flex flex-col gap-[32px] items-start max-w-[inherit] px-[16px] py-[40px] relative w-full">
        <Container />
        <Container2 />
        <Container17 />
      </div>
    </div>
  );
}

export default function Body() {
  return (
    <div className="bg-[#f6f8fc] content-stretch flex flex-col isolate items-start pb-[87px] relative size-full" data-name="Body">
      <Main />
    </div>
  );
}