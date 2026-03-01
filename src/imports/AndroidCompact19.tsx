function Header() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center pt-[16px] px-[16px] relative w-full">
          <div className="bg-[#d0d5dd] h-[4px] rounded-[100px] shrink-0 w-[52px]" data-name="Drag handle" />
        </div>
      </div>
    </div>
  );
}

function Description() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="description">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] not-italic relative shrink-0 text-[24px] text-black w-full whitespace-pre-wrap">Confirm Booking</p>
    </div>
  );
}

function Title() {
  return (
    <div className="content-stretch flex items-start justify-end relative shrink-0 w-full" data-name="title">
      <Description />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 text-[#535353] tracking-[-0.16px] w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0">Net Payable</p>
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0">1099.00</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex font-['Inter:Semi_Bold',sans-serif] font-semibold items-start justify-between relative shrink-0 text-[#3b7c0f] w-full">
      <p className="relative shrink-0 tracking-[-0.16px]">Total Saving</p>
      <p className="relative shrink-0">1099.00</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[18px] items-start leading-[20px] not-italic relative shrink-0 text-[14px] w-full">
      <Frame2 />
      <Frame4 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="bg-[#f9fafb] relative rounded-[12px] shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start p-[12px] relative w-full">
        <Frame />
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex items-start justify-between leading-[20px] not-italic relative shrink-0 text-[#535353] text-[14px] tracking-[-0.16px] w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0">{`Protected by Bajaj Finance `}</p>
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0">99.00</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame3 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="bg-[#f9fafb] relative rounded-[12px] shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start p-[12px] relative w-full">
        <Frame1 />
      </div>
    </div>
  );
}

function Actions() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start min-h-px min-w-px relative self-stretch" data-name="Actions">
      <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Button">
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex gap-[8px] items-center justify-center px-[20px] py-[12px] relative w-full">
            <p className="capitalize font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#344054] text-[16px] text-left">{`Proceed to Pay `}</p>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
      </div>
    </div>
  );
}

function Buttons() {
  return (
    <button className="content-stretch cursor-pointer flex items-start relative shrink-0 w-full" data-name="buttons">
      <Actions />
    </button>
  );
}

function ItemDetails() {
  return (
    <div className="absolute bg-white bottom-0 content-stretch flex flex-col gap-[24px] items-end left-0 pb-[24px] px-[24px] right-0 rounded-tl-[28px] rounded-tr-[28px]" data-name="Item Details">
      <Header />
      <Title />
      <Frame5 />
      <Frame6 />
      <Buttons />
    </div>
  );
}

export default function AndroidCompact() {
  return (
    <div className="bg-[#f2f2f2] relative size-full" data-name="Android Compact - 19">
      <ItemDetails />
    </div>
  );
}