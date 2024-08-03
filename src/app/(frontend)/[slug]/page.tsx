import { Comments } from '@/components/Comments'
import { HeroImage } from '@/components/HeroImage'
import ForceDarkMode from '@/components/Theme/ForceDarkMode'
import { generateMeta } from '@/utilities/generateMeta'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { cache } from 'react'
import RichText from 'src/app/components/RichText'

export default async function Page({ params: { slug = '' } }) {
  const article = await getArticleBySlug({ slug })

  return (
    <article className="pt-16 pb-16">
      <ForceDarkMode />
      <HeroImage article={article} />

      <div className="flex flex-col gap-4 pt-8">
        <div className="container lg:grid lg:grid-cols-[1fr_48rem_1fr] grid-rows-[1fr]">
          <RichText
            className="lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[1fr]"
            content={article.content}
          />

          <div className="col-start-2 mt-14">
            <Comments articleID={article.id} />
          </div>
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: { slug } }): Promise<Metadata> {
  const article = await getArticleBySlug({ slug })

  return generateMeta({ doc: article })
}

export async function generateStaticParams() {
  const payload = await getPayloadHMR({ config: configPromise })
  const articles = await payload.find({
    collection: 'articles',
    draft: false,
    limit: 1000,
    overrideAccess: false,
  })

  return articles.docs?.map(({ slug }) => slug)
}

const getArticleBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = draftMode()

  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'articles',
    draft,
    limit: 1,
    overrideAccess: true,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
