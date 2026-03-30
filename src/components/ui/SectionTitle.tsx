interface SectionTitleProps {
  title: string;
  accentWord?: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionTitle({
  title,
  accentWord,
  subtitle,
  centered = true,
  className = "",
}: SectionTitleProps) {
  const alignment = centered ? "text-center" : "text-left";

  const renderedTitle = accentWord
    ? title.replace(
        accentWord,
        `<span class="text-accent-title">${accentWord}</span>`
      )
    : title;

  return (
    <div className={`space-y-3 ${alignment} ${className}`}>
      <h2
        className="text-glass font-serif text-3xl md:text-4xl font-bold tracking-tight text-[#1E293B] [letter-spacing:0.02em]"
        dangerouslySetInnerHTML={{ __html: renderedTitle }}
      />
      {subtitle && (
        <p className="text-glass-subtle text-base md:text-lg text-[#1E293B]/85 max-w-2xl mx-auto leading-relaxed tracking-wide">
          {subtitle}
        </p>
      )}
    </div>
  );
}
