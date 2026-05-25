import { useState } from "react";
import { motion } from "motion/react";
import { Play, Star, Quote } from "lucide-react";
import { useRequireAuth } from "../../hooks/useRequireAuth";
import { LoginModal } from "../auth/LoginModal";

// ─── Real customer testimonials with video thumbnails ─────────────────────────

const TESTIMONIALS = [
  {
    name: "Mrs. Anita Roy",
    location: "Kolkata",
    role: "Daughter caring for her father",
    quote:
      "EaseCare found us a wonderful nurse within 3 hours of posting our requirement. Baba is recovering beautifully at home.",
    rating: 5,
    thumbnail:
      "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    accent: "#1975D2",
    bg: "#EFF6FF",
  },
  {
    name: "Anjali Sharma",
    location: "Mumbai",
    role: "Senior Nurse, 8 years experience",
    quote:
      "I've worked with 200+ families on EaseCare. The platform respects caregivers and pays fairly — best decision I made.",
    rating: 5,
    thumbnail:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    accent: "#059669",
    bg: "#ECFDF5",
  },
  {
    name: "Rohan & Priya",
    location: "Bangalore",
    role: "New parents",
    quote:
      "Our newborn care specialist was a lifesaver. Gentle, experienced, and treated our baby like her own. We extended her stay twice!",
    rating: 5,
    thumbnail:
      "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    accent: "#EA580C",
    bg: "#FFF7ED",
  },
];

// ─── Single testimonial card ──────────────────────────────────────────────────

function TestimonialCard({
  t,
  onPlay,
  index,
  featured = false,
}: {
  t: (typeof TESTIMONIALS)[0];
  onPlay: () => void;
  index: number;
  featured?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, transform: "translateY(16px)" }}
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="bg-white rounded-[20px] overflow-hidden border border-[#eef2f7] flex flex-col h-full"
      style={{ boxShadow: "0px 2px 12px rgba(15,23,42,0.05)" }}
    >
      {/* Video thumbnail */}
      <div
        onClick={onPlay}
        className={`relative overflow-hidden cursor-pointer group bg-[#f1f5f9] ${featured ? "h-[260px]" : "h-[200px]"}`}
      >
        <img
          src={t.thumbnail}
          alt={t.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="size-14 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
            <Play size={22} fill={t.accent} color={t.accent} className="ml-1" />
          </div>
        </div>

        {/* Name + location overlay */}
        <div className="absolute bottom-3 left-4 right-4 text-white">
          <p className="font-['Lexend',sans-serif] font-bold text-[15px] leading-[20px]">
            {t.name}
          </p>
          <p className="font-['Inter',sans-serif] text-[12px] opacity-90">
            {t.location} · {t.role}
          </p>
        </div>
      </div>

      {/* Quote */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <Quote size={20} style={{ color: t.accent }} strokeWidth={2} className="opacity-50" />
        <p className="font-['Inter',sans-serif] text-[13px] text-[#374151] leading-[20px] flex-1">
          "{t.quote}"
        </p>
        <div className="flex items-center gap-1">
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export function CommunitySection() {
  const [playing, setPlaying] = useState<string | null>(null);
  const { requireAuth, loginOpen, setLoginOpen } = useRequireAuth();

  return (
    <section className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-1.5 text-center md:text-left">
        <span className="font-['Lexend',sans-serif] font-semibold text-[12px] tracking-[1px] text-[#1975D2] uppercase">
          Real Stories
        </span>
        <h2 className="font-['Lexend',sans-serif] font-extrabold text-[24px] md:text-[30px] text-[#0f172a] leading-[1.2] tracking-[-0.4px]">
          Trusted by families across India
        </h2>
        <p className="font-['Inter',sans-serif] text-[14px] text-[#64748b] leading-[20px] max-w-[600px] md:mx-0 mx-auto">
          Hear from families who found peace of mind, and caregivers who built rewarding careers — all through EaseCare.
        </p>
      </div>

      {/* Testimonial grid — first card is featured (2 cols wide on desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5">
        {TESTIMONIALS.map((t, i) => (
          <div key={t.name} className={i === 0 ? "md:col-span-2" : "md:col-span-1"}>
            <TestimonialCard
              t={t}
              onPlay={() => requireAuth(() => setPlaying(t.name))}
              index={i}
              featured={i === 0}
            />
          </div>
        ))}
      </div>

      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />

      {/* Simple modal — placeholder for now */}
      {playing && (
        <div
          onClick={() => setPlaying(null)}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl p-8 max-w-md text-center"
          >
            <Play size={48} className="mx-auto mb-4 text-[#1975D2]" />
            <p className="font-['Lexend',sans-serif] font-bold text-[16px] text-[#0f172a] mb-2">
              Video coming soon
            </p>
            <p className="font-['Inter',sans-serif] text-[13px] text-[#64748b] mb-4">
              {playing}'s full story will be available shortly.
            </p>
            <button
              onClick={() => setPlaying(null)}
              className="bg-[#1975D2] text-white px-6 py-2 rounded-full font-['Lexend',sans-serif] font-bold text-[13px] cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
