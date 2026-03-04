I'm building a mobile app using React + MUI (Material UI) + Capacitor for Android. 
I need you to implement consistent animations across the app. Here are the exact specs:

---

## 1. BOTTOM SHEET ANIMATIONS (Mobile only)

All bottom sheet popups must use MUI's `Slide` component with `direction="up"`. 
Use `mountOnEnter` and `unmountOnExit` so the component is removed from DOM when hidden.

Pattern to follow for every bottom sheet:
- Trigger: a boolean state (e.g., `open`)
- Animation: slides up from the bottom when opening, slides down when closing
- Only apply this on mobile (`useMediaQuery` with `theme.breakpoints.down('sm')`)
- On desktop/PC, bottom sheets should either not appear or render as a standard modal/dialog instead

Reference implementation:
\`\`\`jsx
import Slide from '@mui/material/Slide';

<Slide direction="up" in={open} mountOnEnter unmountOnExit>
  <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, borderRadius: '16px 16px 0 0', p: 2 }}>
    {/* bottom sheet content */}
  </Paper>
</Slide>
\`\`\`

Apply this pattern to ALL existing bottom sheet components in the codebase. 
Find every component that functions as a bottom sheet (drawer, modal anchored to bottom, 
action sheet, etc.) and replace or wrap it with this Slide animation.

---

## 2. REGULAR POPUP / DIALOG ANIMATIONS (All screens)

All popups that are NOT bottom sheets (alerts, confirmations, tooltips, info modals, 
dropdowns, etc.) must use MUI's `Fade` component.

Pattern to follow:
\`\`\`jsx
import Fade from '@mui/material/Fade';

<Fade in={open}>
  <Paper sx={{ p: 2, borderRadius: 2 }}>
    {/* popup content */}
  </Paper>
</Fade>
\`\`\`

Find every dialog, modal, popover, tooltip, and overlay in the codebase and ensure 
they use the Fade transition. Do not use Slide for these — only Fade.

---

## 3. PAGE / SCREEN TRANSITION ANIMATIONS

Currently there are no transitions between screens — it feels abrupt and non-native. 
Please suggest and implement the best page transition strategy for a Capacitor Android app 
built with React Router.

Here are a few directions to consider — pick the one that feels most native and performs best:

**Option A — Slide transitions (iOS/Android style):**
- New page slides in from the right, old page exits to the left (forward navigation)
- On back navigation, reverse: new page slides in from the left
- Use `react-transition-group` `CSSTransition` + `TransitionGroup` on the router outlet

**Option B — Fade transitions:**
- Each new route fades in from opacity 0 → 1
- Simple, smooth, works well for dashboard-style apps
- Lightweight and performant on WebView

**Option C — MUI `Slide` + route-aware direction:**
- Detect navigation direction (forward/back) and apply directional slide accordingly
- Feels closest to native Android activity transitions

**Option D — Shared element transitions (advanced):**
- Key elements (like a card) animate into the next screen's layout
- Best for detail pages (e.g., tapping a care provider card opens their profile)

→ Evaluate the codebase's routing setup (React Router v6 assumed) and implement 
whichever option is most feasible and performant. Wrap the `<Routes>` block with 
`TransitionGroup` or a custom route wrapper. Make sure:
- Transitions are max 250–300ms (anything longer feels sluggish on Android WebView)
- Only `transform` and `opacity` are animated (GPU composited — no layout thrashing)
- Back button navigation triggers the reverse animation direction

---

## 4. GLOBAL ANIMATION PERFORMANCE RULES

Apply these rules to ALL animations across the app:

- Only animate `transform` and `opacity` — never `top`, `left`, `height`, `margin`, or `width`
- Add `will-change: transform` to elements that animate on entry/exit
- Use `easing: 'cubic-bezier(0.4, 0, 0.2, 1)'` (MUI's standard easing) for all transitions
- Duration: 220ms for small elements (chips, badges), 280ms for sheets and pages
- Disable all animations if `prefers-reduced-motion` is set

---

## INSTRUCTIONS

1. Audit the entire codebase — find all modals, drawers, dialogs, popups, and route changes
2. Apply the Slide animation to all bottom sheets (mobile only)
3. Apply the Fade animation to all other popups
4. Implement page transitions on the router level
5. Show me each file you're modifying and what changed
6. Do not break existing functionality — only wrap/replace the animation layer