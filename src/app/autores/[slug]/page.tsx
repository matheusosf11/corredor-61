import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RevealHeading } from "@/components/motion/RevealHeading";
import { AuthorMark } from "@/components/ui/AuthorMark";
import { formatDate } from "@/lib/format";
import {
  getAllAuthors,
  getArticlesByAuthor,
  getAuthorBySlug,
} from "@/lib/queries";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return (await getAllAuthors()).map((author) => ({ slug: author.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);
  if (!author) return { title: "Autor não encontrado" };
  return { title: author.name, description: author.bio };
}

export default async function AutorPage({ params }: Props) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);
  if (!author) notFound();
  const articles = await getArticlesByAuthor(author.slug);

  return (
    <div>
      <div className="pad-x flex flex-col items-center gap-6 bg-blackish py-12 text-center md:flex-row md:items-center md:gap-8 md:text-left">
        <AuthorMark
          initials={author.initials}
          photoUrl={author.photoUrl}
          name={author.name}
          size={130}
          onDark
          className="shrink-0"
        />
        <div className="max-w-[62ch]">
          <span className="nav-link mb-2.5 block text-[10px] text-gold">
            {author.active ? "Colunista" : "Arquivo"}
          </span>
          <RevealHeading className="text-[28px] leading-tight font-extrabold tracking-[-0.02em] text-cream md:text-[36px]">
            {author.name}
          </RevealHeading>
          <p className="nav-link mt-2 text-[12px] text-cream/60">
            {author.role}
          </p>
          <p className="mt-3.5 font-serif text-[16px] leading-relaxed text-cream/80 text-pretty md:text-[17px]">
            {author.bio}
          </p>
        </div>
      </div>

      <div className="pad-x bg-white pt-11 pb-16">
        <div className="mb-5 flex items-center gap-3.5">
          <h2 className="nav-link text-[13px] text-navy">Artigos publicados</h2>
          <span className="h-0.5 flex-1 bg-gold" />
          <span className="font-mono text-[11px] text-navy/45">
            {articles.length} {articles.length === 1 ? "item" : "itens"}
          </span>
        </div>

        {articles.length === 0 ? (
          <p className="py-10 font-serif text-[15px] text-navy/60">
            Este autor ainda não tem artigos publicados. O perfil permanece
            acessível para os textos futuros.
          </p>
        ) : (
          <ul>
            {articles.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/artigos/${item.slug}`}
                  className="group flex flex-col gap-1.5 border-b border-navy/12 py-6 sm:flex-row sm:items-baseline sm:gap-6"
                >
                  <span className="w-24 shrink-0 font-mono text-[11px] text-navy/45">
                    {formatDate(item.publishedAt)}
                  </span>
                  <h3 className="flex-1 text-[19px] leading-snug font-semibold text-navy group-hover:underline decoration-gold underline-offset-4 text-pretty md:text-[21px]">
                    {item.title}
                  </h3>
                  <span className="nav-link shrink-0 text-[11px] text-gold-ink">
                    ler →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
