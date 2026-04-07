"use client";

import { useEffect, useRef, useState } from "react";
import { SectionTitle } from "../ui";
import { FadeIn } from "../effects";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

interface Sponsor {
  id: number;
  name: string;
  videoUrl: string;
  posterUrl: string;
  description: string;
}

const SPONSORS: Sponsor[] = [
  {
    id: 1,
    name: "Nueva Temporada — ZEN",
    videoUrl: "https://player.vimeo.com/external/434045526.sd.mp4?s=c27dbed9a117042f8c5b2a0c4107bb4a5959f635&profile_id=164&oauth2_token_id=57447761",
    posterUrl: "/images/ad-meditation.png",
    description: "Encuentra tu centro con nuestra nueva programación",
  },
  {
    id: 2,
    name: "Despertares Matutinos",
    videoUrl: "https://player.vimeo.com/external/440536732.sd.mp4?s=d010738a081577a419262985175960411a7c5031&profile_id=164&oauth2_token_id=57447761",
    posterUrl: "/images/ad-meditation.png",
    description: "La mejor energía para comenzar tu día",
  },
  {
    id: 3,
    name: "Nespresso — Moments",
    videoUrl: "https://player.vimeo.com/external/517090081.sd.mp4?s=82c0dfb572e811f586948518e983416b0811eef2&profile_id=164&oauth2_token_id=57447761",
    posterUrl: "/images/ad-nespresso.png",
    description: "Un aroma para cada nivel de consciencia",
  },
  {
    id: 4,
    name: "Spotify Soundscapes",
    videoUrl: "https://player.vimeo.com/external/434045526.sd.mp4?s=c27dbed9a117042f8c5b2a0c4107bb4a5959f635&profile_id=164&oauth2_token_id=57447761",
    posterUrl: "/images/ad-spotify.png",
    description: "Sintoniza tu alma con el universo",
  },
];

export function SponsorCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [loadedVideos, setLoadedVideos] = useState<Record<number, boolean>>({});
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleVideoLoad = (index: number) => {
    setLoadedVideos(prev => ({ ...prev, [index]: true }));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % SPONSORS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + SPONSORS.length) % SPONSORS.length);
  };

  useEffect(() => {
    if (isPlaying && !isHovered) {
      const interval = setInterval(handleNext, 6000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, isHovered]);

  useEffect(() => {
    // Play/Pause videos based on active index
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === activeIndex) {
          video.play().catch(() => {
            // Autoplay might be blocked until user interaction
          });
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [activeIndex]);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Dynamic Background Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-gold/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-4">
        <FadeIn>
          <SectionTitle
            title="Presencia en Digital"
            accentWord="Digital"
            subtitle="Marcas que confían en Frecuencia Consciente para elevar su impacto"
            className="mb-16 section-title-island"
          />
        </FadeIn>

        <div
          className="relative group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Carousel Container */}
          <div className="flex justify-center items-center gap-4 md:gap-8 overflow-hidden py-10 px-4">
            {SPONSORS.map((sponsor, index) => {
              const isCenter = index === activeIndex;
              const isPrev = index === (activeIndex - 1 + SPONSORS.length) % SPONSORS.length;
              const isNext = index === (activeIndex + 1) % SPONSORS.length;
              const isLoaded = loadedVideos[index];

              if (!isCenter && !isPrev && !isNext && SPONSORS.length > 3) return null;

              return (
                <div
                  key={sponsor.id}
                  className={`relative transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] shrink-0 
                  ${isCenter ? "w-full md:w-[60%] lg:w-[50%] z-20 scale-100 opacity-100" : "w-[15%] md:w-[20%] z-10 scale-90 opacity-40 blur-[2px] cursor-pointer"}`}
                  onClick={() => !isCenter && setActiveIndex(index)}
                >
                  <div className={`glass-interactive overflow-hidden h-[400px] md:h-[500px] border-2 transition-colors cursor-pointer
                    ${isCenter ? "border-white/40 shadow-2xl" : "border-transparent"}`}>

                    {/* Placeholder Image while loading or restricted */}
                    <img
                      src={sponsor.posterUrl}
                      alt={sponsor.name}
                      onLoad={() => {
                        // Ensure the image is ready if needed
                      }}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 
                        ${isLoaded ? "opacity-0 z-0" : "opacity-100 z-10"}`}
                    />

                    {/* Video Player */}
                    <video
                      ref={(el) => { videoRefs.current[index] = el; }}
                      src={sponsor.videoUrl}
                      poster={sponsor.posterUrl}
                      onCanPlay={() => handleVideoLoad(index)}
                      onError={() => {
                        // If video fails, ensure we keep showing the poster
                        setLoadedVideos(prev => ({ ...prev, [index]: false }));
                      }}
                      loop
                      muted
                      playsInline
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 
                        ${isLoaded ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                    {/* Info Overlay (only for active) */}
                    {isCenter && (
                      <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-0 transition-transform duration-500">
                        <span className="text-brand-gold font-script text-2xl mb-2 block animate-breathe">
                          Sponsor destacado
                        </span>
                        <h3 className="text-white text-3xl md:text-4xl font-serif font-bold mb-2">
                          {sponsor.name}
                        </h3>
                        <p className="text-white/80 text-lg max-w-md">
                          {sponsor.description}
                        </p>
                      </div>
                    )}

                    {/* Glass Shine */}
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-30" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-2 md:px-10 pointer-events-none">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full glass-interactive flex items-center justify-center text-text-primary hover:bg-brand-green/20 pointer-events-auto transition-transform active:scale-95"
              aria-label="Anterior"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full glass-interactive flex items-center justify-center text-text-primary hover:bg-brand-green/20 pointer-events-auto transition-transform active:scale-95"
              aria-label="Siguiente"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Indicators & Playback Toggle */}
          <div className="mt-12 flex items-center justify-center gap-6">
            <div className="flex gap-2">
              {SPONSORS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-500 
                  ${activeIndex === index ? "w-12 bg-brand-gold" : "w-3 bg-brand-gold/30 hover:bg-brand-gold/50"}`}
                  aria-label={`Ir al sponsor ${index + 1}`}
                />
              ))}
            </div>

            <div className="w-px h-4 bg-brand-gold/30 mx-2" />

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-brand-gold flex items-center gap-2 text-sm font-medium hover:text-brand-green transition-colors"
            >
              {isPlaying ? (
                <><Pause size={16} /> PAUSE</>
              ) : (
                <><Play size={16} /> PLAY</>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
