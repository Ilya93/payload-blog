import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const article = searchParams.get('article')

  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'comments',
    overrideAccess: true,
    depth: 0,
    where: {
      article: {
        equals: article,
      },
    },
  })

  const messages = result.docs.map((x) => x.comment)

  return Response.json(messages)
}
