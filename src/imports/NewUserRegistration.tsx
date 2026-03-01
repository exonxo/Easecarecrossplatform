import svgPaths from "./svg-2jsbi7sbbt";

function Container() {
  return (
    <div className="h-[20px] relative shrink-0 w-[11.775px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.775 20">
        <g id="Container">
          <path d={svgPaths.p225a8cc0} fill="var(--fill-0, #0F172A)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[40px]" data-name="Button">
      <Container />
    </div>
  );
}

function Header() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-[8px] pt-[24px] px-[16px] relative w-full">
          <Button />
          <div className="shrink-0 size-[40px]" data-name="Rectangle" />
        </div>
      </div>
    </div>
  );
}

function Heading1TitleSubtitle() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[12px] relative shrink-0 w-full" data-name="Heading 1 - Title & Subtitle">
      <div className="flex flex-col font-['Lexend:Bold',sans-serif] font-bold h-[38px] justify-center leading-[0] relative shrink-0 text-[#0f172a] text-[30px] tracking-[-0.75px] w-[325.09px]">
        <p className="leading-[37.5px] whitespace-pre-wrap">Tell us a bit about you</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[32px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Lexend:Regular',sans-serif] font-normal h-[78px] justify-center leading-[26px] relative shrink-0 text-[#64748b] text-[16px] w-[300.5px] whitespace-pre-wrap">
        <p className="mb-0">We need these details to verify your</p>
        <p className="mb-0">account and connect you with the best</p>
        <p>agencies in Kolkata.</p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute content-stretch flex flex-col gap-px items-start left-[24px] top-[16px] w-[342px]">
      <Heading1TitleSubtitle />
      <Container1 />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute bottom-[18px] content-stretch flex flex-col items-start left-[45px] overflow-clip pr-[170.22px] top-[18px]" data-name="Container">
      <div className="flex flex-col font-['Lexend:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] relative shrink-0 text-[#94a3b8] text-[16px] w-[109.78px]">
        <p className="leading-[normal] whitespace-pre-wrap">e.g. Rahul Roy</p>
      </div>
    </div>
  );
}

function Container4() {
  return <div className="absolute bottom-[18px] left-[45px] top-[18px] w-[280px]" data-name="Container" />;
}

function Input() {
  return (
    <div className="bg-[#f8fafc] h-[56px] relative rounded-[24px] shrink-0 w-full" data-name="Input">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Container3 />
        <Container4 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[24px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute bottom-[32.14%] content-stretch flex flex-col items-start left-[16px] top-[32.14%]" data-name="Container">
      <div className="relative shrink-0 size-[16.667px]" data-name="Icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 16.6667">
          <path d={svgPaths.pc17f800} fill="var(--fill-0, #94A3B8)" id="Icon" />
        </svg>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Input />
      <Container5 />
    </div>
  );
}

function FullName() {
  return (
    <div className="content-stretch flex flex-col gap-[8.5px] items-start relative shrink-0 w-full" data-name="Full Name">
      <div className="flex flex-col font-['Lexend:SemiBold',sans-serif] font-semibold h-[21px] justify-center leading-[0] relative shrink-0 text-[#0f172a] text-[14px] w-[81.59px]">
        <p className="whitespace-pre-wrap">
          <span className="leading-[21px]">{`Full Name `}</span>
          <span className="font-['Lexend:SemiBold',sans-serif] font-semibold leading-[21px] text-[#ef4444]">*</span>
        </p>
      </div>
      <Container2 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex items-baseline justify-between leading-[0] relative shrink-0 w-full" data-name="Paragraph">
      <div className="flex flex-col font-['Lexend:SemiBold',sans-serif] font-semibold justify-center relative shrink-0 text-[#0f172a] text-[14px] whitespace-nowrap">
        <p className="leading-[21px]">Email Address</p>
      </div>
      <div className="flex flex-col font-['Lexend:Medium',sans-serif] font-medium h-[16px] justify-center relative shrink-0 text-[#94a3b8] text-[12px] w-[51.14px]">
        <p className="leading-[16px] whitespace-pre-wrap">Optional</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute bottom-[18px] content-stretch flex flex-col items-start left-[45px] overflow-clip pr-[122.3px] top-[18px]" data-name="Container">
      <div className="flex flex-col font-['Lexend:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] relative shrink-0 text-[#94a3b8] text-[16px] w-[157.7px]">
        <p className="leading-[normal] whitespace-pre-wrap">rahul@example.com</p>
      </div>
    </div>
  );
}

function Container8() {
  return <div className="absolute bottom-[18px] left-[45px] top-[18px] w-[280px]" data-name="Container" />;
}

function Input1() {
  return (
    <div className="bg-[#f8fafc] h-[56px] relative rounded-[24px] shrink-0 w-full" data-name="Input">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Container7 />
        <Container8 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[24px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute bottom-[32.14%] content-stretch flex flex-col items-start left-[16px] top-[32.14%]" data-name="Container">
      <div className="h-[13.333px] relative shrink-0 w-[16.667px]" data-name="Icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 13.3333">
          <path d={svgPaths.p68cd680} fill="var(--fill-0, #94A3B8)" id="Icon" />
        </svg>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Input1 />
      <Container9 />
    </div>
  );
}

function Email() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Email">
      <Paragraph />
      <Container6 />
    </div>
  );
}

