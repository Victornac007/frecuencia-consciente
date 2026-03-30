"use client";

import { useState, useCallback } from "react";
import type { EventDTO, EventCreateDTO, EventUpdateDTO } from "@/types/events";
import * as api from "@/services/apiService";

/**
 * Estado y acciones para la lista de eventos.
 * Centraliza loading, error y mutaciones para que la UI solo consuma este hook.
 */
export function useEvents() {
  const [events, setEvents] = useState<EventDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.fetchEvents();
      setEvents(data);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Error al cargar eventos";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addEvent = useCallback(async (eventData: EventCreateDTO) => {
    setError(null);
    try {
      const created = await api.createEvent(eventData);
      setEvents((prev) => [...prev, created]);
      return created;
    } catch (e) {
      const message = e instanceof Error ? e.message : "Error al crear evento";
      setError(message);
      throw e;
    }
  }, []);

  const editEvent = useCallback(
    async (eventId: string, eventData: EventUpdateDTO) => {
      setError(null);
      try {
        const updated = await api.updateEvent(eventId, eventData);
        setEvents((prev) =>
          prev.map((e) => (e.id === eventId ? updated : e))
        );
        return updated;
      } catch (e) {
        const message = e instanceof Error ? e.message : "Error al actualizar evento";
        setError(message);
        throw e;
      }
    },
    []
  );

  const removeEvent = useCallback(async (eventId: string) => {
    setError(null);
    try {
      await api.deleteEvent(eventId);
      setEvents((prev) => prev.filter((e) => e.id !== eventId));
    } catch (e) {
      const message = e instanceof Error ? e.message : "Error al eliminar evento";
      setError(message);
      throw e;
    }
  }, []);

  return {
    events,
    isLoading,
    error,
    fetchEvents,
    addEvent,
    editEvent,
    removeEvent,
  };
}
