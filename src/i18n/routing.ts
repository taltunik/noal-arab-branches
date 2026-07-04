import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['ar', 'he', 'en'],
  defaultLocale: 'ar',
  localePrefix: 'as-needed',
  // Arabic is the site's default for everyone; the switcher sets a cookie
  localeDetection: false,
});
