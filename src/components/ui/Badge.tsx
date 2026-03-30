import type { ReactNode } from "react";

type BadgeVariant = "default" | "gold" | "live";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const VARIANT_STYLES: Record<BadgeVariant, string> = {
  default: "bg-brand-bg-green/60 text-[#2d3a2e]/90 border-brand-green/25",
  gold: "bg-brand-yellow/15 text-[#7a5a0f] border-brand-yellow/35",
  live: "bg-brand-pink/25 text-[#7a2d3a] border-brand-pink/50 font-semibold",
};

export function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border ${VARIANT_STYLES[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
