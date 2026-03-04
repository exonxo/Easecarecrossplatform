I have a mobile app built with Capacitor + React (or Vue/Angular — adjust as needed). 
I need you to audit and fix the following issues across my codebase:

---

## 1. AUTH FLOW & NAVIGATION GUARD

The app is currently landing on the Home screen on first launch. Fix the authentication routing so that:
- On app launch, check if the user has an active session (via stored token/localStorage/Supabase auth).
- If no session exists, redirect to the Login/OTP screen first.
- If the user logs in with phone number **8670803180**, skip the registration/onboarding flow entirely and navigate directly to the Home screen after OTP verification.
- For all other phone numbers, after OTP verification, redirect to the Registration/Account Setup flow. Only after completing setup should they land on Home.
- Add a navigation guard (e.g., a route middleware or PrivateRoute wrapper) that prevents unauthenticated users from accessing protected screens.

---

## 2. STATUS BAR & SAFE AREA COMPATIBILITY

The app's top bar/header is overlapping Android's native status bar (notification panel). Fix this by:
- Installing and configuring the Capacitor Status Bar plugin (`@capacitor/status-bar`).
- Setting `StatusBar.setOverlaysWebView({ overlay: false })` in the app's initialization.
- Adding proper CSS safe area support using `env(safe-area-inset-top)` on the root layout or header component.
- In `capacitor.config.ts`, set `backgroundColor` for the status bar to match the app's primary color.
- In `AndroidManifest.xml` or `styles.xml`, make sure the window soft input mode and theme are not set to fullscreen.
- Also ensure the app respects touch interactions natively — remove any `user-select: none` or `pointer-events: none` that might be blocking touch on UI elements. Ensure tap targets are at least 48x48dp.

---

## 3. BACK NAVIGATION (HARDWARE BACK BUTTON)

The Android hardware back button is currently closing the app from any screen. Fix this by:
- Using Capacitor's App plugin (`@capacitor/app`) to listen for `backButton` events:
```js
  App.addListener('backButton', ({ canGoBack }) => { ... })
```
- If the user is on any screen other than Home, pressing Back should navigate to the previous screen (use router.back() or navigation history pop).
- If the user is on the Home screen:
  - First back press: Show a toast/snackbar saying "Press back again to exit."
  - Second back press within ~2 seconds: Close the app using `App.exitApp()`.
  - Reset the double-back state if 2 seconds pass without a second press.
- Make sure this listener is registered globally (e.g., in App.tsx or the root component) and cleaned up properly on unmount.

---

## 4. PERFORMANCE — JANK, JITTER & SLOW RESPONSE

The app feels sluggish and janky. Apply the following optimizations:

**Capacitor / WebView:**
- In `capacitor.config.ts`, ensure `server.androidScheme` is set to `'https'`.
- Enable hardware acceleration in `AndroidManifest.xml`: add `android:hardwareAccelerated="true"` to the `<application>` tag.

**CSS Animations & Transitions:**
- Replace any `top`, `left`, `margin`, `width`, `height` CSS transitions with `transform` and `opacity` only (GPU-composited properties).
- Add `will-change: transform` sparingly on animated elements.
- Remove any heavy `box-shadow` animations or filters on scroll.

**React/JS Performance (if using React):**
- Wrap expensive components in `React.memo()`.
- Use `useCallback` and `useMemo` for callbacks and derived state in components that re-render frequently.
- Lazy-load routes using `React.lazy()` + `Suspense`.
- Avoid inline object/array props that cause unnecessary re-renders.
- Debounce any input handlers or scroll listeners.

**Images & Assets:**
- Ensure all images use `loading="lazy"` and are properly sized (no oversized images scaled down via CSS).
- Use `webp` format where possible.

**General:**
- Remove any `console.log` statements in production build paths.
- Check for and eliminate any synchronous operations (like large loops or blocking API calls) in the main thread during screen transitions.
- Minimize the number of Capacitor plugin calls on mount — defer non-critical ones.

---

Please go through each file relevant to these issues, show me what changes are being made and why, and apply the fixes. Start with the auth flow and navigation guard since that affects the core UX first.