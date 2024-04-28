import { Card } from '@/components/Card'
import { SearchResultsRoot } from '@/types/types'
import { useQuery } from '@tanstack/react-query'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Link, useSearchParams } from 'react-router-dom'
import { Pagination } from '@/components/Pagination'
import { CardListSkeleton } from '@/components/skeletons/CardListSkeleton'

const apiKey = import.meta.env.VITE_REACT_APP_API_KEY

export function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('query') ?? ''
  const filter = searchParams.get('filter') ?? 'all'

  function validatePage(page: string | null) {
    if (page) {
      if (Number.isNaN(Number(page)) || Number(page) <= 0 || Number(page) > 500)
        return 1
      return Number(page)
    }

    return 1
  }

  const currentPage = validatePage(searchParams.get('page'))

  const { data, isLoading, isError, error } = useQuery<SearchResultsRoot>({
    queryKey: ['search-result', query, filter, currentPage],
    queryFn: async () => {
      const searchType =
        filter === 'all' ? 'multi' : filter === 'movies' ? 'movie' : filter
      const response = await fetch(
        `https://api.themoviedb.org/3/search/${searchType}?query=${query}&api_key=${apiKey}&language=pt-BR&page=${currentPage}`
      )

      if (!response.ok) {
        throw new Error('Algo deu errado :/')
      }

      const data = await response.json()

      if (currentPage > data?.total_pages) {
        setSearchParams((params) => {
          params.set('page', data?.total_pages)
          return params
        })
      }

      return data
    },
    retry: false,
    refetchOnWindowFocus: false,
  })

  if (isError) {
    return (
      <main className="w-full flex flex-col items-center gap-10 my-[60px] text-white">
        <p className="font-medium text-white text-3xl mt-5 animate-entrance-center">
          {error.message}
        </p>
        <Link to={'/'} className="underline">
          Voltar para o inicio
        </Link>
      </main>
    )
  }

  function handleSelectChange(value: string) {
    setSearchParams((params) => {
      params.set('filter', value)
      params.delete('page')
      return params
    })
  }

  return (
    <main className="w-full min-h-[calc(100svh_-_84px)] max-w-7xl m-auto flex flex-col items-center gap-10 p-5 mt-[60px]">
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
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="movies">Filmes</SelectItem>
            <SelectItem value="tv">TV</SelectItem>
            <SelectItem value="person">Pessoas</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {!isLoading && data ? (
        <>
          {!data?.results.length && (
            <span key={666} className="text-2xl text-center">
              Nenhum resultado encontrado :/
            </span>
          )}
          <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 auto-rows-auto gap-y-7 gap-x-7 justify-items-center w-full">
            {data?.results.map((result) => (
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
            ))}
          </ul>
          {data?.total_pages > 1 && (
            <>
              <Pagination
                currentPage={currentPage}
                totalPages={data.total_pages}
              />
            </>
          )}
        </>
      ) : (
        <CardListSkeleton />
      )}
    </main>
  )
}
