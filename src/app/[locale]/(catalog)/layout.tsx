import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import Topmenu from './components/topmenu';
import Sidemenu from './components/menus/Sidemenu';
import Custom404 from '@/app/not-found';
import { productProps } from '@/app/utils/types';
import { getShoppingCartConfig } from '@/config/shoppingCartConfig';
import getProductService from '@/config/productServiceInstance';

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

  const cartConfig = getShoppingCartConfig(locale)

  let render = <></>;

  const dbConfig = await getProductService();
  const products = await dbConfig.getActiveProducts();

  if (products.status === 200) {
    const catIndexes = Array.from(new Set((products.response as productProps[]).map(item => item.category)));

    render = <>
      <Sidemenu type='Menu' />
      {cartConfig.shoppingCart.enabled && <Sidemenu type="Carrito" />}
      <Topmenu catIndexes={catIndexes} />
      {children}
    </>;
  } else {
    render = <Custom404 context='products'/>;
  }

  return (
    <body>
      <NextIntlClientProvider>
        {render}
      </NextIntlClientProvider>
    </body>
  );
}