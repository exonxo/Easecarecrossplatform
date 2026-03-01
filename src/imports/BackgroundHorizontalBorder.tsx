import svgPaths from "./svg-cjrq1vd87y";

function Container() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p2d8e4cc0} fill="var(--fill-0, #94A3B8)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[40px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Container />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[12px] right-[12px] top-[10px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[48px] justify-center leading-[24px] not-italic relative shrink-0 text-[#94a3b8] text-[15px] w-[138.25px] whitespace-pre-wrap">
        <p className="mb-0">{`Type a message to `}</p>
        <p>Dr. Smith...</p>
      </div>
    </div>
  );
}

function Textarea() {
  return (
    <div className="flex-[1_0_0] h-[44px] max-h-[128px] min-h-px min-w-px relative" data-name="Textarea">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Container1 />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[13.333px] relative shrink-0 w-[15.833px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.8333 13.3333">
        <g id="Container">
          <path d={svgPaths.pf594000} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#0055d4] relative rounded-[8px] shadow-[0px_1px_2px_0px_#bfdbfe] shrink-0 size-[40px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Container2 />
      </div>
    </div>
  );
}

function BackgroundBorderShadow() {
  return (
    <div className="bg-[#f8fafc] relative rounded-[12px] shrink-0 w-full" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="flex flex-row items-end size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-end p-[9px] relative w-full">
          <Button />
          <Textarea />
          <Button1 />
        </div>
      </div>
    </div>
  );
}

export default function BackgroundHorizontalBorder() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start pb-[16px] pt-[17px] px-[16px] relative size-full" data-name="Background+HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-solid border-t inset-0 pointer-events-none" />
      <BackgroundBorderShadow />
    </div>
  );
}