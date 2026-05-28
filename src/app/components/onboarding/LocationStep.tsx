/**
 * LocationStep (LocationScreen) - Step 5 (final) of onboarding.
 * Location selection via manual text input or browser geolocation.
 * Uses Nominatim (free, no API key) for reverse geocoding.
 */
import svgPaths from "../../../imports/svg-ll9gt99mzw";
import { useState } from "react";
import { EasecareSmallLogo } from "./EasecareSmallLogo";
import { PrimaryButton } from "../shared/PrimaryButton";

interface LocationScreenProps {
  onNext: (location: string) => void | Promise<void>;
  onBack: () => void;
}

// Reverse geocode using Nominatim (free, no API key needed)
async function reverseGeocode(
  lat: number,
  lng: number
): Promise<{ address: string }> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    );
    const data = await response.json();
    const addr = data.address;
    const parts = [
      addr.suburb || addr.neighbourhood,
      addr.city || addr.town || addr.village,
    ].filter(Boolean);
    return { address: parts.join(", ") || data.display_name || "Unknown location" };
  } catch {
    return { address: "Salt Lake, Sector V, Kolkata" };
  }
}

export function LocationScreen({ onNext, onBack }: LocationScreenProps) {
  const [location, setLocation] = useState("");
  const [usingCurrentLocation, setUsingCurrentLocation] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleUseCurrentLocation = () => {
    setUsingCurrentLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          reverseGeocode(
            position.coords.latitude,
            position.coords.longitude
          ).then((res) => {
            setLocation(res.address);
            setUsingCurrentLocation(false);
          });
        },
        () => {
          setLocation("Salt Lake, Sector V, Kolkata");
          setUsingCurrentLocation(false);
        }
      );
    } else {
      setLocation("Salt Lake, Sector V, Kolkata");
      setUsingCurrentLocation(false);
    }
  };

  const handleNext = async () => {
    if (!location.trim()) return;
    setSaving(true);
    setError("");
    try {
      await onNext(location.trim());
      // On success the flow navigates home (this screen unmounts).
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't complete registration. Please try again.");
      setSaving(false);
    }
  };

  return (
    <div className="bg-white overflow-hidden size-full flex flex-col">
      {/* Header */}
      <div className="w-full">
        <div className="flex items-center justify-between px-4 pt-6 pb-2">
          <button onClick={onBack} className="flex items-center justify-center size-10 rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
            <svg width="12" height="20" viewBox="0 0 11.775 20" fill="none">
              <path d={svgPaths.p225a8cc0} fill="#0F172A" />
            </svg>
          </button>
          <EasecareSmallLogo />
          <div className="size-10" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-between">
        <div className="w-full max-w-[538px] px-6 md:px-16 pt-6">
          {/* Title */}
          <div className="pb-3">
            <h1 className="font-['Lexend',sans-serif] font-bold text-[30px] leading-[37.5px] text-[#0f172a] tracking-[-0.75px]">
              Where do you need care?
            </h1>
          </div>
          <div className="pb-8">
            <p className="font-['Lexend',sans-serif] text-[16px] text-[#64748b] leading-[26px]">
              We'll show you verified agencies available in your specific area.
            </p>
          </div>

          {/* Location Inputs */}
          <div className="flex flex-col gap-6 mt-4">
            {/* Use Current Location Button */}
            <button onClick={handleUseCurrentLocation}
              className="w-full bg-[rgba(25,117,210,0.05)] border-2 border-[rgba(25,117,210,0.2)] rounded-[24px] py-[18px] px-2 flex items-center justify-center gap-3 cursor-pointer hover:bg-[rgba(25,117,210,0.1)] transition-all active:scale-[0.98]">
              {usingCurrentLocation ? (
                <div className="animate-spin size-[22px] border-2 border-[#1975d2] border-t-transparent rounded-full" />
              ) : (
                <svg width="22" height="22" viewBox="0 0 21.9 21.9" fill="none">
                  <path d={svgPaths.p3488f2a0} fill="#1975D2" />
                </svg>
              )}
              <span className="font-['Lexend',sans-serif] font-semibold text-[16px] text-[#1975d2]">
                {usingCurrentLocation ? "Getting Location..." : "Use Current Location"}
              </span>
            </button>

            {/* Search Input */}
            <div className="relative">
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g., Salt Lake, Sector V"
                className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-[24px] pl-[45px] pr-4 py-[17px] font-['Lexend',sans-serif] text-[16px] text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:border-[#1975d2] focus:ring-2 focus:ring-[rgba(25,117,210,0.2)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] transition-all" />
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path d={svgPaths.p2dbaedc0} fill="#94A3B8" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="w-full flex flex-col items-center px-6 py-8">
          {error && (
            <div className="w-full bg-[#fef2f2] border border-[#fecaca] rounded-[12px] px-4 py-3 mb-2">
              <p className="font-['Lexend',sans-serif] text-[13px] text-[#dc2626] leading-[18px]">{error}</p>
            </div>
          )}
          <div className="w-full pt-6">
            <PrimaryButton
              onClick={handleNext}
              disabled={!location.trim() || saving}
            >
              Next
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d={svgPaths.p304eaa0} fill="white" />
              </svg>
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}
