/*
*
* Mensajes de error para operaciones con productos en DB
* 
*/
const productErrors = [
  {code: "product-not-found", message: "Producto no encontrado"},
  {code: "unknown", message: "Ocurrió un error con la base de datos"},
  {code:"success-add", message: "Producto guardado existosamente"},
  {code:"success-edit", message: "Producto modificado existosamente"}
];

/*
*
* Mensajes de error para DB
* 
*/
const dbErrors = [
  {code: "conection-failed", message: "Error al conectar con la base de datos"},
  {code: "unknown", message: "Ocurrió un error con la base de datos"}
];