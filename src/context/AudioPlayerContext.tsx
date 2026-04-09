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
  liveStreamError: string | null;
  play: (track?: Track) => void;
  pause: () => void;
  togglePlay: (track?: Track) => void;
  setVolume: (vol: number) => void;
  toggleMute: () => void;
  seek: (time: number) => void;
  clearLiveStreamError: () => void;
}

const AudioPlayerContext = createContext<AudioPlayerValue | null>(null);

const DEFAULT_ARTWORK = "/icon-192.svg";

/** URL por defecto del stream en vivo (no modificar query params). */
export const LIVE_STREAM_URL =
  "https://frecuenciaconsciente.duckdns.org/stream";

const STREAM_UNAVAILABLE_MSG =
  "Stream no disponible, intenta de nuevo.";

export const LIVE_STREAM_TRACK: Track = {
  id: "live-stream",
  title: "Frecuencia Consciente",
  artist: "Radio en Vivo 24/7",
  type: "live",
  url: process.env.NEXT_PUBLIC_STREAM_URL || LIVE_STREAM_URL,
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
  const mediaSrcRef = useRef(LIVE_STREAM_TRACK.url);
  const pendingPlayRef = useRef(false);
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
  const [mediaSrc, setMediaSrcState] = useState(LIVE_STREAM_TRACK.url);
  const [liveStreamError, setLiveStreamError] = useState<string | null>(null);

  const setMediaSrc = useCallback((url: string) => {
    mediaSrcRef.current = url;
    setMediaSrcState(url);
  }, []);

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
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.75;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onWaiting = () => setIsLoading(true);
    const onCanPlay = () => setIsLoading(false);
    const onPlaying = () => {
      setIsLoading(false);
      setLiveStreamError(null);
    };
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onDurationChange = () => setDuration(audio.duration || 0);
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };
    const onStreamError = (e: Event) => {
      const target = e.target as HTMLAudioElement;
      console.error("Audio stream error:", target.error);
      setIsPlaying(false);
      setIsLoading(false);
      setLiveStreamError(STREAM_UNAVAILABLE_MSG);
    };
    
    const onStalled = () => {
      console.warn("Audio stream stalled, buffering...");
      setIsLoading(true);
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("durationchange", onDurationChange);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onStreamError);
    audio.addEventListener("stalled", onStalled);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("durationchange", onDurationChange);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onStreamError);
      audio.removeEventListener("stalled", onStalled);
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
    };
  }, []);

  const attemptPlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setLiveStreamError(null);
    setIsLoading(true);
    
    // Al intentar reproducir, forzamos recarga en caso de que sea un live stream que se desconectó
    if (stateRef.current.currentTrack?.type === "live" && audio.readyState === 0) {
      audio.load();
    }

    audio.play().catch((err) => {
      console.error("Error attempting to play audio:", err);
      setIsPlaying(false);
      setIsLoading(false);
      
      // Mostrar algo útil si es posible
      const errorMsg = err.name === "NotAllowedError" 
        ? "Reproducción bloqueada (toca play de nuevo)."
        : STREAM_UNAVAILABLE_MSG;
        
      setLiveStreamError(errorMsg);
    });
  }, []);

  const play = useCallback(
    (track?: Track) => {
      const audio = audioRef.current;
      if (!audio) return;

      const { currentTrack: current } = stateRef.current;
      const target = track ?? current ?? LIVE_STREAM_TRACK;
      const isNewTrack = target.id !== current?.id;

      if (!target.url) {
        setLiveStreamError(STREAM_UNAVAILABLE_MSG);
        return;
      }

      if (isNewTrack) {
        setCurrentTrack(target);
        if (target.url !== mediaSrcRef.current) {
          setMediaSrc(target.url);
          pendingPlayRef.current = true;
          return;
        }
      }

      pendingPlayRef.current = false;
      attemptPlay();
    },
    [attemptPlay, setMediaSrc]
  );

  useEffect(() => {
    if (!pendingPlayRef.current) return;
    pendingPlayRef.current = false;
    attemptPlay();
  }, [mediaSrc, attemptPlay]);

  const clearLiveStreamError = useCallback(() => setLiveStreamError(null), []);

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
    liveStreamError,
    play,
    pause,
    togglePlay,
    setVolume,
    toggleMute,
    seek,
    clearLiveStreamError,
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={mediaSrc}
        preload="none"
        playsInline
        hidden
      />
      <AudioPlayerContext.Provider value={value}>
        {children}
      </AudioPlayerContext.Provider>
    </>
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
