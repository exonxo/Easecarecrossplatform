/**
 * TrustBar - Horizontal scrolling trust badges bar.
 * Shows "Background Verified", "Aadhaar Checked", "Insured", etc.
 * Implementation lives in dashboard/TrustBar.tsx
 * Wrapped in React.memo to prevent unnecessary re-renders on parent state changes.
 */
import { memo } from "react";
import { TrustBar as TrustBarImpl } from "../dashboard/TrustBar";

export const TrustBar = memo(TrustBarImpl);
