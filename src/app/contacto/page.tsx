import type { Metadata } from "next";
import { Mail, MapPin, Radio } from "lucide-react";
import { SectionTitle, GlassCard } from "@/components/ui";
import { ContactForm } from "@/components/forms/ContactForm";
import { SOCIAL_LINKS_FOLLOW } from "@/data/social";

export const metadata: Metadata = {
  title: "Contacto — Frecuencia Consciente",
  description:
    "Contáctanos para colaboraciones, patrocinios, prensa o cualquier consulta sobre Frecuencia Consciente.",
};

const SOCIAL_LINKS = SOCIAL_LINKS_FOLLOW;

export default function ContactoPage() {
  return (
    <main className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-16 md:py-24">
      <SectionTitle
        title="Contacto"
        accentWord="Contacto"
        subtitle="Nos encantaría saber de ti. Escríbenos para colaboraciones, patrocinios o cualquier consulta."
        className="mb-14"
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <GlassCard variant="strong" padding="lg">
            <h3 className="text-lg font-bold text-[#2d3a2e] mb-6">
              Envíanos un mensaje
            </h3>
            <ContactForm />
          </GlassCard>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <GlassCard variant="default" padding="lg">
            <h3 className="text-lg font-bold text-[#2d3a2e] mb-5">
              Información de contacto
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-brand-green mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-slate-600">Email</p>
                  <p className="text-sm text-[#2d3a2e]/40">
                    contacto@frecuenciaconsciente.com
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Radio className="w-5 h-5 text-brand-green mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Radio en Vivo
                  </p>
                  <p className="text-sm text-[#2d3a2e]/40">24/7 streaming digital</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-green mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Ubicación
                  </p>
                  <p className="text-sm text-[#2d3a2e]/40">
                    100% digital — En todas partes
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard variant="default" padding="lg">
            <h3 className="text-lg font-bold text-[#2d3a2e] mb-5">Síguenos</h3>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-11 h-11 rounded-full bg-slate-100 border border-slate-200/50 flex items-center justify-center text-[#2d3a2e]/40 hover:text-brand-green hover:border-brand-green/20 hover:bg-brand-bg-green transition-all"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </GlassCard>

          <GlassCard variant="default" padding="lg">
            <h3 className="text-lg font-bold text-[#2d3a2e] mb-3">
              Colaboraciones y Patrocinios
            </h3>
            <p className="text-sm text-[#2d3a2e]/55 leading-relaxed">
              Si eres coach, terapeuta, científico o representas una marca
              alineada con nuestros valores, nos encantaría explorar
              oportunidades de colaboración. Cuéntanos tu propuesta a través
              del formulario.
            </p>
          </GlassCard>
        </div>
      </div>
    </main>
  );
}
