export type productProps = {
  id: string | number;
  name: string;
  description: string;
  images: string[];
  mainSku: string;
  price: number;
  status: number;
  category: number;
  subcategory?: number;
  atributes?: {
    [key: string]: string | number | boolean;
  }[];
  variants: {
    color: string;
    sku: string;
    image: string;
    stock: {
      name: string;
      quantity: number;
    }[];
  }[];
  waLink: string;
  discount?: {
    type: number; //0: percentage, 1: fixed
    value: number;
  }
  position?: number;
  numReviews?: number;
  rating?: number;
  createdAt?: number | null;
  updatedAt?: number | null;
  deletedAt?: number | null;
}

export type topProductsProps = {
  id: string | number;
  productId: string | number;
}

export type appResponse = {
  code: string;
  response: any;
  status: number;
}

export type movementsProps = {
  id: string | number;
  name: string;
  description: string;
  amount: number;
  status: number;
  createdAt?: string;
  updatedAt?: string;
  clientId?: string | number;
  orderId?:  string | number;
}

export type cartItem = {
  id: number | string;
  name: string;
  mainSku: string;
  sku: string;
  image: string;
  qt: number;
  max: number;
  size?: number | string;
  price: number;
}

export type PaymentMethod = {
  id: number | string;
  order: number;
  name: string; // Name of the payment method
  enabled: boolean; // Indicates if the payment method is enabled
  data: {
    [key: string]: string | number; // Using string or number to allow for different types of data (e.g., id, phoneNumber, bank, etc.)
  };
  userData: string[];
  icon: string;
  fee: {
    status: boolean;  // Indicates if there is a fee for this payment method
    percentage?: number; // Optional, only if status is true
    fixed?: number; // Optional, only if status is true
  };
}

export type shippingMethod = {
  id: number | string;
  order: number;
  name: string;
  enabled: boolean;
  shipToHome: boolean;  // Indicates if the method can ship to home
  data: string[];  // Using an array to allow multiple fields for address details
  icon: string;
  fee: {
    status: boolean;  // Indicates if there is a fee for this shipping method
    onlyPayOnDelivery: boolean; // Indicates if the shipping method only has pay on delivery
    percentage?: number; // Optional, only if status is true
    fixed?: number; // Optional, only if status is true
  };
}

export type GiftOption = {
  id: string | number;                    // Identificador único (puede ser UUID o autoincremental)
  name: string;                           // Nombre descriptivo: "Estuche de lujo", "Envoltorio navideño"
  description?: string;                   // Descripción opcional más detallada
  type: "wrapping" | "case" | "card" | "other"; // Tipo general (puede usarse para filtrar)
  price: number;                          // Costo del extra (0 si es gratuito)
  image?: string;                         // URL de una imagen para mostrar en la UI
  available: boolean;                     // Si está disponible o no
  exclusiveToProducts?: string[];        // Lista opcional de SKUs/productos a los que se aplica
  data?: { [key: string]: string | number | boolean }; // Extra info personalizada
}

export type saleData = {
  clientName: string;                     // Nombre del cliente
  clientPhone: string;                    // Teléfono del cliente
  clientEmail?: string;                   // Email del cliente (opcional)
  clientAddress?: { [key: string]: string | number | boolean };                 // Dirección del cliente (opcional)
  paymentMethodId: PaymentMethod["id"];   // Método de pago seleccionado
  paymentData: { [key: string]: string | number | boolean }; // Datos adicionales del pago (opcional)
  shippingMethod: shippingMethod["id"];   // Método de envío seleccionado
  shippingData?: { [key: string]: string | number | boolean }; // Datos adicionales del envío (opcional)
  giftOption?: GiftOption["id"][];                // Opción de regalo seleccionada (opcional)
  totalAmount: number;                    // Monto total de la venta
  items: cartItem[];                      // Lista de productos en el carrito
  notes?: string;                         // Notas adicionales para la venta (opcional)
}