"use client";

import { Send, Sparkles } from "lucide-react";
import { GlassCard, GoldButton } from "@/components/ui";
import { SOCIAL_LINKS } from "@/data/social";

export function NewsletterSection() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-12 md:py-28">
      <GlassCard variant="strong" padding="lg" className="text-center">
        <div className="py-4 md:py-6">
          <div className="flex justify-center mb-5">
            <div className="w-14 h-14 rounded-full bg-[#FAF9F6] border border-[#4A7856]/30 flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-[#4A7856]" />
            </div>
          </div>

          <div className="section-title-island mb-8">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#2D3436] mb-3">
              Únete a la <span className="text-accent-orange italic">Comunidad</span>
            </h2>

            <p className="text-[#2D3436]/90 mb-0 max-w-md mx-auto leading-relaxed">
              Recibe contenido exclusivo, meditaciones guiadas y notificaciones de
              nuevos programas directamente en tu correo.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              name="newsletter_email"
              id="newsletter_email"
              required
              placeholder="Tu correo electrónico"
              aria-label="Tu correo electrónico"
              className="flex-1 px-5 py-3 rounded-full bg-white/80 border border-brand-green/20 text-[#2d3a2e] placeholder-[#2d3a2e]/55 focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/15 transition-all text-sm"
            />
            <GoldButton type="submit">
              <Send className="w-4 h-4" />
              Suscribirse
            </GoldButton>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-200/40">
            <p className="text-sm text-[#1e2a1f] mb-5">
              Síguenos en redes sociales
            </p>
            <div className="flex items-center justify-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="group/social w-11 h-11 rounded-full bg-white/60 border border-brand-green/15 flex items-center justify-center text-[#2d3a2e]/80 hover:text-brand-green hover:border-brand-green/30 hover:bg-brand-bg-green hover:shadow-md hover:shadow-brand-green/15 hover:-translate-y-1 transition-all duration-300"
                >
                  <social.icon className="w-5 h-5 group-hover/social:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          <p className="text-xs text-[#2d3a2e]/85 mt-6">
            Sin spam. Solo consciencia pura en tu bandeja.
          </p>
        </div>
      </GlassCard>
    </section>
  );
}
