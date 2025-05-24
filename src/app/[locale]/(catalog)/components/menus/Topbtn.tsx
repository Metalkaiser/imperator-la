"use client"

import Image from "next/image";
import hamburguerDark from "@P/dark/icons/hamburguer.png";
import cartDark from "@P/dark/icons/cart.png";
import hamburguerLight from "@P/light/icons/hamburguer.png";
import cartLight from "@P/light/icons/cart.png";

const sideMenu = (menu:string) => {
  console.log(menu);
}

export default function Topbtn ({purpose}: {purpose:string}) {
  const imgsrcLight = purpose === "Menu" ? hamburguerLight : cartLight;
  const imgsrcDark = purpose === "Menu" ? hamburguerDark : cartDark;

  return (
    <button type="button" className="cursor-pointer" onClick={() => sideMenu(purpose)}>
      <Image src={imgsrcLight} height={30} alt={purpose} className="dark:hidden"></Image>
      <Image src={imgsrcDark} height={30} alt={purpose} className="hidden dark:block"></Image>
    </button>
  )
}