/**
 * BANNER ASSETS
 * =============
 * To replace a banner image:
 *   1. Drop your new PNG/JPG into:  src/assets/banners/
 *   2. Update the import path below.
 *   3. Save — the app hot-reloads instantly.
 *
 * Recommended size: 1200×500px (2.4:1 ratio), PNG or JPG.
 */

import banner1 from "./Launch-offer.png";
import banner2 from "./Profile-verification.png";
import banner3 from "./Hospital-Partnership.png";

export const BANNER_IMAGES = [
  { key: "launch-offer",          src: banner1 },
  { key: "profile-verification",  src: banner2 },
  { key: "hospital-partnership",  src: banner3 },
] as const;
