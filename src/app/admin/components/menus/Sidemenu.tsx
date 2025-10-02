"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, X, Menu } from "lucide-react";
import Image from "next/image";
import { useAuth } from "../context/authContext";
import { capitalizeName } from "@/app/utils/functions";
import home_light from "@P/light/icons/home.png";
import home_dark from "@P/dark/icons/home.png";
import inventory_light from "@P/light/icons/inventory.png";
import inventory_dark from "@P/dark/icons/inventory.png";
import settings_light from "@P/light/icons/settings.png";
import settings_dark from "@P/dark/icons/settings.png";
import cart_light from "@P/light/icons/cart.png";
import cart_dark from "@P/dark/icons/cart.png";
import logo_light from "@P/brand/icon_light.webp";
import logo_dark from "@P/brand/icon_dark.webp";
import logout_light from "@P/light/icons/logoff.png";
import logout_dark from "@P/dark/icons/logoff.png";

type Props = {
  cartEnabled: boolean;
  serverUser?: { name?: string; image?: string } | null;
};

export default function AdminSideMenu({ cartEnabled }: Props) {
  const { user, logout } = useAuth();
  const pathname = usePathname() ?? "";
  const [mounted, setMounted] = useState(false);

  // drawer state (mobile)
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => setMounted(true), []);

  // close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // lock body scroll when drawer open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
    return;
  }, [open]);

  // close with Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // roles map (display)
  const roles = ["admin", "editor", "viewer"];
  const translatedRoles = ["Administrador", "Editor", "Visualizador"];
  const rolesMap = roles.reduce((acc, role, index) => {
    acc[role] = translatedRoles[index];
    return acc;
  }, {} as Record<string, string>);

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === "/admin/dashboard") return pathname === href || pathname === "/admin";
    return pathname === href || pathname.startsWith(href + "/");
  };

  const linkBaseClasses = "flex items-center p-2 rounded transition-colors duration-150 text-sm";

  const getLinkProps = (href: string) => {
    const active = isActive(href);
    return {
      className: `${linkBaseClasses} ${active ? "bg-gray-300 dark:bg-gray-700" : "hover:bg-gray-300 dark:hover:bg-gray-700"}`,
      "aria-current": active ? "page" : undefined,
      href,
    } as React.ComponentProps<typeof Link>;
  };

  const IconWrap = ({ light, dark, alt }: { light: any; dark: any; alt: string }) => (
    <div className="relative w-6 h-6 mr-3 flex-shrink-0">
      <Image src={light} alt={`${alt} light`} className="absolute inset-0 w-full h-full dark:hidden" />
      <Image src={dark} alt={`${alt} dark`} className="absolute inset-0 w-full h-full hidden dark:block" />
    </div>
  );

  const displayUser = mounted ? user : null;

  // Desktop menu (left column) + Mobile hamburger
  return (
    <>
      {/* HAMBURGER - visible on small screens only */}
      <button
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className={`md:hidden fixed top-4 left-4 z-50 inline-flex items-center justify-center w-10 h-10 rounded bg-white/90 dark:bg-black/80 shadow ${open ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"} transition-opacity`}
      >
        <Menu size={20} />
      </button>

      {/* DESKTOP SIDEBAR */}
      <nav className="hidden md:flex w-64 dark:bg-gray-800 bg-gray-100 dark:text-white p-4">
        <div className="flex flex-col h-full justify-center w-full">
          <div className="flex flex-col items-center mb-6">
            <div className="mb-4 w-[100px] h-[100px] relative rounded-full overflow-hidden">
              <Image src={logo_light} alt="Logo Light" fill className="object-cover dark:hidden" />
              <Image src={logo_dark} alt="Logo Dark" fill className="object-cover hidden dark:block" />
              {displayUser?.image && (
                <div className="absolute inset-0">
                  <Image src={displayUser.image} alt={displayUser.name || "User Avatar"} fill className="object-cover" />
                </div>
              )}
            </div>

            {displayUser?.name ? (
              <div className="text-center">
                <p className="text-sm font-bold">{capitalizeName(displayUser.name)}</p>
                <p className="text-xs opacity-70">{rolesMap[displayUser.role]}</p>
              </div>
            ) : (
              <div>
                <p className="text-sm opacity-0 select-none">&nbsp;</p>
                <p className="text-sm opacity-0 select-none">&nbsp;</p>
              </div>
            )}
          </div>

          <ul className="flex flex-col gap-3">
            <li className="mb-4">
              <Link {...getLinkProps("/admin/dashboard")}>
                <IconWrap light={home_light} dark={home_dark} alt="Home" />
                Resumen
                <ChevronRight className="ml-auto" />
              </Link>
            </li>

            <li className="mb-4">
              <Link {...getLinkProps("/admin/inventory")}>
                <IconWrap light={inventory_light} dark={inventory_dark} alt="Inventory" />
                Inventario
                <ChevronRight className="ml-auto" />
              </Link>
            </li>

            {cartEnabled && (
              <li className="mb-4">
                <Link {...getLinkProps("/admin/orders")}>
                  <IconWrap light={cart_light} dark={cart_dark} alt="Cart" />
                  Órdenes
                  <ChevronRight className="ml-auto" />
                </Link>
              </li>
            )}

            <li className="mb-4">
              <Link {...getLinkProps("/admin/settings")}>
                <IconWrap light={settings_light} dark={settings_dark} alt="Settings" />
                Configuraciones
                <ChevronRight className="ml-auto" />
              </Link>
            </li>
          </ul>

          <div className="mt-auto pt-4 border-t border-gray-300 dark:border-gray-600">
            <button onClick={logout} className="w-full flex items-center hover:bg-gray-300 dark:hover:bg-gray-700 p-2 rounded cursor-pointer">
              <div className="relative w-6 h-6 mr-3">
                <Image src={logout_light} alt="Logout Light" className="absolute inset-0 w-full h-full dark:hidden" />
                <Image src={logout_dark} alt="Logout Dark" className="absolute inset-0 w-full h-full hidden dark:block" />
              </div>
              Cerrar sesión
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE DRAWER (full screen) */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-200 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        {/* backdrop */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/60 transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0"}`}
        />

        {/* drawer panel */}
        <aside
          className={`fixed inset-0 z-50 flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white transform transition-transform duration-200 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ willChange: "transform" }}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 relative rounded-full overflow-hidden">
                <Image src={logo_light} alt="logo" fill className="object-cover dark:hidden" />
                <Image src={logo_dark} alt="logo" fill className="object-cover hidden dark:block" />
              </div>
              <div>
                <p className="font-bold text-sm">{displayUser?.name ?? "Administrador"}</p>
                <p className="text-xs opacity-70">{displayUser ? rolesMap[displayUser.role] : ""}</p>
              </div>
            </div>

            <button aria-label="Cerrar menú" onClick={() => setOpen(false)} className="p-2 rounded">
              <X size={20} />
            </button>
          </div>

          <div className="p-4 overflow-auto">
            <ul className="flex flex-col gap-3">
              <li>
                <Link {...getLinkProps("/admin/dashboard")}>
                  <IconWrap light={home_light} dark={home_dark} alt="Home" />
                  Resumen
                  <ChevronRight className="ml-auto" />
                </Link>
              </li>
              <li>
                <Link {...getLinkProps("/admin/inventory")}>
                  <IconWrap light={inventory_light} dark={inventory_dark} alt="Inventory" />
                  Inventario
                  <ChevronRight className="ml-auto" />
                </Link>
              </li>
              {cartEnabled && (
                <li>
                  <Link {...getLinkProps("/admin/orders")}>
                    <IconWrap light={cart_light} dark={cart_dark} alt="Cart" />
                    Órdenes
                    <ChevronRight className="ml-auto" />
                  </Link>
                </li>
              )}
              <li>
                <Link {...getLinkProps("/admin/settings")}>
                  <IconWrap light={settings_light} dark={settings_dark} alt="Settings" />
                  Configuraciones
                  <ChevronRight className="ml-auto" />
                </Link>
              </li>
            </ul>
          </div>

          <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-800">
            <button
              onClick={() => {
                setOpen(false);
                void logout();
              }}
              className="w-full flex items-center hover:bg-gray-300 dark:hover:bg-gray-700 p-2 rounded cursor-pointer"
            >
              <div className="relative w-6 h-6 mr-3">
                <Image src={logout_light} alt="Logout Light" className="absolute inset-0 w-full h-full dark:hidden" />
                <Image src={logout_dark} alt="Logout Dark" className="absolute inset-0 w-full h-full hidden dark:block" />
              </div>
              Cerrar sesión
            </button>
          </div>
        </aside>
      </div>
    </>
  );
}
