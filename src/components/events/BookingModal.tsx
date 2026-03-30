"use client";

import { useState } from "react";
import type { EventDTO, BookingDTO } from "@/types/events";
import { createBooking } from "@/services/apiService";

type BookingModalProps = {
  open: boolean;
  onClose: () => void;
  event: EventDTO | null;
};

const initialForm: BookingDTO = {
  eventId: "",
  userName: "",
  userEmail: "",
  userPhone: "",
};

export function BookingModal({ open, onClose, event }: BookingModalProps) {
  const [form, setForm] = useState<BookingDTO>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const reset = () => {
    setForm(initialForm);
    setError(null);
    setSuccess(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event) return;
    setError(null);
    setIsSubmitting(true);
    try {
      const payload: BookingDTO = {
        eventId: event.id,
        userName: form.userName,
        userEmail: form.userEmail,
        userPhone: form.userPhone,
      };
      await createBooking(payload);
      setSuccess(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al procesar la reserva");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  const title = event?.title ?? "Reserva";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div
        className="w-full max-w-md bg-white/90 backdrop-blur-xl border border-white/60 rounded-3xl shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-white/40">
          <h2
            id="booking-modal-title"
            className="text-xl font-semibold text-slate-800"
          >
            Reservar lugar — {title}
          </h2>
          {event && (
            <p className="mt-1 text-sm text-slate-600">
              {event.currency} {event.price} · con {event.coachName}
            </p>
          )}
        </div>

        {success ? (
          <div className="p-6 space-y-4">
            <div
              className="p-4 rounded-xl bg-[#4A7856]/10 border border-[#4A7856]/30 text-[#2d5a36]"
              role="status"
            >
              <p className="font-medium">Reserva registrada correctamente.</p>
              <p className="mt-2 text-sm">
                El siguiente paso será el pago. Te contactaremos a{" "}
                <strong>{form.userEmail}</strong> con las instrucciones.
              </p>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="w-full py-3 rounded-xl bg-[#4A7856] text-white font-medium hover:bg-[#3d6647] transition-colors"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div
                className="p-3 rounded-lg bg-red-50 text-red-700 text-sm"
                role="alert"
              >
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="booking-name"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Nombre completo
              </label>
              <input
                id="booking-name"
                type="text"
                required
                value={form.userName}
                onChange={(e) =>
                  setForm((f) => ({ ...f, userName: e.target.value }))
                }
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white/80 focus:ring-2 focus:ring-[#4A7856]/40 focus:border-[#4A7856]"
              />
            </div>
            <div>
              <label
                htmlFor="booking-email"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Email
              </label>
              <input
                id="booking-email"
                type="email"
                required
                value={form.userEmail}
                onChange={(e) =>
                  setForm((f) => ({ ...f, userEmail: e.target.value }))
                }
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white/80 focus:ring-2 focus:ring-[#4A7856]/40 focus:border-[#4A7856]"
              />
            </div>
            <div>
              <label
                htmlFor="booking-phone"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Teléfono
              </label>
              <input
                id="booking-phone"
                type="tel"
                required
                value={form.userPhone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, userPhone: e.target.value }))
                }
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white/80 focus:ring-2 focus:ring-[#4A7856]/40 focus:border-[#4A7856]"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                className="flex-1 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3 rounded-xl bg-[#4A7856] text-white font-medium hover:bg-[#3d6647] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Procesando..." : "Reservar"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
