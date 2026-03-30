"use client";

import { useEffect, useState } from "react";
import type { EventDTO, EventCreateDTO, EventTypeDTO } from "@/types/events";

const EVENT_TYPES: EventTypeDTO[] = ["En Vivo", "Masterclass", "Retiro", "Taller"];
const CURRENCIES = ["USD", "CLP"];

/** Convierte ISO a datetime-local (sin Z, para input) */
function toDatetimeLocal(iso: string): string {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** Convierte datetime-local a ISO 8601 */
function fromDatetimeLocal(value: string): string {
  return new Date(value).toISOString();
}

type EventFormModalProps = {
  open: boolean;
  onClose: () => void;
  /** Al editar, se pasa eventId como segundo argumento. Cerrar modal solo tras éxito. */
  onSubmit: (data: EventCreateDTO, eventId?: string) => Promise<void>;
  initialData?: EventDTO | null;
  isSaving: boolean;
  error: string | null;
};

const emptyForm: EventCreateDTO = {
  title: "",
  date: new Date().toISOString(),
  duration: 60,
  type: "Taller",
  coachName: "",
  description: "",
  price: 0,
  currency: "USD",
  maxCapacity: 30,
  imageUrl: "",
  coachImage: "",
  instagramHandle: "",
};

export function EventFormModal({
  open,
  onClose,
  onSubmit,
  initialData,
  isSaving,
  error,
}: EventFormModalProps) {
  const [form, setForm] = useState<EventCreateDTO>(emptyForm);

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title,
        date: initialData.date,
        duration: initialData.duration,
        type: initialData.type,
        coachName: initialData.coachName,
        description: initialData.description,
        price: initialData.price,
        currency: initialData.currency,
        maxCapacity: initialData.maxCapacity,
        imageUrl: initialData.imageUrl ?? "",
        coachImage: initialData.coachImage ?? "",
        instagramHandle: initialData.instagramHandle ?? "",
      });
    } else {
      setForm({ ...emptyForm, date: new Date().toISOString() });
    }
  }, [initialData, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: EventCreateDTO = {
      ...form,
      imageUrl: form.imageUrl || undefined,
      coachImage: form.coachImage || undefined,
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
      aria-labelledby="event-form-title"
    >
      <div
        className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-slate-200">
          <h2 id="event-form-title" className="text-xl font-semibold text-slate-800">
            {initialData ? "Editar evento" : "Nuevo evento"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 text-red-700 text-sm" role="alert">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="event-title" className="block text-sm font-medium text-slate-700 mb-1">
              Título
            </label>
            <input
              id="event-title"
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#4A7856]/40 focus:border-[#4A7856]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="event-date" className="block text-sm font-medium text-slate-700 mb-1">
                Fecha y hora (ISO 8601)
              </label>
              <input
                id="event-date"
                type="datetime-local"
                required
                value={form.date ? toDatetimeLocal(form.date) : ""}
                onChange={(e) => setForm((f) => ({ ...f, date: fromDatetimeLocal(e.target.value) }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#4A7856]/40"
              />
            </div>
            <div>
              <label htmlFor="event-duration" className="block text-sm font-medium text-slate-700 mb-1">
                Duración (min)
              </label>
              <input
                id="event-duration"
                type="number"
                min={1}
                required
                value={form.duration}
                onChange={(e) => setForm((f) => ({ ...f, duration: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#4A7856]/40"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="event-type" className="block text-sm font-medium text-slate-700 mb-1">
                Tipo
              </label>
              <select
                id="event-type"
                value={form.type}
                onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as EventTypeDTO }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#4A7856]/40"
              >
                {EVENT_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="event-coach" className="block text-sm font-medium text-slate-700 mb-1">
                Coach (nombre)
              </label>
              <input
                id="event-coach"
                type="text"
                required
                value={form.coachName}
                onChange={(e) => setForm((f) => ({ ...f, coachName: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#4A7856]/40"
              />
            </div>
          </div>

          <div>
            <label htmlFor="event-description" className="block text-sm font-medium text-slate-700 mb-1">
              Descripción
            </label>
            <textarea
              id="event-description"
              rows={3}
              required
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#4A7856]/40 resize-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="event-price" className="block text-sm font-medium text-slate-700 mb-1">
                Precio
              </label>
              <input
                id="event-price"
                type="number"
                min={0}
                step={0.01}
                required
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#4A7856]/40"
              />
            </div>
            <div>
              <label htmlFor="event-currency" className="block text-sm font-medium text-slate-700 mb-1">
                Moneda
              </label>
              <select
                id="event-currency"
                value={form.currency}
                onChange={(e) => setForm((f) => ({ ...f, currency: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#4A7856]/40"
              >
                {CURRENCIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="event-capacity" className="block text-sm font-medium text-slate-700 mb-1">
                Aforo máx.
              </label>
              <input
                id="event-capacity"
                type="number"
                min={1}
                required
                value={form.maxCapacity}
                onChange={(e) => setForm((f) => ({ ...f, maxCapacity: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#4A7856]/40"
              />
            </div>
          </div>

          <div>
            <label htmlFor="event-imageUrl" className="block text-sm font-medium text-slate-700 mb-1">
              URL imagen evento (opcional)
            </label>
            <input
              id="event-imageUrl"
              type="url"
              value={form.imageUrl ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#4A7856]/40"
            />
          </div>
          <div>
            <label htmlFor="event-coachImage" className="block text-sm font-medium text-slate-700 mb-1">
              URL foto coach (opcional)
            </label>
            <input
              id="event-coachImage"
              type="url"
              value={form.coachImage ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, coachImage: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#4A7856]/40"
            />
          </div>
          <div>
            <label htmlFor="event-instagram" className="block text-sm font-medium text-slate-700 mb-1">
              Instagram handle (opcional)
            </label>
            <input
              id="event-instagram"
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
              {isSaving ? "Guardando..." : initialData ? "Guardar cambios" : "Crear evento"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
