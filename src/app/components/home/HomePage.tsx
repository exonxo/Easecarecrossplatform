import { PullToRefresh } from "../layout/PullToRefresh";
import { PromoSection } from "./PromoSection";
import { QuickCategories } from "./QuickCategories";
import { FeaturedCategory } from "./FeaturedCategory";
import { CarePackages } from "./CarePackages";
import { CommunitySection } from "./CommunitySection";

export function HomePage() {
  return (
    <PullToRefresh>
      <main className="flex-1 pb-[100px] md:pb-0">
        <div className="w-full min-w-0 max-w-[1180px] mx-auto px-4 md:px-8 pt-5 md:pt-7 pb-6 flex flex-col gap-8 md:gap-10">

          {/* ── Hero: shortcuts + promo banners ── */}
          <PromoSection />

          {/* ── All 8 category shortcuts (UC-style grid) ── */}
          <QuickCategories />

          {/* ── Elder Care — expanded inline (priority category) ── */}
          <FeaturedCategory categoryLabel="Elder Care" />

          {/* ── Cleaning — expanded inline (priority category) ── */}
          <FeaturedCategory categoryLabel="Cleaning" />

          {/* ── Care packages ── */}
          <CarePackages />

        </div>

        {/* ── Testimonials — full bleed ── */}
        <div className="max-w-[1180px] mx-auto md:px-8">
          <CommunitySection />
        </div>
      </main>
    </PullToRefresh>
  );
}
