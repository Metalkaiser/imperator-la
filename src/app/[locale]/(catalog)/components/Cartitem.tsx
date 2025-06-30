import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import { QuantitySelector } from "./Quantityselector";
import { trashCan, plusIcon, minusIcon } from "@/app/utils/svgItems";
import { cartItem } from "@/app/utils/types";

type Props = {
  item: cartItem;
  index: number;
  mainCurrency: string;
  updateCart: (item: cartItem) => void;
}

export default function Cartitem({ item, index, mainCurrency, updateCart }: Props) {
  const t = useTranslations("shoppingCart");
  const miscT = useTranslations("misc");
  const [qt, setQt] = useState<number>(item.qt);
  const [total, setTotal] = useState<number>(item.price * item.qt);
  const [checked, setChecked] = useState<boolean>(true);

  const handleCheckboxChange = (checkStatus: boolean) => {
    setChecked(checkStatus);
    if (checkStatus) {
      const itemToUpdate = { ...item, qt: qt, price: item.price };
      updateCart(itemToUpdate);
    } else {
      updateCart({...item, qt: 0})
    }
  };

  const handleDelete = () => {
    Swal.fire({
      title: t("deleteItem"),
      text: `${t("deleteItemText")} ${item.name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: t("deleteCart"),
      cancelButtonText: miscT("cancelBtn"),
    }).then((result) => {
      if (result.isConfirmed) {
        updateCart({ ...item, price: 0 });
      }
    });
  };

  const handleQuantityChange = (newQt: number) => {
    const validQt = Math.max(1, newQt || 1);
    const qt = validQt <= item.max ? validQt : item.max;
    setQt(qt);
    if (checked) {
      updateCart({ ...item, qt: qt });
    }
  };

  useEffect(() => {
    setTotal(item.price * qt);
    if (checked) {
      updateCart({ ...item, qt: qt });
    }
  }, [qt, item.price]);

  return (
    <div key={index} className="flex gap-2 md:gap-10 items-center">
      <input type="checkbox" name={item.sku} id={item.sku} checked={checked} onChange={(e) => handleCheckboxChange(e.target.checked)} />
      <Image src={item.image} alt={item.mainSku} height={0} width={70}></Image>
      <div className="flex flex-col justify-between">
        <h2 className="max-w-full text-nowrap overflow-hidden text-ellipsis cartitemname">{item.name}</h2>
        <p className="cartdetailstext">SKU: {item.sku}</p>
        <div className="flex justify-between gap-5">
          <div className="flex flex-col justify-center items-center">
            <p className="cartdetailstext font-semibold">{t("size")}</p>
            <p className="cartdetailstext font-thin">{item.size ? item.size : "N/A"}</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="cartdetailstext font-semibold">{t("quantity")}</p>
            <div className="flex items-center gap-2">
              <QuantitySelector
                value={qt}
                onChange={handleQuantityChange}
                minusIcon={minusIcon}
                plusIcon={plusIcon}
              />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="cartdetailstext font-semibold">{t("price")}</p>
            <h2 className="cartdetailstext font-thin">{`${mainCurrency}${total}`}</h2>
          </div>
        </div>
      </div>
      <button className="mx-4 cursor-pointer" onClick={handleDelete}>{trashCan}</button>
    </div>
  );
}