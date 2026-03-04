import { useLocation, useNavigate } from "react-router";
import svgPaths from "../../../imports/svg-zdwmi91rdf";

const navItems = [
  { id: "/", label: "Home", path: svgPaths.p12a32500, viewBox: "0 0 16 18", w: 16, h: 18 },
  { id: "/bookings", label: "Bookings", path: svgPaths.p3c95900, viewBox: "0 0 18 20", w: 18, h: 20 },
  { id: "/profile", label: "Profile", path: svgPaths.p85bff00, viewBox: "0 0 16 16", w: 16, h: 16 },
];

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30">
      {/* Floating pill container */}
      <div className="mx-4 mb-4" style={{ paddingBottom: 'var(--safe-area-bottom, 0px)' }}>
        <div className="bg-white rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.08),0_1px_4px_rgba(0,0,0,0.04)] border border-[#f1f5f9]">
          <div className="flex items-center justify-center px-2 py-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  className={`flex flex-col items-center gap-1 flex-1 py-2.5 px-4 rounded-[16px] cursor-pointer transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-br from-[rgba(25,117,210,0.12)] via-[rgba(25,117,210,0.06)] to-transparent"
                      : ""
                  }`}
                >
                  <svg width={item.w} height={item.h} viewBox={item.viewBox} fill="none">
                    <path d={item.path} fill={isActive ? "#1975D2" : "#94a3b8"} />
                  </svg>
                  <span
                    className={`font-['Lexend',sans-serif] text-[11px] leading-[16px] transition-colors duration-300 ${
                      isActive
                        ? "font-semibold text-[#1975D2]"
                        : "font-medium text-[#94a3b8]"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}