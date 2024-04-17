import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { differenceInYears, format } from 'date-fns'
import { CombinedCreditsCast, PersonDetailProps } from '@/types/types'
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ChevronDown, ChevronUp } from 'lucide-react'
import defaultPicLarge from '@/assets/default-profile-pic-large.jpg'
import { Card } from '@/components/Card'
import { DetailSkeleton } from '@/components/skeletons/DetailSkeleton'

const apiKey = import.meta.env.VITE_REACT_APP_API_KEY

export function PersonDetail() {
  const [mediaType, setMediaType] = useState<'all' | 'tv' | 'movie'>('all')
  const [showFullBiography, setShowFullBiography] = useState(false)
  const { personId } = useParams()
  const { data, isLoading } = useQuery<PersonDetailProps>({
    queryKey: ['person-detail', personId],
    queryFn: async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/person/${personId}?api_key=${apiKey}&language=pt-BR&append_to_response=combined_credits`
      )
      const data = await response.json()
      return data
    },
  })

  function removeDuplicatesById(array: CombinedCreditsCast[] | undefined) {
    if (array !== undefined) {
      const withoutDuplicates = array.filter(
        (value, index, self) =>
          index === self.findIndex((t) => t.id === value.id)
      )

      return withoutDuplicates
    }

    return []
  }

  function filterBySelect(array: CombinedCreditsCast[] | undefined) {
    if (array === undefined) {
      return []
    } else {
      if (mediaType === 'all') return array

      const dataFiltered = array.filter((data) => data.media_type === mediaType)
      return dataFiltered
    }
  }

  function handleRawData(array: CombinedCreditsCast[] | undefined) {
    if (array !== undefined) {
      const noDuplicatesData = removeDuplicatesById(array)
      const filteredData = filterBySelect(noDuplicatesData)

      return filteredData
    } else {
      return []
    }
  }

  function handleSelectChange(value: 'all' | 'tv' | 'movie') {
    setMediaType(value)
  }

  function handleShowFullBiography() {
    setShowFullBiography((current) => !current)
  }

  return (
    <main className="w-full flex flex-col items-center gap-10 p-4 my-[60px]">
      {!isLoading ? (
        <section className="max-w-7xl w-full m-auto space-y-10 z-[1] md:mt-8">
          <div className="flex flex-col md:flex-row items-start gap-6 w-full max-w-6xl">
            <img
              src={
                data?.profile_path
                  ? `https://image.tmdb.org/t/p/w342${data?.profile_path}`
                  : defaultPicLarge
              }
              alt={`${data?.name} poster`}
              className="w-full sm:max-w-[290px] max-w-[220px] object-cover aspect-[0.7] shadow-lg mx-auto md:mx-0"
            />
            <div className="flex flex-col gap-2">
              <h1 className="font-medium text-3xl mb-1">{data?.name}</h1>
              {data?.birthday && (
                <p>
                  <span className="font-semibold">Nascimento:</span>{' '}
                  {format(data?.birthday ?? '', 'dd/MM/yyyy')}{' '}
                  {data?.deathday
                    ? null
                    : `(${differenceInYears(
                        new Date(),
                        data?.birthday ?? ''
                      )} anos)`}
                </p>
              )}
              {data?.deathday && (
                <p>
                  <span className="font-semibold">Falescimento:</span>{' '}
                  {format(data?.deathday ?? '', 'dd/MM/yyyy')}{' '}
                  {`(${differenceInYears(
                    data?.deathday ?? '',
                    data?.birthday ?? ''
                  )} anos)`}
                </p>
              )}
              {data?.place_of_birth && (
                <p>
                  <span className="font-semibold">Local de nascimento:</span>{' '}
                  {data?.place_of_birth}
                </p>
              )}
              {data?.biography ? (
                <p className="leading-relaxed">
                  <span className="font-semibold">Biografia:</span>{' '}
                  {showFullBiography
                    ? data?.biography
                    : data?.biography.slice(0, 330)}
                  {data.biography.length > 330 && (
                    <>
                      {!showFullBiography && '...'}
                      {showFullBiography ? (
                        <button
                          onClick={handleShowFullBiography}
                          className="flex items-center gap-0.5 mt-1"
                        >
                          Ver menos <ChevronUp className="size-6 pt-[4px]" />
                        </button>
                      ) : (
                        <button
                          onClick={handleShowFullBiography}
                          className="flex items-center gap-0.5 mt-1"
                        >
                          Ver mais <ChevronDown className="size-6 pt-[4px]" />
                        </button>
                      )}
                    </>
                  )}
                </p>
              ) : null}
            </div>
          </div>

          <div className="w-full flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-medium tracking-wide">
              Filmografia
            </h2>
            <Select defaultValue={'all'} onValueChange={handleSelectChange}>
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
                <SelectItem value="movie">Filmes</SelectItem>
                <SelectItem value="tv">TV</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 auto-rows-auto gap-y-7 gap-x-7 justify-items-center w-full mx-auto">
            {handleRawData(data?.combined_credits.cast)
              .sort((a, b) => b.vote_count - a.vote_count)
              .map((result) => (
                <li key={result.id} className="max-w-[185px] w-full">
                  <Card
                    type={result.media_type === 'movie' ? 'movie' : 'tv'}
                    id={result?.id}
                    posterPath={result?.poster_path}
                    title={
                      result.media_type === 'movie'
                        ? result?.title
                        : result?.name
                    }
                  />
                </li>
              ))}
          </ul>
        </section>
      ) : (
        <DetailSkeleton isPerson />
      )}
    </main>
  )
}
