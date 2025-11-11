import { productProps, appResponse, cartItem, saleData, NewActivityLog, NewProduct } from "@/app/utils/types";

export interface ProductService {
  /**
   * Fetches all products from the database.
   * @returns A promise that resolves to an appResponse containing the list of all products.
   */
  getAllProducts(): Promise<appResponse>;

  /**
   * Fetches all active products from the database.
   * @returns A promise that resolves to an appResponse containing the list of active products.
   */
  getActiveProducts(): Promise<appResponse>;

  /**
   * Fetches the top products from the database.
   * @returns A promise that resolves to an appResponse containing the list of top products.
   */
  getTopProducts(): Promise<appResponse>;

  /**
   * Fetches a single item by its ID from the specified collection.
   * @param id The ID of the item to fetch.
   * @param collection The collection from which to fetch the item.
   * @returns A promise that resolves to an appResponse containing the requested item.
   */
  getItemById(id: string, collection: string): Promise<appResponse>;

  /**
   * Updates a product in the database.
   * @param id The ID of the product to update.
   * @param product The product data to update.
   * @returns A promise that resolves to an appResponse indicating the result of the update operation.
   */
  updateProduct(id: string | number, product: Partial<productProps>): Promise<appResponse>;

  /**
   * Marks a product from the database as deleted.
   * @param id The ID of the product to delete.
   * @returns A promise that resolves to an appResponse indicating the result of the delete operation.
   */
  deleteProduct(id: string | number): Promise<appResponse>;

  /**
   * Fetches cart configuration settings.
   * @returns A promise that resolves to an appResponse containing the cart configuration settings.
   */
  getCartConfigs(): Promise<appResponse>;

  /**
   * Registers a sale in the database.
   * @param cart The items in the cart.
   * @param clientData The client data associated with the sale.
   * @returns A promise that resolves to an appResponse indicating the result of the sale registration.
   */
  registerSale(cart: cartItem[], clientData: saleData): Promise<appResponse>;

  /**
   * Fetches orders from the database.
   * @returns A promise that resolves to an appResponse containing the list of orders.
   */
  getOrders(): Promise<appResponse>;

  /**
   * Fetches users from the database.
   * @returns A promise that resolves to an appResponse containing the list of users.
   */
  getUsers(): Promise<appResponse>;

  /**
   * Fetches activity logs from the database.
   * @param options Optional parameters for filtering and limiting the activity logs.
   * @returns A promise that resolves to an appResponse containing the list of activity logs.
   */
  getActivityLogs(options?: { limit?: number; startAfterId?: string; from?: number; to?: number }): Promise<appResponse>;

  /**
   * Sets a new activity log in the database.
   * @param data The activity log data to set.
   * @returns A promise that resolves to an appResponse indicating the result of the operation.
   */
  setActivityLog(data: NewActivityLog): Promise<appResponse>

  /**
   * Uploads an image to the specified folder in storage.
   * @param file The image file to upload.
   * @param folder The folder in which to upload the image.
   * @returns A promise that resolves to an object indicating the result of the upload operation, including the URL of the uploaded image if successful.
   */
  uploadImage(file: File, folder: string): Promise<{ok: boolean; url?: string; error?: string}>;

  /**
   * Deletes an image from storage.
   * @param url The URL of the image to delete.
   * @returns A promise that resolves to an object indicating the result of the delete operation.
   */
  deleteImage(url: string): Promise<{ok: boolean; message: string}>;

  /**
   * Creates a new product in the database.
   * @param product The product data to create.
   * @returns A promise that resolves to an appResponse indicating the result of the create operation.
   */
  createProduct(product: NewProduct): Promise<appResponse>;

  /**
   * Migrates the database (for debugging purposes).
   * @returns A promise that resolves to an appResponse indicating the result of the migration operation.
   */
  migrateDB?(): Promise<appResponse>; // Optional method for debugging purposes
}
