/**
 * BrandPanel — Left-side branded panel on desktop onboarding.
 * Uses the dark-bg horizontal logo on a blue gradient background.
 * Hidden on mobile (md:flex).
 */
import { LogoFull } from "../shared/LogoFull";

export function BrandPanel() {
  return (
    <div className="bg-[#1e5ab3] flex-1 relative flex-col items-center justify-center min-h-[280px] md:min-h-0 md:h-full hidden md:flex overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute bg-[#60a5fa] blur-[32px] left-[-16px] mix-blend-multiply opacity-30 rounded-full size-[384px] top-0 pointer-events-none" />
      <div className="absolute bg-[#93c5fd] blur-[32px] bottom-0 mix-blend-multiply opacity-30 right-[16px] rounded-full size-[384px] pointer-events-none" />

      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Bottom fade */}
      <div className="absolute bg-gradient-to-t bottom-0 from-[rgba(0,0,0,0.15)] h-[96px] left-0 right-0 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="flex flex-col gap-6 items-center px-12 py-16 relative z-10 text-center max-w-[500px]">
        <LogoFull variant="horizontal-dark" size="large" />

        <p className="font-['Lexend',sans-serif] font-semibold text-white/95 text-[26px] leading-[1.25] tracking-[-0.4px] mt-6">
          Care that feels like family
        </p>
        <p className="font-['Inter',sans-serif] text-white/75 text-[14px] leading-[22px]">
          Verified caregivers, fair pricing, real reviews. <br />
          We're with you, every step of the way.
        </p>
      </div>
    </div>
  );
}
