import type { Metadata } from "next";
import { SectionTitle, GlassCard, Badge, GoldButton } from "@/components/ui";
import { FadeIn } from "@/components/effects";
import { PROGRAM_CATEGORIES } from "@/data/content";
import type { ProgramCategory } from "@/data/content";

export const metadata: Metadata = {
  title: "Programas — Frecuencia Consciente",
  description:
    "Explora nuestros programas de coaching espiritual, ciencia y consciencia, psicología, meditación y más.",
};

function ProgramCard({ program }: { program: ProgramCategory }) {
  const Icon = program.icon;

  return (
    <GlassCard variant="interactive" padding="lg" as="article" className="h-full flex flex-col">
      <div className="flex items-start gap-5">
        <div className="icon-bounce w-14 h-14 rounded-xl bg-brand-bg-green border border-brand-green/20 flex items-center justify-center shrink-0">
          <Icon className="w-7 h-7 text-brand-green" />
        </div>
        <div className="min-w-0 flex-1">
          <Badge variant="gold" className="mb-3">
            {program.category}
          </Badge>
          <h3 className="text-xl font-bold text-[#1E293B] mb-1 tracking-wide">
            {program.title}
          </h3>
          <p className="text-sm text-brand-green/80 mb-3 leading-relaxed">
            con {program.host}
          </p>
          <p className="text-xs text-[#1E293B]/60 mb-1 tracking-wide">{program.hostRole}</p>
        </div>
      </div>

      <p className="text-sm text-[#1E293B]/80 leading-relaxed mt-5 mb-6 flex-1">
        {program.description}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-xs text-[#1E293B]/50 tracking-wide">
          {program.episodeCount} episodios
        </span>
        <GoldButton size="sm" className="btn-magnetic">Escuchar</GoldButton>
      </div>
    </GlassCard>
  );
}

export default function ProgramasPage() {
  return (
    <main className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16 md:py-24">
      <FadeIn>
        <SectionTitle
          title="Nuestros Programas"
          accentWord="Programas"
          subtitle="Contenido diseñado para acompañarte en cada etapa de tu camino de transformación"
          className="mb-14"
        />
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {PROGRAM_CATEGORIES.map((program, i) => (
          <FadeIn key={program.id} delay={i * 100} className="h-full min-h-[240px]">
            <ProgramCard program={program} />
          </FadeIn>
        ))}
      </div>
    </main>
  );
}
