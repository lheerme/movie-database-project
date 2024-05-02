import defaultPic from '@/assets/default-profile-pic.jpg'
import { Link } from 'react-router-dom'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Cast } from '@/types/types'
import { ImageComponent } from './ImageComponent'
import { useLayoutEffect, useRef, useState } from 'react'

interface CastListProps {
  actorsList: Cast[]
}

export function CastList({ actorsList }: CastListProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useLayoutEffect(() => {
    if (ref.current) {
      const { clientWidth, clientHeight } = ref.current
      setDimensions({
        width: clientWidth,
        height: clientHeight,
      })
    }
  }, [actorsList])

  return (
    <Carousel className="w-full">
      <CarouselContent className="px-8 -ml-6">
        {actorsList.map((actor) => (
          <CarouselItem
            key={actor.id}
            className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 pl-6 animate-entrance-center"
          >
            <Link to={`/people/${actor.id}`} className="space-y-2 group">
              <div
                ref={ref}
                className="rounded overflow-hidden aspect-[0.7]"
                title={actor.name}
              >
                <ImageComponent
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                      : defaultPic
                  }
                  alt={`foto do(a) ${actor.name}`}
                  hash={'L02i9Aj[j[j[offQfQfQayfQfQfQ'}
                  hashWidth={dimensions.width}
                  hashHeight={dimensions.height}
                  className="group-hover:scale-110 aspect-[0.7] transition-transform w-full h-full object-cover"
                  isPulse
                />
              </div>
              <p className="truncate font-medium" title={actor.name}>
                {actor.name}
              </p>
              <span
                className="truncate text-sm text-muted-foreground inline-block w-full"
                title={actor.character}
              >
                {actor.character}
              </span>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-0 rounded-none h-full border-none bg-black opacity-25 disabled:opacity-20 hover:bg-black hover:opacity-35 hover:text-white" />
      <CarouselNext className="right-0 rounded-none h-full border-none bg-black opacity-25 disabled:opacity-20 hover:bg-black hover:opacity-35 hover:text-white" />
    </Carousel>
  )
}
