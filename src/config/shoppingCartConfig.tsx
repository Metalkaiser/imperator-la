type CurrencyConversionType = "api" | "fixed";  // Type for currency conversion, can be "api" or "fixed"

interface ShoppingCartConfig {
  enabled: boolean;                   // Indicates if the shopping cart is enabled
  currencyConversion: {
    enabled: boolean;                 // Indicates if currency conversion is enabled
    type: CurrencyConversionType;     // Type of currency conversion (api or fixed)
    fixedRate: number;                // Fixed exchange rate if type is "fixed"
    mainCurrency: string;             // Main currency used in the shopping cart (e.g., "US$")
    exchangeCurrency: string;         // Currency to convert from (e.g., "Bs")
    targetExchangeCurrency: string;   // Target exchange currency (e.g., "promedio")
    apiUrl: string;                   // API URL to fetch exchange rates if type is "api"
    exchangeExpirationTime: number;   // Time in hours after which the exchange rate expires
  };
}

/**
 * Generates a human-readable string representing the fee for a payment method,
 * based on the provided fee information and currency.
 *
 * The function checks if the fee includes a fixed amount, a percentage, or both,
 * and formats the output accordingly. If no fee is present, an empty string is returned.
 *
 * @param feeInfo - An object containing the status of the fee, and optionally the percentage and/or fixed amount.
 * @param currency - The currency symbol or code to display alongside the fixed fee.
 * @returns A formatted string describing the fee (e.g., "US$. 0.3 + 5.4%"), or an empty string if no fee applies.
 */
export const getPaymentFee = (feeInfo:{status: boolean, percentage?: number, fixed?: number}, currency:string) => {
  const hasFixed = feeInfo.fixed ? "fixed" : "";
  const hasPercentage = feeInfo.percentage ? "percentage" : "";
  const feeItems = hasFixed + hasPercentage;
  let feeString = "";

  switch (feeItems) {
    case "fixedpercentage":
      feeString = `${currency}. ${feeInfo.fixed} + ${feeInfo.percentage}%`;
      break;
    case "fixed":
      feeString = `${currency}. ${feeInfo.fixed}`;
      break;
    case "percentage":
      feeString = `${feeInfo.percentage}%`;
      break;
    default:
      break;
  }
  return feeString;
}

/**
 * Returns the shopping cart configuration based on the provided locale.
 * 
 * @param {string} locale - The locale for which to get the shopping cart configuration.
 * @returns {object} - The shopping cart configuration object.
 */
export function getShoppingCartConfig(locale: string): { shoppingCart: ShoppingCartConfig } {
  const baseConfig: ShoppingCartConfig = {
    enabled: true,
    currencyConversion: {
      enabled: true,
      type: "api",
      fixedRate: 0,
      mainCurrency: "$",
      exchangeCurrency: "Bs",
      targetExchangeCurrency: "promedio",
      apiUrl: "https://ve.dolarapi.com/v1/dolares/oficial",
      exchangeExpirationTime: 24,
    },
  };

  // You can add more locale-specific configurations here if needed
  // For example, if you want to disable the shopping cart for a specific locale:
  // if (locale === "en") {
  //   baseConfig.enabled = false;
  // }
  switch (locale) {
    // case "en": return { shoppingCart: { ...baseConfig, enabled: false } };
    default:
      return { shoppingCart: baseConfig };
  }
}
