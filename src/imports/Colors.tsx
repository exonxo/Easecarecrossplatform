function TextAndBadge() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Text and badge">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] not-italic relative shrink-0 text-[#101828] text-[24px]">Primary colors</p>
    </div>
  );
}

function Swatch() {
  return (
    <div className="bg-white h-[80px] relative shrink-0 w-full" data-name="Swatch">
      <p className="absolute capitalize font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-[8px] not-italic right-[8px] text-[18px] text-black text-center top-[calc(50%-14px)] whitespace-pre-wrap">AAA 21.1</p>
    </div>
  );
}

function TextAndSupportingText() {
  return (
    <div className="relative shrink-0 w-full" data-name="Text and supporting text">
      <div className="capitalize content-stretch flex flex-col items-start not-italic pb-[12px] px-[12px] relative w-full whitespace-pre-wrap">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#101828] text-[18px] w-full">White</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#475467] text-[16px] w-full">#FFFFFF</p>
      </div>
    </div>
  );
}

function Swatch1() {
  return (
    <div className="bg-black h-[80px] relative shrink-0 w-full" data-name="Swatch">
      <p className="absolute capitalize font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-[8px] not-italic right-[8px] text-[18px] text-center text-white top-[calc(50%-14px)] whitespace-pre-wrap">AAA 21:1</p>
    </div>
  );
}

function TextAndSupportingText1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Text and supporting text">
      <div className="capitalize content-stretch flex flex-col items-start not-italic pb-[12px] px-[12px] relative w-full whitespace-pre-wrap">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#101828] text-[18px] w-full">Black</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#475467] text-[16px] w-full">#000000</p>
      </div>
    </div>
  );
}

function Row1() {
  return (
    <div className="content-stretch flex gap-[32px] items-start relative shrink-0" data-name="Row">
      <div className="bg-white content-stretch flex flex-col gap-[12px] items-start overflow-clip relative rounded-[8px] shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)] shrink-0 w-[160px]" data-name="_Swatch base">
        <Swatch />
        <TextAndSupportingText />
      </div>
      <div className="bg-white content-stretch flex flex-col gap-[12px] items-start overflow-clip relative rounded-[8px] shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)] shrink-0 w-[160px]" data-name="_Swatch base">
        <Swatch1 />
        <TextAndSupportingText1 />
      </div>
    </div>
  );
}

function Row() {
  return (
    <div className="content-stretch flex gap-[64px] items-start relative shrink-0" data-name="Row">
      <div className="capitalize content-stretch flex flex-col gap-[8px] items-start not-italic relative shrink-0 w-[400px] whitespace-pre-wrap" data-name="Design note/True/sm/False">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#101828] text-[18px] w-full">Base</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#667085] text-[16px] w-full">These are base black and white color styles to quickly swap out if you need to.</p>
      </div>
      <Row1 />
    </div>
  );
}

function TextAndBadge1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Text and badge">
      <p className="capitalize font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] not-italic relative shrink-0 text-[#101828] text-[18px]">Gray</p>
    </div>
  );
}

function Swatch2() {
  return (
    <div className="bg-[#f9fafb] h-[80px] relative shrink-0 w-full" data-name="Swatch">
      <p className="absolute capitalize font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-[8px] not-italic right-[8px] text-[#667085] text-[18px] text-center top-[calc(50%-14px)] whitespace-pre-wrap">AA 4.73</p>
    </div>
  );
}

function TextAndSupportingText2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Text and supporting text">
      <div className="capitalize content-stretch flex flex-col items-start not-italic pb-[12px] px-[12px] relative w-full whitespace-pre-wrap">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#101828] text-[18px] w-full">50</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#475467] text-[16px] w-full">#F9FAFB</p>
      </div>
    </div>
  );
}

