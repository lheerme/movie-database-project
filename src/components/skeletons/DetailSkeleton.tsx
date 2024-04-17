import { Skeleton } from '../ui/skeleton'
import { CarouselSkeleton } from './CarouselSkeleton'

interface DetailSkeletonProps {
  isPerson?: boolean
}

export function DetailSkeleton({ isPerson }: DetailSkeletonProps) {
  if (isPerson) {
    return (
      <div className="max-w-7xl w-full m-auto space-y-10 z-[1] mt-8">
        <div className="flex flex-col md:flex-row items-start gap-6 w-full max-w-6xl px-4">
          <Skeleton className="w-full sm:max-w-[290px] max-w-[220px] aspect-[0.7] shadow-lg mx-auto md:mx-0" />
          <div className="flex flex-col gap-2 w-full">
            <Skeleton className="max-w-[450px] w-full h-8 rounded mb-1" />
            <Skeleton className="max-w-[320px] w-full h-5 rounded" />
            <Skeleton className="max-w-[375px] w-full h-5 rounded" />
            <Skeleton className="max-w-[400px] w-full h-40 rounded" />
          </div>
        </div>
        <div className="space-y-4 px-4">
          <Skeleton className="max-w-[300px] w-full h-5 rounded" />
          <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 auto-rows-auto gap-y-7 gap-x-7 justify-items-center w-full">
            {Array.from({ length: 20 }).map((_, index) => (
              <li key={index} className="max-w-[185px] w-full space-y-3">
                <Skeleton className="max-w-[185px] w-full h-[278px] rounded" />
                <Skeleton className="max-w-[150px] w-full h-5 rounded" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl w-full m-auto space-y-10 z-[1] mt-8">
      <div className="flex flex-col md:flex-row items-start gap-6 w-full max-w-6xl px-4">
        <Skeleton className="w-full sm:max-w-[290px] max-w-[220px] aspect-[0.7] shadow-lg mx-auto md:mx-0" />
        <div className="flex flex-col gap-2 w-full">
          <Skeleton className="max-w-[450px] w-full h-8 rounded mb-1" />
          <Skeleton className="max-w-[375px] w-full h-5 rounded" />
          <Skeleton className="max-w-[350px] w-full h-5 rounded" />
          <Skeleton className="max-w-[320px] w-full h-5 rounded" />
          <Skeleton className="max-w-[300px] w-full h-5 rounded" />
          <Skeleton className="max-w-[400px] w-full h-40 rounded" />
        </div>
      </div>
      <div className="space-y-4 px-4">
        <Skeleton className="max-w-[300px] w-full h-5 rounded" />
        <CarouselSkeleton isPerson />
      </div>
    </div>
  )
}
