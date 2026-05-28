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
 * Auth integration:
 *   - After OTP verification, calls auth.login(phone).
 *   - If phone is 8670803180, onboarding is auto-complete → navigate to "/".
 *   - Otherwise, continues through Features → Registration → Location.
 *   - On final step, calls auth.completeOnboarding() then navigates to "/".
 *
 * Uses AnimatePresence from Motion for slide transitions between screens.
 */
import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../../context/AuthContext";
import { PhoneEntryScreen } from "./PhoneStep";
import { OtpVerificationScreen } from "./OtpStep";
import { FeaturesCarouselScreen } from "./FeaturesStep";
import { RegistrationScreen } from "./RegistrationStep";
import { PolicyAcceptanceStep } from "./PolicyAcceptanceStep";
import { LocationScreen } from "./LocationStep";

type Screen = "phone" | "otp" | "features" | "registration" | "policy" | "location";

interface RegData {
  name: string;
  email: string;
  relationship: string;
}

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
  const [regData, setRegData] = useState<RegData>({ name: "", email: "", relationship: "" });
  const [policyVersion, setPolicyVersion] = useState("");
  const [direction, setDirection] = useState(1);
  const navigate = useNavigate();
  const auth = useAuth();

  // If user is already fully authenticated, redirect away
  useEffect(() => {
    if (!auth.loading && auth.user && auth.profile?.onboardingComplete) {
      navigate("/", { replace: true });
    }
  }, [auth.loading, auth.user, auth.profile, navigate]);

  const goTo = useCallback((next: Screen, dir: number = 1) => {
    setDirection(dir);
    setScreen(next);
  }, []);

  /** Called after OTP verification succeeds (throws on bad code → step shows error). */
  const handleOtpVerify = useCallback(
    async (code: string) => {
      const { onboardingComplete } = await auth.verifyOtp(code, phone);
      if (onboardingComplete) {
        // Returning seeker — straight to home.
        navigate("/", { replace: true });
      } else {
        // New user — continue onboarding.
        goTo("features");
      }
    },
    [phone, auth, navigate, goTo],
  );

  /** Called when the final location step completes — registers the seeker. */
  const handleComplete = useCallback(
    async (location: string) => {
      await auth.completeOnboarding({ ...regData, location, policyVersion });
      navigate("/", { replace: true });
    },
    [auth, navigate, regData, policyVersion],
  );

  const renderScreen = () => {
    switch (screen) {
      case "phone":
        return (
          <PhoneEntryScreen
            onNext={async (p) => {
              await auth.sendOtp(p);
              setPhone(p);
              goTo("otp");
            }}
          />
        );
      case "otp":
        return (
          <OtpVerificationScreen
            phone={phone}
            onVerify={handleOtpVerify}
            onBack={() => goTo("phone", -1)}
            onChangeNumber={() => goTo("phone", -1)}
            onResend={() => auth.sendOtp(phone)}
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
            onNext={(data) => {
              setRegData(data);
              goTo("policy");
            }}
            onBack={() => goTo("features", -1)}
          />
        );
      case "policy":
        return (
          <PolicyAcceptanceStep
            onAccept={(version) => {
              setPolicyVersion(version);
              goTo("location");
            }}
            onBack={() => goTo("registration", -1)}
          />
        );
      case "location":
        return (
          <LocationScreen
            onNext={handleComplete}
            onBack={() => goTo("policy", -1)}
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
          transition={{ type: "tween", duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0 will-change-transform"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
