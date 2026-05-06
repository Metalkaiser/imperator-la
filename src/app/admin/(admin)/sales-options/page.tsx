import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import SalesOptionsManager from "./SalesOptionsManager";

export const dynamic = "force-dynamic";

export default function SalesOptionsPage() {
  noStore();

  if (process.env.NEXT_PUBLIC_CART_ENABLED?.toLowerCase() !== "true") {
    notFound();
  }

  return <SalesOptionsManager />;
}
