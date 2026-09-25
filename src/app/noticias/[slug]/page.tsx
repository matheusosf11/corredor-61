import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/content/ArticleBody";
import { AuthorMark } from "@/components/ui/AuthorMark";
import { CategoryChip } from "@/components/ui/CategoryLabel";
import { CoverMedia } from "@/components/ui/CoverMedia";
import { ReadingProgress } from "@/components/content/ReadingProgress";
import { ShareRow } from "@/components/content/ShareRow";
import { categoryLabel } from "@/lib/categories";
import { getNewsBySlug, getPublishedNews } from "@/lib/queries";
import { RevealHeading } from "@/components/motion/RevealHeading";
import { shareMetadata } from "@/lib/share";
import { site } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return (await getPublishedNews()).map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  if (!item) return { title: "Notícia não encontrada" };
  return {
    title: item.title,
    description: item.dek,
    ...shareMetadata(item.title, item.dek, item.cover, item.publishedAt),
  };
}

export default async function NoticiaPage({ params }: Props) {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  if (!item) notFound();

  const category = {
    name: categoryLabel(item.category, item.categoryName),
  };
  const related = (await getPublishedNews())
    .filter((n) => n.slug !== item.slug)
    .slice(0, 2);

  return (
    <article>
      {/* Hero — ocupa a primeira dobra, com o header transparente por cima */}
      <header className="relative flex min-h-[78svh] items-end overflow-hidden md:min-h-[max(620px,92svh)]">
        <CoverMedia
          cover={item.cover}
          variant="hero-dark"
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#0a0c10]/75 via-[#0a0c10]/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-4/5 bg-gradient-to-t from-[#0a0c10]/95 via-[#0a0c10]/55 to-transparent" />
        <div className="pad-x relative max-w-[1100px] pt-28 pb-10 md:pb-16">
          {category ? (
            <div className="mb-4">
              <CategoryChip label={category.name} />
            </div>
          ) : null}
          <RevealHeading className="max-w-[24ch] text-[32px] leading-[1.03] font-extrabold tracking-[-0.035em] text-[#f7f4ea] text-pretty md:text-[52px]">
            {item.title}
          </RevealHeading>
          <p className="mt-4 max-w-[56ch] font-serif text-[17px] leading-snug text-[#f7f4ea]/80 text-pretty md:text-[21px]">
            {item.dek}
          </p>
        </div>
      </header>

      <ReadingProgress />

      {/* Corpo */}
      <div className="pad-x bg-[#fdfcf8] pb-20 md:pt-4">
        <div className="mx-auto mb-10 flex max-w-[860px] flex-col gap-4 border-b border-navy/15 py-5 sm:flex-row sm:items-center sm:justify-between">
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

        <div className="mx-auto max-w-[860px]">
          <ArticleBody blocks={item.body} />
        </div>

        {related.length > 0 ? (
          <div className="mx-auto mt-13 max-w-[860px] border-t-2 border-navy pt-5">
            <h2 className="mb-4 font-sans text-[10.5px] leading-none font-bold tracking-[0.12em] text-navy uppercase lg:text-[11.5px] lg:tracking-[0.14em]">
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
                  <span className="font-sans text-[10.5px] leading-none font-bold tracking-[0.12em] text-gold-ink uppercase lg:text-[11.5px] lg:tracking-[0.14em]">
                    {categoryLabel(n.category, n.categoryName)}
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