function Swatch3() {
  return (
    <div className="bg-[#667085] h-[80px] relative shrink-0 w-full" data-name="Swatch">
      <p className="absolute capitalize font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-[8px] not-italic right-[8px] text-[18px] text-center text-white top-[calc(50%-14px)] whitespace-pre-wrap">AA 4.95</p>
      <div className="absolute left-[142px] size-[10px] top-[8px]" data-name="Dot">
        <div className="absolute inset-[-20%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <g id="Dot">
              <circle cx="7" cy="7" fill="var(--fill-0, white)" r="5" />
              <circle cx="7" cy="7" r="6" stroke="var(--stroke-0, white)" strokeOpacity="0.3" strokeWidth="2" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function TextAndSupportingText3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Text and supporting text">
      <div className="capitalize content-stretch flex flex-col items-start not-italic pb-[12px] px-[12px] relative w-full whitespace-pre-wrap">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#101828] text-[18px] w-full">500</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#475467] text-[16px] w-full">#667085</p>
      </div>
    </div>
  );
}

function Swatch4() {
  return (
    <div className="bg-[#344054] h-[80px] relative shrink-0 w-full" data-name="Swatch">
      <p className="absolute capitalize font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-[8px] not-italic right-[8px] text-[18px] text-center text-white top-[calc(50%-14px)] whitespace-pre-wrap">AAA 10.41</p>
    </div>
  );
}

function TextAndSupportingText4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Text and supporting text">
      <div className="capitalize content-stretch flex flex-col items-start not-italic pb-[12px] px-[12px] relative w-full whitespace-pre-wrap">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#101828] text-[18px] w-full">700</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#475467] text-[16px] w-full">#344054</p>
      </div>
    </div>
  );
}

function Swatch5() {
  return (
    <div className="bg-[#101828] h-[80px] relative shrink-0 w-full" data-name="Swatch">
      <p className="absolute capitalize font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-[8px] not-italic right-[8px] text-[18px] text-center text-white top-[calc(50%-14px)] whitespace-pre-wrap">AAA 17.79</p>
    </div>
  );
}

function TextAndSupportingText5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Text and supporting text">
      <div className="capitalize content-stretch flex flex-col items-start not-italic pb-[12px] px-[12px] relative w-full whitespace-pre-wrap">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#101828] text-[18px] w-full">900</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#475467] text-[16px] w-full">#101828</p>
      </div>
    </div>
  );
}

function Row3() {
  return (
    <div className="content-stretch flex gap-[32px] items-start relative shrink-0" data-name="Row">
      <div className="bg-white content-stretch flex flex-col gap-[12px] items-start overflow-clip relative rounded-[8px] shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)] shrink-0 w-[160px]" data-name="_Swatch base">
        <Swatch2 />
        <TextAndSupportingText2 />
      </div>
      <div className="bg-white content-stretch flex flex-col gap-[12px] items-start overflow-clip relative rounded-[8px] shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)] shrink-0 w-[160px]" data-name="_Swatch base">
        <Swatch3 />
        <TextAndSupportingText3 />
      </div>
      <div className="bg-white content-stretch flex flex-col gap-[12px] items-start overflow-clip relative rounded-[8px] shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)] shrink-0 w-[160px]" data-name="_Swatch base">
        <Swatch4 />
        <TextAndSupportingText4 />
      </div>
      <div className="bg-white content-stretch flex flex-col gap-[12px] items-start overflow-clip relative rounded-[8px] shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)] shrink-0 w-[160px]" data-name="_Swatch base">
        <Swatch5 />
        <TextAndSupportingText5 />
      </div>
    </div>
  );
}

function Row2() {
  return (
    <div className="content-stretch flex gap-[64px] items-start relative shrink-0" data-name="Row">
      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[400px]" data-name="Design note">
        <TextAndBadge1 />
        <p className="capitalize font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#475467] text-[16px] w-full whitespace-pre-wrap">Gray is a neutral color and is the foundation of the color system. Almost everything in UI design — text, form fields, backgrounds, dividers — are usually gray.</p>
      </div>
      <Row3 />
    </div>
  );
}

function TextAndBadge2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Text and badge">
      <p className="capitalize font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] not-italic relative shrink-0 text-[#101828] text-[18px]">Primary</p>
    </div>
  );
}

function Swatch6() {
  return (
    <div className="bg-[#e0f0ff] h-[80px] relative shrink-0 w-full" data-name="Swatch">
      <p className="absolute capitalize font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-[8px] not-italic right-[8px] text-[#0e7090] text-[18px] text-center top-[calc(50%-14px)] whitespace-pre-wrap">AA 5.41</p>
    </div>
  );
}

