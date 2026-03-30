import type { ReactNode } from "react";

type GlassVariant = "default" | "strong" | "interactive";

interface GlassCardProps {
  children: ReactNode;
  variant?: GlassVariant;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
  as?: "div" | "article" | "section";
}

const VARIANT_STYLES: Record<GlassVariant, string> = {
  default: "glass",
  strong: "glass-strong",
  interactive: "glass-interactive",
};

const PADDING_STYLES: Record<NonNullable<GlassCardProps["padding"]>, string> = {
  none: "",
  sm: "p-4 md:p-4",
  md: "p-4 md:p-6",
  lg: "p-5 md:p-8",
};

export function GlassCard({
  children,
  variant = "default",
  className = "",
  padding = "md",
  as: Tag = "div",
}: GlassCardProps) {
  return (
    <Tag
      className={`rounded-2xl ${VARIANT_STYLES[variant]} ${PADDING_STYLES[padding]} ${className}`}
    >
      {children}
    </Tag>
  );
}
