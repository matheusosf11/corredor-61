import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/content/ArticleBody";
import { AuthorMark } from "@/components/ui/AuthorMark";
import { CategoryChip } from "@/components/ui/CategoryLabel";
import { CoverMedia } from "@/components/ui/CoverMedia";
import { ReadingProgress } from "@/components/content/ReadingProgress";
import { ShareRow } from "@/components/content/ShareRow";
import { formatDate, readingMinutes } from "@/lib/format";
import {
  getArticleBySlug,
  getAuthor,
  getCategory,
  getPublishedArticles,
} from "@/lib/queries";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getPublishedArticles().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getArticleBySlug(slug);
  if (!item) return { title: "Artigo não encontrado" };
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

export default async function ArtigoPage({ params }: Props) {
  const { slug } = await params;
  const item = getArticleBySlug(slug);
  if (!item) notFound();
  const author = getAuthor(item);
  const cat = item.category ? getCategory(item.category)?.name : "Opinião";
  const others = getPublishedArticles()
    .filter((a) => a.slug !== item.slug)
    .slice(0, 2);

  return (
    <article>
      <ReadingProgress />

      {/* Hero */}
      <header className="pad-x grid gap-8 bg-blackish pt-16 pb-14 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16 lg:pb-16 lg:items-end">
        <div>
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <CategoryChip label={`Artigo · ${cat}`} />
            <span className="font-mono text-[11.5px] text-cream/60">
              {formatDate(item.publishedAt)} · leitura de{" "}
              {readingMinutes(item.body)} min
            </span>
          </div>
          <h1 className="max-w-[24ch] text-[32px] leading-[1.03] font-extrabold tracking-[-0.035em] text-[#f7f4ea] text-pretty md:text-[52px]">
            {item.title}
          </h1>
          <p className="mt-5 max-w-[56ch] font-serif text-[17px] leading-snug text-[#f7f4ea]/78 text-pretty md:text-[21px]">
            {item.dek}
          </p>
        </div>

        <div className="flex flex-col gap-3 border-t border-gold/35 pt-5">
          <div className="flex items-center gap-3">
            <AuthorMark initials={author.initials} size={56} onDark />
            <div className="flex flex-col gap-1">
              <span className="text-[15px] leading-tight font-bold text-[#f7f4ea]">
                {author.name}
              </span>
              <span className="font-mono text-[11px] text-cream/55">
                {author.role}
              </span>
            </div>
          </div>
          <Link
            href={`/autores/${author.slug}`}
            className="eyebrow text-[10.5px] tracking-[0.14em] text-gold"
          >
            Ver perfil da autora →
          </Link>
        </div>
      </header>

      {/* Corpo */}
      <div className="pad-x bg-[#fdfcf8] pt-4 pb-20">
        <div className="mb-10 flex flex-col gap-4 border-b border-navy/15 py-5 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono text-[11.5px] text-navy/55">
            Opinião do autor · não reflete posição editorial do portal
          </span>
          <ShareRow title={item.title} />
        </div>

        <div className="mx-auto max-w-[63ch]">
          <ArticleBody blocks={item.body} />
        </div>

        <div className="mx-auto mt-13 grid max-w-[63ch] gap-5 bg-cream p-7 sm:grid-cols-[84px_1fr]">
          <AuthorMark
            initials={author.initials}
            size={84}
            className="justify-self-start"
          />
          <div className="flex flex-col gap-2.5">
            <span className="eyebrow text-[11px] tracking-[0.18em] text-gold-ink">
              Quem assina
            </span>
            <span className="text-[19px] leading-tight font-bold text-navy">
              {author.name}
            </span>
            <p className="font-serif text-[15.5px] leading-relaxed text-[#1a1a1a]/78">
              {author.bio}
            </p>
            <Link
              href={`/autores/${author.slug}`}
              className="eyebrow text-[10.5px] tracking-[0.14em] text-gold-ink"
            >
              Todos os artigos de {author.name.split(" ")[0]} →
            </Link>
          </div>
        </div>

        {others.length > 0 ? (
          <div className="mx-auto mt-13 max-w-[63ch] border-t-2 border-navy pt-5">
            <h2 className="eyebrow mb-4 text-[12px] tracking-[0.2em] text-navy">
              Outros artigos
            </h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {others.map((a) => {
                const oa = getAuthor(a);
                return (
                  <Link
                    key={a.slug}
                    href={`/artigos/${a.slug}`}
                    className="group flex flex-col gap-2"
                  >
                    <div className="h-[110px]">
                      <CoverMedia cover={a.cover} />
                    </div>
                    <span className="eyebrow text-[9.5px] tracking-[0.14em] text-gold-ink">
                      {a.category ? getCategory(a.category)?.name : "Opinião"}
                    </span>
                    <h3 className="text-[17px] leading-snug font-semibold text-navy group-hover:underline decoration-gold underline-offset-4 text-pretty">
                      {a.title}
                    </h3>
                    <span className="font-mono text-[10.5px] text-navy/50">
                      {oa.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}
