import { MoviesRoot } from '@/types/types'
import { useQuery } from '@tanstack/react-query'
import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { CarouselSkeleton } from './skeletons/CarouselSkeleton'
import { CarouselImageBlur } from './CarouselImageBlur'

const apiKey = import.meta.env.VITE_REACT_APP_API_KEY

export function TrendingMoviesSlider() {
  const { data, isLoading } = useQuery<MoviesRoot>({
    queryKey: ['trending-movies'],
    queryFn: async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&language=pt-BR`
      )
      const data = await response.json()
      return data
    },
  })

  return (
    <section className="w-full space-y-4">
      <Link
        to={'/movies'}
        className="text-xl md:text-2xl mx-2 font-medium tracking-wide flex items-center gap-1 hover:underline w-fit"
      >
        Filmes Populares <ChevronRight className="size-6" />
      </Link>
      {!isLoading ? (
        <Carousel className="w-full">
          <CarouselContent className="px-8">
            {data?.results.map((result) => (
              <CarouselItem
                title={result.title}
                key={result.id}
                className="basis-1/2 md:basis-1/3 lg:basis-1/4 animate-entrance-center"
              >
                <Link to={`/movies/${result.id}`} className="space-y-2 group">
                  <CarouselImageBlur
                    dataForChange={data}
                    src={`https://image.tmdb.org/t/p/w780${result.backdrop_path}`}
                    alt={`${result.title} image`}
                    ImgClassName="group-hover:scale-110 aspect-video transition-transform w-full"
                  />
                  <p className="truncate font-medium">{result.title}</p>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 rounded-none h-full border-none bg-black opacity-25 disabled:opacity-20 hover:bg-black hover:opacity-45 hover:text-white text-inherit" />
          <CarouselNext className="right-0 rounded-none h-full border-none bg-black opacity-25 disabled:opacity-20 hover:bg-black hover:opacity-45 hover:text-white text-inherit" />
        </Carousel>
      ) : (
        <CarouselSkeleton />
      )}
    </section>
  )
}
