"use client"

import { getShoppingCartConfig } from "@/config/shoppingCartConfig";

/**
 * Fetches the current exchange rate for currency conversion based on the shopping cart configuration.
 * 
 * If a fixed conversion rate is configured, it returns that rate.
 * Otherwise, it attempts to retrieve a cached exchange rate from sessionStorage.
 * If the cached rate is not from yesterday, it returns the cached rate.
 * If not cached or outdated, it fetches the latest rate from the configured API,
 * caches it with a timestamp, and returns the new rate.
 * 
 * @returns {number} The exchange rate as a number, or undefined if conversion is disabled.
 */
export const fetchExchangeRate = async (locale:string): Promise<number> => {
  const { shoppingCart } = getShoppingCartConfig(locale)
  const conversion = shoppingCart.currencyConversion;

  if (conversion.type === "fixed") {
    return conversion.fixedRate;
  }

  const cached = sessionStorage.getItem("ExchangeRate");
  const now = Date.now();

  if (cached) {
    const { exchangeRate, timestamp } = JSON.parse(cached);
    const yesterday = new Date(now - 24 * 60 * 60 * 1000);
    const timestampDate = new Date(timestamp);
    const isSameDayAsYesterday =
      timestampDate.getFullYear() === yesterday.getFullYear() &&
      timestampDate.getMonth() === yesterday.getMonth() &&
      timestampDate.getDate() === yesterday.getDate();
    if (!isSameDayAsYesterday) {
      return exchangeRate;
    }
  }

  try {
    const response = await fetch(conversion.apiUrl);
    const data = await response.json();
    const rate = Number(data[conversion.targetExchangeCurrency]);
    sessionStorage.setItem("ExchangeRate", JSON.stringify({ exchangeRate: rate, timestamp: now }));
    return rate;
  } catch (err) {
    console.error("Error fetching exchange rate:", err);
    return 0;
  }
};