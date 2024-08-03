import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { Card } from '@/components/Card'
import { Pagination } from '@/components/Pagination'
import type { Metadata } from 'next/types'

export const dynamic = 'force-static'
export const revalidate = 10

// set articles limit per page
const articlesLimit = 3

export default async function Page({ params: { pageNumber } }) {
  const payload = await getPayloadHMR({ config: configPromise })

  const articles = await payload.find({
    collection: 'articles',
    depth: 1,
    limit: articlesLimit,
    page: pageNumber,
  })

  return (
    <div className="container pt-8 space-y-8">
      <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
        {articles.docs?.map((article, index) => (
          <div className="col-span-4" key={index}>
            <Card article={article} />
          </div>
        ))}
      </div>

      {articles.totalPages > 1 && (
        <Pagination page={articles.page} totalPages={articles.totalPages} />
      )}
    </div>
  )
}

export function generateMetadata({ params: { pageNumber } }): Metadata {
  return {
    title: `Articles Page ${pageNumber}`,
  }
}

export async function generateStaticParams() {
  const payload = await getPayloadHMR({ config: configPromise })
  const articles = await payload.find({
    collection: 'articles',
    depth: 0,
    limit: articlesLimit,
  })

  const pages = []

  for (let i = 1; i <= articles.totalPages; i++) {
    pages.push(i)
  }

  return pages
}
