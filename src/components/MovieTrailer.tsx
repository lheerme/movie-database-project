interface MovieTrailerProps {
  videoId: string | undefined
  name: string | undefined
}

export function MovieTrailer({ videoId, name }: MovieTrailerProps) {
  return (
    <div className="space-y-4 px-4">
      <h2 className="text-2xl md:text-3xl font-medium tracking-wide">
        Trailer
      </h2>
      <iframe
        className="mx-auto w-full max-w-[853px] aspect-video animate-entrance-center"
        src={`https://www.youtube.com/embed/${videoId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={name}
      ></iframe>
    </div>
  )
}
