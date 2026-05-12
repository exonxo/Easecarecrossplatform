# `/public/` — Static Assets Served by URL

Files here are served directly at the site root. Reference them by URL path
(e.g. `<img src="/easecarelogo-logomark.svg" />`), NOT via `import`.

## File inventory

| File | Purpose | Used by |
|------|---------|---------|
| `404.html` | GitHub Pages SPA redirect fallback | hosting |
| `Apppreview.webp` | Mobile app mockup screenshot — shown in AppDownloadCTA section | `AppDownloadCTA.tsx` |
| `easecarelogo-fulllogo-horizontal.svg` | Brand logo for LIGHT backgrounds | `LogoFull.tsx` (default variant) |
| `easecarelogo-fulllogo-horizontal-darkbg.svg` | Brand logo for DARK / colored backgrounds | `LogoFull.tsx` (`variant="horizontal-dark"`) |
| `easecarelogo-logomark.svg` | Logomark only (icon, no wordmark) | `LogoFull.tsx` (`variant="mark"`) |
| `favicon.svg` | Browser tab icon (copy of logomark) | `<link rel="icon">` in `index.html` |
| `hero-pricing-panel.webp` | Right-side hero panel image with nurse + pricing | `PromoSection.tsx` |
| `manifest.webmanifest` | PWA manifest (installable app config) | `<link rel="manifest">` |

## Conventions

- Filenames should be lowercase with hyphens (`hero-pricing-panel.webp`)
  - Exception: existing files in PascalCase / mixed case are kept for backwards compatibility
- Brand assets follow the pattern: `easecarelogo-<variant>.svg`
- Image format priority: **SVG** (vector) > **WebP** (photo) > **PNG** (with transparency only)
- Never put HUGE files here — large files are NOT optimized by Vite when in `/public/`

## Replacing logo / brand assets

Use the same filenames. The `LogoFull` component (`src/app/components/shared/LogoFull.tsx`)
maps variants → file paths in one place. Update those paths if you rename anything.
