import { NextResponse } from 'next/server';
import getProductService from '@/config/productServiceInstance';

export async function GET() {
  const dbService = await getProductService();
  const users = await dbService.getUsers();
  
  return NextResponse.json({users}, { status: 200 });
}