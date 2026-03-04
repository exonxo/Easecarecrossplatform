/**
 * CommunitySection - Social proof section with video testimonials and stories.
 * Full-bleed on mobile, constrained on desktop.
 * Implementation lives in dashboard/CommunitySection.tsx
 * Wrapped in React.memo to prevent unnecessary re-renders.
 */
import { memo } from "react";
import { CommunitySection as CommunitySectionImpl } from "../dashboard/CommunitySection";

export const CommunitySection = memo(CommunitySectionImpl);
