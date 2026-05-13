import { TopNav } from "./TopNav";
import { BottomNav } from "./BottomNav";
import { LiveServiceAlert } from "../booking/LiveServiceAlert";
import { SmoothCursor } from "../ui/smooth-cursor";
import { AnimatedOutlet } from "./AnimatedOutlet";
import { useModalContext } from "../../context/ModalContext";
import { useAuth } from "../../context/AuthContext";

export function DashboardLayout() {
  const { isAnyModalOpen } = useModalContext();
  const { user } = useAuth();
  const isLoggedIn = !!user;

  return (
    <div className="flex flex-col min-h-screen bg-[#f6f8fc] md:bg-[#F0F7FA]">
      {/* Smooth custom cursor — desktop only */}
      <SmoothCursor />

      {/* Unified top navigation — all breakpoints */}
      <div
        className={`transition-all duration-280 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isAnyModalOpen
            ? "opacity-0 pointer-events-none -translate-y-2"
            : "opacity-100"
        }`}
      >
        <TopNav />
      </div>

      {/* Page content — animated fade between routes */}
      <div className="flex-1 min-w-0">
        <AnimatedOutlet />
      </div>

      {/* Bottom Nav - mobile only — hidden when modal open or when logged out.
          No transform here to avoid stacking-context issues with fixed positioning. */}
      {isLoggedIn && (
        <div
          className={`transition-opacity duration-280 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            isAnyModalOpen ? "opacity-0 pointer-events-none" : ""
          }`}
        >
          <BottomNav />
        </div>
      )}

      {/* Live service snackbar — renders across all dashboard tabs */}
      <LiveServiceAlert />
    </div>
  );
}
