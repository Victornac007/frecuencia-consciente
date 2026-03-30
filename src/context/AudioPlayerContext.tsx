"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";

export interface Track {
  id: string;
  title: string;
  artist: string;
  type: "live" | "podcast";
  url: string;
  artwork?: string;
}

interface AudioPlayerValue {
  isPlaying: boolean;
  isLoading: boolean;
  volume: number;
  isMuted: boolean;
  currentTrack: Track | null;
  currentTime: number;
  duration: number;
  play: (track?: Track) => void;
  pause: () => void;
  togglePlay: (track?: Track) => void;
  setVolume: (vol: number) => void;
  toggleMute: () => void;
  seek: (time: number) => void;
}

const AudioPlayerContext = createContext<AudioPlayerValue | null>(null);

const DEFAULT_ARTWORK = "/icon-192.svg";

export const LIVE_STREAM_TRACK: Track = {
  id: "live-stream",
  title: "Frecuencia Consciente",
  artist: "Radio en Vivo 24/7",
  type: "live",
  url: process.env.NEXT_PUBLIC_STREAM_URL ?? "",
};

function updateMediaSession(track: Track, isPlaying: boolean) {
  if (typeof navigator === "undefined" || !("mediaSession" in navigator)) {
    return;
  }

  navigator.mediaSession.metadata = new MediaMetadata({
    title: track.title,
    artist: track.artist,
    album: "Frecuencia Consciente",
    artwork: [
      { src: track.artwork ?? DEFAULT_ARTWORK, sizes: "192x192", type: "image/png" },
      { src: track.artwork ?? DEFAULT_ARTWORK, sizes: "512x512", type: "image/png" },
    ],
  });

  navigator.mediaSession.playbackState = isPlaying ? "playing" : "paused";
}

function registerMediaSessionHandlers(
  onPlay: () => void,
  onPause: () => void,
  onSeek: ((delta: number) => void) | null
) {
  if (typeof navigator === "undefined" || !("mediaSession" in navigator)) {
    return;
  }

  navigator.mediaSession.setActionHandler("play", onPlay);
  navigator.mediaSession.setActionHandler("pause", onPause);
  navigator.mediaSession.setActionHandler("stop", onPause);

  if (onSeek) {
    navigator.mediaSession.setActionHandler("seekbackward", () => onSeek(-10));
    navigator.mediaSession.setActionHandler("seekforward", () => onSeek(10));
  }
}

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const stateRef = useRef({
    isPlaying: false,
    currentTrack: null as Track | null,
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolumeState] = useState(0.75);
  const [isMuted, setIsMutedState] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    stateRef.current.isPlaying = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    stateRef.current.currentTrack = currentTrack;
  }, [currentTrack]);

  useEffect(() => {
    if (currentTrack) {
      updateMediaSession(currentTrack, isPlaying);
    }
  }, [currentTrack, isPlaying]);

  useEffect(() => {
    const audio = new Audio();
    audio.volume = 0.75;
    audio.preload = "none";
    audioRef.current = audio;

    audio.addEventListener("playing", () => {
      setIsPlaying(true);
      setIsLoading(false);
    });
    audio.addEventListener("pause", () => setIsPlaying(false));
    audio.addEventListener("waiting", () => setIsLoading(true));
    audio.addEventListener("canplay", () => setIsLoading(false));
    audio.addEventListener("timeupdate", () =>
      setCurrentTime(audio.currentTime)
    );
    audio.addEventListener("durationchange", () =>
      setDuration(audio.duration || 0)
    );
    audio.addEventListener("ended", () => {
      setIsPlaying(false);
      setCurrentTime(0);
    });
    audio.addEventListener("error", () => {
      setIsPlaying(false);
      setIsLoading(false);
    });

    return () => {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
    };
  }, []);

  const play = useCallback((track?: Track) => {
    const audio = audioRef.current;
    if (!audio) return;

    const { currentTrack: current } = stateRef.current;
    const target = track ?? current ?? LIVE_STREAM_TRACK;
    const isNewTrack = target.id !== current?.id;

    if (isNewTrack) setCurrentTrack(target);

    if (!target.url) {
      setIsPlaying(true);
      return;
    }

    if (isNewTrack) audio.src = target.url;
    setIsLoading(true);
    audio.play().catch(() => {
      setIsPlaying(false);
      setIsLoading(false);
    });
  }, []);

  const pause = useCallback(() => {
    if (stateRef.current.currentTrack?.url) {
      audioRef.current?.pause();
    } else {
      setIsPlaying(false);
    }
  }, []);

  const togglePlay = useCallback(
    (track?: Track) => {
      const { isPlaying: playing, currentTrack: current } = stateRef.current;
      const isSameTrack = !track || track.id === current?.id;

      if (playing && isSameTrack) {
        pause();
      } else {
        play(track);
      }
    },
    [play, pause]
  );

  const seekRelative = useCallback((delta: number) => {
    const audio = audioRef.current;
    if (!audio || stateRef.current.currentTrack?.type !== "podcast") return;
    audio.currentTime = Math.max(0, audio.currentTime + delta);
  }, []);

  useEffect(() => {
    registerMediaSessionHandlers(
      () => play(),
      () => pause(),
      currentTrack?.type === "podcast" ? seekRelative : null
    );
  }, [play, pause, seekRelative, currentTrack?.type]);

  const setVolume = useCallback((vol: number) => {
    const clamped = Math.max(0, Math.min(1, vol));
    setVolumeState(clamped);
    if (audioRef.current) audioRef.current.volume = clamped;
    if (clamped > 0) setIsMutedState(false);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMutedState((prev) => {
      const next = !prev;
      if (audioRef.current) audioRef.current.muted = next;
      return next;
    });
  }, []);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (audio && stateRef.current.currentTrack?.type === "podcast") {
      audio.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  const value: AudioPlayerValue = {
    isPlaying,
    isLoading,
    volume,
    isMuted,
    currentTrack,
    currentTime,
    duration,
    play,
    pause,
    togglePlay,
    setVolume,
    toggleMute,
    seek,
  };

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayer(): AudioPlayerValue {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error(
      "useAudioPlayer must be used within an AudioPlayerProvider"
    );
  }
  return context;
}
