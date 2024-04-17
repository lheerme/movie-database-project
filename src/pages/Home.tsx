import { TrendingPeopleSlider } from '../components/TrendingPeopleSlider'
import { TrendingMoviesSlider } from '../components/TrendingMoviesSlider'
import { TrendingTVSlider } from '../components/TrendingTVSlider'
import { TopRatedMoviesSlider } from '../components/TopRatedMoviesSlider'
import { TopRatedTVSlider } from '../components/TopRatedTVSlider'

function Home() {
  return (
    <main className="w-full space-y-10 pb-5">
      <section className="w-full h-72 md:h-96 relative">
        <img
          src={`https://image.tmdb.org/t/p/original/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg`}
          alt="Oppenheimer banner"
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
