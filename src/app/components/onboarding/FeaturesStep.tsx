/**
 * FeaturesStep (FeaturesCarouselScreen) - Step 3 of onboarding.
 * Horizontal card carousel (mobile) / 4-col grid (desktop) showcasing
 * four key app features with SVG illustrations.
 * Uses snap-scrolling on mobile with dot indicators.
 */
import {
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
import { EasecareSmallLogo } from "./EasecareSmallLogo";
import svgPaths from "../../../imports/svg-5f52zizgk1";
import { PrimaryButton } from "../shared/PrimaryButton";

import {
  PostYourRequirementIllustration as FigmaPostIllustration,
  SmartPricingBidsIllustration,
  AadhaarVerifiedIllustration,
  PeaceOfMindIllustration,
} from "./FeatureIllustrations";

interface FeaturesCarouselScreenProps {
  onNext: () => void;
  onBack: () => void;
}

const features = [
  {
    title: "Post Your Requirement",
    description:
      "Describe your task in a few simple details. No long forms.",
    emoji: null,
  },
  {
    title: "Smart Pricing Bids",
    description:
      "Get transparent quotes from trusted providers.",
    emoji: "\u{1F4B0}",
  },
  {
    title: "Aadhaar & ID Verified",
    description:
      "Every helper is identity-checked before approval.",
    emoji: "\u{1F6E1}\u{FE0F}",
  },
  {
    title: "24/7 Peace of Mind",
    description: "24/7 Customer Support",
    emoji: "\u{1F550}",
  },
];

export function FeaturesCarouselScreen({
  onNext,
  onBack,
}: FeaturesCarouselScreenProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const cardWidth = 290 + 24;
    const newIndex = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(newIndex, features.length - 1));
  };

  const scrollToCard = useCallback((index: number) => {
    if (!scrollRef.current) return;
    const cardWidth = 290 + 24;
    scrollRef.current.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });
  }, []);

  const handleNextClick = () => {
    if (isMobile) {
      if (activeIndex < features.length - 1) {
        const nextIndex = activeIndex + 1;
        setActiveIndex(nextIndex);
        scrollToCard(nextIndex);
      } else {
        onNext();
      }
    } else {
      onNext();
    }
  };

  return (
    <div className="bg-white overflow-hidden size-full flex flex-col">
      {/* Header */}
      <div className="w-full">
        <div className="flex items-center justify-between px-4 pt-6 pb-2">
          <button
            onClick={onBack}
            className="flex items-center justify-center size-10 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <svg
              width="12"
              height="20"
              viewBox="0 0 11.775 20"
              fill="none"
            >
              <path d={svgPaths.p225a8cc0} fill="#0F172A" />
            </svg>
          </button>
          <EasecareSmallLogo />
          <div className="size-10" />
        </div>
      </div>

      {/* Heading */}
      <div className="px-6 md:px-16 w-full pb-3">
        <h1 className="font-['Lexend',sans-serif] font-bold text-[30px] leading-[37.5px] text-[#0f172a] tracking-[-0.75px]">
          Everything you need for worry-free care
        </h1>
      </div>

      {/* Cards - horizontal scroll on mobile, grid on desktop */}
      <div className="flex-1 w-full overflow-hidden">
        {/* Mobile: horizontal scroll */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex md:hidden gap-6 px-6 py-4 overflow-x-auto snap-x snap-mandatory h-full items-center"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-white flex flex-col items-center px-[17px] py-[33px] rounded-[24px] shrink-0 w-[290px] snap-center border border-[#f3f4f6] shadow-[0px_4px_20px_-2px_rgba(0,0,0,0.05)]"
            >
              <div className="flex items-center justify-center">
                {i === 0 && (
                  <FigmaPostIllustration size={200} />
                )}
                {i === 1 && (
                  <SmartPricingBidsIllustration size={200} />
                )}
                {i === 2 && (
                  <AadhaarVerifiedIllustration size={200} />
                )}
                {i === 3 && (
                  <PeaceOfMindIllustration size={200} />
                )}
              </div>
              <div className="w-full text-center mt-4 flex flex-col gap-4">
                <p className="font-['Lexend',sans-serif] font-bold text-[16px] text-[#111827] leading-[32px]">
                  {feature.title}
                </p>
                <p className="font-['Inter',sans-serif] font-medium text-[14px] text-[#6b7280]">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: grid of 4 */}
        <div className="hidden md:grid grid-cols-4 gap-6 px-16 py-8 items-stretch">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-white flex flex-col items-center px-4 py-6 rounded-[24px] border border-[#f3f4f6] shadow-[0px_4px_20px_-2px_rgba(0,0,0,0.05)]"
            >
              <div className="flex items-center justify-center mb-4">
                {i === 0 && (
                  <FigmaPostIllustration size={160} />
                )}
                {i === 1 && (
                  <SmartPricingBidsIllustration size={160} />
                )}
                {i === 2 && (
                  <AadhaarVerifiedIllustration size={160} />
                )}
                {i === 3 && (
                  <PeaceOfMindIllustration size={160} />
                )}
              </div>
              <div className="w-full text-center flex flex-col gap-4 flex-1">
                <p className="font-['Lexend',sans-serif] font-bold text-[16px] text-[#111827] leading-[32px]">
                  {feature.title}
                </p>
                <p className="font-['Inter',sans-serif] font-medium text-[14px] text-[#6b7280]">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="w-full flex flex-col items-center px-6 py-8">
        {/* Dots - mobile only */}
        <div className="flex md:hidden gap-2 items-center justify-center mb-6">
          {features.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all ${i === activeIndex ? "bg-[#1f2937] size-[10px]" : "bg-[#d1d5db] size-[8px]"}`}
            />
          ))}
        </div>

        {/* Next Button */}
        <PrimaryButton onClick={handleNextClick}>
          {isMobile && activeIndex < features.length - 1
            ? "Next"
            : "Get Started"}
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path d={svgPaths.p304eaa0} fill="white" />
          </svg>
        </PrimaryButton>
      </div>
    </div>
  );
}
