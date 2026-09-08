import type { Metadata } from "next";
import Link from "next/link";
import { searchContent } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Busca",
  description:
    "Busca em notícias e artigos publicados no Corredor 61 — título, chamada e corpo.",
};

type Props = {
  searchParams: Promise<{ q?: string; tipo?: string }>;
};

export default async function BuscaPage({ searchParams }: Props) {
  const { q = "", tipo } = await searchParams;
  const query = q.trim();
  const all = searchContent(query);
  const filter = tipo === "noticia" || tipo === "artigo" ? tipo : undefined;
  const results = filter ? all.filter((hit) => hit.type === filter) : all;

  const counts = {
    total: all.length,
    noticia: all.filter((h) => h.type === "noticia").length,
    artigo: all.filter((h) => h.type === "artigo").length,
  };

  const chipHref = (t?: "noticia" | "artigo") => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (t) params.set("tipo", t);
    const qs = params.toString();
    return qs ? `/busca?${qs}` : "/busca";
  };

  return (
    <div>
      {/* Barra de busca */}
      <div className="pad-x border-b border-navy/15 bg-cream py-10">
        <form
          action="/busca"
          method="get"
          role="search"
          className="mb-4 flex max-w-[720px] items-stretch"
        >
          <label htmlFor="busca-q" className="sr-only">
            Termo de busca
          </label>
          <input
            id="busca-q"
            name="q"
            type="search"
            defaultValue={query}
            placeholder="Buscar notícias e artigos"
            className="min-w-0 flex-1 border border-r-0 border-navy/25 bg-white px-4 py-3.5 text-[16px] text-navy placeholder:text-navy/45 focus:outline-none"
          />
          <button
            type="submit"
            className="eyebrow bg-navy px-5 py-4 text-[11px] tracking-[0.14em] text-cream"
          >
            Buscar
          </button>
        </form>

        {query ? (
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="mr-1.5 font-mono text-[12px] text-navy/60">
              {counts.total}{" "}
              {counts.total === 1 ? "resultado" : "resultados"}
            </span>
            <FilterChip href={chipHref()} active={!filter} label="Tudo" />
            <FilterChip
              href={chipHref("noticia")}
              active={filter === "noticia"}
              label={`Notícias · ${counts.noticia}`}
            />
            <FilterChip
              href={chipHref("artigo")}
              active={filter === "artigo"}
              label={`Artigos · ${counts.artigo}`}
            />
          </div>
        ) : null}
      </div>

      {/* Resultados */}
      {query && results.length > 0 ? (
        <div className="pad-x max-w-[1100px] bg-white pt-4 pb-14">
          {results.map((hit) => (
            <Link
              key={`${hit.type}-${hit.slug}`}
              href={hit.href}
              className="group flex flex-col gap-2 border-b border-navy/12 py-6"
            >
              <span className="flex items-center gap-2.5">
                <span className="eyebrow border border-navy/30 px-1.5 py-1 text-[9.5px] tracking-[0.14em] text-navy">
                  {hit.type === "noticia" ? "Notícia" : "Artigo"}
                </span>
              </span>
              <h2 className="text-[20px] leading-snug font-bold text-navy group-hover:underline decoration-gold underline-offset-4 text-pretty md:text-[22px]">
                {hit.title}
              </h2>
              <p className="font-serif text-[15.5px] leading-relaxed text-[#1a1a1a]/68 text-pretty">
                {hit.dek}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="pad-x bg-white py-12">
          <div className="border border-dashed border-navy/30 bg-cream px-6 py-9 md:px-8">
            <span className="eyebrow mb-2.5 block text-[10px] text-gold-ink">
              {query ? "Nenhum resultado" : "Comece a busca"}
            </span>
            <h2 className="mb-2 text-[20px] leading-tight font-bold text-navy md:text-[22px]">
              {query
                ? `Nenhum resultado para “${query}”`
                : "Digite um termo para procurar"}
            </h2>
            <p className="mb-3.5 max-w-[64ch] font-serif text-[15.5px] leading-relaxed text-[#1a1a1a]/70">
              A busca cobre título, chamada e corpo de notícias e artigos
              publicados. Tente termos mais curtos ou navegue pelas seções.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <Link
                href="/noticias"
                className="eyebrow bg-navy px-4 py-3 text-[11px] tracking-[0.14em] text-cream"
              >
                Ver notícias
              </Link>
              <Link
                href="/artigos"
                className="eyebrow border border-navy/30 px-4 py-3 text-[11px] tracking-[0.14em] text-navy"
              >
                Ver artigos
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterChip({
  href,
  active,
  label,
}: {
  href: string;
  active: boolean;
  label: string;
}) {
  return (
    <Link
      href={href}
      className={`eyebrow px-3 py-2 text-[11px] tracking-[0.1em] ${
        active
          ? "bg-navy text-cream"
          : "border border-navy/25 text-navy hover:border-navy"
      }`}
    >
      {label}
    </Link>
  );
}
