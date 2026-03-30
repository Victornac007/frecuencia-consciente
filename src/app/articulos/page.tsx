import type { Metadata } from "next";
import { Clock, ArrowRight, BookOpen } from "lucide-react";
import { SectionTitle, GlassCard, Badge } from "@/components/ui";
import { FadeIn } from "@/components/effects";
import { ALL_ARTICLES } from "@/data/content";
import type { Article } from "@/data/mock";

export const metadata: Metadata = {
  title: "Artículos — Frecuencia Consciente",
  description:
    "Artículos sobre meditación, ciencia, espiritualidad, bienestar y desarrollo personal consciente.",
};

function ArticleCard({ article }: { article: Article }) {
  return (
    <GlassCard variant="interactive" padding="lg" as="article" className="group h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div className="icon-bounce w-9 h-9 rounded-lg bg-slate-100 border border-slate-200/50 flex items-center justify-center shrink-0 group-hover:bg-brand-bg-green group-hover:border-brand-green/20 transition-all duration-300">
          <BookOpen className="w-4 h-4 text-[#1E293B]/50 group-hover:text-brand-green transition-colors" />
        </div>
        <Badge variant="default">{article.category}</Badge>
      </div>

      <h3 className="text-base font-bold text-[#1E293B] group-hover:text-brand-green transition-colors leading-snug mb-3 tracking-wide">
        {article.title}
      </h3>

      <p className="text-sm text-[#1E293B]/80 leading-relaxed mb-5 line-clamp-3 flex-1">
        {article.excerpt}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-[#1E293B]/50 tracking-wide">
          <span>{article.date}</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {article.readTime}
          </span>
        </div>
        <span className="inline-flex items-center gap-1 text-sm text-brand-green group-hover:text-brand-green transition-colors group-hover:gap-2 font-medium">
          Leer
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </GlassCard>
  );
}

export default function ArticulosPage() {
  return (
    <main className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16 md:py-24">
      <FadeIn>
        <SectionTitle
          title="Artículos"
          accentWord="Artículos"
          subtitle="Reflexiones, guías y conocimiento para tu camino de despertar"
          className="mb-14"
        />
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {ALL_ARTICLES.map((article, i) => (
          <FadeIn key={article.id} delay={i * 80} className="h-full min-h-[260px]">
            <ArticleCard article={article} />
          </FadeIn>
        ))}
      </div>
    </main>
  );
}
