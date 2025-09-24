import { NextResponse } from 'next/server';
import getProductService from '@/config/productServiceInstance';

export async function GET() {
  const dbConfig = await getProductService();
  const orders = await dbConfig.getOrders();
  return NextResponse.json({orders}, { status: 200 });
}