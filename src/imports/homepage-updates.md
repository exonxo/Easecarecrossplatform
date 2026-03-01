I need several specific changes made to the homepage of my Easecare web app. 
Please implement ALL of the following changes carefully:

---

CHANGE 1 — Fix CTA Banner Responsive Width

The CTA banner on the homepage has a fixed width which breaks on smaller screens.

FIX REQUIRED:
- Remove any fixed width (e.g. w-[1200px] or width: 1200px) from the CTA banner container
- Replace with: w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
- All inner components (heading, subtext, buttons) inside the banner must also be 
  responsive using flex-col on mobile and flex-row on desktop
- Text sizes should scale: text-2xl on mobile, text-4xl on desktop
- Buttons should be full width on mobile (w-full) and auto width on desktop (w-auto)
- Add proper padding on all screen sizes so nothing touches the screen edges

---

CHANGE 2 — "What Do You Need?" Section: Responsive + Service Modal with Bottom Sheet

The service category buttons (Eldercare, Cleaning, etc.) should open a modal on desktop 
and a bottom sheet on mobile showing available services under that category.

FIX REQUIRED:

A) Make the section responsive:
- Use a responsive grid: grid-cols-2 on mobile, grid-cols-3 on tablet, grid-cols-4 on desktop
- Category buttons should have consistent sizing with icons and labels
- Section heading and subtext should scale with screen size

B) Modal behavior on desktop (md and above):
- Clicking any category button opens a centered modal overlay
- Modal has a close button (X) at the top right
- Modal title shows the selected category name (e.g. "Eldercare Services")
- Inside the modal, show a responsive grid of service cards: grid-cols-2 on small modal, 
  grid-cols-3 on larger screens
- Each service card has: an icon or image, service name, short description, and a 
  "View Details" button
- Clicking "View Details" closes the modal and opens a detailed service view/page or 
  an inner detail panel within the modal showing: full service description, pricing, 
  duration, what's included, and a "Book Now" CTA button

C) Bottom sheet behavior on mobile (below md):
- On mobile, the same click opens a bottom sheet that slides up from the bottom
- Bottom sheet has a drag handle at the top, category title, and scrollable service cards 
  displayed in a single column list
- Each list item has: icon, service name, short description, and a chevron arrow
- Tapping a service item opens a full screen detail view with back button, service info, 
  pricing, and a sticky "Book Now" button at the bottom

D) Sample service data to use for each category:
- Eldercare: Personal Care Assistant, Medication Management, Companionship, 
  Physical Therapy Support, Meal Preparation, Medical Escort
- Cleaning: Deep Home Cleaning, Regular Housekeeping, Kitchen Cleaning, 
  Bathroom Sanitization, Post-Construction Cleanup, Sofa & Carpet Cleaning
- Childcare: Babysitting, After School Care, Homework Help, 
  Activity-Based Learning, Weekend Daycare, Night Nanny
- Use placeholder pricing like "Starting from ₹499" for each service

---

CHANGE 3 — Smooth Cursor on Desktop

Implement a smooth custom cursor that follows mouse movement on desktop only.

FIX REQUIRED:
- Create a SmoothCursor component at src/components/ui/smooth-cursor.tsx
- The cursor should be a custom styled circle/dot that smoothly follows the mouse 
  using CSS transitions or framer-motion spring animation
- Implementation:

import { useEffect, useState } from "react";
import { motion } from "motion/react";

export function SmoothCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      className="hidden md:block fixed top-0 left-0 w-6 h-6 rounded-full 
                 bg-blue-500 opacity-70 pointer-events-none z-[9999] mix-blend-difference"
      animate={{ x: position.x - 12, y: position.y - 12, opacity: isVisible ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.5 }}
    />
  );
}

- Import and add <SmoothCursor /> inside the root App.tsx or Layout component 
  so it appears globally across all pages
- Hide the default browser cursor on desktop only using CSS:
  body { cursor: none; } inside a @media (min-width: 768px) block
- On mobile and touch devices, the default cursor behavior must remain unchanged

---

CHANGE 4 — Shine Border Animation on Homepage Blue Card

Add an animated shine border effect to the blue card on the homepage.

FIX REQUIRED:
- Create a ShineBorder component at src/components/ui/shine-border.tsx
- Implementation:

import { cn } from "@/lib/utils";

interface ShineBorderProps {
  className?: string;
  shineColor?: string | string[];
  borderWidth?: number;
  duration?: number;
}

export function ShineBorder({
  className,
  shineColor = ["#A07CFE", "#FE8FB5", "#FFBE7B"],
  borderWidth = 1,
  duration = 14,
}: ShineBorderProps) {
  return (
    <div
      className={cn("absolute inset-0 rounded-[inherit] pointer-events-none", className)}
      style={
        {
          "--border-width": `${borderWidth}px`,
          "--duration": `${duration}s`,
          "--shine-color": Array.isArray(shineColor) 
            ? shineColor.join(", ") 
            : shineColor,
          background: `linear-gradient(var(--angle, 0deg), transparent 40%, 
                       ${Array.isArray(shineColor) ? shineColor[0] : shineColor}, 
                       transparent 60%) border-box`,
          animation: `shine var(--duration) linear infinite`,
          WebkitMask: `linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)`,
          WebkitMaskComposite: "destination-out",
          maskComposite: "exclude",
          padding: "var(--border-width)",
        } as React.CSSProperties
      }
    />
  );
}

- Add the keyframe animation to your global CSS (index.css or globals.css):
  @keyframes shine {
    from { --angle: 0deg; }
    to { --angle: 360deg; }
  }
  @property --angle {
    syntax: "<angle>";
    initial-value: 0deg;
    inherits: false;
  }

- On the homepage blue card, add position-relative and overflow-hidden, 
  then place <ShineBorder shineColor={["#60A5FA", "#3B82F6", "#93C5FD"]} /> 
  as the first child inside the card (use blue tones to match the Easecare brand)

---

SUMMARY OF ALL FILES TO CREATE OR MODIFY:
1. src/components/ui/smooth-cursor.tsx — new SmoothCursor component
2. src/components/ui/shine-border.tsx — new ShineBorder component  
3. src/app/App.tsx or Layout — add <SmoothCursor /> globally
4. src/index.css or globals.css — add shine keyframes + cursor:none on desktop
5. Homepage component — fix CTA banner responsive width
6. Homepage component — fix "What Do You Need?" section responsive grid
7. Homepage component — add modal (desktop) and bottom sheet (mobile) for service categories
8. Homepage component — add <ShineBorder /> to the blue card

Make all these changes now. Ensure nothing is hardcoded in fixed pixel widths. 
Use Tailwind CSS utility classes for all responsive behavior. 
Use framer-motion (already installed as "motion" package) for all animations.