import { NextResponse } from 'next/server';
import getProductService from '@/config/productServiceInstance';

export async function GET() {
  const options = {
    limit: 1
  }

  const dbConfig = await getProductService();
  const activity = await dbConfig.getActivityLogs(options)
  return NextResponse.json({lastActivity: activity}, { status: 200 });
}