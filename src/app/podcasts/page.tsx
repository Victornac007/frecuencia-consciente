import type { Metadata } from "next";
import { Play, Clock, Calendar } from "lucide-react";
import { SectionTitle, GlassCard, Badge, GoldButton } from "@/components/ui";
import { FadeIn } from "@/components/effects";
import { PODCAST_EPISODES } from "@/data/content";
import type { PodcastEpisode } from "@/data/content";

export const metadata: Metadata = {
  title: "Podcasts — Frecuencia Consciente",
  description:
    "Escucha nuestros episodios de podcast sobre espiritualidad, ciencia, meditación y desarrollo personal.",
};

function EpisodeCard({ episode }: { episode: PodcastEpisode }) {
  return (
    <GlassCard variant="interactive" padding="lg" as="article" className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <Badge variant="gold">Ep. {episode.episodeNumber}</Badge>
        <div className="flex items-center gap-1.5 text-xs text-[#1E293B]/50 tracking-wide">
          <Clock className="w-3.5 h-3.5" />
          {episode.duration}
        </div>
      </div>

      <h3 className="text-base font-bold text-[#1E293B] mb-1 leading-snug tracking-wide">
        {episode.title}
      </h3>
      <p className="text-sm text-brand-green/80 mb-1 leading-relaxed">{episode.program}</p>
      <p className="text-xs text-[#1E293B]/50 mb-3 tracking-wide">con {episode.host}</p>

      <p className="text-sm text-[#1E293B]/80 leading-relaxed mb-5 line-clamp-2 flex-1">
        {episode.description}
      </p>

      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs text-[#1E293B]/50 tracking-wide">
          <Calendar className="w-3.5 h-3.5" />
          {episode.date}
        </span>
        <GoldButton size="sm" className="btn-magnetic">
          <Play className="w-3.5 h-3.5 fill-white" />
          Escuchar
        </GoldButton>
      </div>
    </GlassCard>
  );
}

export default function PodcastsPage() {
  return (
    <main className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16 md:py-24">
      <FadeIn>
        <SectionTitle
          title="Podcasts"
          accentWord="Podcasts"
          subtitle="Escucha episodios anteriores a tu ritmo. Nuevos episodios cada semana."
          className="mb-14"
        />
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {PODCAST_EPISODES.map((episode, i) => (
          <FadeIn key={episode.id} delay={i * 80} className="h-full min-h-[260px]">
            <EpisodeCard episode={episode} />
          </FadeIn>
        ))}
      </div>
    </main>
  );
}
