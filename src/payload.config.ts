import { s3Storage } from '@payloadcms/storage-s3'

import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { seoPlugin } from '@payloadcms/plugin-seo'
import { GenerateDescription, GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { Article } from './payload-types'
import { Articles } from './payload/collections/Articles'
import { Media } from './payload/collections/Media'
import { Users } from './payload/collections/Users'
import { Comments } from './payload/collections/Comments'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const generateTitle: GenerateTitle<Article> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Blog` : 'Blog'
}

const generateDescription: GenerateDescription<Article> = ({ doc }) => {
  return doc?.description
}

const generateURL: GenerateURL<Article> = ({ doc }) => {
  return doc?.slug
    ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${doc.slug}`
    : process.env.NEXT_PUBLIC_SERVER_URL
}

export default buildConfig({
  admin: {
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  collections: [Users, Media, Articles, Comments],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    s3Storage({
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
        },
        region: process.env.S3_REGION,
      },
      bucket: process.env.S3_BUCKET as string,
      collections: {
        media: true,
      },
    }),
    seoPlugin({
      collections: ['articles'],
      uploadsCollection: 'media',
      generateTitle,
      generateDescription,
      generateURL,
    }),
  ],
})
