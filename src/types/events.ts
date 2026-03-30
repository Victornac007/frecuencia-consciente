/**
 * Contratos de datos para Eventos y Reservas.
 * Estos esquemas definen el formato esperado por la API (REST o GraphQL).
 * El backend debe devolver/aceptar exactamente estas estructuras.
 */

/** Tipo de evento (alineado con el dominio) */
export type EventTypeDTO = "En Vivo" | "Masterclass" | "Retiro" | "Taller";

/**
 * DTO de Evento — contrato para la API de eventos.
 * Endpoints esperados: GET /events, POST /events, PUT /events/:id, DELETE /events/:id
 */
export interface EventDTO {
  /** Identificador único (UUID recomendado en backend real) */
  id: string;
  /** Título del evento */
  title: string;
  /** Fecha y hora en formato ISO 8601 (ej. "2026-03-15T19:00:00.000Z") */
  date: string;
  /** Duración en minutos */
  duration: number;
  /** Tipo de evento */
  type: EventTypeDTO;
  /** ID del coach en backend; en mock puede usarse nombre para simplificar */
  coachId?: string;
  /** Nombre del coach (para mostrar en UI si el backend no devuelve relación expandida) */
  coachName: string;
  /** Descripción del evento */
  description: string;
  /** Precio numérico (ej. 25.00) */
  price: number;
  /** Código de moneda ISO (ej. "USD", "CLP") */
  currency: string;
  /** Aforo máximo */
  maxCapacity: number;
  /** URL de imagen del evento (opcional) */
  imageUrl?: string;
  /** URL de foto del coach (opcional, para UI; puede venir de API de coaches) */
  coachImage?: string;
  /** Handle de Instagram del coach (opcional, para CTA secundario) */
  instagramHandle?: string;
}

/**
 * DTO para crear/actualizar evento (sin id en creación).
 * POST /events body | PUT /events/:id body
 */
export type EventCreateDTO = Omit<EventDTO, "id">;
export type EventUpdateDTO = Partial<Omit<EventDTO, "id">>;

/**
 * DTO de Reserva — contrato para la API de reservas.
 * Endpoint: POST /bookings
 */
export interface BookingDTO {
  /** ID del evento a reservar */
  eventId: string;
  /** Nombre completo del usuario */
  userName: string;
  /** Email del usuario */
  userEmail: string;
  /** Teléfono del usuario */
  userPhone: string;
}
