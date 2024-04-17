import { SeriesProps } from '@/types/types'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Card } from '@/components/Card'

const apiKey = import.meta.env.VITE_REACT_APP_API_KEY

export function TV() {
  const [pageLimit, setPageLimit] = useState(1)
  const [searchParams, setSearchParams] = useSearchParams()
  const isTopRated = searchParams.get('top-rated')

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<SeriesProps>({
      queryKey: ['trending-tv-list', isTopRated],
      queryFn: async ({ pageParam }) => {
        try {
          const response = await fetch(
            isTopRated
              ? `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=pt-BR&page=${pageParam}`
              : `https://api.themoviedb.org/3/trending/tv/week?api_key=${apiKey}&language=pt-BR&page=${pageParam}`
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
    if (value === 'topRated') {
      setSearchParams((params) => {
        params.set('top-rated', 'true')

        return params
      })
    } else {
      setSearchParams((params) => {
        params.delete('top-rated')

        return params
      })
    }
  }

  return (
    <main className="w-full max-w-7xl m-auto flex flex-col items-center gap-10 p-5 mt-[60px]">
      <div className="w-full flex items-center justify-between gap-2">
        <h1 className="font-medium text-xl sm:text-2xl self-start">
          {isTopRated ? 'Mais Avaliados' : 'Populares'} na TV
        </h1>
        <Select
          defaultValue={isTopRated ? 'topRated' : 'populares'}
          onValueChange={handleSelectChange}
        >
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
            <SelectItem value="populares">Populares</SelectItem>
            <SelectItem value="topRated">Mais Avaliados</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {!isLoading ? (
        <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 auto-rows-auto gap-y-7 gap-x-7 justify-items-center w-full">
          {data?.pages.map((page) =>
            page.results.map((result) => (
              <li
                title={result.name}
                key={result.id}
                className="max-w-[185px] w-full"
              >
                <Card
                  type={'tv'}
                  id={result?.id}
                  posterPath={result?.poster_path}
                  title={result?.name}
                />
              </li>
            ))
          )}
        </ul>
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
