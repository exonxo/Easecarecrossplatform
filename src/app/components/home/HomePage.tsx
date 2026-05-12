import { PullToRefresh } from "../layout/PullToRefresh";
import { PromoSection } from "./PromoSection";
import { StatsBar } from "./StatsBar";
import { MostBookedServices } from "./MostBookedServices";
import { HowItWorks } from "./HowItWorks";
import { CarePackages } from "./CarePackages";
import { HeroBanner } from "./HeroBanner";
import { CommunitySection } from "./CommunitySection";
import { AppDownloadCTA } from "./AppDownloadCTA";

export function HomePage() {
  return (
    <PullToRefresh>
      <main className="flex-1 pb-[100px] md:pb-0">
        <div className="w-full min-w-0 max-w-[1180px] mx-auto px-4 md:px-8 pt-5 md:pt-7 pb-12 flex flex-col gap-10 md:gap-14">

          {/* 1 ── HERO: heading + categories card + blue pricing panel */}
          <PromoSection />

          {/* 2 ── TRUST BAR: 4 numerical stats */}
          <StatsBar />

          {/* 3 ── MOST BOOKED SERVICES carousel with Popular/Trending badges */}
          <MostBookedServices />

          {/* 4 ── HOW IT WORKS — 4-step process */}
          <HowItWorks />

          {/* 5 ── CARE PACKAGES — Bento grid (1 featured + 4 smaller) */}
          <CarePackages />

          {/* 6 ── PROMO BANNERS (auto-rotating, full width) */}
          <HeroBanner />

          {/* 7 ── TESTIMONIALS — real stories with video thumbnails */}
          <CommunitySection />

          {/* 8 ── APP DOWNLOAD CTA strip */}
          <AppDownloadCTA />

        </div>
      </main>
    </PullToRefresh>
  );
}
