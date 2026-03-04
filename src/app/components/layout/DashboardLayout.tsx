/**
 * DashboardLayout - Root layout for all authenticated dashboard pages.
 * Structure: Sidebar (desktop) + TopHeader (desktop) + MobileHeader + AnimatedOutlet + BottomNav (mobile)
 * Also renders the LiveServiceAlert snackbar across all tabs.
 * Uses SmoothCursor for a custom desktop cursor effect.
 */
import { Sidebar } from "./Sidebar";
import { TopHeader } from "./TopHeader";
import { MobileHeader } from "./MobileHeader";
import { BottomNav } from "./BottomNav";
import { LiveServiceAlert } from "../booking/LiveServiceAlert";
import { SmoothCursor } from "../ui/smooth-cursor";
import { AnimatedOutlet } from "./AnimatedOutlet";
import { useModalContext } from "../../context/ModalContext";

export function DashboardLayout() {
  const { isAnyModalOpen } = useModalContext();

  return (
    <div className="flex min-h-screen bg-[#f6f8fc] md:bg-[#F0F7FA]">
      {/* Smooth custom cursor — desktop only */}
      <SmoothCursor />

      {/* Fixed Sidebar - desktop only */}
      <Sidebar />

      {/* Main Content */}
      <div className="md:ml-[260px] flex-1 flex flex-col min-h-screen min-w-0">
        {/* Mobile Header — hidden when modal open */}
        <div
          className={`transition-all duration-280 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            isAnyModalOpen
              ? "opacity-0 pointer-events-none -translate-y-2"
              : "opacity-100"
          }`}
        >
          <MobileHeader />
        </div>
        {/* Desktop Header — hidden when modal open */}
        <div
          className={`hidden md:block transition-all duration-280 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            isAnyModalOpen
              ? "opacity-0 pointer-events-none -translate-y-2"
              : "opacity-100"
          }`}
        >
          <TopHeader />
        </div>

        {/* Page content — animated fade between routes */}
        <AnimatedOutlet />
      </div>

      {/* Bottom Nav - mobile only — hidden when modal open.
          NOTE: No translate-* here! Any CSS transform on a parent of a
          position:fixed element makes that fixed element position relative
          to the parent instead of the viewport, pushing BottomNav off-screen.
          We use opacity-only transition to avoid that stacking-context trap. */}
      <div
        className={`transition-opacity duration-280 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isAnyModalOpen ? "opacity-0 pointer-events-none" : ""
        }`}
      >
        <BottomNav />
      </div>

      {/* Live service snackbar — renders across all dashboard tabs */}
      <LiveServiceAlert />
    </div>
  );
}