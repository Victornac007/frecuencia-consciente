import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { GlassCard, Badge } from "@/components/ui";
import { RECENT_ARTICLES } from "@/data/mock";
import type { Article } from "@/data/mock";

function ArticleItem({ article }: { article: Article }) {
  return (
    <Link
      href="/articulos"
      className="block p-3 rounded-xl hover:bg-brand-bg-green/50 transition-all duration-300 group/item"
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-brand-bg-green/50 border border-brand-green/15 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-brand-bg-green group-hover/item:border-brand-green/25 transition-all duration-300">
          <BookOpen className="w-4 h-4 text-[#1E293B]/85 group-hover/item:text-brand-green transition-colors" />
        </div>
        <div className="min-w-0">
          <Badge variant="default" className="mb-1.5 text-[10px]">
            {article.category}
          </Badge>
          <h4 className="text-sm font-semibold text-[#1E293B] group-hover/item:text-brand-green transition-colors leading-snug tracking-wide">
            {article.title}
          </h4>
          <p className="text-xs text-[#1E293B]/85 mt-1 leading-relaxed">
            {article.date} · {article.readTime} lectura
          </p>
        </div>
      </div>
    </Link>
  );
}

export function RecentArticles() {
  return (
    <GlassCard
      variant="default"
      padding="lg"
      className="h-full transition-all duration-300 hover:-translate-y-1 hover:border-white/70"
    >
      <div className="flex flex-col h-full">
        <h3 className="font-serif text-lg font-bold text-[#1E293B] mb-4 tracking-wide">
          Artículos Recientes
        </h3>

        <div className="space-y-1 flex-1 min-h-0">
          {RECENT_ARTICLES.map((article) => (
            <ArticleItem key={article.id} article={article} />
          ))}
        </div>

        <Link
          href="/articulos"
          className="link-ver-todos text-sm font-medium text-[#1E293B]/80 hover:text-[#1E293B] mt-5 group/link tracking-wide"
        >
          Ver todos los artículos
          <ArrowRight className="w-4 h-4 text-[#D37D52] group-hover/link:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </GlassCard>
  );
}
