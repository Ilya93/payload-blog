import NextImage from 'next/image'
import { Article } from 'src/payload-types'
import { formatDateTime } from '@/utilities/formatDateTime'

export const HeroImage = ({ article }: { article: Article }) => {
  const { title, image, publishedAt } = article

  return (
    <div className="relative -mt-[10.4rem] flex items-end">
      <div className="mt-[20rem] container z-10 relative lg:grid lg:grid-cols-[1fr_48rem_1fr] text-white pb-8">
        <div className="col-start-1 col-span-1 md:col-start-2 md:col-span-2">
          <div className="">
            <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl">{title}</h1>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-16">
            {publishedAt && (
              <div className="flex flex-col gap-1">
                <p className="text-sm">Date Published</p>

                <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="min-h-[80vh] absolute select-none w-full">
        {image && typeof image !== 'string' && (
          <NextImage
            priority
            alt={image.alt || ''}
            fill
            quality={90}
            src={image.url}
            style={{ objectFit: 'cover' }}
          />
        )}
        <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
      </div>
    </div>
  )
}
