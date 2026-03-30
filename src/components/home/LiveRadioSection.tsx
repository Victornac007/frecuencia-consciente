"use client";

import { Play, Pause, SkipForward, Clock } from "lucide-react";
import {
  useAudioPlayer,
  LIVE_STREAM_TRACK,
} from "@/context/AudioPlayerContext";
import { GlassCard, Badge, LiveIndicator, AudioWave } from "@/components/ui";
import { SacredGeometry } from "@/components/effects";
import { NOW_PLAYING } from "@/data/mock";

export function LiveRadioSection() {
  const { togglePlay, isPlaying, currentTrack } = useAudioPlayer();
  const isLiveActive = isPlaying && currentTrack?.id === LIVE_STREAM_TRACK.id;

  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto py-12 md:py-24">
      <GlassCard variant="strong" padding="none" className="overflow-hidden rounded-3xl">
        <div className="relative px-5 py-5 md:px-12 md:py-10">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-bg-green/20 via-transparent to-brand-bg-pink/15 pointer-events-none rounded-3xl" />

          <div className="relative flex flex-col md:flex-row md:items-center gap-4 md:gap-10">
            <div className="flex items-center justify-between md:justify-start gap-3">
              <Badge variant="live" className="live-badge-pulse animate-pulse">
                <LiveIndicator size="sm" />
                EN VIVO AHORA
              </Badge>
              <div className="flex items-center gap-2 text-[#1E293B] text-sm font-medium tracking-wide">
                <Clock className="w-4 h-4" />
                <span>24/7 Radio Digital</span>
              </div>
            </div>

            <div className="relative flex flex-1 flex-col sm:flex-row items-center gap-4 md:gap-8">
              <div className="relative shrink-0 order-2 sm:order-1">
                {isLiveActive && (
                  <>
                    <div className="pulse-ring" />
                    <div className="pulse-ring" style={{ animationDelay: "0.8s" }} />
                    <div className="pulse-ring" style={{ animationDelay: "1.6s" }} />
                  </>
                )}

                <div className="absolute inset-[-40px] flex items-center justify-center opacity-[0.04] text-[#4A7856]">
                  <SacredGeometry size={200} className="w-full h-full" />
                </div>

                <button
                  onClick={() => togglePlay(LIVE_STREAM_TRACK)}
                  aria-label={isLiveActive ? "Pausar radio" : "Reproducir radio"}
                  className="relative w-20 h-20 rounded-full border-2 border-[#4A7856] bg-transparent backdrop-blur-sm flex items-center justify-center shadow-lg shadow-[#4A7856]/20 transition-all duration-300 cursor-pointer hover:bg-[#4A7856]/20 hover:shadow-xl hover:shadow-[#4A7856]/25 active:scale-95"
                >
                  {isLiveActive ? (
                    <Pause className="w-9 h-9 text-[#4A7856]" fill="currentColor" />
                  ) : (
                    <Play className="w-9 h-9 text-[#4A7856] ml-0.5" fill="currentColor" />
                  )}
                </button>
              </div>

              <div className="flex-1 text-center sm:text-left order-1 sm:order-2 min-w-0">
                <p className="text-xs font-semibold text-[#1E293B] uppercase tracking-[0.2em] mb-1">
                  Ahora sonando
                </p>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1E293B] mb-1" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.8)' }}>
                  {NOW_PLAYING.program}
                </h2>
                <p className="text-[#1E293B]/90 font-medium leading-relaxed tracking-wide">con {NOW_PLAYING.host}</p>
              </div>

              <div className="hidden md:flex order-3">
                <AudioWave
                  barCount={7}
                  isPlaying={isLiveActive}
                  color="gold"
                  className="opacity-100"
                />
              </div>
            </div>

            <div className="relative flex items-center justify-center md:justify-start gap-2 text-sm text-[#1E293B] font-medium pt-5 md:pt-6 border-t border-white/40 tracking-wide">
              <SkipForward className="w-4 h-4" />
              <span>
                Siguiente:{" "}
                <span className="font-semibold">{NOW_PLAYING.nextProgram}</span>{" "}
                — {NOW_PLAYING.nextTime}
              </span>
            </div>
          </div>
        </div>
      </GlassCard>
    </section>
  );
}
