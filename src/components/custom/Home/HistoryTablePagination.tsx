import { Button } from '@/components/ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type Props = {
  currentPage: number
  setCurrentPage: (page: number) => void
  maxPages: number
}

export const HistoryTablePagination = (props: Props) => {
  const { currentPage, setCurrentPage, maxPages } = props

  return (
    <div className="self-end">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button
              variant="ghost"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <ChevronLeft />
              Anterior
            </Button>
          </PaginationItem>

          {currentPage > 1 && (
            <PaginationItem
              className="cursor-pointer"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <PaginationLink>{currentPage - 1}</PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem className="cursor-pointer">
            <PaginationLink isActive>{currentPage}</PaginationLink>
          </PaginationItem>

          {maxPages > currentPage && (
            <PaginationItem
              className="cursor-pointer"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <PaginationLink>{currentPage + 1}</PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <Button
              variant="ghost"
              disabled={currentPage === maxPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Próximo
              <ChevronRight />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
