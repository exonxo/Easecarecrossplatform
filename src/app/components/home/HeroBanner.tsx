/**
 * HeroBanner - Auto-sliding promotional banner carousel on the home screen.
 * Shows care service promotions with image backgrounds and CTAs.
 * Implementation lives in dashboard/HeroBanner.tsx
 * Wrapped in React.memo to prevent unnecessary re-renders.
 */
import { memo } from "react";
import { HeroBanner as HeroBannerImpl } from "../dashboard/HeroBanner";

export const HeroBanner = memo(HeroBannerImpl);
