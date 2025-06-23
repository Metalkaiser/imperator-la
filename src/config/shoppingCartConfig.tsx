type CurrencyConversionType = "api" | "fixed";

interface ShoppingCartConfig {
  enabled: boolean;
  currencyConversion: {
    enabled: boolean;
    type: CurrencyConversionType;
    fixedRate: number;
    mainCurrency: string;
    exchangeCurrency: string;
    targetExchangeCurrency: string;
    apiUrl: string;
    exchangeExpirationTime: number; // In hours
  };
}

export function getShoppingCartConfig(locale: string): { shoppingCart: ShoppingCartConfig } {
  const baseConfig: ShoppingCartConfig = {
    enabled: true,
    currencyConversion: {
      enabled: true,
      type: "api",
      fixedRate: 0,
      mainCurrency: "US$",
      exchangeCurrency: "Bs",
      targetExchangeCurrency: "promedio",
      apiUrl: "https://ve.dolarapi.com/v1/dolares/oficial",
      exchangeExpirationTime: 24,
    },
  };

  switch (locale) {
    // case "en": return { shoppingCart: { ...baseConfig, enabled: false } };
    default:
      return { shoppingCart: baseConfig };
  }
}
