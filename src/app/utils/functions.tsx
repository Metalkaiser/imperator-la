import { cartItem, productProps } from "./types";
import { sessionItemName, sessionExpirationTime, sessionCartName } from "./utils";

export const capitalize = (item:string) => {
  return item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
}

export const sideMenu = (menu:string) => {
  const aside = document.getElementById(`aside-${menu}`);
  if (aside) {
    if (menu === "Menu") {
      aside.classList.toggle("-left-full");
      aside.classList.toggle("left-0");
    } else {
      aside.classList.toggle("-right-full");
      aside.classList.toggle("right-0");
    }
  }
}

export const saveProductsSession = (products:productProps[]) => {
  const currentTime = new Date().getTime();
  sessionStorage.setItem(sessionItemName, JSON.stringify({products, timestamp: currentTime}));
}

export const getProductsSession = () => {
  const currentTime = new Date().getTime();
  const products = sessionStorage.getItem(sessionItemName);
  if (products && currentTime - JSON.parse(products).timestamp < sessionExpirationTime) {
    return {code: "success", response: JSON.parse(products), status: 200}
  } else {
    sessionStorage.removeItem(sessionItemName);
    return {code: "expired", response: null, status: 410};
  }
}

export const setCartSession = (item:cartItem) => {
  const cart = sessionStorage.getItem(sessionCartName);
  let parsedCart:cartItem[] = [];
  if (cart) {
    parsedCart = JSON.parse(cart);
    sessionStorage.removeItem(sessionCartName);
  }
  parsedCart.push(item);
  sessionStorage.setItem(sessionCartName, JSON.stringify(parsedCart));
  return parsedCart;
}