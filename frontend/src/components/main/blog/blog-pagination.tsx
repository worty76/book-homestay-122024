"use client"

import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious,
  PaginationEllipsis
} from "@/components/ui/pagination"
import { getPageNumbers, isFirstPage, isLastPage } from "@/lib/pagination"

interface BlogPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

export default function BlogPagination({
  currentPage,
  totalPages,
  onPageChange,
  className
}: BlogPaginationProps) {
  // Get the page numbers to display
  const pageNumbers = getPageNumbers(currentPage, totalPages)
  
  // Check if current page is first or last page
  const isFirst = isFirstPage(currentPage)
  const isLast = isLastPage(currentPage, totalPages)
  
  // Handle page change
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return
    onPageChange(page)
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Don't show pagination if there's only one page
  if (totalPages <= 1) return null

  return (
    <Pagination className={className}>
      <PaginationContent>
        {/* Previous button */}
        <PaginationItem>
          <PaginationPrevious 
            onClick={() => handlePageChange(currentPage - 1)}
            className={isFirst ? "pointer-events-none opacity-50" : "cursor-pointer"}
            tabIndex={isFirst ? -1 : 0}
          />
        </PaginationItem>

        {/* Page numbers */}
        {pageNumbers.map((pageNumber, index) => {
          // Render ellipsis
          if (pageNumber === null) {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            )
          }
          
          // Render page number
          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                isActive={currentPage === pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className="cursor-pointer"
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        {/* Next button */}
        <PaginationItem>
          <PaginationNext 
            onClick={() => handlePageChange(currentPage + 1)}
            className={isLast ? "pointer-events-none opacity-50" : "cursor-pointer"}
            tabIndex={isLast ? -1 : 0}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
} 