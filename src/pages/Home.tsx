import { TrendingPeopleSlider } from '../components/TrendingPeopleSlider'
import { TrendingMoviesSlider } from '../components/TrendingMoviesSlider'
import { TrendingTVSlider } from '../components/TrendingTVSlider'
import { TopRatedMoviesSlider } from '../components/TopRatedMoviesSlider'
import { TopRatedTVSlider } from '../components/TopRatedTVSlider'
import poster1 from '../assets/home-posters/poster-1.jpg'
import poster2 from '../assets/home-posters/poster-2.jpg'
import poster3 from '../assets/home-posters/poster-3.jpg'
import poster4 from '../assets/home-posters/poster-4.jpg'
import poster5 from '../assets/home-posters/poster-5.jpg'
import poster6 from '../assets/home-posters/poster-6.jpg'
import poster7 from '../assets/home-posters/poster-7.jpg'
import poster8 from '../assets/home-posters/poster-8.jpg'
import poster9 from '../assets/home-posters/poster-9.jpg'
import poster10 from '../assets/home-posters/poster-10.jpg'

const postersPath = [
  poster1,
  poster2,
  poster3,
  poster4,
  poster5,
  poster6,
  poster7,
  poster8,
  poster9,
  poster10,
]

function Home() {
  function getRandomPoster(postersArray: string[]) {
    return postersArray[Math.floor(Math.random() * postersArray.length)]
  }

  return (
    <main className="w-full space-y-10 pb-5">
      <section className="w-full h-72 md:h-96 relative">
        <img
          src={getRandomPoster(postersPath)}
          alt="Random Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute flex items-center justify-center inset-0 bg-black/50">
          <p className="font-medium text-white text-2xl md:text-4xl w-full max-w-[490px] md:max-w-3xl text-center mt-10 mx-2 animate-entrance-center">
            Luzes, API, Ação: Eleve Sua Experiência Cinematográfica com o TMDB!
          </p>
        </div>
      </section>
      <section className="max-w-7xl w-full m-auto space-y-10">
        <TrendingMoviesSlider />
        <TrendingTVSlider />
        <TopRatedMoviesSlider />
        <TopRatedTVSlider />
        <TrendingPeopleSlider />
      </section>
    </main>
  )
}

export default Home
