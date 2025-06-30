/*
* Utility functions for the web application
* 
* This file contains various utility functions used throughout the web application.
* These functions include string manipulation, session management, and other helper functions.
*/

/*
* Function to capitalize the first letter of a string
* This function takes a string as input and returns the string with the first letter capitalized
* and the rest of the string in lowercase.
* 
* @param item - The string to be capitalized
* @returns {string} - The capitalized string
*/
export const capitalize = (item:string) => {
  return item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
}

/*
* Function to toggle the visibility of a side menu
* This function takes a menu identifier as input and toggles the visibility of the corresponding side menu.
* The menu can be either "Menu" or another identifier.
* 
* @param menu - The identifier of the menu to toggle
*/
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

/**
 * Returns a new array containing a specified number of random items from the input array.
 * The original array is not modified.
 *
 * @typeParam T - The type of elements in the input array.
 * @param array - The array from which to select random items.
 * @param count - The number of random items to return.
 * @returns An array containing `count` randomly selected items from the input array.
 */
export function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Calculates the discounted price based on the original price and a discount object.
 * The discount can be either a percentage or a fixed value, determined by the `type` property.
 * Returns the discounted price as a string with appropriate precision.
 *
 * @param price - The original price before discount.
 * @param discount - An object containing the discount type and value.
 *   - type: 0 for percentage discount, 1 for fixed value discount.
 *   - value: The discount amount (percentage or fixed value).
 * @returns The discounted price as a string with adjusted precision.
*/
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