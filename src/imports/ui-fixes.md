I have a React + MUI + Capacitor Android app called Easecare. 
I need the following UI fixes applied across the design and implementation:

---

## 1. MODAL & BOTTOM SHEET — HIDE NAV BARS + SCROLL LOCK

When any modal or bottom sheet is opened on the Home screen (or any screen):

**Navigation behavior:**
- Hide the top navigation bar completely when a modal/bottom sheet is open
- Hide the bottom navigation bar completely when a modal/bottom sheet is open
- Only show a circular `X` close button in the top-right corner of the modal/bottom sheet
- When the modal/bottom sheet closes, both nav bars must reappear smoothly with a fade-in

**Close button spec:**
- Position: `top: 16px, right: 16px` inside the modal/sheet
- Size: 36x36px circular icon button
- Icon: MUI `<CloseIcon />` 
- Background: semi-transparent dark (`rgba(0,0,0,0.5)`) or white with border
- Always floats above the modal content (`zIndex: 10`)

**Scroll lock:**
- When a bottom sheet or modal is open, the page behind it must NOT scroll
- Apply `document.body.style.overflow = 'hidden'` when modal opens
- Revert `document.body.style.overflow = ''` when modal closes
- For the bottom sheet specifically, add `overscroll-behavior: contain` 
  to the sheet container so scroll inside the sheet doesn't bleed to the page
- Also add `touch-action: none` to the backdrop/overlay to prevent touch 
  scroll passthrough on Android WebView

Implementation pattern for every modal/bottom sheet:
\`\`\`jsx
useEffect(() => {
  if (open) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
  return () => { document.body.style.overflow = ''; };
}, [open]);
\`\`\`

---

## 2. CAROUSEL PAGE INDICATORS — SMALLER DOTS

The carousel on the Home page has oversized page indicator dots. Fix:

**Mobile (< 600px):**
- Dot size: 6px × 6px
- Active dot size: 8px × 8px (slightly wider pill shape, not bigger circle)
- Gap between dots: 4px
- Active dot color: primary brand color
- Inactive dot color: `rgba(0,0,0,0.25)` or `rgba(255,255,255,0.5)` depending on carousel bg

**Desktop (≥ 600px):**
- Dot size: 8px × 8px
- Active dot: 10px wide pill
- Gap between dots: 6px

Apply using `useMediaQuery` or CSS breakpoints. 
If using a carousel library (Swiper, Embla, etc.), override the pagination 
bullet styles via CSS. Example for Swiper:
\`\`\`css
.swiper-pagination-bullet {
  width: 6px !important;
  height: 6px !important;
  margin: 0 3px !important;
}
.swiper-pagination-bullet-active {
  width: 14px !important;
  border-radius: 4px !important;
}
\`\`\`

---

## 3. ANDROID STATUS BAR + BOTTOM NAV SAFE AREA — ALL SCREENS

Every screen/page in the app is currently ignoring Android's native status bar 
and the Android gesture navigation bar at the bottom. Fix globally:

**Status Bar (top):**
- Add to the root layout component or `App.tsx`:
\`\`\`tsx
import { StatusBar, Style } from '@capacitor/status-bar';

useEffect(() => {
  StatusBar.setOverlaysWebView({ overlay: false });
  StatusBar.setStyle({ style: Style.Light }); // or Style.Dark
}, []);
\`\`\`

- Add to global CSS (`index.css` or `App.css`):
\`\`\`css
:root {
  --safe-area-top: env(safe-area-inset-top);
  --safe-area-bottom: env(safe-area-inset-bottom);
}

body {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
}
\`\`\`

- In `index.html`, add inside `<head>`:
\`\`\`html
<meta name="viewport" 
  content="width=device-width, initial-scale=1, viewport-fit=cover" />
\`\`\`

**Every screen/page component:**
- The top of every screen must start BELOW the status bar
- Apply `paddingTop: 'env(safe-area-inset-top)'` to the outermost container 
  of every page OR apply it globally on the root layout wrapper
- The bottom of every screen must sit ABOVE Android's gesture/navigation bar
- Apply `paddingBottom: 'env(safe-area-inset-bottom)'` to the main content 
  wrapper OR the bottom nav bar component

**Bottom Navigation Bar specifically:**
- The app's custom bottom nav bar must add extra padding at the bottom:
\`\`\`css
.bottom-nav {
  padding-bottom: env(safe-area-inset-bottom);
}
\`\`\`

**Screens that open as new pages (questionnaires, booking flow, profile edit, etc.):**
- These full-screen pages must also respect the status bar
- Wrap each page in a layout component like:
\`\`\`tsx
const ScreenWrapper = ({ children }) => (
  <Box sx={{
    pt: 'env(safe-area-inset-top)',
    pb: 'env(safe-area-inset-bottom)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  }}>
    {children}
  </Box>
);
\`\`\`
- Apply `ScreenWrapper` to: Post Requirement page, Bookings page, 
  Profile page, any modal that opens as a full screen on mobile

**In `capacitor.config.ts`:**
\`\`\`ts
plugins: {
  StatusBar: {
    overlaysWebView: false,
    style: 'LIGHT',
    backgroundColor: '#FFFFFF', // match your app's header color
  },
}
\`\`\`

---

## SUMMARY OF ALL CHANGES

1. All modals/bottom sheets → hide top nav + bottom nav when open, 
   show X button, lock background scroll
2. Carousel dots → small (6px mobile, 8px desktop), active state is 
   pill-shaped not larger circle
3. All screens → respect Android status bar inset at top and Android 
   gesture bar inset at bottom using `env(safe-area-inset-top/bottom)`
4. Root layout → apply safe area padding globally so no screen 
   ever needs to handle it individually

Please audit every screen, modal, bottom sheet, and the root layout. 
Show all files being modified.