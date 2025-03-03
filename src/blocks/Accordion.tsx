import { Block } from 'payload'
import { List } from './List'

export const Accordion: Block = {
  slug: 'accordion',
  fields: [
    {
      type: 'array',
      name: 'items',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'blocks',
          type: 'blocks',
          blocks: [List],
        },
      ],
      minRows: 1,
    },
  ],
  interfaceName: 'AccordionBlock',
}
