"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowUpRight, Star, ArrowRight } from "lucide-react";
import type { CoachDTO } from "@/types/coaches";
import { useCoaches } from "@/hooks/useCoaches";

/** Filtros: "Todos" + especialidades únicas de los coaches (ordenadas) */
function useFilterOptions(coaches: CoachDTO[]) {
  return useMemo(() => {
    const specs = new Set(coaches.flatMap((c) => c.specialties));
    return ["Todos", ...Array.from(specs).sort()];
  }, [coaches]);
}

function SpecialtyFilter({
  active,
  options,
  onSelect,
}: {
  active: string;
  options: string[];
  onSelect: (value: string) => void;
}) {
  return (
    <div className="flex flex-nowrap overflow-x-auto gap-3 pb-2 mb-12 justify-start md:flex-wrap md:overflow-visible md:pb-0 md:mb-12 md:justify-center scrollbar-hide">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onSelect(opt)}
          className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer tracking-wide ${
            active === opt
              ? "bg-[#4A7856] text-white font-bold shadow-md shadow-[#4A7856]/25"
              : "bg-white/50 text-[#1E293B]/90 border border-white backdrop-blur-md hover:bg-white/65 hover:text-[#4A7856] hover:border-white/80"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function CoachAvatar({ coach }: { coach: CoachDTO }) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return <CoachPlaceholder name={coach.name} />;
  }

  return (
    <Image
      src={coach.imageUrl}
      alt={coach.name}
      fill
      className="object-cover coach-image-sharp"
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      onError={() => setImageError(true)}
    />
  );
}

function CoachPlaceholder({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-brand-bg-green via-brand-bg-pink to-brand-bg-green flex items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <div className="w-16 h-16 rounded-full bg-white/60 backdrop-blur-sm flex items-center justify-center border border-white/70">
          <span className="text-2xl font-bold text-brand-green">{initials}</span>
        </div>
        <Sparkles className="w-4 h-4 text-brand-gold/50" />
      </div>
    </div>
  );
}

function ReviewStars({ rating }: { rating: number }) {
  const r = Math.round(rating);
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`w-2.5 h-2.5 ${i < r ? "text-brand-yellow fill-brand-yellow" : "text-[#2d3a2e]/15"}`}
        />
      ))}
    </div>
  );
}

/** Esqueleto que respeta dimensiones de la tarjeta: aspect-square, nombre, estrellas, pills */
function CoachSkeletonCard() {
  return (
    <div
      className="relative rounded-3xl overflow-hidden h-full bg-white/60 backdrop-blur-xl border border-white/40 animate-pulse"
      aria-hidden
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-t-2xl bg-slate-200/50" />
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10 bg-gradient-to-t from-black/60 via-black/30 to-transparent rounded-b-2xl">
        <div className="h-6 w-3/4 rounded bg-white/40 mb-2" />
        <div className="h-4 w-1/2 rounded bg-white/40 mb-2" />
        <div className="flex gap-1 mt-2">
          <div className="h-3 w-12 rounded bg-white/40" />
          <div className="h-3 w-8 rounded bg-white/40" />
        </div>
        <div className="h-px bg-white/15 my-3" />
        <div className="h-3 w-full rounded bg-white/40 mb-2" />
        <div className="h-3 w-5/6 rounded bg-white/40 mb-3" />
        <div className="flex gap-1.5 mb-4">
          <div className="h-5 w-16 rounded-full bg-white/40" />
          <div className="h-5 w-20 rounded-full bg-white/40" />
          <div className="h-5 w-14 rounded-full bg-white/40" />
        </div>
      </div>
    </div>
  );
}

