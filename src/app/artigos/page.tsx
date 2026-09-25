import type { Metadata } from "next";
import Link from "next/link";
import { RevealHeading } from "@/components/motion/RevealHeading";
import { AuthorMark } from "@/components/ui/AuthorMark";
import { formatDate, readingMinutes } from "@/lib/format";
import { categoryLabel } from "@/lib/categories";
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
        ? categoryLabel(article.category, article.categoryName, "Opinião")
        : "Opinião",
      authorName: author?.name ?? "Corredor 61",
      authorInitials: author?.initials ?? "C61",
      authorPhotoUrl: author?.photoUrl,
      dateLabel: formatDate(article.publishedAt),
      minutes: readingMinutes(article.body),
    };
  });

  return (
    <div>
      {/* Hero — faixa clara (primeira seção logo abaixo do menu) */}
      <div className="pad-x border-b border-navy/12 bg-cream pt-11 pb-9">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <RevealHeading className="text-[34px] leading-none font-extrabold tracking-[-0.03em] text-navy md:text-[44px]">
              Artigos
            </RevealHeading>
            <p className="mt-2 max-w-[52ch] font-serif text-[15px] leading-snug text-navy/65">
              Análises assinadas por quem atua no debate institucional
              brasileiro.
            </p>
          </div>
          <Link
            href="/autores"
            className="nav-link self-start bg-navy px-4 py-3.5 text-[12px] text-cream"
          >
            Ver colunistas
          </Link>
        </div>
        <div className="flex gap-5 overflow-x-auto border-t border-navy/15 pt-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
              />
              <span className="text-[10.5px] leading-snug font-semibold text-navy/80">
                {author.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="pad-x pt-11 pb-8">
        <ArticleCarousel articles={items} />
      </div>
    </div>
  );
}
