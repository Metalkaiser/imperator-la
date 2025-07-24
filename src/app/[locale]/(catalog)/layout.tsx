import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import Topmenu from './components/topmenu';
import Sidemenu from './components/menus/Sidemenu';
import Custom404 from '@/app/not-found';
import Wa from './components/wa';
import Footer from './components/Footer';
import { productProps, topProductsProps } from '@/app/utils/types';
import { getShoppingCartConfig } from '@/config/shoppingCartConfig';
import CatalogProvider from './components/context/CatalogContext';
import { CartProvider } from './components/context/Cartcontext';
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

  const cartConfig = getShoppingCartConfig(locale);

  let render = <></>;

  const dbConfig = await getProductService();
  const products = await dbConfig.getActiveProducts();
  const topProductsIds = await dbConfig.getTopProducts();
  const cartDetails = cartConfig.shoppingCart.enabled ? (await dbConfig.getCartConfigs()).response : {paymentMethods:[], shippingMethods:[]}

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

    const topProducts = topProductsIds.response.map((item: topProductsProps) => {
      const product = (products.response as productProps[]).find(p => p.id === item.productId);
      return product ? {...item, ...product} : item;
    });

    render = <>
      <CartProvider purchaseOptions={cartDetails}>
        <Sidemenu type='Menu' cats={{catIndexes, subCatIndexes}} />
        {cartConfig.shoppingCart.enabled && <Sidemenu type="Carrito" />}
        <Topmenu catIndexes={catIndexes} />
        <CatalogProvider catIndexes={catIndexes} subCatIndexes={subCatIndexes} products={products.response as productProps[]} topProducts={topProducts}>
          {children}
        </CatalogProvider>
      </CartProvider>
      <Wa />
      <Footer />
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
