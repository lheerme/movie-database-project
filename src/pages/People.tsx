import { TrendingPeople } from '@/types/types'
import { useQuery } from '@tanstack/react-query'
import { Card } from '@/components/Card'
import { Link, useSearchParams } from 'react-router-dom'
import { Pagination } from '@/components/Pagination'
import { CardListSkeleton } from '@/components/skeletons/CardListSkeleton'

const apiKey = import.meta.env.VITE_REACT_APP_API_KEY

export function People() {
  const [searchParams] = useSearchParams()
  function validatePage(page: string | null) {
    if (page) {
      if (Number.isNaN(Number(page)) || Number(page) <= 0 || Number(page) > 500)
        return 1
      return Number(page)
    }

    return 1
  }

  const currentPage = validatePage(searchParams.get('page'))

  const { data, isLoading, isError, error } = useQuery<TrendingPeople>({
    queryKey: ['trending-people-list', currentPage],
    queryFn: async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/person/week?api_key=${apiKey}&language=pt-BR&page=${currentPage}`
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

  return (
    <main className="w-full max-w-7xl m-auto flex flex-col items-center gap-10 p-5 mt-[60px]">
      <h1 className="font-medium text-2xl self-start">Pessoas populares</h1>
      {!isLoading && data ? (
        <>
          <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 auto-rows-auto gap-y-7 gap-x-7 justify-items-center w-full">
            {data.results.map((result) => (
              <li key={result.id} className="max-w-[185px] w-full">
                <Card
                  type={'person'}
                  id={result?.id}
                  posterPath={result?.profile_path}
                  title={result?.name}
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
