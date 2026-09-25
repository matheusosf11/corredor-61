/** Páginas visíveis com reticências: 1 … 4 5 6 … 20 */
export function getVisiblePages(
  currentPage: number,
  totalPages: number,
  delta = 1,
): (number | "...")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const range: (number | "...")[] = [1];
  let startPage = Math.max(2, currentPage - delta);
  let endPage = Math.min(totalPages - 1, currentPage + delta);

  if (currentPage === 1) {
    endPage = Math.min(totalPages - 1, 1 + delta * 2);
  } else if (currentPage === totalPages) {
    startPage = Math.max(2, totalPages - delta * 2);
  }

  if (startPage > 2) range.push("...");
  for (let i = startPage; i <= endPage; i++) range.push(i);
  if (endPage < totalPages - 1) range.push("...");
  range.push(totalPages);

  return range;
}
