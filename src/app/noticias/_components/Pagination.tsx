import Link from "next/link";

type Props = {
  page: number;
  totalPages: number;
  hrefFor: (page: number) => string;
};

const arrow =
  "eyebrow inline-flex items-center gap-1.5 text-[11px] tracking-[0.12em] transition-colors";

const dot =
  "flex h-9 w-9 items-center justify-center rounded-full font-mono text-[12px] transition-colors";

export function Pagination({ page, totalPages, hrefFor }: Props) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Paginação"
      className="mt-12 flex items-center justify-center gap-1"
    >
      {page > 1 ? (
        <Link
          href={hrefFor(page - 1)}
          className={`${arrow} mr-3 text-navy/55 hover:text-gold-ink`}
        >
          <span aria-hidden>←</span> Anterior
        </Link>
      ) : (
        <span className={`${arrow} mr-3 text-navy/25`} aria-hidden>
          <span>←</span> Anterior
        </span>
      )}

      {pages.map((n) =>
        n === page ? (
          <span
            key={n}
            aria-current="page"
            className={`${dot} bg-navy text-cream`}
          >
            {n}
          </span>
        ) : (
          <Link
            key={n}
            href={hrefFor(n)}
            className={`${dot} text-navy/55 hover:bg-navy/[0.06] hover:text-navy`}
          >
            {n}
          </Link>
        ),
      )}

      {page < totalPages ? (
        <Link
          href={hrefFor(page + 1)}
          className={`${arrow} ml-3 text-navy/55 hover:text-gold-ink`}
        >
          Próxima <span aria-hidden>→</span>
        </Link>
      ) : (
        <span className={`${arrow} ml-3 text-navy/25`} aria-hidden>
          Próxima <span>→</span>
        </span>
      )}
    </nav>
  );
}
