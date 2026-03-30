"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Radio, Instagram } from "lucide-react";
import type { EventDTO, EventTypeDTO } from "@/types/events";
import { useEvents } from "@/hooks/useEvents";
import { BookingModal } from "@/components/events/BookingModal";

function EventTypeBadge({ type }: { type: EventTypeDTO }) {
  const isLive = type === "En Vivo";
  return (
    <span
      className={`shrink-0 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${
        isLive
          ? "bg-red-500/10 text-red-700 border-red-500/30"
          : "bg-[#4A7856]/10 text-[#1E293B] border-[#4A7856]/30"
      }`}
    >
      {isLive && <Radio className="w-2.5 h-2.5 inline-block mr-0.5 -mt-px" />}
      {type}
    </span>
  );
}

/** Formatea date ISO a día y mes para la cabecera de la tarjeta */
function formatEventDate(iso: string): { dateDay: string; dateMonth: string } {
  const d = new Date(iso);
  const months = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
  return {
    dateDay: String(d.getDate()),
    dateMonth: months[d.getMonth()] ?? "—",
  };
}

function EventSkeletonCard() {
  return (
    <div
      className="relative flex flex-col h-full bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl p-6 animate-pulse"
      style={{ zIndex: 1 }}
      aria-hidden
    >
      <div className="flex items-start justify-between gap-3">
        <div className="w-14 h-14 shrink-0 rounded-xl bg-slate-200/50" />
        <div className="w-24 h-6 shrink-0 rounded-full bg-slate-200/50" />
      </div>
      <div className="w-3/4 h-7 rounded-md bg-slate-200/50 mt-5" />
      <div className="w-full h-4 rounded-md bg-slate-200/50 mt-3" />
      <div className="w-5/6 h-4 rounded-md bg-slate-200/50 mt-2" />
      <div className="mt-auto pt-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-10 h-10 shrink-0 rounded-full bg-slate-200/50" />
          <div className="w-32 h-4 rounded-md bg-slate-200/50" />
        </div>
        <div className="w-28 h-5 shrink-0 rounded-md bg-slate-200/50 ml-auto" />
      </div>
    </div>
  );
}

function EventCard({
  event,
  onReserve,
}: {
  event: EventDTO;
  onReserve: () => void;
}) {
  const { dateDay, dateMonth } = formatEventDate(event.date);
  const priceLabel = `${event.currency} ${event.price}`;

  return (
    <article
      className="relative flex flex-col h-full bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-lg shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:bg-white/80 hover:shadow-xl"
      style={{ zIndex: 1 }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col items-center justify-center w-14 h-14 shrink-0 rounded-xl bg-[#4A7856]/15 border border-[#4A7856]/25 text-[#4A7856]">
          <span className="text-lg font-bold leading-tight">{dateDay}</span>
          <span className="text-[10px] font-semibold uppercase tracking-wider">
            {dateMonth}
          </span>
        </div>
        <EventTypeBadge type={event.type} />
      </div>

      <h3
        className="font-bold text-lg mt-4 mb-2 text-slate-800 leading-snug tracking-wide"
        style={{ textShadow: "0 1px 2px rgba(255,255,255,0.8)" }}
      >
        {event.title}
      </h3>
      <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
        {event.description}
      </p>

      <div className="mt-auto pt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          {event.coachImage ? (
            <div className="relative w-10 h-10 shrink-0 rounded-full overflow-hidden border border-white/60 bg-slate-200">
              <Image
                src={event.coachImage}
                alt={event.coachName}
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
          ) : (
            <div className="w-10 h-10 shrink-0 rounded-full bg-[#4A7856]/20 flex items-center justify-center text-[#4A7856] text-sm font-medium">
              {event.coachName.charAt(0)}
            </div>
          )}
          <span className="text-sm font-medium text-slate-700 truncate">
            con {event.coachName}
          </span>
        </div>
        <div className="flex flex-col items-end gap-1">
          <button
            type="button"
            onClick={onReserve}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#D37D52] hover:text-[#c26a42] transition-colors duration-300 group/cta"
            aria-label={`Reservar lugar por ${priceLabel}`}
          >
            Reservar lugar — {priceLabel}
            <ArrowRight className="w-3.5 h-3.5 group-hover/cta:translate-x-0.5 transition-transform shrink-0" />
          </button>
          {event.instagramHandle && (
            <a
              href={`https://www.instagram.com/${event.instagramHandle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-[#E1306C]"
            >
              <Instagram className="w-3 h-3" />
              Instagram
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function UpcomingEventsSection() {
  const { events, isLoading, fetchEvents } = useEvents();
  const [bookingEvent, setBookingEvent] = useState<EventDTO | null>(null);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return (
    <section
      id="eventos"
      className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12 md:py-24"
      aria-labelledby="eventos-heading"
    >
      <div className="relative z-10">
        <div className="section-title-island text-center space-y-3 mb-10">
          <h2
            id="eventos-heading"
            className="font-serif text-3xl md:text-4xl font-bold tracking-tight [letter-spacing:0.02em]"
          >
            <span
              className="text-slate-800"
              style={{ textShadow: "0 1px 2px rgba(255,255,255,0.8)" }}
            >
              Próximos
            </span>{" "}
            <span className="text-accent-orange font-bold">Eventos</span>
          </h2>
          <p className="text-slate-700/90 text-sm sm:text-base max-w-xl mx-auto leading-relaxed tracking-wide">
            Acompaña a nuestros guías en sesiones en vivo, masterclasses y retiros
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {isLoading
            ? [1, 2, 3].map((key) => <EventSkeletonCard key={key} />)
            : events.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onReserve={() => setBookingEvent(event)}
                />
              ))}
        </div>
      </div>

      <BookingModal
        open={bookingEvent !== null}
        onClose={() => setBookingEvent(null)}
        event={bookingEvent}
      />
    </section>
  );
}
