import { motion } from "motion/react";
import { Star, Gift } from "lucide-react";
import { AppStoreButton } from "../ui/app-store-button";
import { PlayStoreButton } from "../ui/play-store-button";
import { LogoFull } from "../shared/LogoFull";

// QR code generated dynamically — points to production URL
const QR_URL = "https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https%3A%2F%2Feasecarecrossplatform.vercel.app&margin=10&color=1975D2&bgcolor=FFFFFF";

export function AppDownloadCTA() {
  return (
    <section
      className="relative rounded-[24px] overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1975D2 0%, #1561b0 100%)",
      }}
    >
      {/* Decorative dot pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Decorative yellow glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 380, height: 380,
          top: -120, right: -100,
          background: "radial-gradient(circle, rgba(252,211,77,0.30) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />

      <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 md:gap-12 lg:gap-16 items-center px-6 pt-8 md:pt-10 pb-6 md:pb-0 md:pl-10 md:pr-24 lg:pr-32 md:min-h-[400px]">

        {/* LEFT — text + CTAs */}
        <motion.div
          initial={{ opacity: 0, transform: "translateX(-20px)" }}
          whileInView={{ opacity: 1, transform: "translateX(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4 md:py-8"
        >
          <LogoFull variant="horizontal-dark" size="small" className="self-start" />

          {/* Rating badge */}
          <div className="self-start flex items-center gap-2 bg-white/15 backdrop-blur-md px-3 py-1.5 rounded-full">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={12} fill="#FCD34D" color="#FCD34D" />
              ))}
            </div>
            <span className="font-['Inter',sans-serif] font-semibold text-[11px] text-white">
              4.8 · 12,000+ reviews
            </span>
          </div>

          <h2 className="font-['Lexend',sans-serif] font-extrabold text-white text-[26px] md:text-[36px] leading-[1.15] tracking-[-0.5px]">
            Care at your fingertips.<br />
            <span className="text-[#FCD34D]">Download our app.</span>
          </h2>

          <p className="font-['Inter',sans-serif] text-white/85 text-[13px] md:text-[15px] leading-[22px] max-w-[460px]">
            Book caregivers, track service, chat with your provider, and pay securely — all from one app.
          </p>

          {/* ⭐ INCENTIVE RIBBON */}
          <motion.div
            initial={{ opacity: 0, transform: "translateY(6px)" }}
            whileInView={{ opacity: 1, transform: "translateY(0px)" }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="self-start flex items-center gap-2.5 bg-[#FCD34D] text-[#1f2937] px-4 py-2 rounded-full shadow-[0_4px_14px_rgba(252,211,77,0.45)]"
          >
            <Gift size={16} strokeWidth={2.5} className="text-[#B45309]" />
            <span className="font-['Lexend',sans-serif] font-bold text-[12px] md:text-[13px]">
              Get ₹500 OFF your first booking on the app
            </span>
          </motion.div>

          {/* App store badges + QR code */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 md:gap-5 mt-1">
            <div className="flex flex-col sm:flex-row gap-3">
              <AppStoreButton />
              <PlayStoreButton />
            </div>

            {/* QR code — desktop only */}
            <div className="hidden md:flex items-center gap-3 pl-5 border-l border-white/20">
              <div className="bg-white p-2 rounded-[10px] shadow-md">
                <img src={QR_URL} alt="Scan to download EaseCare" className="w-[64px] h-[64px] block" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-['Inter',sans-serif] text-[10px] text-white/70 uppercase tracking-wide">
                  Scan to install
                </span>
                <span className="font-['Lexend',sans-serif] font-semibold text-[13px] text-white">
                  Point your camera
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT — phone, aligned toward the center-left of the right column */}
        <motion.div
          initial={{ opacity: 0, transform: "translateY(20px)" }}
          whileInView={{ opacity: 1, transform: "translateY(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative flex justify-center md:justify-start items-end h-full"
        >
          <img
            src="/Apppreview.webp"
            alt="EaseCare mobile app preview"
            className="w-[160px] md:w-[200px] lg:w-[230px] h-auto object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.25)] -mb-px"
            draggable={false}
          />
        </motion.div>
      </div>
    </section>
  );
}
