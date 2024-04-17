import { Link } from 'react-router-dom'
import defaultPicLarge from '@/assets/default-profile-pic-large.jpg'
import defaultPic from '@/assets/default-poster-pic.jpg'

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

  return (
    <Link
      title={title}
      to={`/${dataType}/${id}`}
      className="w-full space-y-3 group animate-entrance-center"
    >
      <div className="rounded w-full overflow-hidden group-hover:ring-2 group-hover:ring-foreground transition-shadow">
        <img
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
          className="group-hover:scale-110 transition-transform w-full max-w-[185px] aspect-[0.7] object-cover"
        />
      </div>
      <p className="truncate font-medium">{title}</p>
    </Link>
  )
}
