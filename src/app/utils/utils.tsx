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
  activity_logs: "activity_logs",
  orders: "orders",
  shipping: "shipping_methods",
  payment: "payment_methods",
  giftOptions: "gift_options",
  users: "users",
  settings: "settings",
  productsSpecials: "products_specials"
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

export const orderStatuses = new Map<string, string>([
  ["placed", "Pedido realizado"],
  ["shipped", "Enviado"],
  ["canceled", "Cancelado"],
  ["completed", "Completado"],
  ["reviewed", "Reseñado"],
]);

export const actionLabels = new Map<string, { label: string; color: string; badgeClass: string }>([
  ["order_placed",    { label: "Orden creada",                 color: "amber-500",  badgeClass: "bg-amber-500 text-white" }],
  ["order_shipping",  { label: "Orden enviada",                 color: "blue-500",   badgeClass: "bg-blue-500 text-white" }],
  ["order_completed", { label: "Orden completada",              color: "green-500",  badgeClass: "bg-green-500 text-white" }],
  ["order_canceled",  { label: "Orden cancelada",              color: "red-500",    badgeClass: "bg-rose-500 text-white" }],

  ["user_created",    { label: "Usuario creado",               color: "teal-500",   badgeClass: "bg-teal-500 text-white" }],
  ["user_deleted",    { label: "Usuario eliminado",             color: "stone-600",  badgeClass: "bg-stone-600 text-white" }],
  ["user_edited",     { label: "Usuario modificado",           color: "indigo-500", badgeClass: "bg-indigo-500 text-white" }],

  ["login_success",   { label: "Inicio de sesión",             color: "gray-500",   badgeClass: "bg-gray-500 text-white" }],
  ["login_failure",   { label: "Intento de login fallido",     color: "orange-600", badgeClass: "bg-orange-600 text-white" }],

  ["product_created", { label: "Producto creado",              color: "emerald-500", badgeClass: "bg-emerald-500 text-white" }],
  ["product_delete", { label: "Producto eliminado",           color: "rose-500",    badgeClass: "bg-rose-500 text-white" }],
  ["product_edit",  { label: "Producto editado",             color: "violet-500",  badgeClass: "bg-violet-500 text-white" }],
  ["product_bulk",    { label: "Productos editados (bulk)",    color: "purple-500",  badgeClass: "bg-purple-500 text-white" }],

  ["payment_added",   { label: "Pago agregado",                color: "green-600",  badgeClass: "bg-green-600 text-white" }],
  ["payment_deleted", { label: "Pago eliminado",               color: "red-600",    badgeClass: "bg-rose-600 text-white" }],
  ["payment_edited",  { label: "Pago modificado",             color: "amber-600",  badgeClass: "bg-amber-600 text-white" }],

  ["shipping_added",  { label: "Envío agregado",               color: "sky-500",    badgeClass: "bg-sky-500 text-white" }],
  ["shipping_deleted",{ label: "Envío eliminado",              color: "red-500",    badgeClass: "bg-rose-500 text-white" }],
  ["shipping_edited", { label: "Envío modificado",            color: "sky-600",    badgeClass: "bg-sky-600 text-white" }],

  ["gift_added",      { label: "Regalo agregado",              color: "pink-500",   badgeClass: "bg-pink-500 text-white" }],
  ["gift_deleted",    { label: "Regalo eliminado",             color: "rose-500",   badgeClass: "bg-rose-500 text-white" }],
  ["gift_edited",     { label: "Regalo modificado",           color: "pink-600",   badgeClass: "bg-pink-600 text-white" }],

  ["topProducts_edited",{ label: "Productos top modificados",  color: "lime-500",   badgeClass: "bg-lime-500 text-white" }],
]);

