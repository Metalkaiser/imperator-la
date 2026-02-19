import { NextResponse } from 'next/server';
import getProductService from '@/config/productServiceInstance';

export async function GET() {
  const dbConfig = await getProductService();
  const products = await dbConfig.getAllProducts();
  const topProducts = await dbConfig.getTopProducts();
  return NextResponse.json({products: products, topProductsIds: topProducts}, { status: 200 });
}