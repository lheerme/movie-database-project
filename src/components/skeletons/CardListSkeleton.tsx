import { Skeleton } from '../ui/skeleton'

export function CardListSkeleton() {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 auto-rows-auto gap-y-7 gap-x-7 justify-items-center w-full">
      {Array.from({ length: 20 }).map((_, index) => (
        <li key={index} className="max-w-[185px] w-full space-y-3">
          <Skeleton className="max-w-[185px] w-full h-auto aspect-[0.7] rounded" />
          <Skeleton className="max-w-[150px] w-full h-5 rounded" />
        </li>
      ))}
    </ul>
  )
}
