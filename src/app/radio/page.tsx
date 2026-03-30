import type { Metadata } from "next";
import { Headphones, Flower2 } from "lucide-react";
import { SectionTitle, GlassCard, IconCard } from "@/components/ui";
import { LivePlayButton } from "@/components/player";
import { DAILY_SCHEDULE } from "@/data/content";
import type { ScheduleItem } from "@/data/content";

export const metadata: Metadata = {
  title: "Radio 24/7 — Frecuencia Consciente",
  description:
    "Escucha nuestra programación en vivo las 24 horas. Meditaciones, coaching, ciencia y música para el alma.",
};

function ScheduleItemCard({ item }: { item: ScheduleItem }) {
  const Icon = item.icon;

  return (
    <div className="flex gap-4 sm:gap-6">
      <div className="flex flex-col items-center shrink-0 pt-1">
        <span className="text-sm font-mono font-semibold text-brand-green w-14 text-right">
          {item.time}
        </span>
        <div className="w-3 h-3 rounded-full bg-brand-green mt-3 shrink-0 ring-4 ring-brand-green/15" />
        <div className="w-px flex-1 bg-slate-200 mt-1" />
      </div>

      <GlassCard variant="interactive" padding="md" className="flex-1 mb-4">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-brand-bg-green border border-brand-green/20 flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5 text-brand-green" />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-[#2d3a2e]">{item.title}</h3>
            <p className="text-sm text-[#2d3a2e]/40 mt-0.5">con {item.host}</p>
            <p className="text-sm text-[#2d3a2e]/55 mt-2 leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

export default function RadioPage() {
  return (
    <main className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto py-16 md:py-24">
      <SectionTitle
        title="Radio en Vivo 24/7"
        accentWord="24/7"
        subtitle="Contenido consciente las 24 horas del día, los 7 días de la semana"
        className="mb-6"
      />

      <div className="flex justify-center mb-16">
        <LivePlayButton size="lg" className="gold-glow" />
      </div>

      <h2 className="text-xl font-bold text-[#2d3a2e] mb-8">
        Programación Diaria
      </h2>

      <div className="relative">
        {DAILY_SCHEDULE.map((item) => (
          <ScheduleItemCard key={item.id} item={item} />
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-16">
        <IconCard
          icon={Flower2}
          title="Explorar Meditaciones"
          description="Accede a nuestra biblioteca de meditaciones guiadas para cada momento del día."
          href="/programas"
          action={
            <span className="text-sm text-brand-green group-hover:text-brand-green transition-colors">
              Ver programas →
            </span>
          }
        />
        <IconCard
          icon={Headphones}
          title="Ver Podcasts"
          description="Escucha episodios anteriores a tu ritmo, cuando y donde quieras."
          href="/podcasts"
          action={
            <span className="text-sm text-brand-green group-hover:text-brand-green transition-colors">
              Ver podcasts →
            </span>
          }
        />
      </div>
    </main>
  );
}
