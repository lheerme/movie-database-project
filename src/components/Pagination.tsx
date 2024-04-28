import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ReactPaginate from 'react-paginate'
import { useSearchParams } from 'react-router-dom'

interface PaginationProps {
  currentPage: number
  totalPages: number
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const [_, setSearchParams] = useSearchParams()

  function handlePageClick(event: { selected: number }) {
    setSearchParams((params) => {
      params.set('page', (event.selected + 1).toString())
      return params
    })
  }

  function handleNextPageButton() {
    if (currentPage !== totalPages && currentPage !== 500) {
      setSearchParams((params) => {
        params.set('page', (currentPage + 1).toString())
        return params
      })
    }
  }

  function handlePrevPageButton() {
    if (!(currentPage === 1)) {
      setSearchParams((params) => {
        params.set('page', (currentPage - 1).toString())
        return params
      })
    }
  }

  return (
    <>
      {totalPages > 1 && (
        <>
          <div className="hidden min-[525px]:block">
            <ReactPaginate
              breakLabel="..."
              nextLabel={
                <Button
                  variant={'outline'}
                  className="p-1"
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="text-primary" />
                </Button>
              }
              onPageChange={handlePageClick}
              forcePage={currentPage - 1}
              pageRangeDisplayed={2}
              marginPagesDisplayed={2}
              pageCount={totalPages > 500 ? 500 : totalPages}
              previousLabel={
                <Button
                  variant={'outline'}
                  className="p-1"
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="text-primary" />
                </Button>
              }
              renderOnZeroPageCount={null}
              breakLinkClassName="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground w-[34px] h-[36px]"
              pageLinkClassName="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground w-[34px] h-[36px]"
              activeLinkClassName="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input shadow-sm bg-muted text-accent-foreground w-[34px] h-[36px]"
              containerClassName="flex items-center gap-2"
            />
          </div>
          <div className="min-[525px]:hidden flex items-center gap-4">
            <Button
              variant={'outline'}
              className="p-1"
              onClick={handlePrevPageButton}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="text-primary" />
            </Button>
            <span>
              Página {currentPage} de {totalPages > 500 ? 500 : totalPages}
            </span>
            <Button
              variant={'outline'}
              className="p-1"
              onClick={handleNextPageButton}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="text-primary" />
            </Button>
          </div>
        </>
      )}
    </>
  )
}
