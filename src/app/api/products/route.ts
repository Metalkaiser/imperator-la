import { NextResponse } from 'next/server';
import getProductService from '@/config/productServiceInstance';

//export const revalidate = 60; // se regenera cada 1 minuto

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