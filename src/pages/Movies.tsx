import { MoviesRoot } from '@/types/types'
import { useQuery } from '@tanstack/react-query'
import { Link, useSearchParams } from 'react-router-dom'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card } from '@/components/Card'
import { Pagination } from '@/components/Pagination'
import { CardListSkeleton } from '@/components/skeletons/CardListSkeleton'

const apiKey = import.meta.env.VITE_REACT_APP_API_KEY

export function Movies() {
  const [searchParams, setSearchParams] = useSearchParams()
  const isTopRated = searchParams.get('top-rated')

  function validatePage(page: string | null) {
    if (page) {
      if (Number.isNaN(Number(page)) || Number(page) <= 0 || Number(page) > 500)
        return 1
      return Number(page)
    }

    return 1
  }

  const currentPage = validatePage(searchParams.get('page'))

  const { data, isLoading, isError, error } = useQuery<MoviesRoot>({
    queryKey: ['trending-movies-list', isTopRated, currentPage],
    queryFn: async () => {
      const response = await fetch(
        isTopRated
          ? `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=pt-BR&page=${currentPage}`
          : `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&language=pt-BR&page=${currentPage}`
      )

      if (!response.ok) {
        throw new Error('Algo deu errado :/')
      }

      const data = await response.json()
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
    if (value === 'topRated') {
      setSearchParams((params) => {
        params.set('top-rated', 'true')
        params.delete('page')
        return params
      })
    } else {
      setSearchParams((params) => {
        params.delete('top-rated')
        params.delete('page')
        return params
      })
    }
  }

  return (
    <main className="w-full max-w-7xl m-auto flex flex-col items-center gap-10 p-5 mt-[60px]">
      <div className="w-full flex items-center justify-between gap-2">
        <h1 className="font-medium text-xl sm:text-2xl self-start">
          Filmes {isTopRated ? 'Mais Avaliados' : 'Populares'}
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
      {!isLoading && data ? (
        <>
          <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 auto-rows-auto gap-y-7 gap-x-7 justify-items-center w-full">
            {data.results.map((result) => (
              <li
                title={result.title}
                key={result.id}
                className="max-w-[185px] w-full"
              >
                <Card
                  type={'movie'}
                  id={result?.id}
                  posterPath={result?.poster_path}
                  title={result?.title}
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
