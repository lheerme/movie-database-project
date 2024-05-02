import { Link } from 'react-router-dom'
import defaultPicLarge from '@/assets/default-profile-pic-large.jpg'
import defaultPic from '@/assets/default-poster-pic.jpg'
import { ImageComponent } from './ImageComponent'
import { useLayoutEffect, useRef, useState } from 'react'

interface CardProps {
  type: string
  id: number
  posterPath: string | undefined
  title: string | undefined
}

export function Card({ type, id, posterPath, title }: CardProps) {
  const dataType =
    type === 'movie'
      ? 'movies'
      : type === 'tv'
      ? 'tv'
      : type === 'person' && 'people'

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
  }, [id])

  return (
    <Link
      title={title}
      to={`/${dataType}/${id}`}
      className="w-full space-y-3 group animate-entrance-center"
    >
      <div
        ref={ref}
        className="rounded w-full overflow-hidden aspect-[0.7] group-hover:ring-2 group-hover:ring-foreground transition-shadow"
      >
        <ImageComponent
          src={
            type === 'person'
              ? posterPath
                ? `https://image.tmdb.org/t/p/w185${posterPath}`
                : defaultPicLarge
              : posterPath
              ? `https://image.tmdb.org/t/p/w185${posterPath}`
              : defaultPic
          }
          alt={`${title} poster`}
          hash={'L02i9Aj[j[j[offQfQfQayfQfQfQ'}
          hashWidth={dimensions.width}
          hashHeight={dimensions.height}
          className="group-hover:scale-110 transition-transform w-full max-w-[185px] aspect-[0.7] object-cover"
          isPulse
        />
      </div>
      <p className="truncate font-medium">{title}</p>
    </Link>
  )
}
