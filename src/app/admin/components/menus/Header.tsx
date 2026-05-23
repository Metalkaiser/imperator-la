"use client"

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [title, setTitle] = useState("Resumen");

  useEffect(() => {
    // Map pathname to title
    const pathToTitleMap: { [key: string]: string } = {
      "/admin/dashboard": "Resumen",
      "/admin/inventory": "Inventario",
      "/admin/orders": "Ventas",
      "/admin/settings": "Configuraciones",
      "/admin/top-products": "Productos top",
      "/admin/sales-options": "Opciones de ventas",
      "/admin/inventory/new": "Nuevo producto"
    };
    console.log("Current pathname:", pathname);
    setTitle(pathToTitleMap[pathname] || "Editar producto");
  }, [pathname]);

  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow p-4 flex items-center justify-end">
      <h1 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h1>
    </header>
  );
}
