/**
 * DashboardLayout - Root layout for all authenticated dashboard pages.
 * Structure: Sidebar (desktop) + TopHeader (desktop) + MobileHeader + <Outlet> + BottomNav (mobile)
 * Also renders the LiveServiceAlert snackbar across all tabs.
 * Uses SmoothCursor for a custom desktop cursor effect.
 */
import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";
import { TopHeader } from "./TopHeader";
import { MobileHeader } from "./MobileHeader";
import { BottomNav } from "./BottomNav";
import { LiveServiceAlert } from "../booking/LiveServiceAlert";
import { SmoothCursor } from "../ui/smooth-cursor";

export function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-[#f6f8fc] md:bg-[#F0F7FA]">
      {/* Smooth custom cursor — desktop only */}
      <SmoothCursor />

      {/* Fixed Sidebar - desktop only */}
      <Sidebar />

      {/* Main Content */}
      <div className="md:ml-[260px] flex-1 flex flex-col min-h-screen min-w-0">
        {/* Mobile Header */}
        <MobileHeader />
        {/* Desktop Header */}
        <div className="hidden md:block">
          <TopHeader />
        </div>

        {/* Page content */}
        <Outlet />
      </div>

      {/* Bottom Nav - mobile only */}
      <BottomNav />

      {/* Live service snackbar — renders across all dashboard tabs */}
      <LiveServiceAlert />
    </div>
  );
}