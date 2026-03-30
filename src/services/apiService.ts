/**
 * Capa de acceso a datos — puente con el backend.
 * Ningún componente debe hacer fetch/axios directamente; todos usan estas funciones.
 *
 * CONEXIÓN BACKEND REAL:
 * - Sustituir el store in-memory por llamadas a BASE_URL.
 * - Eventos: GET/POST/PUT/DELETE ${BASE_URL}/events, POST ${BASE_URL}/bookings
 * - Coaches: GET ${BASE_URL}/coaches, POST ${BASE_URL}/coaches, PUT ${BASE_URL}/coaches/:id, DELETE ${BASE_URL}/coaches/:id
 */

import type { EventDTO, EventCreateDTO, EventUpdateDTO, BookingDTO } from "@/types/events";
import type { CoachDTO, CoachCreateDTO, CoachUpdateDTO } from "@/types/coaches";
import { UPCOMING_EVENTS, COACHES } from "@/data/mock";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api/mock";
const SIMULATED_LATENCY_MS = 800;

/** Simula latencia de red */
function delay(ms: number = SIMULATED_LATENCY_MS): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Convierte eventos mock (formato legacy) a EventDTO para el almacén inicial.
 * En backend real este mapeo no existirá; la API devolverá ya EventDTO.
 */
function mockToEventDTO(
  e: (typeof UPCOMING_EVENTS)[number],
  index: number
): EventDTO {
  const year = 2026;
  const monthMap: Record<string, number> = { MAR: 2, ABR: 3, MAY: 4, JUN: 5 };
  const month = monthMap[e.dateMonth] ?? 3;
  const day = parseInt(e.dateDay, 10) || 15;
  const date = new Date(Date.UTC(year, month, day, 19, 0, 0, 0)).toISOString();

  return {
    id: e.id,
    title: e.title,
    date,
    duration: e.type === "Masterclass" ? 120 : 60,
    type: e.type,
    coachName: e.coachName,
    description: e.description,
    price: 25 + index * 5,
    currency: "USD",
    maxCapacity: 30,
    imageUrl: undefined,
    coachImage: e.coachImage,
    instagramHandle: e.instagramHandle,
  };
}

/** Almacén in-memory para modo mock. Reemplazar por llamadas HTTP en producción. */
let eventsStore: EventDTO[] = UPCOMING_EVENTS.map(mockToEventDTO);

/**
 * Obtiene todos los eventos.
 * BACKEND: GET ${BASE_URL}/events
 */
export async function fetchEvents(): Promise<EventDTO[]> {
  await delay();
  // Simulación de error ocasional (descomentar para probar UI de error):
  // if (Math.random() < 0.2) throw new Error("Error de red simulado");
  return [...eventsStore];
}

/**
 * Crea un evento.
 * BACKEND: POST ${BASE_URL}/events con body EventCreateDTO
 */
export async function createEvent(eventData: EventCreateDTO): Promise<EventDTO> {
  await delay();
  const id = `ev-${Date.now()}`;
  const newEvent: EventDTO = { ...eventData, id };
  eventsStore = [...eventsStore, newEvent];
  return newEvent;
}

/**
 * Actualiza un evento existente.
 * BACKEND: PUT ${BASE_URL}/events/:eventId con body EventUpdateDTO
 */
export async function updateEvent(
  eventId: string,
  eventData: EventUpdateDTO
): Promise<EventDTO> {
  await delay();
  const index = eventsStore.findIndex((e) => e.id === eventId);
  if (index === -1) throw new Error("Evento no encontrado");
  const updated: EventDTO = { ...eventsStore[index], ...eventData, id: eventId };
  eventsStore = eventsStore.slice(0, index).concat(updated, eventsStore.slice(index + 1));
  return updated;
}

/**
 * Elimina un evento.
 * BACKEND: DELETE ${BASE_URL}/events/:eventId
 */
export async function deleteEvent(eventId: string): Promise<void> {
  await delay();
  const index = eventsStore.findIndex((e) => e.id === eventId);
  if (index === -1) throw new Error("Evento no encontrado");
  eventsStore = eventsStore.filter((e) => e.id !== eventId);
}

/**
 * Crea una reserva para un evento.
 * BACKEND: POST ${BASE_URL}/bookings con body BookingDTO
 */
export async function createBooking(bookingData: BookingDTO): Promise<{ success: boolean; bookingId?: string }> {
  await delay();
  // Simulación de error ocasional (descomentar para probar):
  // if (Math.random() < 0.15) throw new Error("No se pudo procesar la reserva");
  const bookingId = `bk-${Date.now()}`;
  return { success: true, bookingId };
}

// ——— COACHES (BACKEND: reemplazar por GET/POST/PUT/DELETE ${BASE_URL}/coaches) ———

function extractInstagramHandle(url: string): string {
  try {
    const u = new URL(url);
    const path = u.pathname.replace(/^\//, "").split("/")[0];
    return path || "";
  } catch {
    return "";
  }
}

/** Convierte Coach mock a CoachDTO para el almacén inicial */
function mockToCoachDTO(c: (typeof COACHES)[number]): CoachDTO {
  const rating =
    c.reviews.length > 0
      ? c.reviews.reduce((s, r) => s + r.rating, 0) / c.reviews.length
      : 0;
  const ig = c.socials.find((s) => s.platform === "instagram");
  return {
    id: c.id,
    name: c.name,
    role: c.role,
    bio: c.bio,
    imageUrl: c.image,
    rating: Math.round(rating * 10) / 10,
    reviewCount: c.reviews.length,
    specialties: [...c.specialties],
    instagramHandle: ig ? extractInstagramHandle(ig.url) : undefined,
  };
}

let coachesStore: CoachDTO[] = COACHES.map(mockToCoachDTO);

export async function fetchCoaches(): Promise<CoachDTO[]> {
  await delay();
  return [...coachesStore];
}

export async function createCoach(coachData: CoachCreateDTO): Promise<CoachDTO> {
  await delay();
  const id = `coach-${Date.now()}`;
  const newCoach: CoachDTO = { ...coachData, id };
  coachesStore = [...coachesStore, newCoach];
  return newCoach;
}

export async function updateCoach(
  coachId: string,
  coachData: CoachUpdateDTO
): Promise<CoachDTO> {
  await delay();
  const index = coachesStore.findIndex((c) => c.id === coachId);
  if (index === -1) throw new Error("Coach no encontrado");
  const updated: CoachDTO = { ...coachesStore[index], ...coachData, id: coachId };
  coachesStore = coachesStore.slice(0, index).concat(updated, coachesStore.slice(index + 1));
  return updated;
}

export async function deleteCoach(coachId: string): Promise<void> {
  await delay();
  const index = coachesStore.findIndex((c) => c.id === coachId);
  if (index === -1) throw new Error("Coach no encontrado");
  coachesStore = coachesStore.filter((c) => c.id !== coachId);
}

/** BACKEND: GET ${BASE_URL}/coaches/:id — para página de detalle */
export async function getCoachById(coachId: string): Promise<CoachDTO | null> {
  await delay();
  const coach = coachesStore.find((c) => c.id === coachId);
  return coach ? { ...coach } : null;
}
