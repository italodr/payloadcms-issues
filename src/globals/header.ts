import { GlobalConfig } from 'payload'

const translations: Record<string, string> = {
  es: 'Ejemplo',
  en: 'Example',
}

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: ({ locale }: { locale: string }) => {
        return translations?.[locale]
      },
      required: true,
      localized: true,
    },
  ],
}
