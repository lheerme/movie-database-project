import { Link } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import { MobileMenu } from './MobileMenu'
import { SearchInput } from './SearchInput'
import { NavList } from './NavList'
import { useScroll } from '@/hooks/useScroll'

export function Header() {
  const isScroll = useScroll(25)

  console.log(isScroll)

  return (
    <header
      className={twMerge(
        'w-full fixed top-0 z-[2] bg-transparent',
        isScroll && 'bg-background border-b'
      )}
    >
      <div className="max-w-7xl m-auto flex items-center justify-between p-3">
        <Link
          to={'/'}
          className="text-sm min-[360px]:text-lg sm:text-2xl font-medium"
        >
          Movie Database
        </Link>
        <NavList />
        <SearchInput />
        <MobileMenu />
      </div>
    </header>
  )
}
