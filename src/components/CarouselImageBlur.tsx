import { useLayoutEffect, useRef, useState } from 'react'
import { ImageComponent } from './ImageComponent'
import { twMerge } from 'tailwind-merge'

interface CarouselImageBlurProps {
  dataForChange: any
  ImgClassName?: string
  src: string
  alt: string
  isPortrait?: boolean
}

export function CarouselImageBlur({
  dataForChange,
  ImgClassName,
  src,
  alt,
  isPortrait,
}: CarouselImageBlurProps) {
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
  }, [dataForChange])

  return (
    <div
      ref={ref}
      className={twMerge(
        'rounded overflow-hidden',
        !isPortrait && 'aspect-video',
        isPortrait && 'aspect-[0.7]'
      )}
    >
      <ImageComponent
        src={src}
        alt={alt}
        hash={'L02i9Aj[j[j[offQfQfQayfQfQfQ'}
        hashWidth={dimensions.width}
        hashHeight={dimensions.height}
        className={ImgClassName}
        isPulse
      />
    </div>
  )
}
