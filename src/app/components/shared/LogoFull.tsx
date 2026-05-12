/**
 * EaseCare Logo component
 * =======================
 * Three variants served from the /public folder:
 *
 *  - `horizontal`  → full logo + wordmark (use on LIGHT backgrounds — default)
 *  - `horizontal-dark` → full logo + wordmark (use on DARK / colored backgrounds)
 *  - `mark`        → logomark only (icon), use for FAB, favicons, tight spaces
 *
 * Common usage:
 *   <LogoFull />                                  // light bg, default size
 *   <LogoFull variant="horizontal-dark" />        // dark/blue bg
 *   <LogoFull variant="mark" className="size-9" /> // square icon only
 */

type Variant = "horizontal" | "horizontal-dark" | "mark";

const SRC: Record<Variant, string> = {
  "horizontal":       "/easecarelogo-fulllogo-horizontal.svg",
  "horizontal-dark":  "/easecarelogo-fulllogo-horizontal-darkbg.svg",
  "mark":             "/easecarelogo-logomark.svg",
};

export function LogoFull({
  variant = "horizontal",
  size = "default",
  className = "",
}: {
  variant?: Variant;
  size?: "default" | "small" | "large";
  className?: string;
}) {
  const heightClass =
    variant === "mark"
      ? size === "small" ? "h-8" : size === "large" ? "h-12" : "h-10"
      : size === "small" ? "h-7" : size === "large" ? "h-12" : "h-9";

  return (
    <img
      src={SRC[variant]}
      alt="EaseCare — Care that feels like family"
      className={`${heightClass} w-auto select-none ${className}`}
      draggable={false}
    />
  );
}
