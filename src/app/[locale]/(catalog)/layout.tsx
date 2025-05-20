import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import Topmenu from './components/topmenu';
import getProductService from '@/config/productServiceInstance';
import { productProps } from '@/app/utils/types';

export default async function CatalogLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const productService = await getProductService();
  const productServiceResponse = await productService.getActiveProducts();

  let result: productProps | null;

  if (productServiceResponse.status === 200) {
    result = productServiceResponse.response;
  }

  return (
    <body>
      <NextIntlClientProvider>
        <Topmenu />
        {children}
      </NextIntlClientProvider>
    </body>
  );
}