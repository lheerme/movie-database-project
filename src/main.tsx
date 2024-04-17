import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Movies } from './pages/Movies.tsx'
import { App } from './App.tsx'
import { MovieDetail } from './pages/MovieDetail.tsx'
import { TV } from './pages/TV.tsx'
import { TVDetail } from './pages/TVDetail.tsx'
import { PersonDetail } from './pages/PersonDetail.tsx'
import { People } from './pages/People.tsx'
import { SearchResults } from './pages/SearchResults.tsx'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/movies',
        element: <Movies />,
      },
      {
        path: '/movies/:movieId',
        element: <MovieDetail />,
      },
      {
        path: '/tv',
        element: <TV />,
      },
      {
        path: '/tv/:serieId',
        element: <TVDetail />,
      },
      {
        path: '/people',
        element: <People />,
      },
      {
        path: '/people/:personId',
        element: <PersonDetail />,
      },
      {
        path: '/search',
        element: <SearchResults />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
)
