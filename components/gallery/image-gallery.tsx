"use client"

import { useState } from "react"
import Image from "next/image"

interface Props {
  images: string[]
  title: string
}

export function ImageGallery({ images, title }: Props) {
  const [idx, setIdx] = useState(0)

  if (images.length === 0) return null

  return (
    <div>
      {images[0] && (
        <div className="relative mb-4 h-64 w-full overflow-hidden rounded-lg sm:h-80">
          <Image src={images[0]!} alt={`${title} önizleme`} fill className="object-cover" />
        </div>
      )}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-md border-2 transition-colors ${
                i === idx ? "border-accent" : "border-border"
              }`}
            >
              <Image src={img} alt={`Önizleme ${i + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
