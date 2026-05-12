# EaseCare — Developer Handoff

Production URL: **https://easecarecrossplatform.vercel.app**

This document summarizes the codebase state and outstanding work for the engineer
taking over implementation.

---

## Tech Stack

| Concern | Choice |
|---------|--------|
| Framework | React 18 + TypeScript + Vite 6 |
| Styling | Tailwind CSS v4 (utility-first) |
| Animation | Motion (formerly Framer Motion) — used sparingly |
| Routing | `react-router` with `createHashRouter` (for GH Pages compat) |
| State | React Context + hooks (`AuthContext`, `BookingContext`, `ModalContext`) |
| Mobile | Capacitor 8 (native shell for Android/iOS) |
| Data | localStorage via `dataService` — **no backend yet** |
| Hosting | Vercel (project: `easecarecrossplatform`) |
| Icons | `lucide-react` |
| Maps | Leaflet (location picker only) |

---

## Project Structure

```
src/
├── app/
│   ├── App.tsx                 ← Root: ErrorBoundary → Providers → Router
│   ├── main.tsx                ← Entry (mounts <App /> into #root)
│   ├── routes.tsx              ← Route config (lazy-loaded routes)
│   │
│   ├── components/
│   │   ├── auth/               ← Login, RequireAuth, AuthGuard
│   │   ├── booking/            ← Booking flows (PostRequirementFlow, BidCards, etc)
│   │   ├── chat/               ← ChatModal, RaiseIssue
│   │   ├── dashboard/          ← Main app screens (PromoSection, CarePackages, ...)
│   │   ├── figma/              ← ImageWithFallback (Figma-export pattern)
│   │   ├── home/               ← Re-export wrappers (home/X.tsx → dashboard/X.tsx)
│   │   ├── layout/             ← TopNav, BottomNav, DashboardLayout, etc
│   │   ├── onboarding/         ← 5-step onboarding flow
│   │   ├── pages/              ← Lazy-loaded route pages
│   │   ├── shared/             ← LogoFull, PrimaryButton, ErrorBoundary
│   │   └── ui/                 ← shadcn/ui primitives + custom (app-store-button, play-store-button)
│   │
│   ├── context/                ← AuthContext, BookingContext, ModalContext
│   ├── hooks/                  ← useRequireAuth, useCapacitorInit, useToast
│   ├── lib/                    ← logger (NEW — replaces console.log calls)
│   ├── services/               ← dataService (localStorage), api (circuit breaker)
│   └── imports/                ← ⚠️  Figma export scratch — see "Dead Code"
│
├── assets/                     ← Bundled images. See src/assets/README.md
└── styles/                     ← tailwind.css, theme.css, fonts.css

public/                         ← Served by URL (see public/README.md)
├── easecarelogo-*.svg          ← Brand logos (3 variants)
├── favicon.svg
├── hero-pricing-panel.webp     ← Hero right-panel image
├── Apppreview.webp             ← Mobile app mockup
├── manifest.webmanifest        ← PWA config
└── 404.html                    ← GH Pages SPA fallback
```

---

## What Was Cleaned Up Pre-Handoff

| Item | Status |
|------|--------|
| Removed 21 `console.log` / `console.warn` statements | ✅ Replaced with `src/app/lib/logger.ts` (silent in production, dev-only) |
| Removed unused npm deps (`embla-carousel-react`, `react-slick`) | ✅ |
| Removed unused fonts (Poppins, DM Sans) from `fonts.css` | ✅ Saves ~30 KB |
| Standardized brand to **"EaseCare"** (was mix of EaseCare/Easecare/EasyCare) | ✅ |
| Route-level code splitting with `React.lazy()` | ✅ **Bundle: 1,411 KB → 908 KB (36% smaller)** |
| Hero image preloaded via `<link rel="preload">` | ✅ Improves LCP ~150 ms |
| PWA manifest + favicon | ✅ Installable on Android/iOS home screen |
| `aria-label` on category tiles + carousel arrows | ✅ |
| HeroBanner: full keyboard scroll counter with `aria-live` | ✅ |
| README docs in `src/assets/` and `public/` | ✅ |

