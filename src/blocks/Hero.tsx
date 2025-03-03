import { Block } from 'payload'
import { List } from './List'

export const Hero: Block = {
  slug: 'hero',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'blocks',
      type: 'blocks',
      blocks: [List],
      minRows: 1,
    },
  ],
  interfaceName: 'HeroBlock',
}
