"use client"

import { sideMenu } from "@/app/utils/functions";
import { shoppingCartBtn, menu } from "@/app/utils/svgItems";

export default function Topbtn ({purpose}: {purpose:string}) {
  

  const imgsrc = purpose === "Menu" ? menu : shoppingCartBtn;

  return (
    <button type="button" className="cursor-pointer shrink-0" onClick={() => sideMenu(purpose)}>
      {imgsrc}
    </button>
  )
}