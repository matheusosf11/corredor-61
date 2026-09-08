import type { Metadata } from "next";
import Link from "next/link";
import { AuthorMark } from "@/components/ui/AuthorMark";
import { formatDate, readingMinutes } from "@/lib/format";
import { getCategory } from "@/lib/categories";
import {
  getActiveAuthors,
  getAllAuthors,
  getPublishedArticles,
} from "@/lib/queries";
import {
  ArticleCarousel,
  type CarouselArticle,
} from "./_components/ArticleCarousel";

export const metadata: Metadata = {
  title: "Artigos",
  description:
    "Análises assinadas por quem atua no debate institucional brasileiro.",
};

export default async function ArtigosPage() {
  const [authors, articles] = await Promise.all([
    getActiveAuthors(),
    getPublishedArticles(),
  ]);
  const allAuthors = await getAllAuthors();
  const authorsBySlug = new Map(
    allAuthors.map((author) => [author.slug, author]),
  );

  const items: CarouselArticle[] = articles.map((article) => {
    const author = authorsBySlug.get(article.authorSlug);
    return {
      slug: article.slug,
      title: article.title,
      dek: article.dek,
      cover: article.cover,
      category: article.category
        ? (getCategory(article.category)?.name ?? "Opinião")
        : "Opinião",
      authorName: author?.name ?? "Corredor 61",
      authorInitials: author?.initials ?? "C61",
      dateLabel: formatDate(article.publishedAt),
      minutes: readingMinutes(article.body),
    };
  });

  return (
    <div>
      {/* Hero */}
      <div className="pad-x bg-navy pt-11 pb-9">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-[34px] leading-none font-extrabold tracking-[-0.03em] text-[#f7f4ea] md:text-[44px]">
              Artigos
            </h1>
            <p className="mt-2 max-w-[52ch] font-serif text-[15px] leading-snug text-[#f7f4ea]/70">
              Análises assinadas por quem atua no debate institucional
              brasileiro.
            </p>
          </div>
          <Link
            href="/autores"
            className="nav-link self-start bg-gold px-4 py-3.5 text-[12px] text-blackish"
          >
            Ver colunistas
          </Link>
        </div>
        <div className="flex gap-5 overflow-x-auto border-t border-gold/30 pt-5">
          {authors.map((author) => (
            <Link
              key={author.slug}
              href={`/autores/${author.slug}`}
              className="flex w-24 shrink-0 flex-col items-center gap-2 text-center"
            >
              <AuthorMark
                initials={author.initials}
                photoUrl={author.photoUrl}
                name={author.name}
                size={58}
                onDark
              />
              <span className="text-[10.5px] leading-snug font-semibold text-[#f7f4ea]/85">
                {author.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Mosaico em carrossel — destaque + artigos deslizam juntos */}
      <div className="pad-x bg-cream pt-11 pb-8">
        <ArticleCarousel articles={items} />
      </div>
    </div>
  );
}
