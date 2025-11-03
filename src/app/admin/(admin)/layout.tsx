import Header from "../components/menus/Header";
import AdminSideMenu from "../components/menus/Sidemenu";
import { DBProvider } from "../components/context/dbContext";

export default function AdminMainLayout({
  children,
}: {
  children: React.ReactNode;
}) {

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

  return (
    <main className="flex min-h-screen">
      <DBProvider shoppinCartSettings={shoppinCartSettings}>
        <AdminSideMenu cartEnabled={shoppinCartSettings.enabled} />
        <div className="w-full">
          <Header />
          {children}
        </div>
      </DBProvider>
    </main>
  );
}