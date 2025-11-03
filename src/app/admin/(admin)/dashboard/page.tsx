import { webAppProps } from "@/app/utils/utils";
import LatestOrders from "../../components/dashboard/Latestorders";
import ActivityWidget from "../../components/dashboard/Logs";

const cartEnabled = process.env.NEXT_PUBLIC_CART_ENABLED?.toLocaleLowerCase() === "true";


export default async function DashboardPage() {

  return (
    <section className="flex flex-col gap-5 p-4">
      <article className="py-2 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>
        <p>Bienvenido al panel de administración de {webAppProps.name}. Aquí puedes gestionar el inventario y otras configuraciones.</p>
      </article>
      {cartEnabled && (
        <article className="flex flex-col gap-4">
          <LatestOrders limit={5} />
        </article>
      )}
      <article>
        <ActivityWidget />
      </article>
    </section>
  );
}