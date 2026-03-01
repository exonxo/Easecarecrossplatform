import svgPaths from "./svg-q58z9bynfm";
import imgBackground from "figma:asset/60c32ee24ed0badb8d0109d61574ae6a3d23a828.png";

function Background() {
  return (
    <div className="relative rounded-[9999px] shrink-0 size-[40px]" data-name="Background">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[9999px]">
        <div className="absolute bg-[#e2e8f0] inset-0 rounded-[9999px]" />
        <div className="absolute inset-0 overflow-hidden rounded-[9999px]">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgBackground} />
        </div>
      </div>
      <div className="absolute bg-[rgba(255,255,255,0)] left-0 rounded-[9999px] shadow-[0px_0px_0px_2px_#f8fafc] size-[40px] top-0" data-name="Overlay+Shadow" />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Background />
      <div className="absolute bg-[#22c55e] bottom-0 right-0 rounded-[9999px] size-[10px]" data-name="Background+Border">
        <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[9999px]" />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[0.75px] relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[45px] justify-center leading-[22.5px] not-italic relative shrink-0 text-[#0f172a] text-[18px] w-[79.91px] whitespace-pre-wrap">
        <p className="mb-0">Dr. Sarah</p>
        <p>Smith</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[1.61px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[32px] justify-center leading-[16px] not-italic relative shrink-0 text-[#64748b] text-[12px] w-[66.41px] whitespace-pre-wrap">
        <p className="mb-0">General</p>
        <p>Practitioner</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#16a34a] text-[12px] w-[37.3px]">
        <p className="leading-[16px] whitespace-pre-wrap">Online</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Container4 />
      <div className="bg-[#cbd5e1] h-[4px] rounded-[9999px] shrink-0 w-[2.38px]" data-name="Background" />
      <Container5 />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Heading />
      <Container3 />
    </div>
  );
}

function Container() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex gap-[16px] items-center left-[24px] top-[calc(50%-0.38px)]" data-name="Container">
      <Container1 />
      <Container2 />
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[14px] relative shrink-0 w-[12px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 14">
        <g id="Container">
          <path d={svgPaths.p374d5f00} fill="var(--fill-0, #1D4ED8)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container8() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pr-[1.83px] relative">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[32px] justify-center leading-[16px] not-italic relative shrink-0 text-[#1d4ed8] text-[12px] w-[71.5px] whitespace-pre-wrap">
          <p className="mb-0">Arriving in 5</p>
          <p>mins</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-[#eff6ff] content-stretch flex gap-[6px] items-center px-[13px] py-[7px] relative rounded-[9999px] shrink-0" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#dbeafe] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <Container7 />
      <Container8 />
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[8px] relative shrink-0" data-name="Margin">
      <BackgroundBorder />
    </div>
  );
}

function Margin1() {
  return (
    <div className="content-stretch flex flex-col h-[24px] items-start px-[8px] relative shrink-0 w-[16.77px]" data-name="Margin">
      <div className="bg-[#e2e8f0] h-[24px] shrink-0 w-[0.77px]" data-name="Vertical Divider" />
    </div>
  );
}

function Container9() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="Container">
          <path d={svgPaths.p3ca41900} fill="var(--fill-0, #475569)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex h-[36px] items-center justify-center relative rounded-[8px] shrink-0 w-[27.52px]" data-name="Button">
      <Container9 />
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[13.333px] relative shrink-0 w-[16.667px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 13.3333">
        <g id="Container">
          <path d={svgPaths.p2eb9f680} fill="var(--fill-0, #475569)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex h-[36px] items-center justify-center relative rounded-[8px] shrink-0 w-[27.52px]" data-name="Button">
      <Container10 />
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[13.333px] relative shrink-0 w-[3.333px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.33333 13.3333">
        <g id="Container">
          <path d={svgPaths.p246f4800} fill="var(--fill-0, #475569)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex h-[36px] items-center justify-center relative rounded-[8px] shrink-0 w-[27.52px]" data-name="Button">
      <Container11 />
    </div>
  );
}

function Container6() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex gap-[8px] items-center left-[203.69px] top-1/2" data-name="Container">
      <Margin />
      <Margin1 />
      <Button />
      <Button1 />
      <Button2 />
    </div>
  );
}

export default function Header() {
  return (
    <div className="bg-white border-[#e2e8f0] border-b border-solid relative shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] size-full" data-name="Header">
      <Container />
      <Container6 />
    </div>
  );
}