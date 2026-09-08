import Link from "next/link";
import { NewsCard } from "@/components/news/NewsItems";
import { formatDate } from "@/lib/format";
import {
  getAuthorBySlug,
  getCategory,
  getHomeArticles,
  getHomeHeroNews,
  getHomeNewsGrid,
} from "@/lib/queries";
import { ArtigosList } from "./_components/ArtigosList";
import { HeroCarousel } from "./_components/HeroCarousel";

export default function HomePage() {
  const heroNews = getHomeHeroNews(5);
  const featured = heroNews[0];
  // 10 = tamanho do rodízio de capas de demonstração, para não repetir imagem.
  const grid = getHomeNewsGrid(featured.slug, 10);
  const articles = getHomeArticles(8);

  const artigoItems = articles.map((item) => {
    const author = getAuthorBySlug(item.authorSlug);
    return {
      slug: item.slug,
      title: item.title,
      authorName: author?.name ?? "",
      authorRole: author?.role ?? "",
      dateLabel: formatDate(item.publishedAt),
    };
  });

  const heroSlides = heroNews.map((item) => ({
    slug: item.slug,
    title: item.title,
    dek: item.dek,
    cover: item.cover,
    categoryName: getCategory(item.category)?.name ?? "",
    authorName: item.authorName,
    dateLabel: formatDate(item.publishedAt),
  }));

  return (
    <div>
      <h1 className="sr-only">
        Corredor 61 — notícias e artigos sobre política, direito e legislação
      </h1>

      {/* Sessão do destaque — carrossel + coluna de artigos */}
      <div className="pad-x lg:grid lg:grid-cols-[minmax(0,1fr)_clamp(320px,25vw,380px)] lg:items-stretch lg:gap-x-10">
        <HeroCarousel items={heroSlides} />

        <aside className="mt-8 mb-4 flex flex-col lg:mt-10 lg:mb-0 lg:self-stretch">
          <div className="mb-3 flex items-baseline justify-between border-b border-navy/15 pb-2">
            <h2 className="nav-link text-[12.5px] text-gold-ink">Artigos</h2>
            <Link
              href="/artigos"
              className="nav-link text-[12.5px] text-gold-ink hover:text-navy"
            >
              Ver todos →
            </Link>
          </div>
          <div className="min-h-0 flex-1">
            <ArtigosList items={artigoItems} />
          </div>
        </aside>
      </div>

      {/* Sessão de notícias — largura total */}
      <section className="pad-x py-12 lg:py-14">
        <div className="mb-8 flex items-end justify-between border-b-2 border-navy pb-3">
          <h2 className="text-[26px] font-extrabold tracking-[-0.02em] text-navy md:text-[30px]">
            Notícias
          </h2>
          <Link
            href="/noticias"
            className="nav-link text-[12px] text-gold-ink hover:text-navy"
          >
            Ver todas →
          </Link>
        </div>
        <div className="grid gap-x-8 gap-y-11 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {grid.map((item) => (
            <NewsCard key={item.slug} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
