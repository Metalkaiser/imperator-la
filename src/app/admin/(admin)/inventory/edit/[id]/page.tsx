import React from "react";
import EditProduct from "./Edit";

export default async function InventoryPage({ params }: {params: Promise<{id: string}>}) {
  const { id } = await params;
  return (
    <section className="flex flex-col gap-5 p-4">
      <article className="bg-white dark:bg-gray-900 rounded shadow p-4">
        <EditProduct id={id} />
      </article>
    </section>
  );
}
