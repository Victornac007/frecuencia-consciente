import { Play, Clock, Calendar } from "lucide-react";
import { GlassCard, Badge, GoldButton } from "@/components/ui";
import { FEATURED_EPISODE } from "@/data/mock";

export function FeaturedEpisode() {
  return (
    <GlassCard
      variant="interactive"
      padding="lg"
      as="article"
      className="h-full transition-all duration-300 hover:-translate-y-1 hover:border-white/70"
    >
      <div className="flex flex-col h-full">
        <Badge variant="gold" className="mb-4">
          Episodio Destacado
        </Badge>

        <h3 className="font-serif text-xl font-bold text-[#1E293B] mb-2 tracking-wide">
          {FEATURED_EPISODE.title}
        </h3>

        <p className="text-sm text-brand-green/90 font-medium mb-3 leading-relaxed tracking-wide">
          {FEATURED_EPISODE.program}
        </p>

        <p className="text-sm text-[#1E293B]/90 leading-relaxed mb-6 flex-1 tracking-wide">
          {FEATURED_EPISODE.description}
        </p>

        <div className="flex items-center gap-4 text-xs text-[#1E293B]/80 mb-6 tracking-wide">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {FEATURED_EPISODE.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {FEATURED_EPISODE.date}
          </span>
        </div>

        <GoldButton size="sm" className="btn-magnetic">
          <Play className="w-3.5 h-3.5 fill-white" />
          Escuchar episodio
        </GoldButton>
      </div>
    </GlassCard>
  );
}
