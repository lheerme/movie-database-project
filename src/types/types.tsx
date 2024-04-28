export interface MoviesRoot {
  page: number
  results: MoviesResult[]
  total_pages: number
  total_results: number
}

export interface MoviesResult {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface ActorsRoot {
  page: number
  results: ActorsResult[]
  total_pages: number
  total_results: number
}

export interface ActorsResult {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  known_for: KnownFor[]
}

export interface KnownFor {
  adult: boolean
  backdrop_path: string
  id: number
  title?: string
  original_language: string
  original_title?: string
  overview: string
  poster_path: string
  media_type: string
  genre_ids: number[]
  popularity: number
  release_date?: string
  video?: boolean
  vote_average: number
  vote_count: number
  name?: string
  original_name?: string
  first_air_date?: string
  origin_country?: string[]
}

export interface TVRoot {
  page: number
  results: TVResult[]
  total_pages: number
  total_results: number
}

export interface TVResult {
  adult: boolean
  backdrop_path: string
  id: number
  name: string
  original_language: string
  original_name: string
  overview: string
  poster_path: string
  media_type: string
  genre_ids: number[]
  popularity: number
  first_air_date: string
  vote_average: number
  vote_count: number
  origin_country: string[]
}

export interface MovieDetailProps {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: BelongsToCollection
  budget: number
  genres: Genre[]
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: SpokenLanguage[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  credits: Credits
  release_dates: ReleaseDates
  videos: Videos
}

export interface BelongsToCollection {
  id: number
  name: string
  poster_path: string
  backdrop_path: string
}

export interface Genre {
  id: number
  name: string
}

export interface ProductionCompany {
  id: number
  logo_path: string
  name: string
  origin_country: string
}

export interface ProductionCountry {
  iso_3166_1: string
  name: string
}

export interface SpokenLanguage {
  english_name: string
  iso_639_1: string
  name: string
}

export interface Credits {
  cast: Cast[]
  crew: Crew[]
}

export interface Cast {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path?: string
  cast_id: number
  character: string
  credit_id: string
  order: number
}

export interface Crew {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path?: string
  credit_id: string
  department: string
  job: string
}

export interface ReleaseDates {
  results: ReleaseDatesResult[]
}

export interface ReleaseDatesResult {
  iso_3166_1: string
  release_dates: ReleaseDate[]
}

export interface ReleaseDate {
  certification: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  descriptors: any[]
  iso_639_1: string
  note: string
  release_date: string
  type: number
}

export interface Videos {
  results: VideosResult[]
}

export interface VideosResult {
  iso_639_1: string
  iso_3166_1: string
  name: string
  key: string
  site: string
  size: number
  type: string
  official: boolean
  published_at: string
  id: string
}

export interface Recommendations {
  page: number
  results: RecommendationsResult[]
  total_pages: number
  total_results: number
}

export interface RecommendationsResult {
  adult: boolean
  backdrop_path: string
  id: number
  title: string
  name: string
  original_language: string
  original_title: string
  overview: string
  poster_path: string
  media_type: string
  genre_ids: number[]
  popularity: number
  release_date: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface SeriesProps {
  page: number
  results: TVResult[]
  total_pages: number
  total_results: number
}

export interface SerieDetailProps {
  adult: boolean
  backdrop_path: string
  created_by: CreatedBy[]
  episode_run_time: number[]
  first_air_date: string
  genres: Genre[]
  homepage: string
  id: number
  in_production: boolean
  languages: string[]
  last_air_date: string
  last_episode_to_air: LastEpisodeToAir
  name: string
  next_episode_to_air: NextEpisodeToAir
  networks: Network[]
  number_of_episodes: number
  number_of_seasons: number
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  seasons: Season[]
  spoken_languages: SpokenLanguage[]
  status: string
  tagline: string
  type: string
  vote_average: number
  vote_count: number
  credits: Credits
  content_ratings: ContentRatings
  videos: Videos
}

export interface CreatedBy {
  id: number
  credit_id: string
  name: string
  gender: number
  profile_path: string
}

export interface LastEpisodeToAir {
  id: number
  name: string
  overview: string
  vote_average: number
  vote_count: number
  air_date: string
  episode_number: number
  episode_type: string
  production_code: string
  runtime: number | unknown
  season_number: number
  show_id: number
  still_path: string | unknown
}

export interface NextEpisodeToAir extends LastEpisodeToAir {}

export interface Network {
  id: number
  logo_path: string
  name: string
  origin_country: string
}

export interface Season {
  air_date: string
  episode_count: number
  id: number
  name: string
  overview: string
  poster_path: string
  season_number: number
  vote_average: number
}

export interface ContentRatings {
  results: {
    descriptors: unknown[]
    iso_3166_1: string
    rating: string
  }[]
}

export interface PersonDetailProps {
  adult: boolean
  also_known_as: string[]
  biography: string
  birthday: string
  deathday: string | null
  gender: number
  homepage: string
  id: number
  imdb_id: string
  known_for_department: string
  name: string
  place_of_birth: string
  popularity: number
  profile_path: string
  combined_credits: CombinedCredits
}

export interface CombinedCredits {
  cast: CombinedCreditsCast[]
  crew: CombinedCreditsCrew[]
}

export interface CombinedCreditsCast {
  adult: boolean
  backdrop_path?: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title?: string
  overview: string
  popularity: number
  poster_path?: string
  release_date?: string
  title?: string
  video?: boolean
  vote_average: number
  vote_count: number
  // character: string
  credit_id: string
  order?: number
  media_type: string
  origin_country?: string[]
  original_name?: string
  first_air_date?: string
  name?: string
  episode_count?: number
}

export interface CombinedCreditsCrew {
  adult: boolean
  backdrop_path?: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title?: string
  overview: string
  popularity: number
  poster_path?: string
  release_date?: string
  title?: string
  video?: boolean
  vote_average: number
  vote_count: number
  credit_id: string
  department: string
  job: string
  media_type: string
  origin_country?: string[]
  original_name?: string
  first_air_date?: string
  name?: string
  episode_count?: number
}

export interface TrendingPeople {
  page: number
  results: ResultTrendingPeople[]
  total_pages: number
  total_results: number
}

export interface ResultTrendingPeople {
  adult: boolean
  id: number
  name: string
  original_name: string
  media_type: string
  popularity: number
  gender: number
  known_for_department: string
  profile_path: string
  known_for: KnownFor[]
}

export interface SearchResultsRoot {
  page: number
  results: SearchResultsResult[]
  total_pages: number
  total_results: number
}

export interface SearchResultsResult {
  id: number
  original_name?: string
  media_type?: string
  adult: boolean
  name?: string
  popularity: number
  gender?: number
  known_for_department?: string
  profile_path?: string
  known_for?: KnownFor[]
  backdrop_path?: string
  original_title?: string
  overview?: string
  poster_path?: string
  title?: string
  original_language?: string
  genre_ids?: number[]
  release_date?: string
  video?: boolean
  vote_average?: number
  vote_count?: number
}
