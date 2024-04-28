import { MovieDetailProps } from '@/types/types'
import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { format } from 'date-fns'
import defaultPoster from '@/assets/default-poster-pic.jpg'
import { MovieTrailer } from '@/components/MovieTrailer'
import { RecommendedList } from '@/components/RecommendedList'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { DetailSkeleton } from '@/components/skeletons/DetailSkeleton'
import { CastList } from '@/components/CastList'

const apiKey = import.meta.env.VITE_REACT_APP_API_KEY

export function MovieDetail() {
  const [showFullOverview, setShowFullOverview] = useState(false)
  const { movieId } = useParams()
  const { data, isLoading, isError, error } = useQuery<MovieDetailProps>({
    queryKey: ['movie-detail', movieId],
    queryFn: async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=pt-BR&append_to_response=credits,release_dates,videos`
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
      <main className="w-full min-h-[calc(100svh_-_84px)] flex flex-col items-center gap-10 mt-[60px] text-white">
        <p className="font-medium text-white text-3xl mt-5 animate-entrance-center">
          {error.message}
        </p>
        <Link to={'/'} className="underline">
          Voltar para o inicio
        </Link>
      </main>
    )
  }

  if (!isLoading) {
    function handleShowFullOverview() {
      setShowFullOverview((current) => !current)
    }

    const BRResults = data?.release_dates.results.find(
      (element) => element.iso_3166_1 === 'BR'
    )

    const BRCertification = BRResults?.release_dates.find(
      (element) => element.certification != ''
    )

    const directors = data?.credits.crew.filter(
      (element) => element.job === 'Director'
    )

    const movieTrailer = data?.videos.results.find((element) =>
      element.name.toLocaleLowerCase().includes('trailer')
    )

    return (
      <main className="w-full flex flex-col items-center gap-10 my-[60px] text-white">
        <div
          className="fixed flex inset-0 h-lvh"
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
              alt={`${data?.title} poster`}
              className="w-full sm:max-w-[290px] max-w-[220px] aspect-[0.7] object-cover shadow-lg mx-auto md:mx-0 animate-entrance-center"
            />
            <div className="flex flex-col gap-2 text-white">
              <h1 className="font-medium text-white text-3xl mb-1 animate-entrance-center">
                {data?.title}
              </h1>
              <p className="animate-entrance-center">
                <span className="font-medium">Título original:</span>{' '}
                {data?.original_title}
              </p>
              <p className="animate-entrance-center">
                <span className="font-medium">Release:</span>{' '}
                {format(data?.release_date ?? '', 'dd/MM/yyyy')}
              </p>
              {BRCertification?.certification === undefined ? null : (
                <p className="animate-entrance-center">
                  <span className="font-medium">Faixa etária:</span>{' '}
                  {BRCertification?.certification === 'L'
                    ? 'Livre'
                    : `${BRCertification?.certification} Anos`}
                </p>
              )}
              {data?.runtime && data?.runtime > 0 ? (
                <p className="animate-entrance-center">
                  <span className="font-medium">Duração:</span>{' '}
                  {Math.floor(data?.runtime / 60)}h {data?.runtime % 60}m
                </p>
              ) : null}
              <p className="animate-entrance-center">
                <span className="font-medium">Gêneros:</span>{' '}
                {data?.genres.map((genero) => genero.name).join(' • ')}
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
              <ul className="flex gap-3 mt-4">
                {directors?.map((director) => (
                  <Link
                    to={`/people/${director.id}`}
                    key={director.id}
                    className="flex flex-col gap-1 items-center animate-entrance-center"
                  >
                    <p className="text-sm font-medium underline">
                      {director.name}
                    </p>
                    <span className="text-xs self-start">Diretor</span>
                  </Link>
                ))}
              </ul>
            </div>
          </div>

          {data?.credits.cast && (
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-medium tracking-wide px-4">
                Elenco
              </h2>
              <CastList actorsList={data?.credits.cast} />
            </div>
          )}

          {movieTrailer && (
            <MovieTrailer videoId={movieTrailer.key} name={movieTrailer.name} />
          )}
          <RecommendedList movieId={movieId} />
        </section>
      </main>
    )
  }

  if (isLoading) {
    return (
      <main className="w-full flex flex-col items-center gap-10 my-[60px] text-white">
        <DetailSkeleton />
      </main>
    )
  }
}
