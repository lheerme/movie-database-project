import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Skeleton } from '../ui/skeleton'
import { twMerge } from 'tailwind-merge'

interface CarouselSkeletonProps {
  isPerson?: boolean
}

export function CarouselSkeleton({ isPerson }: CarouselSkeletonProps) {
  return (
    <Carousel className="w-full">
      <CarouselContent className="px-8">
        {Array.from({ length: 20 }).map((_, index) => (
          <CarouselItem
            key={index}
            className={twMerge(
              'basis-1/2 md:basis-1/4',
              isPerson &&
                'sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 pl-6'
            )}
          >
            <div className="space-y-3">
              <Skeleton
                className={twMerge(
                  'aspect-video rounded',
                  isPerson && 'aspect-[0.7]'
                )}
              />
              <Skeleton className="max-w-[200px] w-full h-5 rounded" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-0 rounded-none h-full border-none bg-black opacity-25 disabled:opacity-20 hover:bg-black hover:opacity-45 hover:text-white text-inherit" />
      <CarouselNext className="right-0 rounded-none h-full border-none bg-black opacity-25 disabled:opacity-20 hover:bg-black hover:opacity-45 hover:text-white text-inherit" />
    </Carousel>
  )
}
