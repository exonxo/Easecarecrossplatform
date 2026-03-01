import svgPaths from "./svg-8dbc8mlgkr";

function Label() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['Lexend:Semi_Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#334155] text-[14px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Priority Level</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[15.833px] relative shrink-0 w-[18.333px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3333 15.8333">
        <g id="Container">
          <path d={svgPaths.p1a7e4c60} fill="var(--fill-0, #EF4444)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container2() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Lexend:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] relative shrink-0 text-[#ef4444] text-[14px] w-[48.91px]">
          <p className="leading-[20px] whitespace-pre-wrap">Urgent</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-[#fee2e2] relative rounded-[24px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-2 border-[#ef4444] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center p-[14px] relative w-full">
          <Container1 />
          <Container2 />
        </div>
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="absolute h-[11.015px] right-[-8.01px] top-[-8px] w-[13.508px]" data-name="Background">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.5083 11.0146">
        <g id="Background">
          <rect fill="var(--fill-0, #EF4444)" height="11.0146" rx="5.50729" width="13.5083" />
          <path d={svgPaths.p340c2300} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative self-stretch" data-name="Label">
      <BackgroundBorder />
      <Background />
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[15px] relative shrink-0 w-[3.333px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.33333 15">
        <g id="Container">
          <path d={svgPaths.p1a723780} fill="var(--fill-0, #EA580C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container4() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Lexend:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] relative shrink-0 text-[#ea580c] text-[14px] w-[33.64px]">
          <p className="leading-[20px] whitespace-pre-wrap">High</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="bg-[#fff7ed] relative rounded-[24px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center p-[14px] relative w-full">
          <Container3 />
          <Container4 />
        </div>
      </div>
    </div>
  );
}

function Label2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative self-stretch" data-name="Label">
      <BackgroundBorder1 />
    </div>
  );
}

function Container5() {
  return (
    <div className="relative shrink-0 size-[16.667px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 16.6667">
        <g id="Container">
          <path d={svgPaths.p2f915d80} fill="var(--fill-0, #2563EB)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container6() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Lexend:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] relative shrink-0 text-[#2563eb] text-[14px] w-[53.59px]">
          <p className="leading-[20px] whitespace-pre-wrap">Normal</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder2() {
  return (
    <div className="bg-[#eff6ff] relative rounded-[24px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center p-[14px] relative w-full">
          <Container5 />
          <Container6 />
        </div>
      </div>
    </div>
  );
}

function Label3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative self-stretch" data-name="Label">
      <BackgroundBorder2 />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex gap-[12px] items-start justify-center relative shrink-0 w-full" data-name="Container">
      <Label1 />
      <Label2 />
      <Label3 />
    </div>
  );
}

function PrioritySelector() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Priority Selector">
      <Label />
      <Container />
    </div>
  );
}

function Label4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['Lexend:Semi_Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#334155] text-[14px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Category</p>
      </div>
    </div>
  );
}

function Svg() {
  return (
    <div className="relative shrink-0 size-[21px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 21">
        <g id="SVG">
          <path d="M6.3 8.4L10.5 12.6L14.7 8.4" id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.575" />
        </g>
      </svg>
    </div>
  );
}

function ImageFill() {
  return (
    <div className="absolute content-stretch flex flex-col h-[46px] items-end justify-center left-0 overflow-clip pl-[434px] pr-[9px] py-[12.5px] top-0 w-[464px]" data-name="image fill">
      <Svg />
    </div>
  );
}

function Container8() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-[17px] overflow-clip right-[41px] top-1/2" data-name="Container">
      <div className="flex flex-col font-['Lexend:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] relative shrink-0 text-[#0f172a] text-[14px] w-[165.58px]">
        <p className="leading-[20px] whitespace-pre-wrap">Select an issue category</p>
      </div>
    </div>
  );
}

function Options() {
  return (
    <div className="bg-[#f5f8f8] h-[46px] relative rounded-[24px] shrink-0 w-full" data-name="Options">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <ImageFill />
      <Container8 />
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[7.4px] relative shrink-0 w-[12px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7.4">
        <g id="Container">
          <path d={svgPaths.p1adfde00} fill="var(--fill-0, #5F838C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute bottom-0 content-stretch flex items-center px-[12px] right-0 top-0" data-name="Container">
      <Container10 />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Options />
      <Container9 />
    </div>
  );
}

function CategoryDropdown() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Category Dropdown">
      <Label4 />
      <Container7 />
    </div>
  );
}

function Label5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['Lexend:Semi_Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#334155] text-[14px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Detailed Description</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Lexend:Regular',sans-serif] font-normal justify-center leading-[20px] relative shrink-0 text-[#5f838c] text-[14px] w-full whitespace-pre-wrap">
          <p className="mb-0">{`Describe the issue in detail including time, location, and `}</p>
          <p>individuals involved...</p>
        </div>
      </div>
    </div>
  );
}

function Textarea() {
  return (
    <div className="bg-[#f5f8f8] relative rounded-[24px] shrink-0 w-full" data-name="Textarea">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center pb-[73px] pt-[13px] px-[17px] relative w-full">
          <Container11 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[24px]" />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Lexend:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] relative shrink-0 text-[#5f838c] text-[12px] w-[110.03px]">
        <p className="leading-[16px] whitespace-pre-wrap">0 / 500 characters</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex items-start justify-end relative shrink-0 w-full" data-name="Container">
      <Container13 />
    </div>
  );
}