function CoachCard({ coach }: { coach: CoachDTO }) {
  const badgeLabel = coach.specialties[0] ?? "Coach";

  return (
    <Link href={`/coaches/${coach.id}`} className="block h-full">
      <article className="coach-card group relative rounded-3xl overflow-hidden cursor-pointer h-full bg-white/60 backdrop-blur-xl border border-white/35 shadow-lg shadow-black/5 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-[#4A7856]/10 hover:bg-white/80 hover:border-white/50">
        <div className="relative aspect-square w-full overflow-hidden rounded-t-2xl">
          <CoachAvatar coach={coach} />

          <div className="absolute inset-0 bg-gradient-to-t from-[#1a2e1a]/90 via-[#1a2e1a]/30 to-transparent transition-opacity duration-500" />

          <div className="absolute top-3 right-3 z-10">
            <span className="coach-card-badge px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-white/90 backdrop-blur-md text-[#4A7856] border border-white/60 shadow-sm">
              {badgeLabel}
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-5 z-10 bg-gradient-to-t from-black/60 via-black/30 to-transparent">
            <div className="coach-card-base transition-all duration-500">
              <h3 className="text-xl font-bold text-white drop-shadow-md mb-1 tracking-wide" style={{ textShadow: "0 1px 2px rgba(255,255,255,0.8)" }}>
                {coach.name}
              </h3>
              <p className="text-sm text-white/90 leading-relaxed">{coach.role}</p>
              {coach.reviewCount > 0 && (
                <div className="flex items-center gap-2 mt-2">
                  <ReviewStars rating={coach.rating} />
                  <span className="text-[11px] text-white/50">({coach.reviewCount})</span>
                </div>
              )}
            </div>

            <div className="coach-card-expanded">
              <div className="h-px bg-white/15 my-3" />

              <p className="text-[13px] text-white/75 leading-relaxed line-clamp-3 mb-3">
                {coach.bio}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {coach.specialties.slice(0, 3).map((spec) => (
                  <span
                    key={spec}
                    className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/12 text-white/80 border border-white/10"
                  >
                    {spec}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[11px] text-brand-yellow font-semibold uppercase tracking-wider">
                  Ver perfil completo
                </span>
                <div className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#4A7856]/80 transition-colors duration-300">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

export function CoachesSection() {
  const { coaches, isLoading, fetchCoaches } = useCoaches();
  const filterOptions = useFilterOptions(coaches);
  const [activeFilter, setActiveFilter] = useState("Todos");

  useEffect(() => {
    fetchCoaches();
  }, [fetchCoaches]);

  const filteredCoaches =
    activeFilter === "Todos"
      ? coaches
      : coaches.filter((c) => c.specialties.includes(activeFilter));

  return (
    <section
      id="coaches"
      className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12 md:py-28 lg:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-transparent z-0"
        aria-hidden
      />

      <div className="relative z-10">
        <div className="flex justify-end mb-8">
          <Link
            href="/#coaches"
            className="link-ver-todos text-sm font-medium text-[#2D3436]/80 hover:text-[#2D3436] group/link"
          >
            Ver todos los coaches
            <ArrowRight className="w-4 h-4 text-[#D37D52] group-hover/link:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="section-title-island text-center space-y-3 mb-10">
          <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight [letter-spacing:0.02em]">
            <span className="text-[#1E293B]">Nuestros</span>{" "}
            <span className="text-accent-orange font-bold">Coaches</span>
          </h2>
          <p className="text-[#1E293B]/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed tracking-wide">
            Guías expertos en diversas disciplinas espirituales listos para acompañarte en tu camino
          </p>
        </div>

        <SpecialtyFilter
          active={activeFilter}
          options={filterOptions}
          onSelect={setActiveFilter}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 8 }, (_, i) => <CoachSkeletonCard key={i} />)
            : filteredCoaches.map((coach) => (
                <div
                  key={coach.id}
                  className="animate-[fadeSlideIn_0.4s_ease-out_both]"
                >
                  <CoachCard coach={coach} />
                </div>
              ))}
        </div>

        {!isLoading && filteredCoaches.length === 0 && (
          <p className="text-center text-[#1E293B]/75 py-12 tracking-wide leading-relaxed">
            No hay coaches en esta categoría aún.
          </p>
        )}
      </div>
    </section>
  );
}