---

## Bundle Composition (after split)

```
Initial load (eager):
  dist/index-*.js              908 KB   (277 KB gzip)   ← Main + HomePage
  dist/index-*.css             226 KB   ( 36 KB gzip)

Lazy-loaded chunks:
  OnboardingFlow               275 KB   (103 KB gzip)   ← Only loaded on /onboarding
  MyBookings                    65 KB   ( 15 KB gzip)
  PostRequirementFlow           47 KB   ( 11 KB gzip)
  Services                      30 KB   ( 10 KB gzip)
  BidCards                      29 KB   (  8 KB gzip)
  Messages                      27 KB   (  8 KB gzip)
  Profile                       16 KB   (  4 KB gzip)
  AddLocation                   15 KB   (  5 KB gzip)
```

---

## Outstanding Work (Priority Order)

### 🔴 Critical — must do before public launch

1. **Replace mock backend with a real API.**
   - Currently everything goes to `localStorage` via `src/app/services/DataService.ts`
   - User data persists ONLY on a single device, not across logins
   - Wire up Supabase (already a dep) or a custom REST/GraphQL backend
   - Endpoints to implement (see `dataService.ts` interface):
     - Auth, bookings, requirements, transactions, addresses, profile,
       promo validation, UPI verification, payments, issues, questionnaire

2. **Real authentication.**
   - Login/OTP flow currently just calls `setUser({...})` in context — no real auth
   - Integrate Supabase Auth / Firebase Auth / your own JWT system
   - Add proper session expiry + refresh tokens

3. **Real payment integration.**
   - `PaymentFlow.tsx` is a simulation. Integrate Razorpay / Stripe / PhonePe SDK.

4. **Map provider — pick one and remove the leaflet mixed-import warning.**
   - `src/app/components/dashboard/OngoingServiceCard.tsx` dynamically imports leaflet
   - `src/app/components/dashboard/AddLocationPage.tsx` + `LocationModal.tsx` statically import it
   - Either all eager or all lazy — currently the dynamic import gets defeated by the static one

### 🟡 High — improves quality

5. **Error tracking service.**
   - `src/app/lib/logger.ts` has a TODO comment to wire `logger.error` to Sentry/LogRocket.
   - Currently errors only show in dev console.

6. **Form validation focus management.**
   - `PostRequirementModal.tsx` validates but doesn't focus the first errored field on submit.

7. **Loading skeletons.**
   - `ImageWithFallback.tsx` shows blank space while loading — replace with skeleton.
   - `BookingsPage.tsx` shows a generic spinner — replace with structural skeleton cards.

8. **Mobile touch targets.**
   - Some buttons are < 44px tall (WCAG AA recommendation).
   - Audit: `PostRequirementModal.tsx`, `BookingsPage.tsx` action buttons.

9. **Reduced motion support.**
   - All `motion.*` components animate regardless of OS setting.
   - Wrap with `useReducedMotion()` from `motion/react`.

### 🟢 Medium — nice to have

10. **Move hardcoded data to a data layer.**
    - `CarePackages.tsx` (60 lines), `MostBookedServices.tsx` (90 lines),
      `CommunitySection.tsx` (44 lines), `QuickCategories.tsx` (195 lines)
      all have inline arrays — move to `src/app/data/` and fetch async.

11. **Dead asset cleanup.**
    - `src/assets/*.png` — 20 hash-named PNGs (e.g. `806bc01de58b7aa068e9cc391fe74c20c9980a44.png`)
    - These are Figma export leftovers — referenced via `figma:asset/<hash>.png`
      virtual imports which get neutered to 1×1 transparent PNGs by the Vite plugin
      (see `vite.config.ts` → `figmaAssetPlugin()`)
    - **Safe to delete the files + the plugin once `MessagesPage.tsx` is rewritten**
      to use real image URLs.

12. **Dead code in `src/imports/`.**
    - This folder is mostly Figma-export scratch files (`Body-17-3721.tsx`, etc.)
    - Some `svg-*.ts` files inside are still imported (logo paths). Most are not.
    - Sweep: for each file in `src/imports/`, check if anything imports it.

