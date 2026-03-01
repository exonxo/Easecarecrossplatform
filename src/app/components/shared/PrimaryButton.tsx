import type { ButtonHTMLAttributes, ReactNode } from "react";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  /** Override the background color (defaults to #1975D2) */
  color?: string;
  /** Compact size — smaller padding for inline use */
  compact?: boolean;
  /** Full width (default true) */
  fullWidth?: boolean;
}

/**
 * Unified primary CTA button for the entire EasyCare UI.
 *
 * Style: rounded-[16px], Inter semibold, active:scale-[0.98], colored shadow
 * glow, disabled opacity + cursor states.
 */
export function PrimaryButton({
  children,
  color = "#1975D2",
  compact = false,
  fullWidth = true,
  disabled,
  className = "",
  style,
  ...rest
}: PrimaryButtonProps) {
  const shadow = disabled
    ? "none"
    : `0px 10px 15px -3px ${color}4D, 0px 4px 6px -4px ${color}4D`;

  return (
    <button
      disabled={disabled}
      className={`${fullWidth ? "w-full" : ""} ${
        compact ? "px-6 py-2.5 text-[14px]" : "py-4 text-[16px]"
      } rounded-[16px] font-['Inter',sans-serif] font-semibold text-white text-center cursor-pointer transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center gap-2 ${className}`}
      style={{
        backgroundColor: color,
        boxShadow: shadow,
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
