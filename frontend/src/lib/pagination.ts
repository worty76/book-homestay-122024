export function getPaginatedItems<T>(
  items: T[],
  page: number,
  itemsPerPage: number
): T[] {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return items.slice(startIndex, endIndex);
}

export function getTotalPages(
  totalItems: number,
  itemsPerPage: number
): number {
  return Math.ceil(totalItems / itemsPerPage);
}

export function getPageNumbers(
  currentPage: number,
  totalPages: number,
  maxPageNumbers: number = 5
): (number | null)[] {
  if (totalPages <= maxPageNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const result: (number | null)[] = [];

  const middleRange = Math.floor(maxPageNumbers / 2);

  let startPage = Math.max(2, currentPage - middleRange);
  let endPage = Math.min(totalPages - 1, currentPage + middleRange);

  if (currentPage <= middleRange + 1) {
    endPage = maxPageNumbers - 1;
  } else if (currentPage >= totalPages - middleRange) {
    startPage = totalPages - maxPageNumbers + 2;
  }

  result.push(1);

  if (startPage > 2) {
    result.push(null);
  }

  for (let i = startPage; i <= endPage; i++) {
    result.push(i);
  }

  if (endPage < totalPages - 1) {
    result.push(null);
  }

  if (totalPages > 1) {
    result.push(totalPages);
  }

  return result;
}

export function isFirstPage(currentPage: number): boolean {
  return currentPage <= 1;
}

export function isLastPage(currentPage: number, totalPages: number): boolean {
  return currentPage >= totalPages;
}
