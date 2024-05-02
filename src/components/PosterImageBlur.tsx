import { useLayoutEffect, useRef, useState } from 'react'
import { ImageComponent } from './ImageComponent'

interface PosterImageBlurProps {
  src: string
  alt: string
  className?: string
}

export function PosterImageBlur({ src, alt, className }: PosterImageBlurProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useLayoutEffect(() => {
    if (ref.current) {
      const { clientWidth, clientHeight } = ref.current
      setDimensions({
        width: clientWidth,
        height: clientHeight,
      })
    }
  }, [src])

  return (
    <div
      ref={ref}
      className="sm:min-w-[290px] sm:w-[290px] min-w-[220px] w-[220px] mx-auto md:mx-0 aspect-[0.7]"
    >
      <ImageComponent
        src={src}
        alt={alt}
        hash={'L02i9Aj[j[j[offQfQfQayfQfQfQ'}
        hashWidth={dimensions.width}
        hashHeight={dimensions.height}
        className={className}
        isPulse
      />
    </div>
  )
}
