"use client";

import { Play, Pause, Volume2, VolumeX, Radio, Loader2 } from "lucide-react";
import { useAudioPlayer } from "@/context/AudioPlayerContext";
import { AudioWave, LiveIndicator } from "@/components/ui";

function formatTime(seconds: number): string {
  if (!seconds || !isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function GlobalPlayer() {
  const {
    isPlaying,
    isLoading,
    currentTrack,
    currentTime,
    duration,
    volume,
    isMuted,
    togglePlay,
    setVolume,
    toggleMute,
  } = useAudioPlayer();

  if (!currentTrack) return null;

  const isLive = currentTrack.type === "live";
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 backdrop-blur-[16px] bg-[rgba(220,235,250,0.45)] border-t border-[rgba(210,230,250,0.40)] shadow-[0_-4px_30px_rgba(0,0,0,0.08)]">
      {!isLive && duration > 0 && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-slate-200/50">
          <div
            className="h-full bg-gradient-to-r from-[#34a853] to-[#2e9648] transition-[width] duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-[4.5rem] gap-4">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-10 h-10 rounded-lg bg-brand-bg-green border border-brand-green/20 flex items-center justify-center shrink-0">
              <Radio className="w-5 h-5 text-brand-green" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-[#2d3a2e] truncate">
                {currentTrack.title}
              </p>
              <div className="flex items-center gap-2">
                {isLive && <LiveIndicator size="sm" />}
                <p className="text-xs text-[#2d3a2e]/80 truncate">
                  {currentTrack.artist}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isPlaying && (
              <AudioWave
                barCount={3}
                isPlaying
                color="gold"
                className="hidden sm:flex"
              />
            )}
            <button
              onClick={() => togglePlay()}
              aria-label={isPlaying ? "Pausar" : "Reproducir"}
              className="w-11 h-11 rounded-full bg-gradient-to-br from-[#34a853] to-[#28873f] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform cursor-pointer shrink-0 shadow-md shadow-[#34a853]/35"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 text-white animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-5 h-5 text-white" fill="currentColor" />
              ) : (
                <Play className="w-5 h-5 text-white ml-0.5" fill="currentColor" />
              )}
            </button>
          </div>

          {!isLive && duration > 0 && (
            <span className="hidden md:block text-xs text-[#2d3a2e]/75 tabular-nums whitespace-nowrap">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          )}

          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={toggleMute}
              aria-label={isMuted ? "Activar sonido" : "Silenciar"}
              className="text-[#2d3a2e]/75 hover:text-[#1e2a1f] transition-colors cursor-pointer"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="volume-slider w-20"
              aria-label="Volumen"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
