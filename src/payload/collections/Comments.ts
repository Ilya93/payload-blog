import type { CollectionConfig } from 'payload'

export const Comments: CollectionConfig = {
  slug: 'comments',
  admin: {
    hidden: true,
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'comment',
      type: 'text',
      required: true,
    },
    {
      name: 'article',
      type: 'relationship',
      relationTo: 'articles',
      required: true,
      hasMany: false,
    },
  ],
}
