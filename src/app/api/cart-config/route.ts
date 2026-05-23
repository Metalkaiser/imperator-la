import { NextResponse } from 'next/server';
import getProductService from '@/config/productServiceInstance';

export const revalidate = 600; // se regenera cada 10 minutos

export async function GET() {
  const dbConfig = await getProductService();
  const cartRes = await dbConfig.getCartConfigs();
  const cartDetails = cartRes.status === 200 && cartRes.response
    ? cartRes.response
    : { paymentMethods: [], shippingMethods: [], giftOptions: [] };

  return NextResponse.json({
    paymentMethods: Array.isArray(cartDetails.paymentMethods) ? cartDetails.paymentMethods : [],
    shippingMethods: Array.isArray(cartDetails.shippingMethods) ? cartDetails.shippingMethods : [],
    giftOptions: Array.isArray(cartDetails.giftOptions) ? cartDetails.giftOptions : [],
  }, { status: 200 });
}
