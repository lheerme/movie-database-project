import { Twirl as Hamburger } from 'hamburger-react'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { SearchInput } from './SearchInput'
import { NavList } from './NavList'
import { useLocation } from 'react-router-dom'

export function MobileMenu() {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false)
  const location = useLocation()

  function handleMenuClick() {
    setIsHamburgerOpen((current) => !current)
    !isHamburgerOpen
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'auto')
  }

  useEffect(() => {
    setIsHamburgerOpen(false)
    document.body.style.overflow = 'auto'
  }, [location])

  return (
    <>
      <div className="z-10 block md:hidden">
        <Hamburger
          toggled={isHamburgerOpen}
          toggle={handleMenuClick}
          size={24}
        />
      </div>
      <div
        className={twMerge(
          'fixed top-0 bottom-0 left-0 right-0 flex-col overflow-hidden transition-all duration-300 bg-black/75',
          isHamburgerOpen ? 'visible opacity-100' : 'invisible opacity-0'
        )}
      >
        <div
          className={twMerge(
            'ml-auto flex h-60 w-full flex-col bg-background4-color transition-all duration-300 bg-background',
            isHamburgerOpen ? 'translate-y-0' : '-translate-y-full'
          )}
        >
          <div className="size-full p-6 pt-20 flex flex-col">
            <SearchInput isMobile />
            <NavList isMobile />
          </div>
        </div>
      </div>
    </>
  )
}
