"use client"

import { useTranslations } from "next-intl"

export default function CartTitle () {
  const t = useTranslations("shoppingCart");
  return <h1 className="text-xl text-white">{t("title")}</h1>
}