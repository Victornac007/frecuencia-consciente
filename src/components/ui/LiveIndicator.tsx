type IndicatorSize = "sm" | "md" | "lg";

interface LiveIndicatorProps {
  size?: IndicatorSize;
  className?: string;
}

const SIZE_STYLES: Record<IndicatorSize, string> = {
  sm: "h-2 w-2",
  md: "h-2.5 w-2.5",
  lg: "h-3 w-3",
};

export function LiveIndicator({
  size = "md",
  className = "",
}: LiveIndicatorProps) {
  return (
    <span className={`relative flex ${SIZE_STYLES[size]} ${className}`}>
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75" />
      <span
        className={`relative inline-flex rounded-full ${SIZE_STYLES[size]} bg-brand-green`}
      />
    </span>
  );
}
