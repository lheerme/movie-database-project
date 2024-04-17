import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './components/Header'
import { useEffect } from 'react'

export function App() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
