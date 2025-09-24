import { NextResponse } from 'next/server';
import getProductService from '@/config/productServiceInstance';

export async function GET() {
  const dbService = await getProductService();
  const logs = await dbService.getActivityLogs();
  return NextResponse.json({logs}, { status: 200 });
}