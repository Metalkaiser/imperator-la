import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: process.env.LANG_LOCALES?.split(",") ?? ['en'],
 
  // Used when no locale matches
  defaultLocale: process.env.LANG_DEFAULTLOCALES ?? 'en'
});