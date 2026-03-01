import { Play } from "lucide-react";
import svgPaths from "../../../imports/svg-zdwmi91rdf";
import imgCustomerStory from "figma:asset/2b7369bd3efd706096fa34401ac963cc29422d3c.png";
import imgNurseIntroduction from "figma:asset/606d975afaca5c38fb3843efb897312beddc0221.png";
import imgHappyFamily from "figma:asset/6e1f25e1d61372a50e60635efec0982f5bb79128.png";
import imgWorkerStory from "figma:asset/6bf9ab48edefe5f16d001dd3dd2587f7ddbd64e5.png";

const testimonials = [
  { image: imgCustomerStory, title: "Mrs. Roy's\nExperience" },
  { image: imgNurseIntroduction, title: "Meet Nurse Anjali" },
  { image: imgHappyFamily, title: "Best Care for Dad" },
  { image: imgWorkerStory, title: "Rohan's Journey" },
];

// Star SVG path from Figma
const starFilled = svgPaths.p12ee1900;
const starFilled2 = svgPaths.p2c75d600;

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <div className="h-[12.667px] w-[13.333px] relative shrink-0">
      <svg className="absolute block size-full" fill="none" viewBox="0 0 13.3333 12.6667">
        {filled ? (
          <>
            <path d={starFilled} fill="#FB923C" />
            <path d={starFilled2} fill="#FB923C" />
          </>
        ) : (
          <path d={svgPaths.pd81bd00} fill="#FB923C" />
        )}
      </svg>
    </div>
  );
}

function TestimonialCard({ t }: { t: (typeof testimonials)[0] }) {
  return (
    <div className="relative h-[176px] md:h-[220px] w-[112px] md:w-auto rounded-[24px] overflow-hidden group cursor-pointer shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0">
      <img
        src={t.image}
        alt={t.title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-[rgba(15,23,42,0.2)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.8)] via-transparent to-transparent" />

      {/* Play Button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="backdrop-blur-[2px] bg-[rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.3)] size-8 md:size-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
          <svg width="9.167" height="11.667" viewBox="0 0 9.16667 11.6667" fill="none">
            <path d={svgPaths.p3edf7c80} fill="white" />
          </svg>
        </div>
      </div>

      {/* Label */}
      <div className="absolute bottom-2 md:bottom-3 left-0 right-0 text-center px-2">
        <p className="font-['Lexend',sans-serif] font-medium text-[10px] md:text-[12px] text-white leading-[12.5px] whitespace-pre-line">
          {t.title}
        </p>
      </div>
    </div>
  );
}

export function CommunitySection() {
  return (
    null
  );
}
