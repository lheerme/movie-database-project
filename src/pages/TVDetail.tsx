import { SerieDetailProps } from '@/types/types'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useParams } from 'react-router-dom'
import defaultPoster from '@/assets/default-poster-pic.jpg'
import { MovieTrailer } from '@/components/MovieTrailer'
import { RecommendedList } from '@/components/RecommendedList'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { DetailSkeleton } from '@/components/skeletons/DetailSkeleton'
import { CastList } from '@/components/CastList'

const apiKey = import.meta.env.VITE_REACT_APP_API_KEY

export function TVDetail() {
  const [showFullOverview, setShowFullOverview] = useState(false)
  const { serieId } = useParams()
  const { data, isLoading } = useQuery<SerieDetailProps>({
    queryKey: ['serie-detail', serieId],
    queryFn: async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${serieId}?api_key=${apiKey}&language=pt-BR&append_to_response=credits,content_ratings,videos`
      )
      const data = await response.json()
      return data
    },
  })

  const BRResults = data?.content_ratings.results.find(
    (element) => element.iso_3166_1 === 'BR'
  )

  const serieTrailer = data?.videos.results.find((element) =>
    element.name.toLowerCase().includes('trailer')
  )

  function handleShowFullOverview() {
    setShowFullOverview((current) => !current)
  }

  return (
    <main className="w-full flex flex-col items-center gap-10 my-[60px] text-white">
      {!isLoading ? (
        <>
          <div
            className="fixed flex inset-0 h-full"
            style={{
              backgroundImage: `url("https://image.tmdb.org/t/p/original/${data?.backdrop_path}")`,
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'fixed',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          >
            <div className="absolute size-full bg-black/80" />
          </div>
          <section className="max-w-7xl w-full m-auto space-y-10 z-[1] mt-8">
            <div className="flex flex-col md:flex-row items-start gap-6 w-full max-w-6xl px-4">
              <img
                src={
                  data?.poster_path
                    ? `https://image.tmdb.org/t/p/w342${data?.poster_path}`
                    : defaultPoster
                }
                alt={`${data?.name} poster`}
                className="w-full sm:max-w-[290px] max-w-[220px] aspect-[0.7] object-cover shadow-lg mx-auto md:mx-0 animate-entrance-center"
              />
              <div className="flex flex-col gap-2 text-white">
                <h1 className="font-medium text-white text-3xl mb-1 animate-entrance-center">
                  {data?.name}
                </h1>
                <p className="animate-entrance-center">
                  <span className="font-medium">Título original:</span>{' '}
                  {data?.original_name}
                </p>
                <p className="animate-entrance-center">
                  <span className="font-medium">Release:</span>{' '}
                  {format(data?.first_air_date ?? '', 'dd/MM/yyyy')} (US)
                </p>
                {BRResults === undefined ? null : (
                  <p className="animate-entrance-center">
                    <span className="font-medium">Faixa etária:</span>{' '}
                    {BRResults?.rating === 'L'
                      ? 'Livre'
                      : `${BRResults?.rating} Anos`}
                  </p>
                )}
                <p className="animate-entrance-center">
                  <span className="font-medium">Gêneros:</span>{' '}
                  {data?.genres.map((genero) => genero.name).join(' • ')}
                </p>
                <p className="animate-entrance-center">
                  <span className="font-medium">Número de temporadas:</span>{' '}
                  {data?.number_of_seasons}
                </p>
                <p className="animate-entrance-center">
                  <span className="font-medium">Número de episódios:</span>{' '}
                  {data?.number_of_episodes}
                </p>
                {data?.overview && (
                  <p className="leading-relaxed animate-entrance-center">
                    <span className="font-medium">Sinopse:</span>{' '}
                    {showFullOverview
                      ? data?.overview
                      : data?.overview.slice(0, 330)}
                    {data?.overview.length > 330 && (
                      <>
                        {!showFullOverview && '...'}
                        {showFullOverview ? (
                          <button
                            onClick={handleShowFullOverview}
                            className="flex items-center gap-0.5 mt-1"
                          >
                            Ver menos <ChevronUp className="size-6 pt-[4px]" />
                          </button>
                        ) : (
                          <button
                            onClick={handleShowFullOverview}
                            className="flex items-center gap-0.5 mt-1"
                          >
                            Ver mais <ChevronDown className="size-6 pt-[4px]" />
                          </button>
                        )}
                      </>
                    )}
                  </p>
                )}
                {data?.created_by[0] && (
                  <p className="animate-entrance-center">
                    <span className="font-medium">
                      {data?.created_by.length > 1 ? 'Criadores:' : 'Criador:'}
                    </span>{' '}
                    {data?.created_by.map((creator) => creator.name).join(', ')}
                  </p>
                )}
              </div>
            </div>
            {data?.credits.cast[0] && (
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-medium tracking-wide px-4">
                  Elenco da última temporada
                </h2>
                <CastList actorsList={data?.credits.cast} />
              </div>
            )}
            {serieTrailer && (
              <MovieTrailer
                videoId={serieTrailer.key}
                name={serieTrailer.name}
              />
            )}
            <RecommendedList movieId={serieId} isTV />
          </section>
        </>
      ) : (
        <DetailSkeleton />
      )}
    </main>
  )
}
