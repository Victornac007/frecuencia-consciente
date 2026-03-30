import type { Metadata } from "next";
import Image from "next/image";
import { Target, Eye, Heart } from "lucide-react";
import { SectionTitle, GlassCard, GoldButton } from "@/components/ui";
import { FadeIn } from "@/components/effects";
import { TEAM_MEMBERS } from "@/data/content";
import type { TeamMember } from "@/data/content";

export const metadata: Metadata = {
  title: "Sobre Nosotros — Frecuencia Consciente",
  description:
    "Conoce la misión, visión y el equipo detrás de Frecuencia Consciente. Radio digital para el despertar interior.",
};

function ValueCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Target;
  title: string;
  description: string;
}) {
  return (
    <GlassCard variant="interactive" padding="lg">
      <div className="icon-bounce w-12 h-12 rounded-xl bg-brand-bg-green border border-brand-green/20 flex items-center justify-center mb-5">
        <Icon className="w-6 h-6 text-brand-green" />
      </div>
      <h3 className="text-lg font-bold text-[#2d3a2e] mb-3">{title}</h3>
      <p className="text-sm text-[#2d3a2e]/55 leading-relaxed">{description}</p>
    </GlassCard>
  );
}

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <GlassCard variant="interactive" padding="lg" className="text-center group">
      <div className="relative w-28 h-28 mx-auto mb-6">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-green/40 to-brand-green/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-slate-200/60 group-hover:border-brand-green/20 transition-all duration-500 ring-4 ring-slate-100 group-hover:ring-brand-green/15">
          <Image
            src={member.image}
            alt={member.name}
            width={112}
            height={112}
            className="object-cover w-full h-full grayscale-[15%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
          />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-[#2d3a2e] mb-1">
        {member.name}
      </h3>
      <p className="text-sm text-brand-green mb-4">{member.role}</p>
      <p className="text-sm text-[#2d3a2e]/55 leading-relaxed">{member.bio}</p>
    </GlassCard>
  );
}

export default function SobreNosotrosPage() {
  return (
    <main className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16 md:py-24">
      <FadeIn>
        <section className="text-center mb-20">
          <div className="flex justify-center mb-6">
            <Image
              src="/logo.png"
              alt="Frecuencia Consciente"
              width={96}
              height={96}
              className="rounded-full gold-glow drop-shadow-lg"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
            Sobre{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-brand-green to-brand-green/80">
              Frecuencia Consciente
            </span>
          </h1>
          <p className="text-lg text-[#2d3a2e]/55 max-w-2xl mx-auto leading-relaxed">
            Somos una plataforma de radio digital dedicada al despertar de la
            consciencia. Creemos que cada persona tiene el potencial de
            transformar su vida a través del conocimiento, la meditación y la
            conexión con su ser interior.
          </p>
        </section>
      </FadeIn>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
        {[
          { icon: Target, title: "Nuestra Misión", desc: "Democratizar el acceso al conocimiento espiritual y las herramientas de desarrollo personal, creando un espacio donde la ciencia y la espiritualidad convergen para elevar la consciencia colectiva." },
          { icon: Eye, title: "Nuestra Visión", desc: "Ser la plataforma de referencia en habla hispana para el despertar interior, conectando a millones de personas con contenido transformador que inspire una vida más consciente y plena." },
          { icon: Heart, title: "Nuestros Valores", desc: "Autenticidad, compasión, conocimiento basado en evidencia, inclusión espiritual sin dogmas, y el compromiso con el crecimiento personal de nuestra comunidad." },
        ].map((card, i) => (
          <FadeIn key={card.title} delay={i * 120}>
            <ValueCard icon={card.icon} title={card.title} description={card.desc} />
          </FadeIn>
        ))}
      </section>

      <FadeIn>
        <SectionTitle
          title="Nuestro Equipo"
          accentWord="Equipo"
          subtitle="Coaches, científicos y terapeutas comprometidos con tu transformación"
          className="mb-14"
        />
      </FadeIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {TEAM_MEMBERS.map((member, i) => (
          <FadeIn key={member.id} delay={i * 100}>
            <TeamCard member={member} />
          </FadeIn>
        ))}
      </div>

      <FadeIn>
        <section className="mt-24 text-center">
          <GlassCard variant="strong" padding="lg">
            <h3 className="text-2xl font-bold text-[#2d3a2e] mb-3">
              ¿Quieres{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-brand-green to-brand-green/80">
                colaborar
              </span>{" "}
              con nosotros?
            </h3>
            <p className="text-[#2d3a2e]/55 mb-6 max-w-md mx-auto">
              Buscamos coaches, científicos, terapeutas y patrocinadores que
              compartan nuestra visión.
            </p>
            <GoldButton href="/contacto" className="btn-magnetic">
              Contáctanos
            </GoldButton>
          </GlassCard>
        </section>
      </FadeIn>
    </main>
  );
}
