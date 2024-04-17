import { Link, useLocation } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

interface NavListProps {
  isMobile?: boolean
}

export function NavList({ isMobile }: NavListProps) {
  const { pathname } = useLocation()

  return (
    <ul
      className={twMerge(
        'hidden md:flex items-center gap-3 text-white text-base',
        isMobile && 'flex justify-evenly text-lg my-auto'
      )}
    >
      <li
        className={twMerge(
          'transition-opacity opacity-75 hover:opacity-100',
          pathname.startsWith('/movies') && 'opacity-100'
        )}
      >
        <Link to={'/movies'}>Filmes</Link>
      </li>
      <li
        className={twMerge(
          'transition-opacity opacity-75 hover:opacity-100',
          pathname.startsWith('/tv') && 'opacity-100'
        )}
      >
        <Link to={'/tv'}>Séries</Link>
      </li>
      <li
        className={twMerge(
          'transition-opacity opacity-75 hover:opacity-100',
          pathname.startsWith('/people') && 'opacity-100'
        )}
      >
        <Link to={'/people'}>Pessoas</Link>
      </li>
    </ul>
  )
}
