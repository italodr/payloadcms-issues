import type { CheckboxField, Field, TextField } from 'payload'

import { formatSlugHook } from './formatSlug'

type Overrides = {
  checkboxOverrides?: Partial<CheckboxField>
  localized?: boolean
  slugOverrides?: Partial<TextField>
}

export const slugField = (fieldToUse: string = 'title', overrides: Overrides = {}): Field[] => {
  const { checkboxOverrides, slugOverrides } = overrides

  const checkBoxField: CheckboxField = {
    name: 'slugLock',
    type: 'checkbox',
    admin: {
      hidden: true,
      position: 'sidebar',
    },
    defaultValue: true,
    ...checkboxOverrides,
  }

  const configField = {
    name: 'slug',
    type: 'text',
    index: true,
    label: 'Slug',
    localized: true,
    ...(slugOverrides || {}),
    admin: {
      position: 'sidebar',
      ...(slugOverrides?.admin || {}),
      components: {
        Field: {
          clientProps: {
            checkboxFieldPath: checkBoxField.name,
            fieldToUse,
          },
          path: './fields/slug/SlugComponent#SlugComponent',
        },
      },
    },
    hooks: {
      afterChange: [formatSlugHook(fieldToUse)],
    },
  }

  return [configField as Field, checkBoxField as Field]
}