function TextAndSupportingText6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Text and supporting text">
      <div className="capitalize content-stretch flex flex-col items-start not-italic pb-[12px] px-[12px] relative w-full whitespace-pre-wrap">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#101828] text-[18px] w-full">50</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#475467] text-[16px] w-full">#ECFDFF</p>
      </div>
    </div>
  );
}

function Swatch7() {
  return (
    <div className="bg-[#1975d2] h-[80px] relative shrink-0 w-full" data-name="Swatch">
      <p className="absolute capitalize font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-[8px] not-italic right-[8px] text-[18px] text-center text-white top-[calc(50%-14px)] whitespace-pre-wrap">2.61</p>
      <div className="absolute left-[142px] size-[10px] top-[8px]" data-name="Dot">
        <div className="absolute inset-[-20%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <g id="Dot">
              <circle cx="7" cy="7" fill="var(--fill-0, white)" r="5" />
              <circle cx="7" cy="7" r="6" stroke="var(--stroke-0, white)" strokeOpacity="0.3" strokeWidth="2" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function TextAndSupportingText7() {
  return (
    <div className="relative shrink-0 w-full" data-name="Text and supporting text">
      <div className="capitalize content-stretch flex flex-col items-start not-italic pb-[12px] px-[12px] relative w-full whitespace-pre-wrap">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#101828] text-[18px] w-full">500</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#475467] text-[16px] w-full">#1975D2</p>
      </div>
    </div>
  );
}

function Swatch8() {
  return (
    <div className="bg-[#095fb5] h-[80px] relative shrink-0 w-full" data-name="Swatch">
      <p className="absolute capitalize font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-[8px] not-italic right-[8px] text-[18px] text-center text-white top-[calc(50%-14px)] whitespace-pre-wrap">AA 5.65</p>
    </div>
  );
}

function TextAndSupportingText8() {
  return (
    <div className="relative shrink-0 w-full" data-name="Text and supporting text">
      <div className="capitalize content-stretch flex flex-col items-start not-italic pb-[12px] px-[12px] relative w-full whitespace-pre-wrap">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#101828] text-[18px] w-full">700</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#475467] text-[16px] w-full">#095FB5</p>
      </div>
    </div>
  );
}

function Swatch9() {
  return (
    <div className="bg-[#002e5c] h-[80px] relative shrink-0 w-full" data-name="Swatch">
      <p className="absolute capitalize font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-[8px] not-italic right-[8px] text-[18px] text-center text-white top-[calc(50%-14px)] whitespace-pre-wrap">AAA 9.35</p>
    </div>
  );
}

function TextAndSupportingText9() {
  return (
    <div className="relative shrink-0 w-full" data-name="Text and supporting text">
      <div className="capitalize content-stretch flex flex-col items-start not-italic pb-[12px] px-[12px] relative w-full whitespace-pre-wrap">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#101828] text-[18px] w-full">900</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#475467] text-[16px] w-full">#002E5C</p>
      </div>
    </div>
  );
}

function Row5() {
  return (
    <div className="content-stretch flex gap-[32px] items-start relative shrink-0" data-name="Row">
      <div className="bg-white content-stretch flex flex-col gap-[12px] items-start overflow-clip relative rounded-[8px] shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)] shrink-0 w-[160px]" data-name="_Swatch base">
        <Swatch6 />
        <TextAndSupportingText6 />
      </div>
      <div className="bg-white content-stretch flex flex-col gap-[12px] items-start overflow-clip relative rounded-[8px] shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)] shrink-0 w-[160px]" data-name="_Swatch base">
        <Swatch7 />
        <TextAndSupportingText7 />
      </div>
      <div className="bg-white content-stretch flex flex-col gap-[12px] items-start overflow-clip relative rounded-[8px] shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)] shrink-0 w-[160px]" data-name="_Swatch base">
        <Swatch8 />
        <TextAndSupportingText8 />
      </div>
      <div className="bg-white content-stretch flex flex-col gap-[12px] items-start overflow-clip relative rounded-[8px] shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)] shrink-0 w-[160px]" data-name="_Swatch base">
        <Swatch9 />
        <TextAndSupportingText9 />
      </div>
    </div>
  );
}

function Row4() {
  return (
    <div className="content-stretch flex gap-[64px] items-start relative shrink-0" data-name="Row">
      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[400px]" data-name="Design note">
        <TextAndBadge2 />
        <p className="capitalize font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#475467] text-[16px] w-full whitespace-pre-wrap">{`The primary color is your "brand" color, and is used across all interactive elements such as buttons, links, inputs, etc. This color can define the overall feel and can elicit emotion.`}</p>
      </div>
      <Row5 />
    </div>
  );
}

function TextAndBadge3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Text and badge">
      <p className="capitalize font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] not-italic relative shrink-0 text-[#101828] text-[18px]">Error</p>
    </div>
  );
}

