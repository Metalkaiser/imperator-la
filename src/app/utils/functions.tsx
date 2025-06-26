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

export function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function getDiscountedPrice(price:number, discount:{type:number; value:number}) {
  let discountPrice = 0;
  let priceDiscountString = "";

  if (discount.type == 0) {
    discountPrice = price * (100 - discount.value) / 100;
  } else {
    discountPrice = price - discount.value;
  }

  if (discountPrice >= 10) {
    priceDiscountString = discountPrice.toPrecision(4);
  } else {
    priceDiscountString = discountPrice.toPrecision(3);
  }

  return priceDiscountString;
}