import { Accordion } from '@/blocks/Accordion'
import { Hero } from '@/blocks/Hero'
import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          name: 'content',
          fields: [
            {
              name: 'blocks',
              type: 'blocks',
              blocks: [Hero, Accordion],
            },
          ],
          label: 'Content',
          localized: true,
        },
      ],
    },
  ],
}
