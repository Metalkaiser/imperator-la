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
  };
  variants?: {
    color: string;
    sku: string;
    stock: {
      name: string;
      quantity: number;
    }[];
  }[];
  waLink: string;
  discount?: {
    type: number;
    value: number;
  }
  position?: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
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
  id: number;
  name: string;
  mainSku: string;
  sku: string;
  qt: number;
  size?: number | string;
  price: number;
}