/**
 * CarePackages - Horizontally scrollable care package cards.
 * Shows bundled care packages (Post-Op Recovery, Newborn, etc.) with pricing.
 * Tapping a package opens PackageDetailPopup.
 * Implementation lives in dashboard/CarePackages.tsx
 * Wrapped in React.memo to prevent unnecessary re-renders.
 */
import { memo } from "react";
import { CarePackages as CarePackagesImpl } from "../dashboard/CarePackages";

export const CarePackages = memo(CarePackagesImpl);
