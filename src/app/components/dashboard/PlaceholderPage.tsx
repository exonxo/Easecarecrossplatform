import { PullToRefresh } from "./PullToRefresh";

export function PlaceholderPage({ title, description }: { title: string; description: string }) {
  return (
    <PullToRefresh>
      <div className="flex-1 flex items-center justify-center px-8 pb-24 md:pb-0 min-h-[60vh]">
        <div className="text-center">
          <div className="bg-[rgba(25,117,210,0.08)] size-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-[32px]">
              {title === "Bookings" ? "📅" : title === "Messages" ? "💬" : "👤"}
            </span>
          </div>
          <h2 className="font-['Lexend',sans-serif] font-bold text-[22px] text-[#0f172a] mb-2">{title}</h2>
          <p className="font-['Inter',sans-serif] text-[14px] text-[#64748b] max-w-[280px] mx-auto leading-[22px]">
            {description}
          </p>
        </div>
      </div>
    </PullToRefresh>
  );
}
