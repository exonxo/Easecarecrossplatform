/**
 * Services - Full-page listing of all available service categories.
 * Renders QuickCategories grid in a standalone page with back navigation.
 */
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { QuickCategories } from "../home/QuickCategories";

export function Services() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f6f8fc] md:bg-[#F0F7FA]">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-[#f1f5f9]">
        <div className="max-w-[1180px] mx-auto px-4 md:px-8 flex items-center gap-3 h-14 md:h-16">
          <button
            onClick={() => navigate(-1)}
            className="size-9 rounded-full bg-[#f1f5f9] flex items-center justify-center cursor-pointer hover:bg-[#e2e8f0] transition-colors"
          >
            <ArrowLeft size={18} className="text-[#334155]" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1180px] mx-auto px-4 md:px-8 py-6 md:py-8">
        <QuickCategories />
      </div>
    </div>
  );
}