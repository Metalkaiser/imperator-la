import { NextResponse } from 'next/server';
import getProductService from '@/config/productServiceInstance';

export const revalidate = 600; // se regenera cada 10 minutos

export async function GET() {
  const dbConfig = await getProductService();
  const cartDetails = (await dbConfig.getCartConfigs()).response
  return NextResponse.json(cartDetails, { status: 200 });
}
