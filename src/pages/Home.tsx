import { TrendingPeopleSlider } from '../components/TrendingPeopleSlider'
import { TrendingMoviesSlider } from '../components/TrendingMoviesSlider'
import { TrendingTVSlider } from '../components/TrendingTVSlider'
import { TopRatedMoviesSlider } from '../components/TopRatedMoviesSlider'
import { TopRatedTVSlider } from '../components/TopRatedTVSlider'

const postersPath = [
  'https://image.tmdb.org/t/p/original/IYUD7rAIXzBM91TT3Z5fILUS7n.jpg',
  'https://image.tmdb.org/t/p/original/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg',
  'https://image.tmdb.org/t/p/original/aYcnDyLMnpKce1FOYUpZrXtgUye.jpg',
  'https://image.tmdb.org/t/p/original/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg',
  'https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg',
  'https://image.tmdb.org/t/p/original/j26v8NGVSyJcWumzMWseZxmcbzM.jpg',
  'https://image.tmdb.org/t/p/original/bOA2Y34ikHxsxL2CPF6xfA3nQFs.jpg',
  'https://image.tmdb.org/t/p/original/8RPS3tBXaVbungeYAysamXIibLR.jpg',
  'https://image.tmdb.org/t/p/original/7qx4yq9395WxqJo2GvbwnzfEnBF.jpg',
  'https://image.tmdb.org/t/p/original/rkB4LyZHo1NHXFEDHl9vSD9r1lI.jpg',
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
