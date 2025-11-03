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
  thumbnail: string;
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
  isDeleted?: boolean;
  createdAt?: string | number | null;
  updatedAt?: string | number | null;
  deletedAt?: string | number | null;
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
  createdAt?: string | number;
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
  clientName?: string;  // Puede que siempre esté presente, pero lo dejamos opcional
  clientId?: string | number;
  clientPhone?: string;
  clientEmail?: string;
  clientAddress?: { [key: string]: string | number | boolean };

  paymentMethodId: PaymentMethod["id"];
  paymentData: { [key: string]: string | number | boolean };

  shippingMethod: shippingMethod["id"];
  shippingData?: { [key: string]: string | number | boolean };

  giftOption?: GiftOption["id"][];
  totalAmount: number;
  notes?: string;
};


export type sale = {
  id: string | number;
  clientName: string;
  clientId?: string | number;
  clientPhone: string;
  clientEmail?: string;
  clientAddress?: { [key: string]: string | number | boolean };
  paymentMethodId: PaymentMethod["id"];
  paymentData: { [key: string]: string | number | boolean };
  shippingMethod: shippingMethod["id"];
  shippingData?: { [key: string]: string | number | boolean };
  giftOption?: GiftOption["id"][];
  totalAmount: number;
  status: string;
  items: cartItem[];
  notes?: string;
  createdAt: string | number;
}

export type User = {
  uid: string | number;
  name: string;
  image?: string;
  email: string;
  role: string;
  isDeleted?: boolean;
  lastLogin?: string | null;
  createdAt?: string | number | null;
  updatedAt?: string | number | null;
  deletedAt?: string | number | null;
}

export type currentUser = {
  uid: string | number;
  name: string;
  email: string;
  role: string;
  permissions: string[];
  lastLogin?: string | null;
  image?: string;
}

export type activity_logs = {
  id: string | number;
  timestamp: number;
  userId: User["uid"];
  username: string;
  action: string;
  target?: {collection: string, item: string | number};
  diff?: {item: string, oldValue: string | number | boolean, newValue: string | number | boolean}[];
}

export type NewActivityLog = Omit<activity_logs, "id" | "timestamp">;

export type authResult = { success: boolean; message: string; user?: User };

export type NewProduct = Omit<productProps, "id">;