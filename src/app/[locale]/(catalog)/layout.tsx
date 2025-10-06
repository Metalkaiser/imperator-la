import { NextIntlClientProvider } from 'next-intl';
import { Suspense } from 'react';
import Topmenu from './components/topmenu';
import Sidemenu from './components/menus/Sidemenu';
import Wa from './components/wa';
import Footer from './components/Footer';
import CatalogProvider from './components/context/CatalogContext';
import { CartProvider } from './components/context/Cartcontext';
import LoadingPage from './components/LoadingPage';


const shoppinCartSettings = {
  enabled: process.env.NEXT_PUBLIC_CART_ENABLED === "true",
  expirationDays: process.env.NEXT_PUBLIC_CART_EXPIRATION_DAYS ?? "7",
  sessionName: process.env.NEXT_PUBLIC_CART_SESSION_NAME ?? "imperator_cart",
  mainCurrency: process.env.NEXT_PUBLIC_CART_MAIN_CURRENCY ?? "USD",
  exchangeCurrency: process.env.NEXT_PUBLIC_EXCHANGE_CURRENCY ?? "Bs",
  exchangeRateEnabled: process.env.NEXT_PUBLIC_EXCHANGE_ENABLED === "true",
  exchangeRateType: process.env.NEXT_PUBLIC_EXCHANGE_RATE_TYPE ?? ""
}

export default function CatalogLayout({ children }: Readonly<{ children: React.ReactNode; }>) {

  return (
    <body>
      <NextIntlClientProvider>
        <Suspense fallback={<LoadingPage />}>
          <CatalogProvider shoppinCartSettings={shoppinCartSettings}>
            <CartProvider>
              <Sidemenu type='Menu' />
              {shoppinCartSettings.enabled && <Sidemenu type="Carrito" />}
              <Topmenu />
                {children}
            </CartProvider>
          </CatalogProvider>
          <Wa />
          <Footer />
        </Suspense>
      </NextIntlClientProvider>
    </body>
  );
}
