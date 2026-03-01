import svgPaths from "./svg-eq4zlpsrwq";

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

function Heading() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Heading 2">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center pr-[40px] relative w-full">
          <div className="flex flex-col font-['Lexend:Bold',sans-serif] font-bold h-[23px] justify-center leading-[0] relative shrink-0 text-[#0f172a] text-[18px] text-center w-[117.08px]">
            <p className="leading-[22.5px] whitespace-pre-wrap">Verify Phone</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TopBar() {
  return (
    <div className="bg-white relative shrink-0 w-full z-[2]" data-name="Top Bar">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[16px] relative w-full">
          <Button />
          <Heading />
        </div>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="relative shrink-0 size-[33.333px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33.3333 33.3333">
        <g id="Container">
          <path d={svgPaths.p154eec00} fill="var(--fill-0, #1975D2)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Overlay() {
  return (
    <div className="bg-[rgba(25,117,210,0.1)] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[80px]" data-name="Overlay">
      <Container1 />
    </div>
  );
}

function IllustrationIcon() {
  return (
    <div className="content-stretch flex items-start justify-center pb-[8px] relative shrink-0 w-full" data-name="Illustration / Icon">
      <Overlay />
    </div>
  );
}

function IllustrationIconMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[32px] relative shrink-0 w-full" data-name="Illustration / Icon:margin">
      <IllustrationIcon />
    </div>
  );
}

function Heading1() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-0 right-0 top-0" data-name="Heading 3">
      <div className="flex flex-col font-['Lexend:Bold',sans-serif] font-bold h-[32px] justify-center leading-[0] relative shrink-0 text-[#0f172a] text-[24px] text-center w-[284.41px]">
        <p className="leading-[32px] whitespace-pre-wrap">Enter Verification Code</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-0 px-[8px] right-0 top-[44px]" data-name="Container">
      <div className="flex flex-col font-['Lexend:Regular',sans-serif] font-normal h-[52px] justify-center leading-[26px] relative shrink-0 text-[#64748b] text-[16px] text-center w-[227px] whitespace-pre-wrap">
        <p className="mb-0">Enter the 4-digit code sent to</p>
        <p className="font-['Lexend:SemiBold',sans-serif] font-semibold text-[#1e293b]">+91 98765 43210</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[114.44px] top-[104px]" data-name="Button">
      <div className="flex flex-col font-['Lexend:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] relative shrink-0 text-[#1975d2] text-[14px] text-center w-[113.11px]">
        <p className="leading-[20px] whitespace-pre-wrap">Change Number</p>
      </div>
    </div>
  );
}

function Headers() {
  return (
    <div className="h-[124px] relative shrink-0 w-full" data-name="Headers">
      <Heading1 />
      <Container2 />
      <Button1 />
    </div>
  );
}

function HeadersMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[40px] relative shrink-0 w-full" data-name="Headers:margin">
      <Headers />
    </div>
  );
}

function Container3() {
  return (
    <div className="h-full relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col h-full items-center overflow-clip pl-[6.84px] pr-[6.85px] relative rounded-[inherit]">
        <div className="flex flex-col font-['Lexend:Bold',sans-serif] font-bold h-[30px] justify-center leading-[0] relative shrink-0 text-[#0f172a] text-[24px] text-center w-[14.31px]">
          <p className="leading-[normal] whitespace-pre-wrap">5</p>
        </div>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-[#f8fafc] h-[64px] relative rounded-[24px] shrink-0 w-[56px]" data-name="Input">
      <div className="content-stretch flex items-start overflow-clip px-[14px] py-[17px] relative rounded-[inherit] size-full">
        <Container3 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#1975d2] border-solid inset-0 pointer-events-none rounded-[24px] shadow-[0px_0px_0px_4px_rgba(25,117,210,0.2),0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Digit() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0" data-name="Digit 1">
      <Input />
      <div className="-translate-x-1/2 absolute bg-[#1975d2] bottom-[-24px] left-1/2 opacity-0 rounded-[9999px] size-[6px]" data-name="Decor element for active state simulation" />
    </div>
  );
}

function Container4() {
  return <div className="h-full shrink-0 w-[28px]" data-name="Container" />;
}

function InputDigit() {
  return (
    <div className="bg-[#f8fafc] h-[64px] relative rounded-[24px] shrink-0 w-[56px]" data-name="Input - Digit 2">
      <div className="content-stretch flex items-start overflow-clip px-[14px] py-[17px] relative rounded-[inherit] size-full">
        <Container4 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[24px]" />
    </div>
  );
}

function Container5() {
  return <div className="h-full shrink-0 w-[28px]" data-name="Container" />;
}

function InputDigit1() {
  return (
    <div className="bg-[#f8fafc] h-[64px] relative rounded-[24px] shrink-0 w-[56px]" data-name="Input - Digit 3">
      <div className="content-stretch flex items-start overflow-clip px-[14px] py-[17px] relative rounded-[inherit] size-full">
        <Container5 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[24px]" />
    </div>
  );
}

function Container6() {
  return <div className="h-full shrink-0 w-[28px]" data-name="Container" />;
}

function InputDigit2() {
  return (
    <div className="bg-[#f8fafc] h-[64px] relative rounded-[24px] shrink-0 w-[56px]" data-name="Input - Digit 4">
      <div className="content-stretch flex items-start overflow-clip px-[14px] py-[17px] relative rounded-[inherit] size-full">
        <Container6 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[24px]" />
    </div>
  );
}

function Fieldset() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative self-stretch shrink-0" data-name="Fieldset">
      <Digit />
      <InputDigit />
      <InputDigit1 />
      <InputDigit2 />
    </div>
  );
}

