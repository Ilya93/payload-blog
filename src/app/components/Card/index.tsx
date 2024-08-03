'use client'
import NextImage from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import type { Article } from '../../../payload-types'
import cssVariables from '../../cssVariables'

const { breakpoints } = cssVariables

export const Card = (props: { article: Article }) => {
  const { slug, title, description, image } = props.article
  const [showImage, setShowImage] = useState(false)

  useEffect(() => {
    setShowImage(false)
  }, [title])

  const sizes = Object.entries(breakpoints)
    .map(([, value]) => `(max-width: ${value}px) ${value}px`)
    .join(', ')

  return (
    <Link className="not-prose" href={`/${slug}`}>
      <article className="border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer h-[35rem]">
        <div className="relative w-full h-[300px]">
          {!image && <div className="">No image</div>}
          {image && typeof image !== 'string' && (
            <NextImage
              alt={image.alt || ''}
              fill
              onLoad={() => {
                setShowImage(true)
              }}
              sizes={sizes}
              priority
              quality={90}
              src={image.url}
              style={{ objectFit: 'cover', display: showImage ? 'block' : 'none' }}
            />
          )}
        </div>
        <div className="p-4">
          {title && (
            <div className="prose">
              <h3 className="text-xl font-bold">{title}</h3>
            </div>
          )}
          {description && <div className="mt-2">{description && <p>{description}</p>}</div>}
        </div>
      </article>
    </Link>
  )
}
