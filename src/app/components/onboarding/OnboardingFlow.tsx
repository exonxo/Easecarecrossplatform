/**
 * OnboardingFlow - Root component for the 5-screen onboarding/login flow.
 *
 * Screens (in order):
 *   1. PhoneStep     - Phone number entry with +91 prefix
 *   2. OtpStep       - 6-digit OTP verification
 *   3. FeaturesStep  - Feature highlights carousel
 *   4. RegistrationStep - Name, email, relationship form
 *   5. LocationStep  - Location selection with geolocation
 *
 * Uses AnimatePresence from Motion for slide transitions between screens.
 * On completion, navigates to "/" (dashboard).
 */
import { useState, useCallback } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { PhoneEntryScreen } from "./PhoneStep";
import { OtpVerificationScreen } from "./OtpStep";
import { FeaturesCarouselScreen } from "./FeaturesStep";
import { RegistrationScreen } from "./RegistrationStep";
import { LocationScreen } from "./LocationStep";

type Screen = "phone" | "otp" | "features" | "registration" | "location";

const variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({
    x: dir > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

export function OnboardingFlow() {
  const [screen, setScreen] = useState<Screen>("phone");
  const [phone, setPhone] = useState("");
  const [direction, setDirection] = useState(1);
  const navigate = useNavigate();

  const goTo = useCallback((next: Screen, dir: number = 1) => {
    setDirection(dir);
    setScreen(next);
  }, []);

  const handleComplete = () => {
    navigate("/");
  };

  const renderScreen = () => {
    switch (screen) {
      case "phone":
        return (
          <PhoneEntryScreen
            onNext={(p) => {
              setPhone(p);
              goTo("otp");
            }}
          />
        );
      case "otp":
        return (
          <OtpVerificationScreen
            phone={phone}
            onVerify={() => goTo("features")}
            onBack={() => goTo("phone", -1)}
            onChangeNumber={() => goTo("phone", -1)}
          />
        );
      case "features":
        return (
          <FeaturesCarouselScreen
            onNext={() => goTo("registration")}
            onBack={() => goTo("otp", -1)}
          />
        );
      case "registration":
        return (
          <RegistrationScreen
            onNext={() => goTo("location")}
            onBack={() => goTo("features", -1)}
          />
        );
      case "location":
        return (
          <LocationScreen
            onNext={handleComplete}
            onBack={() => goTo("registration", -1)}
          />
        );
    }
  };

  return (
    <div className="w-full h-dvh relative overflow-hidden">
      <AnimatePresence mode="wait" custom={direction} initial={false}>
        <motion.div
          key={screen}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "tween", duration: 0.35, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
