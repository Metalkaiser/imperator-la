import ogImgLight from "@P/brand/logo_banner_light.webp";
import ogImgDark from "@P/brand/logo_banner_dark.webp";

/*
*
* Database collections and storage paths
* Here we define the names of the collections in the selected database
* 
*/
export const dbCollections = {
  products: "products",
  topProducts: "top_products",
  clients: "clients",
  movements: "movements",
  orders: "orders",
  shipping: "shipping_methods",
  payment: "payment_methods"
}

// Firebase storage path for product images
// This path is used to store and retrieve product images in the Firebase storage.
export const storagePath = "https://firebasestorage.googleapis.com/v0/b/imperator-next.appspot.com/o/products";

export const noProductError = {
  code: "product-not-found", 
  response: null,
  status: 404
}

/*
* 
* Web app properties
* This object contains the basic properties of the web application,
* including the name, description, Open Graph images, and keywords.
* 
*/
export const webAppProps = {
  name: "Imperator",
  catalogDescription: "Imperator - Catálogo online. Acero inoxidable hipoalergénico. Envíos a toda Venezuela.",
  adminDescription: "Sitio web de administración de inventario y ventas.",
  ogImages: [ogImgLight, ogImgDark],
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
* Product categories and subcategories
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

export const sessionItemName = "imperator_products_data";   // Name of the session storage item for product data
export const sessionExpirationTime = 2 * 60 * 60 * 1000;    // Session expiration time in milliseconds (2 hours)
export const sessionCartName = "imperator_cart";            // Name of the session storage item for the shopping cart
export const phoneNumber = "584267835498";                  // Phone number for contact, used in the footer and other places