function Swatch10() {
  return (
    <div className="bg-[#fef3f2] h-[80px] relative shrink-0 w-full" data-name="Swatch">
      <p className="absolute capitalize font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-[8px] not-italic right-[8px] text-[#b42318] text-[18px] text-center top-[calc(50%-14px)] whitespace-pre-wrap">AA 6.06</p>
    </div>
  );
}

function TextAndSupportingText10() {
  return (
    <div className="relative shrink-0 w-full" data-name="Text and supporting text">
      <div className="capitalize content-stretch flex flex-col items-start not-italic pb-[12px] px-[12px] relative w-full whitespace-pre-wrap">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#101828] text-[18px] w-full">50</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#475467] text-[16px] w-full">#FEF3F2</p>
      </div>
    </div>
  );
}

function Swatch11() {
  return (
    <div className="bg-[#f04438] h-[80px] relative shrink-0 w-full" data-name="Swatch">
      <p className="absolute capitalize font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-[8px] not-italic right-[8px] text-[18px] text-center text-white top-[calc(50%-14px)] whitespace-pre-wrap">3.76</p>
      <div className="absolute left-[142px] size-[10px] top-[8px]" data-name="Dot">
        <div className="absolute inset-[-20%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <g id="Dot">
              <circle cx="7" cy="7" fill="var(--fill-0, white)" r="5" />
              <circle cx="7" cy="7" r="6" stroke="var(--stroke-0, white)" strokeOpacity="0.3" strokeWidth="2" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function TextAndSupportingText11() {
  return (
    <div className="relative shrink-0 w-full" data-name="Text and supporting text">
      <div className="capitalize content-stretch flex flex-col items-start not-italic pb-[12px] px-[12px] relative w-full whitespace-pre-wrap">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#101828] text-[18px] w-full">500</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#475467] text-[16px] w-full">#F04438</p>
      </div>
    </div>
  );
}

function Swatch12() {
  return (
    <div className="bg-[#b42318] h-[80px] relative shrink-0 w-full" data-name="Swatch">
      <p className="absolute capitalize font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-[8px] not-italic right-[8px] text-[18px] text-center text-white top-[calc(50%-14px)] whitespace-pre-wrap">AA 6.60</p>
    </div>
  );
}

function TextAndSupportingText12() {
  return (
    <div className="relative shrink-0 w-full" data-name="Text and supporting text">
      <div className="capitalize content-stretch flex flex-col items-start not-italic pb-[12px] px-[12px] relative w-full whitespace-pre-wrap">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#101828] text-[18px] w-full">700</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#475467] text-[16px] w-full">#B42318</p>
      </div>
    </div>
  );
}

function Swatch13() {
  return (
    <div className="bg-[#7a271a] h-[80px] relative shrink-0 w-full" data-name="Swatch">
      <p className="absolute capitalize font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-[8px] not-italic right-[8px] text-[18px] text-center text-white top-[calc(50%-14px)] whitespace-pre-wrap">AAA 9.86</p>
    </div>
  );
}

function TextAndSupportingText13() {
  return (
    <div className="relative shrink-0 w-full" data-name="Text and supporting text">
      <div className="capitalize content-stretch flex flex-col items-start not-italic pb-[12px] px-[12px] relative w-full whitespace-pre-wrap">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#101828] text-[18px] w-full">900</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#475467] text-[16px] w-full">#7A271A</p>
      </div>
    </div>
  );
}

function Row7() {
  return (
    <div className="content-stretch flex gap-[32px] items-start relative shrink-0" data-name="Row">
      <div className="bg-white content-stretch flex flex-col gap-[12px] items-start overflow-clip relative rounded-[8px] shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)] shrink-0 w-[160px]" data-name="_Swatch base">
        <Swatch10 />
        <TextAndSupportingText10 />
      </div>
      <div className="bg-white content-stretch flex flex-col gap-[12px] items-start overflow-clip relative rounded-[8px] shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)] shrink-0 w-[160px]" data-name="_Swatch base">
        <Swatch11 />
        <TextAndSupportingText11 />
      </div>
      <div className="bg-white content-stretch flex flex-col gap-[12px] items-start overflow-clip relative rounded-[8px] shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)] shrink-0 w-[160px]" data-name="_Swatch base">
        <Swatch12 />
        <TextAndSupportingText12 />
      </div>
      <div className="bg-white content-stretch flex flex-col gap-[12px] items-start overflow-clip relative rounded-[8px] shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)] shrink-0 w-[160px]" data-name="_Swatch base">
        <Swatch13 />
        <TextAndSupportingText13 />
      </div>
    </div>
  );
}

function Row6() {
  return (
    <div className="content-stretch flex gap-[64px] items-start relative shrink-0" data-name="Row">
      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[400px]" data-name="Design note">
        <TextAndBadge3 />
        <p className="capitalize font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#475467] text-[16px] w-full whitespace-pre-wrap">{`Error colors are used across error states and in "destructive" actions. They communicate a destructive/negative action, such as removing a user from your team.`}</p>
      </div>
      <Row7 />
    </div>
  );
}

function TextAndBadge4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Text and badge">
      <p className="capitalize font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] not-italic relative shrink-0 text-[#101828] text-[18px]">Warning</p>
    </div>
  );
}

