/**
 * HomePage - Main dashboard home screen composition.
 * Assembles: HeroSection → TrustBar → QuickCategories → HeroBanner → CarePackages → CommunitySection
 * Wrapped in PullToRefresh for mobile swipe-down refresh.
 */
import { PullToRefresh } from "../layout/PullToRefresh";
import { HeroBanner } from "./HeroBanner";
import { HeroSection } from "./HeroSection";
import { QuickCategories } from "./QuickCategories";
import { CarePackages } from "./CarePackages";
import { CommunitySection } from "./CommunitySection";
import { TrustBar } from "./TrustBar";

export function HomePage() {
  return (
    <PullToRefresh>
      <main className="flex-1 pb-[100px] md:pb-0">
        <div className="w-full min-w-0 max-w-[1180px] mx-auto px-4 md:px-8 pt-4 md:pt-7 pb-4 flex flex-col gap-6 md:gap-8 overflow-hidden box-border bg-white">
          <HeroSection />
          <TrustBar />
          <QuickCategories />
          <HeroBanner />
          <CarePackages />
        </div>
        {/* Community section goes full bleed on mobile */}
        <div className="md:max-w-[1180px] md:mx-auto md:px-8">
          <CommunitySection />
        </div>
        <div className="max-w-[1180px] mx-auto px-4 md:px-8 pt-6 md:pt-8 pb-4 flex flex-col gap-6 md:gap-8">
          <div className="h-2 md:h-4" />
        </div>
      </main>
    </PullToRefresh>
  );
}