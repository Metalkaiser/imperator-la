import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import getProductService from "@/config/productServiceInstance";
import OrdersManager from "./OrdersManager";
import type { sale } from "@/app/utils/types";

export const dynamic = "force-dynamic";

function sortOrders(orders: sale[]) {
  return [...orders].sort((a, b) => {
    const ta = typeof a.createdAt === "number" ? a.createdAt : Date.parse(String(a.createdAt));
    const tb = typeof b.createdAt === "number" ? b.createdAt : Date.parse(String(b.createdAt));
    return tb - ta;
  });
}

export default async function OrdersPage() {
  noStore();

  if (process.env.NEXT_PUBLIC_CART_ENABLED?.toLowerCase() !== "true") {
    notFound();
  }

  const dbService = await getProductService();
  const ordersRes = await dbService.getOrders();
  const orders = ordersRes.status === 200 && Array.isArray(ordersRes.response)
    ? sortOrders(ordersRes.response as sale[])
    : [];

  return <OrdersManager orders={orders} />;
}
