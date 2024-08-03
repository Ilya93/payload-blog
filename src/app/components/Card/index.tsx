'use client'
import NextImage from 'next/image'
import Link from 'next/link'
import React from 'react'
import type { Article } from '../../../payload-types'

export const Card = (props: { article: Article }) => {
  const { slug, meta, title, description, image } = props.article
  const sanitizedDescription = description?.replace(/\s/g, ' ')

  return (
    <Link className="not-prose" href={`/${slug}`}>
      <article className="border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer h-[35rem]">
        <div className="relative w-full h-[300px]">
          {!image && <div className="">No image</div>}
          {image && typeof image !== 'string' && (
            <NextImage
              alt={image.alt || ''}
              fill
              quality={90}
              src={image.url}
              style={{ objectFit: 'cover' }}
            />
          )}
        </div>
        <div className="p-4">
          {title && (
            <div className="prose">
              <h3 className="text-xl font-bold">{title}</h3>
            </div>
          )}
          {description && (
            <div className="mt-2">{description && <p>{sanitizedDescription}</p>}</div>
          )}
        </div>
      </article>
    </Link>
  )
}
