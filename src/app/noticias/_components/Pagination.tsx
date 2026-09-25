import {
  Pagination as PaginationRoot,
  PaginationEllipsis,
  PaginationLink,
  PaginationNextLink,
  PaginationPreviousLink,
} from "@/components/ui/pagination";
import { getVisiblePages } from "@/lib/pagination";

type Props = {
  page: number;
  totalPages: number;
  hrefFor: (page: number) => string;
  onDark?: boolean;
};

export function Pagination({
  page,
  totalPages,
  hrefFor,
  onDark = false,
}: Props) {
  if (totalPages <= 1) return null;

  return (
    <PaginationRoot
      aria-label="Paginação"
      className={`mt-12 flex-wrap ${onDark ? "dark" : ""}`}
    >
      <PaginationPreviousLink
        href={page > 1 ? hrefFor(page - 1) : undefined}
        aria-label="Página anterior"
        className="px-2 sm:px-3"
      >
        <span className="hidden sm:inline">Anterior</span>
      </PaginationPreviousLink>

      {getVisiblePages(page, totalPages).map((n, i) =>
        n === "..." ? (
          <PaginationEllipsis key={`ellipsis-${i}`} />
        ) : (
          <PaginationLink
            key={n}
            href={hrefFor(n)}
            isActive={n === page}
            aria-label={`Página ${n}`}
          >
            {n}
          </PaginationLink>
        ),
      )}

      <PaginationNextLink
        href={page < totalPages ? hrefFor(page + 1) : undefined}
        aria-label="Próxima página"
        className="px-2 sm:px-3"
      >
        <span className="hidden sm:inline">Próxima</span>
      </PaginationNextLink>
    </PaginationRoot>
  );
}
