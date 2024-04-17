import { Card } from '@/components/Card'
import { Button } from '@/components/ui/button'
import { SearchResultsRoot } from '@/types/types'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useSearchParams } from 'react-router-dom'
import { Skeleton } from '@/components/ui/skeleton'

const apiKey = import.meta.env.VITE_REACT_APP_API_KEY

export function SearchResults() {
  const [pageLimit, setPageLimit] = useState(1)
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('query') ?? ''
  const filter = searchParams.get('filter') ?? 'all'

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<SearchResultsRoot>({
      queryKey: ['search-result', query, filter],
      queryFn: async ({ pageParam }) => {
        try {
          const searchType =
            filter === 'all' ? 'multi' : filter === 'movies' ? 'movie' : filter
          const response = await fetch(
            `https://api.themoviedb.org/3/search/${searchType}?query=${query}&api_key=${apiKey}&language=pt-BR&page=${pageParam}`
          )
          const data = await response.json()

          data.total_pages !== pageLimit && setPageLimit(data.total_pages)

          return data
        } catch (error) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          if (error.response.status === 404) {
            throw Error
          }
        }
      },
      initialPageParam: 1,
      getNextPageParam: (_lastPage, allPages) =>
        allPages.length < pageLimit ? allPages.length + 1 : undefined,
      retry: false,
      refetchOnWindowFocus: false,
    })

  function handleSelectChange(value: string) {
    setSearchParams((params) => {
      params.set('filter', value)

      return params
    })
  }

  return (
    <main className="w-full max-w-7xl m-auto flex flex-col items-center gap-10 p-5 mt-[60px]">
      <div className="w-full flex items-center justify-between gap-2">
        <h1 className="font-medium text-xl sm:text-2xl self-start">
          Resultados para: {query}
        </h1>
        <Select onValueChange={handleSelectChange} value={filter}>
          <SelectTrigger className="w-full max-w-[160px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent
            ref={(ref) => {
              if (!ref) return
              ref.ontouchstart = (e) => {
                e.preventDefault()
              }
            }}
          >
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="movies">Movies</SelectItem>
            <SelectItem value="tv">TV</SelectItem>
            <SelectItem value="person">Person</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {!isLoading ? (
        <>
          {!data?.pages[0].results.length && (
            <span key={666} className="text-2xl">
              Nenhum resultado encontrado :/
            </span>
          )}
          <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 auto-rows-auto gap-y-7 gap-x-7 justify-items-center w-full">
            {data?.pages.map((page) =>
              page.results.map((result) => (
                <li
                  title={result.title}
                  key={result.id}
                  className="max-w-[185px] w-full"
                >
                  <Card
                    type={result.media_type ?? filter}
                    id={result?.id}
                    posterPath={result?.poster_path ?? result?.profile_path}
                    title={result?.title ?? result?.name}
                  />
                </li>
              ))
            )}
          </ul>
        </>
      ) : (
        <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 auto-rows-auto gap-y-7 gap-x-7 justify-items-center w-full">
          {Array.from({ length: 20 }).map((_, index) => (
            <li key={index} className="max-w-[185px] w-full space-y-3">
              <Skeleton className="max-w-[185px] w-full h-[278px] rounded" />
              <Skeleton className="max-w-[150px] w-full h-5 rounded" />
            </li>
          ))}
        </ul>
      )}
      {hasNextPage && (
        <Button
          variant="secondary"
          className="my-4 mx-auto"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
        </Button>
      )}
    </main>
  )
}
