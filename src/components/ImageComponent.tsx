import { useState, useEffect, ComponentProps } from 'react'
import { Blurhash } from 'react-blurhash'

interface ImageComponentProps extends ComponentProps<'img'> {
  hash: string
  hashWidth: number
  hashHeight: number
  isPulse?: boolean
}

export function ImageComponent(props: ImageComponentProps) {
  const { src, hash, hashWidth, hashHeight, isPulse, ...rest } = props
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.onload = () => setImageLoaded(true)
    img.src = src ?? ''
  })

  // if (1 + 1 === 2) {
  //   return (
  //     <Blurhash
  //       hash={hash ?? ''}
  //       width={hashWidth}
  //       height={hashHeight}
  //       resolutionX={32}
  //       resolutionY={32}
  //       punch={1}
  //       className="animate-pulse"
  //     />
  //   )
  // }

  return (
    <>
      {imageLoaded ? (
        <img src={src} {...rest} />
      ) : (
        <Blurhash
          hash={hash ?? ''}
          width={hashWidth}
          height={hashHeight}
          resolutionX={32}
          resolutionY={32}
          punch={1}
          className={`${isPulse && 'animate-pulse'}`}
        />
      )}
    </>
  )
}
