import { NextResponse } from 'next/server';
import getProductService from '@/config/productServiceInstance';
import type { NextRequest } from "next/server";
import { getCookieValue } from '@/app/utils/functions';
import { authConfigs } from '@/config/websiteConfig/authConfig';
import { normalizeRole } from '@/app/utils/utils';

export async function GET(req: NextRequest) {
  const cookieHeader = req.headers.get("cookie");
  const token = getCookieValue(cookieHeader, authConfigs.cookieName);
  if (!token) {
    return NextResponse.json({ status: 401, message: "No session token" }, { status: 401 });
  }
  const dbService = await getProductService();
  const usersRes = await dbService.getUsers();
  if (usersRes.status === 200 && Array.isArray(usersRes.response)) {
    usersRes.response = usersRes.response.map((user: any) => ({
      ...user,
      role: normalizeRole(user.role),
    }));
  }
  
  return NextResponse.json({users: usersRes}, { status: 200 });
}
