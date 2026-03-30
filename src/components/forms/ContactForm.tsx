"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { GoldButton } from "@/components/ui";
import { CONTACT_SUBJECTS } from "@/data/content";

const INPUT_BASE =
  "w-full px-4 py-3 rounded-xl bg-white/80 border border-slate-200 text-[#2d3a2e] placeholder-slate-400 text-sm focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/15 transition-all";

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-10">
        <CheckCircle className="w-12 h-12 text-brand-green mx-auto mb-4" />
        <h4 className="text-lg font-bold text-[#2d3a2e] mb-2">
          Mensaje enviado
        </h4>
        <p className="text-sm text-[#2d3a2e]/55">
          Gracias por contactarnos. Te responderemos lo antes posible.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm text-slate-600 mb-1.5">
            Nombre
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Tu nombre"
            className={INPUT_BASE}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm text-slate-600 mb-1.5"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="tu@email.com"
            className={INPUT_BASE}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="subject"
          className="block text-sm text-slate-600 mb-1.5"
        >
          Asunto
        </label>
        <select id="subject" name="subject" required className={`${INPUT_BASE} cursor-pointer`}>
          <option value="" className="bg-white">
            Selecciona un asunto
          </option>
          {CONTACT_SUBJECTS.map((subject) => (
            <option key={subject} value={subject} className="bg-white">
              {subject}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm text-slate-600 mb-1.5"
        >
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Cuéntanos tu propuesta o consulta..."
          className={`${INPUT_BASE} resize-none`}
        />
      </div>

      <GoldButton type="submit" className="mt-2">
        <Send className="w-4 h-4" />
        Enviar mensaje
      </GoldButton>
    </form>
  );
}
