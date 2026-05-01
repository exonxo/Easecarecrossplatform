import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Home, CalendarCheck, User, Search, MapPin, ChevronDown } from "lucide-react";
import { LogoFull } from "../shared/LogoFull";
import { useAuth } from "../../context/AuthContext";
import { LoginModal } from "../auth/LoginModal";
import { SearchModal } from "./SearchModal";
import { LocationModal } from "./LocationModal";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: CalendarCheck, label: "Bookings", path: "/bookings" },
  { icon: User, label: "Profile", path: "/profile" },
];

export function TopNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);

  const isLoggedIn = !!(user && profile?.onboardingComplete);

  return (
    <>
      <header className="sticky top-0 z-30 w-full bg-white border-b border-[#f1f5f9] shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
        <div className="h-[64px] flex items-center justify-between px-4 md:px-8">
          {/* Logo + Nav tabs grouped on the left */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/")}
              className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
            >
              <LogoFull size="small" />
            </button>

            {/* Divider */}
            <div className="hidden md:block w-px h-5 bg-[#e2e8f0] mx-2" />

            {/* Nav tabs — desktop only */}
            <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-[10px] transition-all cursor-pointer font-['Lexend',sans-serif] text-[14px] ${
                    isActive
                      ? "bg-[#EBF3FC] text-[#1975D2] font-bold"
                      : "text-[#64748b] hover:bg-[#f8fafc] hover:text-[#334155] font-medium"
                  }`}
                >
                  <item.icon
                    size={17}
                    strokeWidth={isActive ? 2.2 : 1.8}
                  />
                  {item.label}
                </button>
              );
            })}
          </nav>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {isLoggedIn ? (
              <>
                {/* Location selector */}
                <button
                  onClick={() => setLocationOpen(true)}
                  className="flex items-center gap-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-[10px] px-3 py-2 hover:bg-[#f0f7fa] hover:border-[#c7d9f0] transition-all cursor-pointer group"
                >
                  <div className="size-6 rounded-full bg-[#EBF3FC] flex items-center justify-center shrink-0">
                    <MapPin size={13} className="text-[#1975D2]" strokeWidth={2.2} />
                  </div>
                  <div className="hidden md:flex flex-col items-start leading-none">
                    <span className="font-['Inter',sans-serif] text-[10px] text-[#94a3b8] font-medium uppercase tracking-wide">
                      Location
                    </span>
                    <span className="font-['Lexend',sans-serif] font-semibold text-[13px] text-[#1e293b] max-w-[120px] truncate">
                      Salt Lake, Kolkata
                    </span>
                  </div>
                  <ChevronDown size={13} className="text-[#94a3b8] group-hover:text-[#1975D2] transition-colors hidden md:block" />
                </button>

                {/* Search */}
                <button
                  onClick={() => setSearchOpen(true)}
                  className="flex items-center gap-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-[10px] px-3 py-2 text-[13px] text-[#94a3b8] font-['Lexend',sans-serif] hover:border-[#1975D2] hover:text-[#1975D2] transition-all cursor-pointer"
                >
                  <Search size={15} />
                  <span className="hidden md:inline">Search services...</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setLoginOpen(true)}
                className="bg-[#1975D2] text-white font-['Lexend',sans-serif] font-semibold text-[14px] px-5 py-2 rounded-[10px] hover:bg-[#1565b8] active:scale-[0.98] transition-all cursor-pointer"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </header>

      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
      <LocationModal open={locationOpen} onOpenChange={setLocationOpen} />
    </>
  );
}
