"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Pencil, Trash2, Calendar, ArrowLeft, Users, LogOut } from "lucide-react";
import type { EventDTO, EventCreateDTO, EventUpdateDTO } from "@/types/events";
import type { CoachDTO, CoachCreateDTO, CoachUpdateDTO } from "@/types/coaches";
import { useEvents } from "@/hooks/useEvents";
import { useCoaches } from "@/hooks/useCoaches";
import { EventFormModal } from "./EventFormModal";
import { CoachFormModal } from "./CoachFormModal";
import { logout } from "@/actions/auth";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("es-CL", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

type AdminTab = "eventos" | "coaches";

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>("eventos");

  const eventsApi = useEvents();
  const coachesApi = useCoaches();

  const {
    events,
    isLoading: eventsLoading,
    error: eventsError,
    fetchEvents,
    addEvent,
    editEvent,
    removeEvent,
  } = eventsApi;

  const {
    coaches,
    isLoading: coachesLoading,
    error: coachesError,
    fetchCoaches,
    addCoach,
    editCoach,
    removeCoach,
  } = coachesApi;

  const [eventFormOpen, setEventFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventDTO | null>(null);
  const [eventSaving, setEventSaving] = useState(false);

  const [coachFormOpen, setCoachFormOpen] = useState(false);
  const [editingCoach, setEditingCoach] = useState<CoachDTO | null>(null);
  const [coachSaving, setCoachSaving] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  useEffect(() => {
    fetchCoaches();
  }, [fetchCoaches]);

  const handleEventSubmit = async (
    data: EventCreateDTO,
    eventId?: string
  ): Promise<void> => {
    setEventSaving(true);
    try {
      if (eventId) {
        await editEvent(eventId, data as EventUpdateDTO);
      } else {
        await addEvent(data);
      }
      setEventFormOpen(false);
      setEditingEvent(null);
    } finally {
      setEventSaving(false);
    }
  };

  const handleCoachSubmit = async (
    data: CoachCreateDTO,
    coachId?: string
  ): Promise<void> => {
    setCoachSaving(true);
    try {
      if (coachId) {
        await editCoach(coachId, data as CoachUpdateDTO);
      } else {
        await addCoach(data);
      }
      setCoachFormOpen(false);
      setEditingCoach(null);
    } finally {
      setCoachSaving(false);
    }
  };

  const error = activeTab === "eventos" ? eventsError : coachesError;
  const isLoading = activeTab === "eventos" ? eventsLoading : coachesLoading;

  return (
    <div className="min-h-screen bg-slate-50/90">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al sitio
            </Link>
            <h1 className="text-2xl font-semibold text-slate-800">
              Panel administrativo
            </h1>
          </div>
          <button
            onClick={() => logout()}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors cursor-pointer"
            title="Cerrar sesión"
          >
            <LogOut className="w-4 h-4" />
            Cerrar sesión
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-xl bg-slate-200/60 w-fit mb-8">
          <button
            type="button"
            onClick={() => setActiveTab("eventos")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "eventos"
                ? "bg-white text-slate-800 shadow-sm"
                : "text-slate-600 hover:text-slate-800"
            }`}
          >
            <Calendar className="w-4 h-4" />
            Eventos
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("coaches")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "coaches"
                ? "bg-white text-slate-800 shadow-sm"
                : "text-slate-600 hover:text-slate-800"
            }`}
          >
            <Users className="w-4 h-4" />
            Coaches
          </button>
        </div>

        {error && (
          <div
            className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700"
            role="alert"
          >
            {error}
          </div>
        )}

        {activeTab === "eventos" && (
          <>
            <div className="flex justify-end mb-4">
              <button
                type="button"
                onClick={() => {
                  setEditingEvent(null);
                  setEventFormOpen(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#4A7856] text-white hover:bg-[#3d6647] transition-colors"
              >
                <Plus className="w-4 h-4" />
                Nuevo evento
              </button>
            </div>

            {eventsLoading ? (
              <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">
                Cargando eventos...
              </div>
            ) : events.length === 0 ? (
              <div className="rounded-xl border border-slate-200 bg-white p-12 text-center text-slate-500">
                <Calendar className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                <p>No hay eventos. Crea el primero con el botón &quot;Nuevo evento&quot;.</p>
              </div>
            ) : (
              <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50/80">
                        <th className="px-4 py-3 text-sm font-semibold text-slate-700">Fecha</th>
                        <th className="px-4 py-3 text-sm font-semibold text-slate-700">Título</th>
                        <th className="px-4 py-3 text-sm font-semibold text-slate-700">Tipo</th>
                        <th className="px-4 py-3 text-sm font-semibold text-slate-700">Coach</th>
                        <th className="px-4 py-3 text-sm font-semibold text-slate-700">Precio</th>
                        <th className="px-4 py-3 text-sm font-semibold text-slate-700 w-24">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {events.map((event) => (
                        <tr
                          key={event.id}
                          className="border-b border-slate-100 hover:bg-slate-50/50"
                        >
                          <td className="px-4 py-3 text-sm text-slate-600 whitespace-nowrap">
                            {formatDate(event.date)}
                          </td>
                          <td className="px-4 py-3 text-sm font-medium text-slate-800">
                            {event.title}
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-600">{event.type}</td>
                          <td className="px-4 py-3 text-sm text-slate-600">
                            {event.coachName}
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-600">
                            {event.currency} {event.price}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingEvent(event);
                                  setEventFormOpen(true);
                                }}
                                className="p-2 rounded-lg text-slate-600 hover:bg-slate-200 hover:text-slate-800"
                                aria-label={`Editar ${event.title}`}
                              >
                                <Pencil className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={async () => {
                                  if (!confirm(`¿Eliminar evento "${event.title}"?`)) return;
                                  try {
                                    await removeEvent(event.id);
                                  } catch {
                                    /**/
                                  }
                                }}
                                className="p-2 rounded-lg text-red-600 hover:bg-red-50"
                                aria-label={`Eliminar ${event.title}`}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <EventFormModal
              open={eventFormOpen}
              onClose={() => {
                setEventFormOpen(false);
                setEditingEvent(null);
              }}
              onSubmit={handleEventSubmit}
              initialData={editingEvent}
              isSaving={eventSaving}
              error={eventsError}
            />
          </>
        )}

        {activeTab === "coaches" && (
          <>
            <div className="flex justify-end mb-4">
              <button
                type="button"
                onClick={() => {
                  setEditingCoach(null);
                  setCoachFormOpen(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#4A7856] text-white hover:bg-[#3d6647] transition-colors"
              >
                <Plus className="w-4 h-4" />
                Nuevo coach
              </button>
            </div>

            {coachesLoading ? (
              <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">
                Cargando coaches...
              </div>
            ) : coaches.length === 0 ? (
              <div className="rounded-xl border border-slate-200 bg-white p-12 text-center text-slate-500">
                <Users className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                <p>No hay coaches. Crea el primero con el botón &quot;Nuevo coach&quot;.</p>
              </div>
            ) : (
              <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50/80">
                        <th className="px-4 py-3 text-sm font-semibold text-slate-700 w-16">
                          Foto
                        </th>
                        <th className="px-4 py-3 text-sm font-semibold text-slate-700">
                          Nombre
                        </th>
                        <th className="px-4 py-3 text-sm font-semibold text-slate-700">
                          Rol
                        </th>
                        <th className="px-4 py-3 text-sm font-semibold text-slate-700">
                          Especialidades
                        </th>
                        <th className="px-4 py-3 text-sm font-semibold text-slate-700 w-24">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {coaches.map((coach) => (
                        <tr
                          key={coach.id}
                          className="border-b border-slate-100 hover:bg-slate-50/50"
                        >
                          <td className="px-4 py-3">
                            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-200 shrink-0">
                              <Image
                                src={coach.imageUrl}
                                alt={coach.name}
                                fill
                                className="object-cover"
                                sizes="40px"
                              />
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm font-medium text-slate-800">
                            {coach.name}
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-600">
                            {coach.role}
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-600">
                            <div className="flex flex-wrap gap-1">
                              {coach.specialties.slice(0, 3).map((s) => (
                                <span
                                  key={s}
                                  className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-700"
                                >
                                  {s}
                                </span>
                              ))}
                              {coach.specialties.length > 3 && (
                                <span className="text-[10px] text-slate-500">
                                  +{coach.specialties.length - 3}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingCoach(coach);
                                  setCoachFormOpen(true);
                                }}
                                className="p-2 rounded-lg text-slate-600 hover:bg-slate-200 hover:text-slate-800"
                                aria-label={`Editar ${coach.name}`}
                              >
                                <Pencil className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={async () => {
                                  if (!confirm(`¿Eliminar coach "${coach.name}"?`)) return;
                                  try {
                                    await removeCoach(coach.id);
                                  } catch {
                                    /**/
                                  }
                                }}
                                className="p-2 rounded-lg text-red-600 hover:bg-red-50"
                                aria-label={`Eliminar ${coach.name}`}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <CoachFormModal
              open={coachFormOpen}
              onClose={() => {
                setCoachFormOpen(false);
                setEditingCoach(null);
              }}
              onSubmit={handleCoachSubmit}
              initialData={editingCoach}
              isSaving={coachSaving}
              error={coachesError}
            />
          </>
        )}
      </div>
    </div>
  );
}
