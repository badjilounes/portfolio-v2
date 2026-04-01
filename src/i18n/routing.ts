import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['fr', 'en', 'es', 'de', 'ar', 'ru'],
  defaultLocale: 'fr',
});
