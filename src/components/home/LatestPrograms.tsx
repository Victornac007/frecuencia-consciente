import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/ui";
import { LATEST_PROGRAMS } from "@/data/mock";
import type { Program } from "@/data/mock";

function ProgramItem({ program }: { program: Program }) {
  const Icon = program.icon;

  return (
    <Link
      href="/programas"
      className="flex items-center gap-4 p-3 rounded-xl hover:bg-brand-bg-green/50 transition-all duration-300 group/item"
    >
      <div className="w-10 h-10 rounded-lg bg-brand-bg-green border border-brand-green/20 flex items-center justify-center shrink-0 group-hover/item:bg-brand-green/15 group-hover/item:scale-110 transition-all duration-300">
        <Icon className="w-5 h-5 text-brand-green" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-[#1E293B] truncate group-hover/item:text-brand-green transition-colors tracking-wide">
          {program.title}
        </h4>
        <p className="text-xs text-[#1E293B]/85 leading-relaxed">{program.host}</p>
      </div>
      <div className="flex items-center gap-1 text-xs text-[#1E293B]/85 shrink-0 tracking-wide">
        <Clock className="w-3.5 h-3.5" />
        {program.time}
      </div>
    </Link>
  );
}

export function LatestPrograms() {
  return (
    <GlassCard
      variant="default"
      padding="lg"
      className="h-full transition-all duration-300 hover:-translate-y-1 hover:border-white/70"
    >
      <div className="flex flex-col h-full">
        <h3 className="font-serif text-lg font-bold text-[#1E293B] mb-4 tracking-wide">
          Últimos Programas
        </h3>

        <div className="space-y-1 flex-1 min-h-0">
          {LATEST_PROGRAMS.map((program) => (
            <ProgramItem key={program.id} program={program} />
          ))}
        </div>

        <Link
          href="/programas"
          className="link-ver-todos text-sm font-medium text-[#1E293B]/80 hover:text-[#1E293B] mt-5 group/link tracking-wide"
        >
          Ver todos los programas
          <ArrowRight className="w-4 h-4 text-[#D37D52] group-hover/link:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </GlassCard>
  );
}
