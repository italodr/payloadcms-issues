import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const List: Block = {
  slug: 'list',
  fields: [
    {
      name: 'type',
      type: 'select',
      label: 'List Type',
      options: ['ordered', 'unordered'],
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'richTextContent',
          type: 'richText',
          editor: lexicalEditor(),
        },
      ],
      minRows: 1,
    },
  ],
  interfaceName: 'ListBlock',
}
