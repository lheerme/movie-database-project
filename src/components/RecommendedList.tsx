import { Recommendations } from '@/types/types'
import { useQuery } from '@tanstack/react-query'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Link } from 'react-router-dom'
import defaultPic from '@/assets/default-poster-pic-landscape.png'

const apiKey = import.meta.env.VITE_REACT_APP_API_KEY

interface RecommendedListProps {
  movieId: string | undefined
  isTV?: boolean
}

export function RecommendedList({ movieId, isTV }: RecommendedListProps) {
  const { data, isLoading } = useQuery<Recommendations>({
    queryKey: ['recommended-movies', movieId],
    queryFn: async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/${
          isTV ? 'tv' : 'movie'
        }/${movieId}/recommendations?api_key=${apiKey}&language=pt-BR`
      )
      const data = await response.json()
      return data
    },
  })

  if (!isLoading && data?.results.length === 0) return

  return (
    <div className="space-y-4">
      <h2 className="text-2xl md:text-3xl font-medium tracking-wide px-4">
        Recomendações
      </h2>
      {!isLoading && (
        <Carousel className="w-full">
          <CarouselContent className="px-8">
            {data?.results.map((result) => (
              <CarouselItem
                title={isTV ? result.name : result.title}
                key={result.id}
                className="basis-1/2 md:basis-1/3 lg:basis-1/4 animate-entrance-center"
              >
                <Link
                  to={`/${isTV ? 'tv' : 'movies'}/${result.id}`}
                  className="space-y-2 group"
                >
                  <div className="rounded overflow-hidden">
                    <img
                      src={
                        result.backdrop_path
                          ? `https://image.tmdb.org/t/p/w500${result.backdrop_path}`
                          : defaultPic
                      }
                      alt=""
                      className="group-hover:scale-110 aspect-video object-cover transition-transform w-full"
                    />
                  </div>
                  <p className="truncate font-medium">
                    {isTV ? result.name : result.title}
                  </p>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 rounded-none h-full border-none bg-black opacity-25 disabled:opacity-20 hover:bg-black hover:opacity-35 hover:text-white" />
          <CarouselNext className="right-0 rounded-none h-full border-none bg-black opacity-25 disabled:opacity-20 hover:bg-black hover:opacity-35 hover:text-white" />
        </Carousel>
      )}
    </div>
  )
}
