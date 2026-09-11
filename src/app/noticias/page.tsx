import type { Metadata } from "next";
import Link from "next/link";
import { NewsCard } from "@/components/news/NewsItems";
import { PageHead } from "@/components/ui/PageHead";
import { getCategories, getNewsPage } from "@/lib/queries";
import type { CategorySlug } from "@/lib/types";
import { Pagination } from "./_components/Pagination";

export const metadata: Metadata = {
  title: "Notícias",
  description:
    "Cobertura do cenário político, jurídico e legislativo no Corredor 61.",
};

type Props = {
  searchParams: Promise<{ page?: string; categoria?: string }>;
};

export default async function NoticiasPage({ searchParams }: Props) {
  const params = await searchParams;
  const categories = getCategories();
  const categoria = categories.some((item) => item.slug === params.categoria)
    ? (params.categoria as CategorySlug)
    : undefined;
  const page = Number(params.page) || 1;
  const result = await getNewsPage(page, categoria);

  const hrefFor = (nextPage: number) => {
    const query = new URLSearchParams();
    if (categoria) query.set("categoria", categoria);
    if (nextPage > 1) query.set("page", String(nextPage));
    const qs = query.toString();
    return qs ? `/noticias?${qs}` : "/noticias";
  };

  return (
    <div>
      <PageHead
        title="Notícias"
        nav={
          <>
            <FilterChip href="/noticias" active={!categoria} label="Todas" />
            {categories.map((item) => (
              <FilterChip
                key={item.slug}
                href={`/noticias?categoria=${item.slug}`}
                active={categoria === item.slug}
                label={item.name}
              />
            ))}
          </>
        }
      />

      <div className="pad-x bg-navy pt-10 pb-14">
        {result.items.length === 0 ? (
          <p className="py-16 text-center font-serif text-[15px] text-cream/60">
            Nenhuma matéria publicada nesta categoria por enquanto.
          </p>
        ) : (
          <div className="grid gap-x-8 gap-y-11 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {result.items.map((item) => (
              <NewsCard key={item.slug} item={item} onDark />
            ))}
          </div>
        )}

        <Pagination
          page={result.page}
          totalPages={result.totalPages}
          hrefFor={hrefFor}
          onDark
        />
      </div>
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
      aria-current={active ? "page" : undefined}
      className={`nav-link text-[13px] whitespace-nowrap transition-colors md:text-[14px] ${
        active ? "text-gold" : "text-navy hover:text-gold"
      }`}
    >
      {label}
    </Link>
  );
}
