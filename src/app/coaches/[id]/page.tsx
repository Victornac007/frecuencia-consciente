import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Star,
  Instagram,
  Youtube,
  Twitter,
  Globe,
  Music,
  Quote,
} from "lucide-react";
import { COACHES, type Coach, type CoachSocial } from "@/data/mock";
import { GlassCard } from "@/components/ui";
import { FadeIn } from "@/components/effects";
import { CoachAvatar } from "./CoachAvatar";

export function generateStaticParams() {
  return COACHES.map((coach) => ({ id: coach.id }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const coach = COACHES.find((c) => c.id === params.id);
  if (!coach) return { title: "Coach no encontrado" };
  return {
    title: `${coach.name} — Frecuencia Consciente`,
    description: coach.bio,
  };
}

function SocialIcon({ social }: { social: CoachSocial }) {
  const iconMap = {
    instagram: Instagram,
    youtube: Youtube,
    twitter: Twitter,
    web: Globe,
    spotify: Music,
  };
  const Icon = iconMap[social.platform];
  const labelMap = {
    instagram: "Instagram",
    youtube: "YouTube",
    twitter: "X / Twitter",
    web: "Sitio Web",
    spotify: "Spotify",
  };

  return (
    <a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={labelMap[social.platform]}
      className="group/social w-9 h-9 rounded-full border border-[#8FA88E]/40 flex items-center justify-center text-[#2D3436]/50 hover:text-[#D37D52] hover:border-[#D37D52]/60 hover:bg-[#D37D52]/5 transition-all duration-300"
    >
      <Icon className="w-4 h-4" />
    </a>
  );
}

function ReviewCard({ review }: { review: Coach["reviews"][number] }) {
  return (
    <GlassCard variant="default" padding="md" className="relative glass-coach-profile">
      <Quote className="absolute top-4 right-4 w-6 h-6 text-[#8FA88E]/20" />
      <div className="flex items-center gap-2 mb-3">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${i < review.rating ? "text-brand-yellow fill-brand-yellow" : "text-[#2D3436]/15"}`}
            />
          ))}
        </div>
      </div>
      <p className="text-sm text-[#2D3436] leading-relaxed mb-3 italic">
        &ldquo;{review.text}&rdquo;
      </p>
      <p className="text-xs font-semibold text-[#2D3436]/80">{review.author}</p>
    </GlassCard>
  );
}

function SpecialtyTag({ label }: { label: string }) {
  return (
    <span className="py-1 px-4 rounded-full text-sm font-medium bg-[#8FA88E]/25 text-[#2D3436] border border-[#8FA88E]">
      {label}
    </span>
  );
}

export default async function CoachDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const coach = COACHES.find((c) => c.id === id);

  if (!coach) notFound();

  const avgRating =
    coach.reviews.length > 0
      ? (coach.reviews.reduce((s, r) => s + r.rating, 0) / coach.reviews.length).toFixed(1)
      : "0";

  return (
    <main className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto py-10">
      <FadeIn>
        <Link
          href="/#coaches"
          className="inline-flex items-center gap-2 text-sm text-[#2D3436]/60 hover:text-[#8FA88E] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Volver a coaches
        </Link>
      </FadeIn>

      <FadeIn delay={50}>
        <GlassCard variant="strong" padding="none" className="overflow-hidden rounded-3xl mb-14 glass-coach-profile">
          <div className="flex flex-col md:flex-row">
            <div className="relative w-full md:w-80 h-72 md:h-auto md:min-h-[400px] shrink-0 overflow-hidden">
              <CoachAvatar coach={coach} />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#1a2e1a]/50 via-transparent to-transparent" />
            </div>

            <div className="flex-1 p-8 md:p-10">
              <span className="inline-block py-1 px-4 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-[#8FA88E]/25 text-[#2D3436] border border-[#8FA88E] mb-4">
                {coach.category}
              </span>

              <h1 className="font-serif text-3xl md:text-4xl font-black text-[#2D3436] mb-2">
                {coach.name}
              </h1>

              <p className="text-lg text-[#8FA88E] font-medium mb-4">
                {coach.role}
              </p>

              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.round(Number(avgRating)) ? "text-brand-yellow fill-brand-yellow" : "text-[#2D3436]/15"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-[#2D3436]/60">
                  {avgRating} · {coach.reviews.length} reseña{coach.reviews.length !== 1 ? "s" : ""}
                </span>
              </div>

              <p className="text-[#2D3436] leading-relaxed mb-6">
                {coach.bio}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {coach.specialties.map((spec) => (
                  <SpecialtyTag key={spec} label={spec} />
                ))}
              </div>

              <div className="flex gap-3">
                {coach.socials.map((social) => (
                  <SocialIcon key={social.platform} social={social} />
                ))}
              </div>
            </div>
          </div>
        </GlassCard>
      </FadeIn>

      <FadeIn delay={150}>
        <section className="mb-10">
          <h2 className="font-serif text-2xl font-bold text-[#2D3436] mb-6">
            Su <span className="text-accent-orange italic">Historia</span>
          </h2>
          <GlassCard variant="default" padding="lg" className="glass-coach-profile">
            <p className="text-[#2D3436] leading-[1.6] text-[15px]">
              {coach.history}
            </p>
          </GlassCard>
        </section>
      </FadeIn>

      {coach.reviews.length > 0 && (
        <FadeIn delay={250}>
          <section>
            <h2 className="font-serif text-2xl font-bold text-[#2D3436] mb-6">
              Lo que dicen de{" "}
              <span className="text-accent-orange italic">{coach.name.split(" ")[0]}</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {coach.reviews.map((review, i) => (
                <FadeIn key={review.author} delay={i * 100}>
                  <ReviewCard review={review} />
                </FadeIn>
              ))}
            </div>
          </section>
        </FadeIn>
      )}
    </main>
  );
}