function Swatch14() {
  return (
    <div className="bg-[#fffaeb] h-[80px] relative shrink-0 w-full" data-name="Swatch">
      <p className="absolute capitalize font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-[8px] not-italic right-[8px] text-[#b54708] text-[18px] text-center top-[calc(50%-14px)] whitespace-pre-wrap">AA 5.17</p>
    </div>
  );
}

function TextAndSupportingText14() {
  return (
    <div className="relative shrink-0 w-full" data-name="Text and supporting text">
      <div className="capitalize content-stretch flex flex-col items-start not-italic pb-[12px] px-[12px] relative w-full whitespace-pre-wrap">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#101828] text-[18px] w-full">50</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#475467] text-[16px] w-full">#FFFAEB</p>
      </div>
    </div>
  );
}

function Swatch15() {
  return (
    <div className="bg-[#f79009] h-[80px] relative shrink-0 w-full" data-name="Swatch">
      <p className="absolute capitalize font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-[8px] not-italic right-[8px] text-[18px] text-center text-white top-[calc(50%-14px)] whitespace-pre-wrap">2.34</p>
      <div className="absolute left-[142px] size-[10px] top-[8px]" data-name="Dot">
        <div className="absolute inset-[-20%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <g id="Dot">
              <circle cx="7" cy="7" fill="var(--fill-0, white)" r="5" />
              <circle cx="7" cy="7" r="6" stroke="var(--stroke-0, white)" strokeOpacity="0.3" strokeWidth="2" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function TextAndSupportingText15() {
  return (
    <div className="relative shrink-0 w-full" data-name="Text and supporting text">
      <div className="capitalize content-stretch flex flex-col items-start not-italic pb-[12px] px-[12px] relative w-full whitespace-pre-wrap">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#101828] text-[18px] w-full">500</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#475467] text-[16px] w-full">#F79009</p>
      </div>
    </div>
  );
}

function Swatch16() {
  return (
    <div className="bg-[#b54708] h-[80px] relative shrink-0 w-full" data-name="Swatch">
      <p className="absolute capitalize font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-[8px] not-italic right-[8px] text-[18px] text-center text-white top-[calc(50%-14px)] whitespace-pre-wrap">AA 5.40</p>
    </div>
  );
}

function TextAndSupportingText16() {
  return (
    <div className="relative shrink-0 w-full" data-name="Text and supporting text">
      <div className="capitalize content-stretch flex flex-col items-start not-italic pb-[12px] px-[12px] relative w-full whitespace-pre-wrap">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#101828] text-[18px] w-full">700</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#475467] text-[16px] w-full">#B54708</p>
      </div>
    </div>
  );
}

function Swatch17() {
  return (
    <div className="bg-[#7a2e0e] h-[80px] relative shrink-0 w-full" data-name="Swatch">
      <p className="absolute capitalize font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-[8px] not-italic right-[8px] text-[18px] text-center text-white top-[calc(50%-14px)] whitespace-pre-wrap">AAA 9.48</p>
    </div>
  );
}

function TextAndSupportingText17() {
  return (
    <div className="relative shrink-0 w-full" data-name="Text and supporting text">
      <div className="capitalize content-stretch flex flex-col items-start not-italic pb-[12px] px-[12px] relative w-full whitespace-pre-wrap">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#101828] text-[18px] w-full">900</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#475467] text-[16px] w-full">#7A2E0E</p>
      </div>
    </div>
  );
}

function Row9() {
  return (
    <div className="content-stretch flex gap-[32px] items-start relative shrink-0" data-name="Row">
      <div className="bg-white content-stretch flex flex-col gap-[12px] items-start overflow-clip relative rounded-[8px] shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)] shrink-0 w-[160px]" data-name="_Swatch base">
        <Swatch14 />
        <TextAndSupportingText14 />
      </div>
      <div className="bg-white content-stretch flex flex-col gap-[12px] items-start overflow-clip relative rounded-[8px] shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)] shrink-0 w-[160px]" data-name="_Swatch base">
        <Swatch15 />
        <TextAndSupportingText15 />
      </div>
      <div className="bg-white content-stretch flex flex-col gap-[12px] items-start overflow-clip relative rounded-[8px] shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)] shrink-0 w-[160px]" data-name="_Swatch base">
        <Swatch16 />
        <TextAndSupportingText16 />
      </div>
      <div className="bg-white content-stretch flex flex-col gap-[12px] items-start overflow-clip relative rounded-[8px] shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)] shrink-0 w-[160px]" data-name="_Swatch base">
        <Swatch17 />
        <TextAndSupportingText17 />
      </div>
    </div>
  );
}

function Row8() {
  return (
    <div className="content-stretch flex gap-[64px] items-start relative shrink-0" data-name="Row">
      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[400px]" data-name="Design note">
        <TextAndBadge4 />
        <p className="capitalize font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#475467] text-[16px] w-full whitespace-pre-wrap">{`Warning colors can communicate that an action is potentially destructive or "on-hold". These colors are commonly used in confirmations to grab the users' attention.`}</p>
      </div>
      <Row9 />
    </div>
  );
}

function TextAndBadge5() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Text and badge">
      <p className="capitalize font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] not-italic relative shrink-0 text-[#101828] text-[18px]">Success</p>
    </div>
  );
}

