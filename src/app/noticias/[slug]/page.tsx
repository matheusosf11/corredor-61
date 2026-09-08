import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/content/ArticleBody";
import { AuthorMark } from "@/components/ui/AuthorMark";
import { CategoryChip } from "@/components/ui/CategoryLabel";
import { CoverMedia } from "@/components/ui/CoverMedia";
import { ReadingProgress } from "@/components/content/ReadingProgress";
import { ShareRow } from "@/components/content/ShareRow";
import { formatDate, formatTime, readingMinutes } from "@/lib/format";
import {
  getCategory,
  getNewsBySlug,
  getPublishedNews,
} from "@/lib/queries";
import { site } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getPublishedNews().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  if (!item) return { title: "Notícia não encontrada" };
  return {
    title: item.title,
    description: item.dek,
    openGraph: {
      title: item.title,
      description: item.dek,
      type: "article",
      publishedTime: item.publishedAt,
    },
  };
}

export default async function NoticiaPage({ params }: Props) {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  if (!item) notFound();

  const category = getCategory(item.category);
  const related = getPublishedNews()
    .filter((n) => n.slug !== item.slug)
    .slice(0, 2);

  return (
    <article>
      <ReadingProgress />

      {/* Hero */}
      <header className="relative flex min-h-[440px] items-end overflow-hidden md:min-h-[580px]">
        <CoverMedia
          cover={item.cover}
          variant="hero-dark"
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-x-0 bottom-0 h-4/5 bg-gradient-to-t from-[#0a0c10]/95 via-[#0a0c10]/55 to-transparent" />
        <div className="pad-x relative max-w-[1100px] pt-16 pb-10 md:pb-14">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            {category ? <CategoryChip label={category.name} /> : null}
            <span className="font-mono text-[11.5px] text-cream/65">
              {formatDate(item.publishedAt)} · {formatTime(item.publishedAt)} ·
              leitura de {readingMinutes(item.body)} min
            </span>
          </div>
          <h1 className="max-w-[24ch] text-[32px] leading-[1.03] font-extrabold tracking-[-0.035em] text-[#f7f4ea] text-pretty md:text-[52px]">
            {item.title}
          </h1>
          <p className="mt-4 max-w-[56ch] font-serif text-[17px] leading-snug text-[#f7f4ea]/80 text-pretty md:text-[21px]">
            {item.dek}
          </p>
        </div>
      </header>

      {/* Corpo */}
      <div className="pad-x bg-[#fdfcf8] pb-20 md:pt-4">
        <div className="mb-10 flex flex-col gap-4 border-b border-navy/15 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <AuthorMark initials={site.shortName} size={38} />
            <div className="flex flex-col gap-0.5">
              <span className="text-[12.5px] leading-tight font-bold text-navy">
                {item.authorName}
              </span>
              <span className="font-mono text-[10.5px] text-navy/50">
                Brasília, DF
              </span>
            </div>
          </div>
          <ShareRow title={item.title} />
        </div>

        <figure className="mx-auto mb-11 max-w-[63ch]">
          <div className="aspect-[21/9] w-full">
            <CoverMedia cover={item.cover} />
          </div>
          <figcaption className="mt-2 font-mono text-[10.5px] text-navy/45">
            {item.cover.alt}
          </figcaption>
        </figure>

        <div className="mx-auto max-w-[63ch]">
          <ArticleBody blocks={item.body} />
        </div>

        {related.length > 0 ? (
          <div className="mx-auto mt-13 max-w-[63ch] border-t-2 border-navy pt-5">
            <h2 className="eyebrow mb-4 text-[12px] tracking-[0.2em] text-navy">
              Continue lendo
            </h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {related.map((n) => (
                <Link
                  key={n.slug}
                  href={`/noticias/${n.slug}`}
                  className="group flex flex-col gap-2"
                >
                  <div className="h-[110px]">
                    <CoverMedia cover={n.cover} />
                  </div>
                  <span className="eyebrow text-[9.5px] tracking-[0.14em] text-gold-ink">
                    {getCategory(n.category)?.name}
                  </span>
                  <h3 className="text-[17px] leading-snug font-semibold text-navy group-hover:underline decoration-gold underline-offset-4 text-pretty">
                    {n.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}