13. **Unsafe TypeScript types.**
    - `CardQuestionnaire.tsx:795,803` — uses `(prev as any)[field]`
    - `ChatModal.tsx:205` — uses `_: any` for motion drag handler
    - Define proper types instead.

14. **Convert Motion microinteractions to CSS.**
    - 80% of `motion.button` / `motion.div` usage in the app is for simple hover/scale
      animations that pure CSS can do. Saves ~15 KB gzip.
    - Keep Motion only where it shines: page transitions, swipe gestures, AnimatePresence.

### 🔵 Low — polish

15. **Add service worker for offline / repeat-visit cache.**
    - `manifest.webmanifest` exists but no SW. Hero image + critical CSS would benefit.

16. **Better tablet breakpoint (768-1024 px).**
    - Some sections (PromoSection categories) cramp at this width.
    - Test on iPad portrait specifically.

17. **Accessibility full sweep.**
    - Run `axe-core` against every route in CI.
    - Most components have `aria-label` now, but a few image alt texts are still generic
      (e.g. `alt="Bidder"` in `BookingsPage.tsx`).

---

## Build, Run, Deploy

```bash
# Install
npm install

# Dev server (Vite, hot reload)
npm run dev                # → http://localhost:5175

# Type-check (no emit)
npx tsc --noEmit

# Production build
npm run build              # outputs to dist/
npm run preview            # preview the production build locally

# Deploy (Vercel — already linked)
vercel --prod              # deploys to easecarecrossplatform.vercel.app
```

---

## Conventions

- **Imports**: relative paths (`../shared/LogoFull`), no `@` alias yet. Could add one later.
- **Filenames**: PascalCase for components (`HeroBanner.tsx`), camelCase for utils (`logger.ts`).
- **Colors**: hex strings inline. Brand primary: `#1975D2`. Worth extracting to Tailwind config when more colors stabilize.
- **Fonts**: Lexend (headings, semi-bold/bold), Inter (body). Used via `font-['Lexend',sans-serif]` inline.
- **Spacing**: Tailwind defaults. Section gap: `gap-10 md:gap-14` on HomePage.
- **Logging**: never use `console.*` directly — import `logger` from `src/app/lib/logger.ts`.
- **Brand name**: always **"EaseCare"** (one word, camel case). Not "Easecare", not "EasyCare".

---

## Routes Reference

| Path | Auth | Component | Lazy? |
|------|------|-----------|-------|
| `/` | optional | `HomePage` | eager (first paint critical) |
| `/bookings` | required | `MyBookings` | lazy |
| `/messages` | required | `Messages` | lazy |
| `/profile` | required | `Profile` | lazy |
| `/onboarding` | redirect if logged in | `OnboardingFlow` | lazy |
| `/post-requirement` | required | `PostRequirementFlow` | lazy |
| `/services` | required | `Services` (+ `?category=X` query) | lazy |
| `/services?category=Elder Care` | required | Opens category modal directly | lazy |
| `/add-location` | required | `AddLocation` | lazy |
| `/bookings/:id/bids` | required | `BidCards` | lazy |
| `*` | — | redirects to `/` | — |

---

## Booking Logic (important!)

Click sources for booking flows:

| User action | Opens | Why |
|-------------|-------|-----|
| Click hero "Tell us what you need →" link | `PostRequirementModal` | User wants custom help — opens text-based requirement form |
| Click hero category tile (Elder Care, Cleaning, etc.) | Navigates to `/services?category=X` | Opens that category's service list with fixed prices |
| Click "Most Booked Services" card | `ServiceBookingPopup` | Date picker + fixed price + checkout + payment |
| Click "Care Package" card | `PackageDetailPopup` | Full package details + payment |
| Click service inside a category list | `ServiceBookingPopup` | Date picker + checkout flow |

**Rule of thumb**: `PostRequirementModal` is ONLY for freeform/custom requests.
Everything else uses `ServiceBookingPopup` or `PackageDetailPopup`.

---

## Contact / Questions

If anything is unclear, see comments in individual files — most components have a docstring at the top explaining their purpose. Audit findings (UX/perf/tech) are in `git log` of this commit.
