import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './components/Header'
import { useEffect } from 'react'

export function App() {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
