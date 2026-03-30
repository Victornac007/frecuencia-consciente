"use client";

import { useEffect, useState } from "react";
import type { CoachDTO, CoachCreateDTO } from "@/types/coaches";

/** Parsea "a, b, c" en array de strings sin vacíos */
function parseSpecialties(value: string): string[] {
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function formatSpecialties(specs: string[]): string {
  return specs.join(", ");
}

type CoachFormModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CoachCreateDTO, coachId?: string) => Promise<void>;
  initialData?: CoachDTO | null;
  isSaving: boolean;
  error: string | null;
};

const emptyForm: CoachCreateDTO = {
  name: "",
  role: "",
  bio: "",
  imageUrl: "",
  rating: 0,
  reviewCount: 0,
  specialties: [],
  instagramHandle: "",
};

export function CoachFormModal({
  open,
  onClose,
  onSubmit,
  initialData,
  isSaving,
  error,
}: CoachFormModalProps) {
  const [form, setForm] = useState<CoachCreateDTO>(emptyForm);
  const [specialtiesInput, setSpecialtiesInput] = useState("");

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name,
        role: initialData.role,
        bio: initialData.bio,
        imageUrl: initialData.imageUrl,
        rating: initialData.rating,
        reviewCount: initialData.reviewCount,
        specialties: initialData.specialties,
        instagramHandle: initialData.instagramHandle ?? "",
      });
      setSpecialtiesInput(formatSpecialties(initialData.specialties));
    } else {
      setForm({ ...emptyForm });
      setSpecialtiesInput("");
    }
  }, [initialData, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const specs = parseSpecialties(specialtiesInput);
    const payload: CoachCreateDTO = {
      ...form,
      specialties: specs,
      instagramHandle: form.instagramHandle || undefined,
    };
    await onSubmit(payload, initialData?.id);
    onClose();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="coach-form-title"
    >
      <div
        className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-slate-200">
          <h2 id="coach-form-title" className="text-xl font-semibold text-slate-800">
            {initialData ? "Editar coach" : "Nuevo coach"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 text-red-700 text-sm" role="alert">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="coach-name" className="block text-sm font-medium text-slate-700 mb-1">
              Nombre
            </label>
            <input
              id="coach-name"
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#4A7856]/40 focus:border-[#4A7856]"
            />
          </div>

          <div>
            <label htmlFor="coach-role" className="block text-sm font-medium text-slate-700 mb-1">
              Rol (ej. Instructor de Yoga)
            </label>
            <input
              id="coach-role"
              type="text"
              required
              value={form.role}
              onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#4A7856]/40"
            />
          </div>

          <div>
            <label htmlFor="coach-bio" className="block text-sm font-medium text-slate-700 mb-1">
              Bio
            </label>
            <textarea
              id="coach-bio"
              rows={3}
              required
              value={form.bio}
              onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#4A7856]/40 resize-none"
            />
          </div>

          <div>
            <label htmlFor="coach-imageUrl" className="block text-sm font-medium text-slate-700 mb-1">
              URL de imagen
            </label>
            <input
              id="coach-imageUrl"
              type="url"
              required
              value={form.imageUrl}
              onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#4A7856]/40"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="coach-rating" className="block text-sm font-medium text-slate-700 mb-1">
                Valoración (0–5)
              </label>
              <input
                id="coach-rating"
                type="number"
                min={0}
                max={5}
                step={0.1}
                value={form.rating}
                onChange={(e) => setForm((f) => ({ ...f, rating: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#4A7856]/40"
              />
            </div>
            <div>
              <label htmlFor="coach-reviewCount" className="block text-sm font-medium text-slate-700 mb-1">
                Nº de reseñas
              </label>
              <input
                id="coach-reviewCount"
                type="number"
                min={0}
                value={form.reviewCount}
                onChange={(e) => setForm((f) => ({ ...f, reviewCount: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#4A7856]/40"
              />
            </div>
          </div>

          <div>
            <label htmlFor="coach-specialties" className="block text-sm font-medium text-slate-700 mb-1">
              Especialidades (separadas por comas; alimentan los filtros)
            </label>
            <input
              id="coach-specialties"
              type="text"
              placeholder="Yin Yoga, Yoga Nidra, Meditación"
              value={specialtiesInput}
              onChange={(e) => setSpecialtiesInput(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#4A7856]/40"
            />
          </div>

          <div>
            <label htmlFor="coach-instagram" className="block text-sm font-medium text-slate-700 mb-1">
              Instagram (handle sin @, opcional)
            </label>
            <input
              id="coach-instagram"
              type="text"
              placeholder="usuario"
              value={form.instagramHandle ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, instagramHandle: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#4A7856]/40"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 rounded-lg bg-[#4A7856] text-white hover:bg-[#3d6647] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? "Guardando..." : initialData ? "Guardar cambios" : "Crear coach"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
