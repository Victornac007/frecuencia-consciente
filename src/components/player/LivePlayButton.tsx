"use client";

import {
  useAudioPlayer,
  LIVE_STREAM_TRACK,
} from "@/context/AudioPlayerContext";
import { GoldButton, LiveIndicator } from "@/components/ui";

interface LivePlayButtonProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  fullWidth?: boolean;
}

export function LivePlayButton({
  size = "md",
  className,
  fullWidth,
}: LivePlayButtonProps) {
  const { togglePlay, isPlaying, currentTrack } = useAudioPlayer();
  const isLiveActive = isPlaying && currentTrack?.id === LIVE_STREAM_TRACK.id;

  return (
    <GoldButton
      size={size}
      className={className}
      fullWidth={fullWidth}
      onClick={() => togglePlay(LIVE_STREAM_TRACK)}
    >
      <LiveIndicator size={size === "lg" ? "lg" : "sm"} />
      {isLiveActive ? "EN VIVO" : "ESCUCHAR EN VIVO"}
    </GoldButton>
  );
}
