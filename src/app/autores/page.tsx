import type { Metadata } from "next";
import Link from "next/link";
import { AuthorMark } from "@/components/ui/AuthorMark";
import { PageHead } from "@/components/ui/PageHead";
import { getActiveAuthors, getArticlesByAuthor } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Autores",
  description:
    "Políticos, técnicos, conselheiros, advogados e autoridades convidadas que assinam artigos no Corredor 61.",
};

export default function AutoresPage() {
  const authors = getActiveAuthors();

  return (
    <div>
      <PageHead
        title="Autores"
        description="Políticos, técnicos, conselheiros, advogados e autoridades convidadas que assinam artigos no Corredor 61."
      />
      <div className="pad-x bg-white py-14">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-7 lg:grid-cols-4 2xl:grid-cols-6">
          {authors.map((author) => {
            const count = getArticlesByAuthor(author.slug).length;
            return (
              <li key={author.slug}>
                <Link
                  href={`/autores/${author.slug}`}
                  className="flex h-full flex-col items-center gap-2.5 bg-cream px-4 py-9 text-center transition-colors hover:bg-cream/70"
                >
                  <AuthorMark initials={author.initials} size={84} />
                  <h2 className="mt-1 text-[16px] leading-snug font-bold text-navy text-pretty">
                    {author.name}
                  </h2>
                  <span className="font-mono text-[11px] text-navy/55">
                    {author.role}
                  </span>
                  <span className="mt-auto pt-1 font-mono text-[10px] text-navy/45">
                    {count} {count === 1 ? "artigo" : "artigos"}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
