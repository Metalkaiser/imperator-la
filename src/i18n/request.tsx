import {getRequestConfig} from 'next-intl/server';
import {IntlErrorCode} from 'next-intl';
import {hasLocale} from 'next-intl';
import {routing} from './routing';
 
export default getRequestConfig(async ({requestLocale}) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
 
  return {
    locale,
    onError(error) {
      if (error.code !== IntlErrorCode.MISSING_MESSAGE) {
        throw new Error(`${error.code}: ${error.originalMessage}`);
      } 
    },
    messages: (await import(`../../src/app/lang/messages/${locale}.json`)).default
  };
});