function DescriptionTextarea() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Description Textarea">
      <Label5 />
      <Textarea />
      <Container12 />
    </div>
  );
}

function Label6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['Lexend:Semi_Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#334155] text-[14px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Attach Evidence</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[16px] relative shrink-0 w-[22px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 16">
        <g id="Container">
          <path d={svgPaths.p11e8dc00} fill="var(--fill-0, #5F838C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#f1f5f9] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[48px]" data-name="Background">
      <Container14 />
    </div>
  );
}

function Margin() {
  return (
    <div className="h-[60px] relative shrink-0 w-[48px]" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[12px] relative size-full">
        <Background1 />
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative">
        <div className="flex flex-col font-['Lexend:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] relative shrink-0 text-[#0f172a] text-[14px] text-center w-[226.16px]">
          <p className="leading-[20px] whitespace-pre-wrap">Click to upload or drag and drop</p>
        </div>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Lexend:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] relative shrink-0 text-[#5f838c] text-[12px] text-center w-[206.81px]">
        <p className="leading-[16px] whitespace-pre-wrap">SVG, PNG, JPG or PDF (max. 10MB)</p>
      </div>
    </div>
  );
}

function Margin1() {
  return (
    <div className="relative shrink-0" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[4px] relative">
        <Container16 />
      </div>
    </div>
  );
}

function Border() {
  return (
    <div className="relative rounded-[24px] shrink-0 w-full" data-name="Border">
      <div aria-hidden="true" className="absolute border-2 border-[#e2e8f0] border-dashed inset-0 pointer-events-none rounded-[24px]" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[26px] relative w-full">
          <Margin />
          <Container15 />
          <Margin1 />
        </div>
      </div>
    </div>
  );
}

function AttachEvidenceUpload() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Attach Evidence Upload">
      <Label6 />
      <Border />
    </div>
  );
}

function ModalBody() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] items-start left-0 overflow-clip p-[24px] right-0 top-[93px]" data-name="Modal Body">
      <PrioritySelector />
      <CategoryDropdown />
      <DescriptionTextarea />
      <AttachEvidenceUpload />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white relative rounded-[24px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[24px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center px-[21px] py-[11px] relative">
        <div className="flex flex-col font-['Lexend:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] relative shrink-0 text-[#334155] text-[14px] text-center w-[46.63px]">
          <p className="leading-[20px] whitespace-pre-wrap">Cancel</p>
        </div>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Lexend:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] relative shrink-0 text-[14px] text-center text-white w-[93.89px]">
        <p className="leading-[20px] whitespace-pre-wrap">Submit Issue</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[12px] relative shrink-0 w-[14.25px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.25 12">
        <g id="Container">
          <path d={svgPaths.p17041b00} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#ef4444] relative rounded-[24px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center px-[20px] py-[11px] relative">
        <div className="absolute bg-[rgba(255,255,255,0)] inset-[0_0.25px_0_0] rounded-[24px] shadow-[0px_4px_6px_-1px_#fecaca,0px_2px_4px_-2px_#fecaca]" data-name="Button:shadow" />
        <Container17 />
        <Container18 />
      </div>
    </div>
  );
}

function ModalFooter() {
  return (
    <div className="absolute bg-[#f8fafc] content-stretch flex gap-[12px] items-start justify-end left-0 pb-[20px] pt-[21px] px-[24px] right-0 rounded-bl-[16px] rounded-br-[16px] top-[725px]" data-name="Modal Footer">
      <div aria-hidden="true" className="absolute border-[#f1f5f9] border-solid border-t inset-0 pointer-events-none rounded-bl-[16px] rounded-br-[16px]" />
      <Button />
      <Button1 />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Lexend:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] relative shrink-0 text-[#0f172a] text-[20px] w-[148.97px]">
        <p className="leading-[28px] whitespace-pre-wrap">Raise an Issue</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Lexend:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] relative shrink-0 text-[#5f838c] text-[14px] w-[268.2px]">
        <p className="leading-[20px] whitespace-pre-wrap">Report a concern or incident for review.</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative">
        <Heading />
        <Container20 />
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Container">
          <path d={svgPaths.p15494480} fill="var(--fill-0, #5F838C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="relative rounded-[16px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center p-[4px] relative">
        <Container21 />
      </div>
    </div>
  );
}

function ModalHeader() {
  return (
    <div className="absolute bg-white content-stretch flex items-center justify-between left-0 pb-[21px] pt-[20px] px-[24px] right-0 top-0" data-name="Modal Header">
      <div aria-hidden="true" className="absolute border-[#f1f5f9] border-b border-solid inset-0 pointer-events-none" />
      <Container19 />
      <Button2 />
    </div>
  );
}

export default function RaiseIssueModal() {
  return (
    <div className="bg-white overflow-clip relative rounded-[16px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] size-full" data-name="Raise Issue Modal">
      <ModalBody />
      <ModalFooter />
      <ModalHeader />
    </div>
  );
}