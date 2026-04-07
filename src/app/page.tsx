import { SectionTitle } from "@/components/ui";
import { FadeIn } from "@/components/effects";
import {
  HeroSection,
  LiveRadioSection,
  FeaturedEpisode,
  LatestPrograms,
  RecentArticles,
  CoachesSection,
  UpcomingEventsSection,
  NewsletterSection,
  SponsorCarousel,
} from "@/components/home";

function SectionDivider() {
  return (
    <div className="zen-divider max-w-4xl mx-auto px-4 py-8 md:px-8 md:py-[5rem]" aria-hidden="true">
      <div className="zen-divider-line" />
      <div className="zen-divider-dots">
        <span />
        <span />
        <span />
      </div>
      <div className="zen-divider-line" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <HeroSection />

      <FadeIn>
        <LiveRadioSection />
      </FadeIn>

      <SectionDivider />

      <FadeIn delay={100}>
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12 md:py-28">
          <SectionTitle
            title="Explora Nuestro Contenido"
            accentWord="Contenido"
            subtitle="Episodios, programas y artículos para elevar tu consciencia"
            className="mb-8 md:mb-14 section-title-island"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            <FadeIn delay={0} className="h-full min-h-[280px]">
              <FeaturedEpisode />
            </FadeIn>
            <FadeIn delay={150} className="h-full min-h-[280px]">
              <LatestPrograms />
            </FadeIn>
            <FadeIn delay={300} className="h-full min-h-[280px]">
              <RecentArticles />
            </FadeIn>
          </div>
        </section>
      </FadeIn>

      <SectionDivider />

      <FadeIn>
        <CoachesSection />
      </FadeIn>

      <SectionDivider />

      <FadeIn>
        <SponsorCarousel />
      </FadeIn>

      <SectionDivider />

      <FadeIn>
        <UpcomingEventsSection />
      </FadeIn>

      <SectionDivider />

      <FadeIn>
        <NewsletterSection />
      </FadeIn>
    </>
  );
}
