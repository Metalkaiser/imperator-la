import Header from "../components/menus/Header";
import AdminSideMenu from "../components/menus/Sidemenu";
import { DBProvider } from "../components/context/dbContext";

export default function AdminMainLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const cartEnabled = process.env.CART_ENABLED === "true";

  return (
    <main className="flex min-h-screen">
      <DBProvider>
        <AdminSideMenu cartEnabled={cartEnabled} />
        <div className="w-full">
          <Header />
          {children}
        </div>
      </DBProvider>
    </main>
  );
}