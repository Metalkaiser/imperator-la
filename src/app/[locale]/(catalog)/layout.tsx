import { NextIntlClientProvider } from 'next-intl';
import Topmenu from './components/topmenu';
import Sidemenu from './components/menus/Sidemenu';
import Wa from './components/wa';
import Footer from './components/Footer';
import CatalogProvider from './components/context/CatalogContext';
import { CartProvider } from './components/context/Cartcontext';

const shoppinCartSettings = {
  enabled: process.env.NEXT_PUBLIC_CART_ENABLED?.toLocaleLowerCase() === "true",
  expirationDays: process.env.NEXT_PUBLIC_CART_EXPIRATION_DAYS?.toLocaleLowerCase() ?? "7",
  sessionName: process.env.NEXT_PUBLIC_CART_SESSION_NAME?.toLocaleLowerCase() ?? "imperator_cart",
  mainCurrency: process.env.NEXT_PUBLIC_CART_MAIN_CURRENCY ?? "USD",
  exchangeCurrency: process.env.NEXT_PUBLIC_EXCHANGE_CURRENCY ?? "Bs",
  exchangeRateEnabled: process.env.NEXT_PUBLIC_EXCHANGE_ENABLED?.toLocaleLowerCase() === "true",
  exchangeRateType: process.env.NEXT_PUBLIC_EXCHANGE_RATE_TYPE?.toLocaleLowerCase() ?? "",
  dbSource: process.env.DATA_PROVIDER?.toLocaleLowerCase() ?? ""
}

export default function CatalogLayout({ children }: Readonly<{ children: React.ReactNode; }>) {

  return (
    <body>
      <NextIntlClientProvider>
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
      </NextIntlClientProvider>
    </body>
  );
}
