import React from "react";
import Table from "@/app/admin/components/inventory/Table";

export default async function InventoryPage() {
  return (
    <section className="flex flex-col gap-5 p-4">
      <article className="bg-white dark:bg-gray-900 rounded shadow p-4">
        <Table />
      </article>
    </section>
  );
}
