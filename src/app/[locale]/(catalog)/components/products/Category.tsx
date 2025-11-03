"use client"

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import ProductList from "./Productlist";
import CategoryFilter from "../menus/Filter";
import Loading from "../../loading";

export default function Category () {
  const [category, setCategory] = useState<string>("");
  const [subcategory, setSubcategory] = useState<string | undefined>(undefined);
  // Get the current path
  const pathArr = usePathname().split("/");
  const path = pathArr.slice(pathArr.indexOf("catalog") + 1, pathArr.length);

  useEffect(() => {
    if (path.length > 0) {
      setCategory(path[0]);
      if (path.length > 1) {
        setSubcategory(path[1]);
      } else {
        setSubcategory(undefined);
      }
    } else {
      setCategory("");
      setSubcategory(undefined);
    }
  }, [path]);


  if (category === "") return <Loading />;

  return (
    <>
      <CategoryFilter category={category} subcategory={subcategory} />
      <ProductList
        name={category}
        items={subcategory ? [category, subcategory] : [category]}
        loadSub={false}
      />
    </>
  );
}