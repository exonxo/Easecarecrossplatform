import { cn } from "./utils";

interface ShineBorderProps {
  className?: string;
  shineColor?: string | string[];
  borderWidth?: number;
  duration?: number;
}

export function ShineBorder({
  className,
  shineColor = ["#A07CFE", "#FE8FB5", "#FFBE7B"],
  borderWidth = 1,
  duration = 14,
}: ShineBorderProps) {
  const colors = Array.isArray(shineColor) ? shineColor : [shineColor];
  return (
    <div
      className={cn("absolute inset-0 rounded-[inherit] pointer-events-none", className)}
      style={
        {
          "--border-width": `${borderWidth}px`,
          "--duration": `${duration}s`,
          background: `linear-gradient(var(--angle, 0deg), transparent 40%, ${colors[0]}, transparent 60%) border-box`,
          animation: `shine var(--duration) linear infinite`,
          WebkitMask: `linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)`,
          WebkitMaskComposite: "destination-out",
          maskComposite: "exclude",
          padding: "var(--border-width)",
        } as React.CSSProperties
      }
    />
  );
}