function Swatch18() {
  return (
    <div className="bg-[#ecfdf3] h-[80px] relative shrink-0 w-full" data-name="Swatch">
      <p className="absolute capitalize font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-[8px] not-italic right-[8px] text-[#027a48] text-[18px] text-center top-[calc(50%-14px)] whitespace-pre-wrap">AA 5.17</p>
    </div>
  );
}

function TextAndSupportingText18() {
  return (
    <div className="relative shrink-0 w-full" data-name="Text and supporting text">
      <div className="capitalize content-stretch flex flex-col items-start not-italic pb-[12px] px-[12px] relative w-full whitespace-pre-wrap">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#101828] text-[18px] w-full">50</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#475467] text-[16px] w-full">#ECFDF3</p>
      </div>
    </div>
  );
}

function Swatch19() {
  return (
    <div className="bg-[#12b76a] h-[80px] relative shrink-0 w-full" data-name="Swatch">
      <p className="absolute capitalize font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-[8px] not-italic right-[8px] text-[18px] text-center text-white top-[calc(50%-14px)] whitespace-pre-wrap">2.63</p>
      <div className="absolute left-[142px] size-[10px] top-[8px]" data-name="Dot">
        <div className="absolute inset-[-20%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <g id="Dot">
              <circle cx="7" cy="7" fill="var(--fill-0, white)" r="5" />
              <circle cx="7" cy="7" r="6" stroke="var(--stroke-0, white)" strokeOpacity="0.3" strokeWidth="2" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function TextAndSupportingText19() {
  return (
    <div className="relative shrink-0 w-full" data-name="Text and supporting text">
      <div className="capitalize content-stretch flex flex-col items-start not-italic pb-[12px] px-[12px] relative w-full whitespace-pre-wrap">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#101828] text-[18px] w-full">500</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#475467] text-[16px] w-full">#12B76A</p>
      </div>
    </div>
  );
}

function Swatch20() {
  return (
    <div className="bg-[#027a48] h-[80px] relative shrink-0 w-full" data-name="Swatch">
      <p className="absolute capitalize font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-[8px] not-italic right-[8px] text-[18px] text-center text-white top-[calc(50%-14px)] whitespace-pre-wrap">AA 5.44</p>
    </div>
  );
}

function TextAndSupportingText20() {
  return (
    <div className="relative shrink-0 w-full" data-name="Text and supporting text">
      <div className="capitalize content-stretch flex flex-col items-start not-italic pb-[12px] px-[12px] relative w-full whitespace-pre-wrap">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#101828] text-[18px] w-full">700</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#475467] text-[16px] w-full">#027A48</p>
      </div>
    </div>
  );
}

function Swatch21() {
  return (
    <div className="bg-[#054f31] h-[80px] relative shrink-0 w-full" data-name="Swatch">
      <p className="absolute capitalize font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-[8px] not-italic right-[8px] text-[18px] text-center text-white top-[calc(50%-14px)] whitespace-pre-wrap">AAA 9.68</p>
    </div>
  );
}

function TextAndSupportingText21() {
  return (
    <div className="relative shrink-0 w-full" data-name="Text and supporting text">
      <div className="capitalize content-stretch flex flex-col items-start not-italic pb-[12px] px-[12px] relative w-full whitespace-pre-wrap">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#101828] text-[18px] w-full">900</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#475467] text-[16px] w-full">#054F31</p>
      </div>
    </div>
  );
}

function Row11() {
  return (
    <div className="content-stretch flex gap-[32px] items-start relative shrink-0" data-name="Row">
      <div className="bg-white content-stretch flex flex-col gap-[12px] items-start overflow-clip relative rounded-[8px] shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)] shrink-0 w-[160px]" data-name="_Swatch base">
        <Swatch18 />
        <TextAndSupportingText18 />
      </div>
      <div className="bg-white content-stretch flex flex-col gap-[12px] items-start overflow-clip relative rounded-[8px] shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)] shrink-0 w-[160px]" data-name="_Swatch base">
        <Swatch19 />
        <TextAndSupportingText19 />
      </div>
      <div className="bg-white content-stretch flex flex-col gap-[12px] items-start overflow-clip relative rounded-[8px] shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)] shrink-0 w-[160px]" data-name="_Swatch base">
        <Swatch20 />
        <TextAndSupportingText20 />
      </div>
      <div className="bg-white content-stretch flex flex-col gap-[12px] items-start overflow-clip relative rounded-[8px] shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)] shrink-0 w-[160px]" data-name="_Swatch base">
        <Swatch21 />
        <TextAndSupportingText21 />
      </div>
    </div>
  );
}

function Row10() {
  return (
    <div className="content-stretch flex gap-[64px] items-start relative shrink-0" data-name="Row">
      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[400px]" data-name="Design note">
        <TextAndBadge5 />
        <p className="capitalize font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#475467] text-[16px] w-full whitespace-pre-wrap">{`Success colors communicate a positive action, positive trend, or a successful confirmation. If you're using green as your primary color, it can be helpful to introduce a different hue for your success green.`}</p>
      </div>
      <Row11 />
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-col gap-[64px] items-start relative shrink-0" data-name="Content">
      <Row />
      <Row2 />
      <Row4 />
      <Row6 />
      <Row8 />
      <Row10 />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[64px] items-start left-[80px] top-[115px]">
      <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-[960px]" data-name="Design note">
        <TextAndBadge />
        <p className="capitalize font-['Inter:Regular',sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#475467] text-[18px] w-full whitespace-pre-wrap">These are the main colors that make up the majority of the colors used in the design system.</p>
      </div>
      <Content />
    </div>
  );
}

export default function Colors() {
  return (
    <div className="bg-white relative size-full" data-name="Colors">
      <Frame />
    </div>
  );
}