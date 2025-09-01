import getProductService from '@/config/productServiceInstance';
import { cartItem, saleData } from '@/app/utils/types';

type data = {
  cart: cartItem[];
  clientData: saleData;
}

export async function POST(request: Request) {
  const { cart, clientData }:data = await request.json();
  try {
    const dbConfig = await getProductService();
    const registeredSale = await dbConfig.registerSale(cart, clientData);
    return Response.json({ saleDetails: registeredSale }, { status: 200 });
  } catch (error) {
    return Response.json({ error: 'Error registering sale', details: error }, { status: 500 });
  }
}