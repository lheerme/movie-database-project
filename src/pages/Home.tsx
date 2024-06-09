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
import poster11 from '../assets/home-posters/poster-11.jpg'
import poster12 from '../assets/home-posters/poster-12.jpg'
import poster13 from '../assets/home-posters/poster-13.jpg'
import poster14 from '../assets/home-posters/poster-14.jpg'
import poster15 from '../assets/home-posters/poster-15.jpg'
import poster16 from '../assets/home-posters/poster-16.jpg'
import { ImageComponent } from '@/components/ImageComponent'
import { Helmet } from 'react-helmet-async'

const postersPath = [
  { poster: poster1, hash: 'L7G6U[M{01%g0NFK~Av~03%1%gVY' },
  { poster: poster2, hash: 'LbLoGptREktQ}?xtt7xZD+i_ovj?' },
  { poster: poster3, hash: 'L.J[9l~qM{Rj%Ls.V@ofNHWCj[ax' },
  { poster: poster4, hash: 'LBBgh}4r_19G~k00_3D%n44o-.M|' },
  { poster: poster5, hash: 'L5F~aa#PT8yGK$,B9uox0L.8009F' },
  { poster: poster6, hash: 'LQN0#d00%M?c~W.8R*Rj%~xbWAV@' },
  { poster: poster7, hash: 'LE8zNO53EI?KoJfSWTj[Mwt8t7V?' },
  { poster: poster8, hash: 'L7I;S700Dn^*0d~Vx[4:0h^Q9s-o' },
  { poster: poster9, hash: 'L97LAi00%L%%%%I8t7o$t-MwxWXo' },
  { poster: poster10, hash: 'L~Mjgq~qx]M{jZa|kCayoeofV@WB' },
  { poster: poster11, hash: 'L49iVn0fzB^j7d=eR6J70e}Y3V;N' },
  { poster: poster12, hash: 'L24V8qj[00RP8wWB?vtR_Nof8^Rj' },
  { poster: poster13, hash: 'LC97kUxu01nM~pof9GxWbbWBM{t7' },
  { poster: poster14, hash: 'L13I-M?]EyJk=_-;S5Di.8.8%LM_' },
  { poster: poster15, hash: 'L26bJmx[00DiT1Rjn2x[00M{_N.7' },
  { poster: poster16, hash: 'L6A9f@^P-oxa~As:^jxa01NHR*EM' },
]

function Home() {
  function getRandomPoster(postersArray: { poster: string; hash: string }[]) {
    return postersArray[Math.floor(Math.random() * postersArray.length)]
  }

  const posterList = getRandomPoster(postersPath)
  const hashHeight = window.innerWidth > 768 ? 384 : 288

  return (
    <main className="w-full space-y-10 pb-5">
      <Helmet title='Home' />
      <section className="w-full h-72 md:h-96 relative">
        <ImageComponent
          src={posterList.poster}
          hash={posterList.hash}
          hashWidth={window.innerWidth - 7}
          hashHeight={hashHeight}
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
