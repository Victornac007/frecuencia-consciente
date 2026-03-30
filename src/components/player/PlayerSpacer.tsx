"use client";

import { useAudioPlayer } from "@/context/AudioPlayerContext";

export function PlayerSpacer() {
  const { currentTrack } = useAudioPlayer();
  if (!currentTrack) return null;
  return <div className="h-[4.5rem]" aria-hidden="true" />;
}
