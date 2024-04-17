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

interface CastListProps {
  actorsList: Cast[]
}

export function CastList({ actorsList }: CastListProps) {
  return (
    <Carousel className="w-full">
      <CarouselContent className="px-8 -ml-6">
        {actorsList.map((actor) => (
          <CarouselItem
            key={actor.id}
            className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 pl-6 animate-entrance-center"
          >
            <Link
              to={`/people/${actor.id}`}
              className="space-y-2 group max-w-[180px] w-full"
            >
              <div
                className="rounded overflow-hidden w-full h-[200px] min-[460px]:h-[270px]"
                title={actor.name}
              >
                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                      : defaultPic
                  }
                  alt={`foto do(a) ${actor.name}`}
                  className="group-hover:scale-110 transition-transform w-full h-full object-cover"
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
