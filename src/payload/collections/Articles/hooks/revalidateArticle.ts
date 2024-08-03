import type { CollectionAfterChangeHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Article } from '../../../../payload-types'

export const revalidateArticle: CollectionAfterChangeHook<Article> = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc._status === 'published') {
    const path = `/${doc.slug}`

    payload.logger.info(`Revalidating article at path: ${path}`)

    revalidatePath(path)
  }

  // If the post was previously published, we need to revalidate the old path
  if (previousDoc._status === 'published' && doc._status !== 'published') {
    const oldPath = `/${previousDoc.slug}`

    payload.logger.info(`Revalidating old article at path: ${oldPath}`)

    revalidatePath(oldPath)
  }

  return doc
}