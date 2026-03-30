"use client";

import { useState, useCallback } from "react";
import type { CoachDTO, CoachCreateDTO, CoachUpdateDTO } from "@/types/coaches";
import * as api from "@/services/apiService";

/**
 * Estado y acciones para la lista de coaches.
 * Centraliza loading, error y mutaciones; la UI solo consume este hook.
 */
export function useCoaches() {
  const [coaches, setCoaches] = useState<CoachDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCoaches = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.fetchCoaches();
      setCoaches(data);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Error al cargar coaches";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addCoach = useCallback(async (coachData: CoachCreateDTO) => {
    setError(null);
    try {
      const created = await api.createCoach(coachData);
      setCoaches((prev) => [...prev, created]);
      return created;
    } catch (e) {
      const message = e instanceof Error ? e.message : "Error al crear coach";
      setError(message);
      throw e;
    }
  }, []);

  const editCoach = useCallback(
    async (coachId: string, coachData: CoachUpdateDTO) => {
      setError(null);
      try {
        const updated = await api.updateCoach(coachId, coachData);
        setCoaches((prev) =>
          prev.map((c) => (c.id === coachId ? updated : c))
        );
        return updated;
      } catch (e) {
        const message = e instanceof Error ? e.message : "Error al actualizar coach";
        setError(message);
        throw e;
      }
    },
    []
  );

  const removeCoach = useCallback(async (coachId: string) => {
    setError(null);
    try {
      await api.deleteCoach(coachId);
      setCoaches((prev) => prev.filter((c) => c.id !== coachId));
    } catch (e) {
      const message = e instanceof Error ? e.message : "Error al eliminar coach";
      setError(message);
      throw e;
    }
  }, []);

  return {
    coaches,
    isLoading,
    error,
    fetchCoaches,
    addCoach,
    editCoach,
    removeCoach,
  };
}
