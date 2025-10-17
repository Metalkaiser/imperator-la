import { NextResponse } from 'next/server';
import getProductService from '@/config/productServiceInstance';

export const revalidate = 600; // se regenera cada 10 minutos

export async function GET() {
  const dbConfig = await getProductService();
  const [
    products,
    topProducts
  ] = await Promise.all([
    dbConfig.getActiveProducts(),
    dbConfig.getTopProducts()
  ]);
  return NextResponse.json({products: products, topProductsIds: topProducts}, { status: 200 });
}