function OtpInput() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="OTP Input">
      <Fieldset />
    </div>
  );
}

function OtpInputMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[32px] relative shrink-0 w-full" data-name="OTP Input:margin">
      <OtpInput />
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[12.25px] relative shrink-0 w-[10.5px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.5 12.25">
        <g id="Container">
          <path d={svgPaths.p13490000} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Lexend:Medium',sans-serif] font-medium h-[24px] justify-center leading-[0] relative shrink-0 text-[#64748b] text-[16px] w-[161.5px]">
        <p className="whitespace-pre-wrap">
          <span className="leading-[24px]">{`Resend OTP in `}</span>
          <span className="font-['Lexend:Medium',sans-serif] font-medium leading-[24px] text-[#0f172a]">00:45</span>
        </p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Container8 />
      <Container9 />
    </div>
  );
}

function LinkDisabledLinkStateExample() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link - Disabled link state example">
      <div className="flex flex-col font-['Lexend:SemiBold',sans-serif] font-semibold h-[20px] justify-center leading-[0] relative shrink-0 text-[#94a3b8] text-[14px] w-[90.66px]">
        <p className="leading-[20px] whitespace-pre-wrap">Resend Code</p>
      </div>
    </div>
  );
}

function Timer() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center justify-center relative shrink-0 w-full" data-name="Timer">
      <Container7 />
      <LinkDisabledLinkStateExample />
    </div>
  );
}

function TimerMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[32px] relative shrink-0 w-full" data-name="Timer:margin">
      <Timer />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Lexend:Bold',sans-serif] font-bold h-[24px] justify-center leading-[0] relative shrink-0 text-[16px] text-center text-white w-[116.72px]">
        <p className="leading-[24px] whitespace-pre-wrap">{`Verify & Login`}</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Container">
          <path d={svgPaths.p304eaa0} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#1975d2] relative rounded-[24px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[24px] py-[16px] relative w-full">
          <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[999px] shadow-[0px_10px_15px_-3px_rgba(59,130,246,0.3),0px_4px_6px_-4px_rgba(59,130,246,0.3)]" data-name="Button:shadow" />
          <Container10 />
          <Container11 />
        </div>
      </div>
    </div>
  );
}

function Cta() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[24px] relative shrink-0 w-full" data-name="CTA">
      <Button2 />
    </div>
  );
}

function ScrollableContentArea() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full z-[1]" data-name="Scrollable Content Area">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-between pb-[24px] pt-[32px] px-[24px] relative size-full">
          <IllustrationIconMargin />
          <HeadersMargin />
          <OtpInputMargin />
          <TimerMargin />
          <div className="flex-[1_0_0] min-h-px min-w-px w-full" data-name="Spacer to push button down on larger screens, but natural flow on small" />
          <Cta />
        </div>
      </div>
    </div>
  );
}

export default function LoginOtpVerification() {
  return (
    <div className="content-stretch flex flex-col isolate items-start relative size-full" data-name="Login - OTP Verification" style={{ backgroundImage: "linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%), linear-gradient(90deg, rgb(246, 247, 248) 0%, rgb(246, 247, 248) 100%)" }}>
      <TopBar />
      <ScrollableContentArea />
    </div>
  );
}