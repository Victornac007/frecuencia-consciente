"use client";

interface AudioWaveProps {
  barCount?: number;
  isPlaying?: boolean;
  className?: string;
  color?: "gold" | "white";
}

const COLOR_STYLES = {
  gold: "bg-[#2d6b28]",
  white: "bg-[#2d3a2e]",
};

export function AudioWave({
  barCount = 5,
  isPlaying = true,
  className = "",
  color = "gold",
}: AudioWaveProps) {
  const bars = Array.from({ length: barCount }, (_, i) => i);
  const barColor = COLOR_STYLES[color];

  return (
    <div
      className={`flex items-end gap-[3px] h-8 ${className}`}
      aria-label={isPlaying ? "Audio reproduciéndose" : "Audio en pausa"}
    >
      {bars.map((i) => (
        <span
          key={i}
          className={`w-1 rounded-full ${barColor} transition-all duration-300 ${
            isPlaying ? "animate-audio-wave" : "h-1 opacity-60"
          }`}
          style={
            isPlaying
              ? {
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: `${0.8 + (i % 3) * 0.2}s`,
                }
              : undefined
          }
        />
      ))}
    </div>
  );
}
