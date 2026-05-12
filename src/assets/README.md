# `src/assets/` — Image Assets

## Folder structure

```
src/assets/
├── banners/        Hero carousel banners (PNG, ~5 MB each — consider compressing to WebP)
│   ├── index.ts                          ← Central import map (single source of truth)
│   ├── Launch-offer.png                  ← Carousel slide 1
│   ├── Profile-verification.png          ← Carousel slide 2
│   └── Hospital-Partnership.png          ← Carousel slide 3
│
├── community/      Reserved for testimonial photos (currently empty)
├── logo/           Reserved for logo PNG exports (currently empty — see /public/easecarelogo-*.svg)
├── packages/       Reserved for care package illustrations (currently empty)
├── profile/        Reserved for default profile / avatar fallbacks (currently empty)
├── providers/      Reserved for hardcoded provider photos (currently empty)
├── services/       Reserved for service category images (currently empty)
│
├── IMAGE_GUIDE.md  Asset-replacement guide for editors (size specs, AI prompts)
│
└── *.png           20 legacy hash-named Figma export PNGs (e.g. `806bc01de58b7aa068e9cc391fe74c20c9980a44.png`)
                    ⚠️  These are NOT directly imported. They're referenced via
                    `figma:asset/<hash>.png` virtual imports which the Vite
                    plugin in `vite.config.ts` resolves to a 1×1 transparent
                    PNG data URI in production builds.
                    
                    ✅ Safe to delete in a future cleanup. They're effectively dead
                    weight — placeholders that ship as transparent pixels.
                    See "Dead asset cleanup" in HANDOFF.md.
```

## Conventions

- Place **logical / named** images here (e.g. `banners/Hospital-Partnership.png`)
- Use **descriptive filenames** (kebab-case or PascalCase) — never use hash names for new images
- For images larger than 500 KB, convert to WebP — saves 60–80% size with no visible quality loss
- Run `npx @squoosh/cli` or similar to compress before committing
- Banner images are imported via `src/assets/banners/index.ts` — never import raw files

## When to use `/public/` vs `/src/assets/`

| Use `/public/` for | Use `/src/assets/` for |
|--------------------|------------------------|
| Files referenced by URL string (`<img src="/foo.png" />`) | Files imported by JS/TS (`import x from './foo.png'`) |
| Files served unchanged (logo SVGs, favicon, manifest) | Files that get hashed for cache-busting |
| OG images / social previews | Banner images bundled with components |
| robots.txt, sitemap.xml | Any asset that needs optimization |
