import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: process.env.NEXT_PUBLIC_LANG_LOCALES?.split(",") ?? ['en'],
 
  // Used when no locale matches
  defaultLocale: process.env.NEXT_PUBLIC_LANG_DEFAULTLOCALES ?? 'en'
});