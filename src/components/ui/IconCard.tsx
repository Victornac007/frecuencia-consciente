import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

interface IconCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
  action?: ReactNode;
  className?: string;
}

export function IconCard({
  icon: Icon,
  title,
  description,
  href,
  action,
  className = "",
}: IconCardProps) {
  const content = (
    <>
      <div className="icon-bounce w-12 h-12 rounded-xl bg-brand-bg-green border border-brand-green/20 flex items-center justify-center mb-4 transition-colors group-hover:bg-brand-green/15 group-hover:border-brand-green/30">
        <Icon className="w-6 h-6 text-brand-green" />
      </div>
      <h3 className="text-lg font-semibold text-[#2d3a2e] mb-2">{title}</h3>
      <p className="text-sm text-[#2d3a2e]/88 leading-relaxed">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </>
  );

  const baseClasses = `group glass-interactive rounded-2xl p-6 ${className}`;

  if (href) {
    return (
      <Link href={href} className={`block ${baseClasses}`}>
        {content}
      </Link>
    );
  }

  return <div className={baseClasses}>{content}</div>;
}
