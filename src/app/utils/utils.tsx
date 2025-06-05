/*
*
* DB variable values.
* 
*/
export const dbCollections = {
  products: "products",
  topProducts: "top_products",
  clients: "clients",
  movements: "movements",
  orders: "orders"
}
export const storagePath = "https://firebasestorage.googleapis.com/v0/b/imperator-next.appspot.com/o/products";

export const noProductError = {
  code: "product-not-found", 
  response: null,
  status: 404
}

/*
* 
* Website basic configs
* 
*/
export const webAppProps = {
  name: "Imperator",
  catalogDescription: "Catálogo online. Acero inoxidable hipoalergénico. Envíos a toda Venezuela.",
  adminDescription: "Sitio web de administración de inventario y ventas.",
  ogImages: [""],
  catalogKeywords: [
    "Imperator",
    "catálogo",
    "acero",
    "inoxidable",
    "caballeros",
    "accesorios",
    "rockeros",
    "elegantes",
    "masoneria",
    "masónicos",
    "vikingos",
    "nordicos",
    "anillos",
    "collares",
    "cadenas",
    "brazaletes",
    "relojes",
    "pulseras"
  ]
}

/*
* 
* Catalog's basic configs
* 
*/
export const allCategories = [
  "rings",
  "necklaces",
  "bracelets",
  "watches",
  "pendants"
];

export const allSubcategories = [
  "elegants",
  "masonics",
  "rockers",
  "vikings"
];

export const sessionItemName = "imperator_products_data";
export const sessionExpirationTime = 2 * 60 * 60 * 1000;
export const sessionCartName = "imperator_cart";