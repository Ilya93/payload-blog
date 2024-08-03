'use server'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'

export async function createComment(article: string, comment: string) {
  const payload = await getPayloadHMR({ config: configPromise })

  await payload.create({
    collection: 'comments',
    data: {
      comment,
      article,
    },
  })
}
