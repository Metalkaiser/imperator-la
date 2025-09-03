import { NextResponse } from 'next/server';
import getProductService from '@/config/productServiceInstance';

export async function GET() {
  const dbConfig = await getProductService();
  const dumpResult = await dbConfig.migrateDB?.();
  return NextResponse.json({ result: dumpResult }, { status: 200 });
}