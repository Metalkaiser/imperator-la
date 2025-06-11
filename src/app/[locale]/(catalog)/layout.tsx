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
    const subCatIndexes: number[][] = catIndexes.map(index => {
      const subcategories = (products.response as productProps[])
        .filter(item => item.category === index)
        .map(item => item.subcategory)
        .filter((subcat): subcat is number => typeof subcat === 'number')
        .sort((a, b) => a - b);
      return Array.from(new Set(subcategories));
    });

    render = <>
      <Sidemenu type='Menu' cats={{catIndexes, subCatIndexes}} />
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