import { ChevronDown } from "lucide-react";
import { LivePlayButton } from "@/components/player";
import { AnimatedCounter } from "@/components/effects/AnimatedCounter";

function HeroStats() {
  const stats = [
    { value: "24/7", label: "Radio en Vivo" },
    { value: "50+", label: "Programas" },
    { value: "10000+", label: "Oyentes" },
  ];

  return (
    <div className="mt-8 lg:mt-4 flex flex-wrap items-center justify-center gap-6 lg:gap-8 text-sm">
      {stats.map((stat, i) => (
        <div key={stat.label} className="flex items-center gap-6 lg:gap-8">
          <div className="text-center">
            <AnimatedCounter
              value={stat.value}
              className="text-glass-subtle text-2xl font-bold text-[#1e4a1e] block"
            />
            <p className="text-glass-subtle text-[#4a360c] mt-0.5 tracking-wide font-medium">{stat.label}</p>
          </div>
          {i < stats.length - 1 && (
            <div className="hidden sm:block w-px h-8 bg-brand-green/20" />
          )}
        </div>
      ))}
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-4 pt-20 sm:pt-24 lg:pt-20 pb-8 lg:pb-6 text-center overflow-hidden">
      <div className="absolute inset-0 hero-zen-glow pointer-events-none" />

      {/* Solo móvil: eslogan arriba */}
      <p className="block md:hidden text-glass-subtle text-xs tracking-[0.35em] uppercase font-bold mb-4 text-[#5c4310]">
        Tu Conexión Diaria
      </p>

      {/* Panel central: título y CTA (sin logo circular para dejar respirar el fondo) */}
      <div className="relative w-full max-w-2xl lg:max-w-3xl mx-auto glass-strong rounded-3xl px-5 py-5 sm:px-10 sm:py-8 shadow-lg shadow-black/5 text-center">
        <p className="hidden md:block text-glass-subtle text-xs sm:text-sm tracking-[0.35em] uppercase font-bold mb-4 text-[#5c4310]">
          Tu Conexión Diaria
        </p>

        <h1 className="text-glass-strong font-serif text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-2 sm:mb-3 text-[#2D3436]">
          <span>Frecuencia</span>
          <br className="sm:hidden" />{" "}
          <span className="text-accent-orange italic">Consciente</span>
        </h1>

        <p className="text-glass font-script text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#8b2942] mb-2 sm:mb-3 leading-relaxed">
          <span className="sm:hidden">Inspira | Aprende | Transfórmate</span>
          <span className="hidden sm:inline">Inspira, Aprende, Transfórmate</span>
        </p>

        <p className="text-glass text-sm sm:text-base md:text-lg text-[#1a241c] max-w-lg mx-auto mb-5 sm:mb-6 leading-relaxed">
          Un oasis de despertar interior, radio digital de equilibrio y paz espiritual. Eleva tu consciencia cada día.
        </p>

        <div className="flex flex-col items-center gap-3">
          <LivePlayButton size="lg" className="gold-glow btn-magnetic w-full sm:w-auto max-w-xs sm:max-w-none" />
          <div className="flex flex-col items-center gap-1 animate-float-arrow">
            <ChevronDown className="w-5 h-5 text-[#8b6914]" />
            <span className="text-glass-subtle text-xs text-[#5c4310] tracking-widest uppercase font-medium">
              Escucha en vivo
            </span>
          </div>
        </div>

        <HeroStats />

        <p className="text-glass-subtle font-script text-base sm:text-lg md:text-xl text-[#1e4a1e] tracking-wide mt-5 sm:mt-6">
          Una señal para despertar conciencia
        </p>
      </div>
    </section>
  );
}
