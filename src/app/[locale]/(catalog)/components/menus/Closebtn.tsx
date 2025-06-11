"use client"

import { close } from "@/app/utils/svgItems";
import { sideMenu } from "@/app/utils/functions";

export default function Closebtn({type}: {type:string}) {
  return (
    <button type="button" className="cursor-pointer shrink-0" onClick={() => sideMenu(type)}>
      {close}
    </button>
  )
}