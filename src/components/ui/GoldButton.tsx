import type { ReactNode, ButtonHTMLAttributes } from "react";
import Link from "next/link";

type ButtonVariant = "solid" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface BaseProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  fullWidth?: boolean;
}

interface ButtonAsButton
  extends BaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> {
  href?: never;
}

interface ButtonAsLink extends BaseProps {
  href: string;
}

type GoldButtonProps = ButtonAsButton | ButtonAsLink;

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  solid:
    "bg-[#4A7856] text-white font-bold rounded-full shadow-lg shadow-[#4A7856]/20 hover:shadow-xl hover:shadow-[#4A7856]/25 hover:scale-[1.02] active:scale-95 transition-all duration-300",
  outline:
    "bg-transparent border-2 border-[#4A7856]/60 text-[#4A7856] font-bold rounded-full hover:bg-[#4A7856]/10 hover:border-[#4A7856] hover:shadow-lg hover:shadow-[#4A7856]/20 transition-all duration-300",
  ghost:
    "bg-transparent text-[#4A7856] font-bold rounded-full hover:bg-[#4A7856]/10 transition-all duration-300",
};

const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: "px-5 py-2 text-xs rounded-full",
  md: "px-6 py-2.5 text-sm rounded-full",
  lg: "px-10 py-4 text-base rounded-full",
};

export function GoldButton({
  children,
  variant = "solid",
  size = "md",
  className = "",
  fullWidth = false,
  ...rest
}: GoldButtonProps) {
  const baseClasses = `inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 cursor-pointer ${
    fullWidth ? "w-full" : ""
  } ${VARIANT_STYLES[variant]} ${SIZE_STYLES[size]} ${className}`;

  if ("href" in rest && rest.href) {
    return (
      <Link href={rest.href} className={baseClasses}>
        {children}
      </Link>
    );
  }

  const { href: _href, ...buttonProps } = rest as ButtonAsButton;
  void _href;

  return (
    <button className={baseClasses} {...buttonProps}>
      {children}
    </button>
  );
}
