import Link from "next/link";

type Props = {
  page: number;
  totalPages: number;
  hrefFor: (page: number) => string;
  onDark?: boolean;
};

const type =
  "inline-flex items-center justify-center font-sans text-[12.5px] leading-none font-bold tracking-[0.15em] uppercase transition-colors";

export function Pagination({
  page,
  totalPages,
  hrefFor,
  onDark = false,
}: Props) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const box = onDark
    ? "border-cream/30 text-cream/80 hover:border-gold hover:text-gold"
    : "border-navy/25 text-navy/70 hover:border-gold-ink hover:text-gold-ink";
  const boxOff = onDark
    ? "border-cream/15 text-cream/30"
    : "border-navy/12 text-navy/30";
  const boxActive = onDark
    ? "border-gold bg-gold text-navy"
    : "border-gold-ink bg-gold text-navy";

  const cell = `${type} relative h-8 -ml-px border px-3 first:ml-0`;

  return (
    <nav
      aria-label="Paginação"
      className="mt-12 flex items-center justify-center"
    >
      {page > 1 ? (
        <Link href={hrefFor(page - 1)} className={`${cell} ${box}`}>
          ← Anterior
        </Link>
      ) : (
        <span className={`${cell} ${boxOff}`} aria-hidden>
          ← Anterior
        </span>
      )}

      {pages.map((n) =>
        n === page ? (
          <span
            key={n}
            aria-current="page"
            className={`${cell} min-w-8 ${boxActive}`}
          >
            {n}
          </span>
        ) : (
          <Link
            key={n}
            href={hrefFor(n)}
            className={`${cell} min-w-8 ${box}`}
          >
            {n}
          </Link>
        ),
      )}

      {page < totalPages ? (
        <Link href={hrefFor(page + 1)} className={`${cell} ${box}`}>
          Próxima →
        </Link>
      ) : (
        <span className={`${cell} ${boxOff}`} aria-hidden>
          Próxima →
        </span>
      )}
    </nav>
  );
}
