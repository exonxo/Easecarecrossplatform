import svgPaths from "./svg-rtfda4itg5";

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Lexend:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[24px] text-white tracking-[-0.6px] w-full">
        <p className="leading-[32px] whitespace-pre-wrap">Welcome to Easy Care</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start opacity-90 relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Lexend:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#dbeafe] text-[14px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">{`Let's find the best care for you today.`}</p>
      </div>
    </div>
  );
}

function OverlayBorderOverlayBlur() {
  return (
    <div className="backdrop-blur-[2px] bg-[rgba(255,255,255,0.2)] content-stretch flex flex-col items-start px-[13px] py-[5px] relative rounded-[9999px] shrink-0" data-name="Overlay+Border+OverlayBlur">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="flex flex-col font-['Lexend:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[10px] text-white tracking-[1px] uppercase w-[81.89px]">
        <p className="leading-[15px] whitespace-pre-wrap">Get Started</p>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[0.75px] relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Lexend:Extra_Bold',sans-serif] justify-center leading-[37.5px] not-italic relative shrink-0 text-[30px] text-white w-full whitespace-pre-wrap">
        <p className="mb-0">Post Your Care</p>
        <p>Requirement</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start opacity-90 pt-[0.7px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Lexend:Medium',sans-serif] font-medium justify-center leading-[26px] relative shrink-0 text-[#eff6ff] text-[16px] w-full whitespace-pre-wrap">
        <p className="mb-0">Get responses from verified agencies in</p>
        <p>minutes.</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p2d8e4cc0} fill="var(--fill-0, #1975D2)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white relative rounded-[24px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[7.99px] items-center justify-center pb-[16px] pt-[16.7px] px-[24px] relative w-full">
          <div className="absolute bg-[rgba(255,255,255,0)] inset-[0.7px_0_0_0] rounded-[24px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]" data-name="Button:shadow" />
          <Container4 />
          <div className="flex flex-col font-['Lexend:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] relative shrink-0 text-[#1975d2] text-[18px] text-center w-[161.88px]">
            <p className="leading-[28px] whitespace-pre-wrap">Post Requirement</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <div className="bg-[#10b981] rounded-[9999px] shrink-0 size-[6px]" data-name="Background" />
      <div className="flex flex-col font-['Lexend:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[10px] text-center text-white tracking-[1px] uppercase w-[60.05px]">
        <p className="leading-[15px] whitespace-pre-wrap">Verified</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <div className="bg-[#1975d2] rounded-[9999px] shrink-0 size-[6px]" data-name="Background" />
      <div className="flex flex-col font-['Lexend:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[10px] text-center text-white tracking-[1px] uppercase w-[78.75px]">
        <p className="leading-[15px] whitespace-pre-wrap">Negotiable</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <div className="bg-[#f97316] rounded-[9999px] shrink-0 size-[6px]" data-name="Background" />
      <div className="flex flex-col font-['Lexend:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[10px] text-center text-white tracking-[1px] uppercase w-[27.39px]">
        <p className="leading-[15px] whitespace-pre-wrap">24/7</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex gap-[16px] items-center justify-center relative shrink-0 w-full" data-name="Container">
      <Container6 />
      <Container7 />
      <Container8 />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col gap-[15.3px] items-start pt-[28px] relative shrink-0 w-full" data-name="Container">
      <OverlayBorderOverlayBlur />
      <Heading1 />
      <Container3 />
      <Button />
      <Container5 />
    </div>
  );
}

function Container() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[4px] items-start pb-[48px] pt-[16px] px-[24px] relative w-full">
        <Heading />
        <Container1 />
        <Container2 />
      </div>
    </div>
  );
}

export default function Section() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="Section" style={{ backgroundImage: "linear-gradient(131.401deg, rgb(25, 117, 210) 0%, rgb(37, 99, 235) 100%)" }}>
      <div className="absolute bg-[rgba(255,255,255,0.1)] blur-[32px] bottom-[-47.65px] right-[-48px] rounded-[9999px] size-[192px]" data-name="Overlay+Blur" />
      <Container />
    </div>
  );
}