# Easecare — Image Asset Guide

## How to replace an image
1. Generate your image (see specs per folder below)
2. Drop it into the correct folder with the exact filename shown
3. The app hot-reloads — no code changes needed (for already-wired folders)

For sections still using Unsplash URLs, see the "Wiring status" note in each section.

---

## File Tree

```
src/assets/
│
├── IMAGE_GUIDE.md                  ← you are here
│
├── banners/                        ✅ WIRED — drop & replace
│   ├── index.ts                    ← central import file
│   ├── banner-1-first-booking-offer.jpg   [1080×540px]  Slide 1: "First 3 Bookings — 15% OFF"
│   ├── banner-2-home-nursing.jpg          [1080×540px]  Slide 2: "Verified Home Nursing Care"
│   ├── banner-3-elder-care.jpg            [1080×540px]  Slide 3: "Elder Care Packages"
│   └── banner-4-baby-sitter.jpg           [1080×540px]  Slide 4: "Baby Sitter On Demand"
│
├── providers/                      ⚠️ NOT YET WIRED — URLs still in code
│   ├── anjali-sharma.jpg           [400×400px]  Caregiver avatar — Elder Care specialist
│   ├── priya-dasgupta.jpg          [400×400px]  Caregiver avatar — Home Nursing specialist
│   ├── rekha-nair.jpg              [400×400px]  Caregiver avatar — General Care specialist
│   ├── meena-pillai.jpg            [400×400px]  Caregiver avatar — Elder Care specialist
│   ├── sunita-roy.jpg              [400×400px]  Caregiver avatar — Housekeeping specialist
│   ├── kavitha-das.jpg             [400×400px]  Caregiver avatar — Medical Care specialist
│   ├── jane-williams.jpg           [400×400px]  Caregiver avatar — Nursing specialist
│   └── rajesh-kumar.jpg            [400×400px]  Caregiver avatar — Parental Care specialist
│       NOTE: Used as swipe cards (800px), bid thumbnails (100px), booking history (400px)
│
├── services/
│   ├── elder-care/                 ⚠️ NOT YET WIRED
│   │   ├── personal-care-assistant.jpg    [400×300px]  Personal Care Assistant service card
│   │   ├── medication-management.jpg      [400×300px]  Medication Management service card
│   │   ├── companionship.jpg              [400×300px]  Companionship service card
│   │   ├── physical-therapy-support.jpg   [400×300px]  Physical Therapy Support service card
│   │   ├── meal-preparation.jpg           [400×300px]  Meal Preparation service card
│   │   └── medical-escort.jpg             [400×300px]  Medical Escort service card
│   │
│   ├── cleaning/                   ⚠️ NOT YET WIRED
│   │   ├── deep-home-cleaning.jpg         [400×300px]  Deep Home Cleaning service card
│   │   ├── regular-housekeeping.jpg       [400×300px]  Regular Housekeeping service card
│   │   ├── kitchen-cleaning.jpg           [400×300px]  Kitchen Cleaning service card
│   │   ├── bathroom-sanitization.jpg      [400×300px]  Bathroom Sanitization service card
│   │   ├── post-construction-cleanup.jpg  [400×300px]  Post-Construction Cleanup service card
│   │   └── sofa-carpet-cleaning.jpg       [400×300px]  Sofa & Carpet Cleaning service card
│   │
│   └── baby-care/                  ⚠️ NOT YET WIRED
│       ├── babysitting.jpg                [400×300px]  Babysitting service card
│       ├── after-school-care.jpg          [400×300px]  After School Care service card
│       ├── homework-help.jpg              [400×300px]  Homework Help service card
│       ├── activity-based-learning.jpg    [400×300px]  Activity-Based Learning service card
│       ├── weekend-daycare.jpg            [400×300px]  Weekend Daycare service card
│       └── night-nanny.jpg                [400×300px]  Night Nanny service card
│
├── packages/                       ⚠️ NOT YET WIRED
│   ├── post-op-recovery.jpg               [600×360px]  Post-Op Recovery package card
│   ├── new-parents-help.jpg               [600×360px]  New Parents Help package card
│   ├── daily-companion.jpg                [600×360px]  Daily Companion package card
│   ├── physio-at-home.jpg                 [600×360px]  Physio at Home package card
│   ├── elder-care-monthly.jpg             [600×360px]  Elder Care Monthly package card
│   ├── night-nurse.jpg                    [600×360px]  Night Nurse package card
│   ├── diabetes-management.jpg            [600×360px]  Diabetes Management package card
│   ├── maternity-care.jpg                 [600×360px]  Maternity Care package card
│   ├── palliative-care.jpg                [600×360px]  Palliative Care package card
│   ├── child-special-needs.jpg            [600×360px]  Child Special Needs package card
│   ├── dementia-care.jpg                  [600×360px]  Dementia Care package card
│   └── weekend-respite.jpg                [600×360px]  Weekend Respite package card
│
├── community/                      ⚠️ NOT YET WIRED (uses Figma assets)
│   ├── testimonial-customer-story.jpg     [480×270px]  Video thumbnail — Customer Story
│   ├── testimonial-nurse-introduction.jpg [480×270px]  Video thumbnail — Nurse Introduction
│   ├── testimonial-happy-family.jpg       [480×270px]  Video thumbnail — Happy Family
│   └── testimonial-worker-story.jpg       [480×270px]  Video thumbnail — Worker Story
│
├── profile/                        ⚠️ NOT YET WIRED
│   └── user-avatar.jpg                    [400×400px]  Logged-in user profile photo (John Arowoka placeholder)
│
└── logo/                           ⚠️ NOT YET WIRED (uses Figma asset)
    └── easecare-logo.png                  [any]        Easecare app logo (top-left header)
```

---

## Image Specs Summary

| Section | Folder | Size | Format | Count |
|---------|--------|------|--------|-------|
| Hero banners | `banners/` | 1080×540px | JPG | 4 |
| Provider avatars | `providers/` | 400×400px | JPG | 8 |
| Service cards | `services/*/` | 400×300px | JPG | 18 |
| Care packages | `packages/` | 600×360px | JPG | 12 |
| Community/testimonials | `community/` | 480×270px | JPG | 4 |
| User profile | `profile/` | 400×400px | JPG | 1 |
| Logo | `logo/` | any | PNG | 1 |

**Total images to generate: 48**

---

## AI Image Prompts

### Banners (1080×540, photorealistic, warm & trustworthy)
- **banner-1**: Indian family celebrating, caregiver in background, text space on left, warm golden light
- **banner-2**: Female Indian nurse in home setting attending to patient, professional scrubs, natural light
- **banner-3**: Happy elderly Indian couple with caregiver outdoors, smiling, soft bokeh background
- **banner-4**: Trusted babysitter playing with toddler on floor, bright living room, Indian setting

### Provider Avatars (400×400, headshot, professional)
- All: Indian female/male caregiver, professional attire, neutral background, friendly smile, square crop

### Service Cards (400×300, scene-based)
- Show the actual service being performed in an Indian home setting

### Care Packages (600×360, editorial)
- Warm, aspirational scenes of care being delivered at home

### Community Thumbnails (480×270, video thumbnail style)
- Person facing camera, slight smile, with a play button aesthetic
