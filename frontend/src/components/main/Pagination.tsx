import {
  Pagination as PaginationUI,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export function Pagination({ totalPages, currentPage }: PaginationProps) {
  // Generate an array of page numbers to display
  const generatePagination = () => {
    // If there are 7 or fewer pages, show all pages
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always include first and last page
    const firstPage = 1;
    const lastPage = totalPages;

    // For current page near the beginning
    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5, "ellipsis", totalPages];
    }

    // For current page near the end
    if (currentPage >= totalPages - 2) {
      return [
        1,
        "ellipsis",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    // For current page somewhere in the middle
    return [
      1,
      "ellipsis",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "ellipsis",
      totalPages,
    ];
  };

  const pages = generatePagination();

  return (
    <PaginationUI>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href={`?page=${currentPage - 1}`}
              aria-label="Go to previous page"
            />
          </PaginationItem>
        )}

        {pages.map((page, i) => (
          <PaginationItem key={i}>
            {page === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href={`?page=${page}`}
                isActive={page === currentPage}
                aria-label={`Go to page ${page}`}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext
              href={`?page=${currentPage + 1}`}
              aria-label="Go to next page"
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </PaginationUI>
  );
}