function Svg() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="SVG">
          <path d="M7.2 9.6L12 14.4L16.8 9.6" id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
        </g>
      </svg>
    </div>
  );
}

function ImageFill() {
  return (
    <div className="absolute content-stretch flex flex-col h-[56px] items-end justify-center left-0 overflow-clip pl-[309px] pr-[9px] py-[16px] top-0 w-[342px]" data-name="image fill">
      <Svg />
    </div>
  );
}

function Container11() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-[45px] overflow-clip right-[41px] top-1/2" data-name="Container">
      <div className="flex flex-col font-['Lexend:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] relative shrink-0 text-[#0f172a] text-[16px] w-[142.92px]">
        <p className="leading-[24px] whitespace-pre-wrap">Select relationship</p>
      </div>
    </div>
  );
}

function Options() {
  return (
    <div className="bg-[#f8fafc] h-[56px] relative rounded-[24px] shrink-0 w-full" data-name="Options">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[24px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <ImageFill />
      <Container11 />
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute bottom-[32.14%] content-stretch flex flex-col items-start left-[16px] top-[32.14%]" data-name="Container">
      <div className="h-[16.667px] relative shrink-0 w-[17.083px]" data-name="Icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.0833 16.6667">
          <path d={svgPaths.p28c67600} fill="var(--fill-0, #94A3B8)" id="Icon" />
        </svg>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Options />
      <Container12 />
    </div>
  );
}

function RelationshipDropdown() {
  return (
    <div className="content-stretch flex flex-col gap-[8.5px] items-start relative shrink-0 w-full" data-name="Relationship Dropdown">
      <div className="flex flex-col font-['Lexend:SemiBold',sans-serif] font-semibold h-[21px] justify-center leading-[0] relative shrink-0 text-[#0f172a] text-[14px] w-[260.27px]">
        <p className="leading-[21px] whitespace-pre-wrap">How do you know the care recipient?</p>
      </div>
      <Container10 />
    </div>
  );
}

function FormFields() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] items-start left-[24px] right-[24px] top-[176.5px]" data-name="Form Fields">
      <FullName />
      <Email />
      <RelationshipDropdown />
    </div>
  );
}

function ContentScrollArea() {
  return (
    <div className="h-[790px] overflow-clip relative shrink-0 w-full" data-name="Content Scroll Area">
      <Frame />
      <FormFields />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Lexend:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] relative shrink-0 text-[18px] text-center text-white w-[204.56px]">
        <p className="leading-[28px] whitespace-pre-wrap">Complete Registration</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="relative shrink-0 size-[16.667px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 16.6667">
        <g id="Container">
          <path d={svgPaths.p6e98980} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#1975d2] content-stretch flex gap-[8px] h-[56px] items-center justify-center relative rounded-[24px] shrink-0 w-full" data-name="Button">
      <div className="absolute bg-[rgba(255,255,255,0)] h-[56px] left-0 right-0 rounded-[999px] shadow-[0px_10px_15px_-3px_rgba(25,117,210,0.3),0px_4px_6px_-4px_rgba(25,117,210,0.3)] top-0" data-name="Button:shadow" />
      <Container13 />
      <Container14 />
    </div>
  );
}

function StickyFooter() {
  return (
    <div className="absolute bg-gradient-to-t bottom-0 content-stretch flex flex-col from-white items-start left-0 pb-[24px] pt-[48px] px-[24px] right-0 to-[rgba(255,255,255,0)] via-1/2 via-white" data-name="Sticky Footer">
      <Button1 />
    </div>
  );
}

export default function NewUserRegistration() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="New User Registration" style={{ backgroundImage: "linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%), linear-gradient(90deg, rgb(246, 247, 248) 0%, rgb(246, 247, 248) 100%)" }}>
      <Header />
      <ContentScrollArea />
      <StickyFooter />
    </div>
  );
}