import { NextResponse } from 'next/server';
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { authConfigs } from "@/config/websiteConfig/authConfig";
import admin from "@/app/utils/firebaseAdmin";
import { dbCollections } from "@/app/utils/utils";
import getProductService from '@/config/productServiceInstance';
import { getCookieValue } from '@/app/utils/functions';

async function verifyAdminFromReq(req: NextRequest) {
  const cookieHeader = req.headers.get("cookie");
  const token = getCookieValue(cookieHeader, authConfigs.cookieName);

  if (!token) {
    throw NextResponse.json({ status: 401, message: "No session token" }, { status: 401 });
  }

  let uid: string | number = "";
  if (authConfigs.source === "firebase") {
    let decodedToken: admin.auth.DecodedIdToken | null = null;
    try {
      decodedToken = await admin.auth().verifyIdToken(token);
    } catch (e1) {
      console.warn("verifyIdToken failed, trying verifySessionCookie", e1);
      try {
        decodedToken = await admin.auth().verifySessionCookie(token, true);
      } catch (e2) {
        console.error(e2);
        throw NextResponse.json({ status: 401, message: "Invalid or expired session" }, { status: 401 });
      }
    }
    uid = decodedToken!.uid;
  } else if (authConfigs.source === "custom" || authConfigs.source === "mock") {
    const jwtSecret = process.env.AUTH_JWT_SECRET;
    if (!jwtSecret) throw NextResponse.json({ status: 500, message: "Server config missing" }, { status: 500 });
    try {
      const payload = jwt.verify(token, jwtSecret) as any;
      uid = payload.sub ?? payload.uid ?? "";
    } catch (err) {
      console.warn(err);
      throw NextResponse.json({ status: 401, message: "Invalid custom JWT" }, { status: 401 });
    }
  } else {
    throw NextResponse.json({ status: 500, message: "Unknown auth provider" }, { status: 500 });
  }

  if (!uid) {
    throw NextResponse.json({ status: 401, message: "Invalid token" }, { status: 401 });
  }

  // Obtener user role desde Firestore (implementado)
  const usersCol = admin.firestore().collection(dbCollections.users);
  const q = usersCol.where("uid", "==", uid).limit(1);
  const snap = await q.get();
  if (snap.empty) {
    throw NextResponse.json({ status: 403, message: "User not found or unauthorized" }, { status: 403 });
  }
  const userData = snap.docs[0].data() as any;
  const userRole: string = userData?.role ?? "";
  const username: string = userData?.name ?? userData?.email ?? "";

  if (userRole !== "admin") {
    throw NextResponse.json({ status: 403, message: "Insufficient permissions" }, { status: 403 });
  }

  return { uid, userRole, username };
}

const dbProvider = process.env.DATA_PROVIDER?.toLowerCase() || "mock";

export async function GET() {
  const dbService = await getProductService();
  const logs = await dbService.getActivityLogs();
  return NextResponse.json({logs}, { status: 200 });
}

export async function POST(req: NextRequest) {
  const { uid, username } = await verifyAdminFromReq(req);

  const { data } = await req.json();
  if (!data) {
    return NextResponse.json({ status: 400, message: "Missing action field" }, { status: 400 });
  }

  const logData = {
    userId: uid,
    username: username,
    action: data.action,
    target: data.target
  }

  let logRes;

  if (dbProvider === "firebase") {
    logRes = await admin.firestore().collection(dbCollections.activity_logs).add({
      ...logData,
      timestamp: Date.now()
    }).then(docRef => {
      console.log("Log created with ID:", docRef.id);
      return { status: 200, response: docRef.id };
    }).catch(error => {
      console.error("Error creating log:", error);
      return { status: 500, response: "Error creating log" };
    });
  }

  if (logRes) {
    if(logRes.status !== 200) {
      return NextResponse.json({ status: logRes.status, message: logRes.response }, { status: logRes.status });
    }

    return NextResponse.json({ status: 201, message: `Log created: ${logRes.response}` }, { status: 201 });
  }

  return NextResponse.json({ status: 500, message: "Log not created" }, { status: 500 });
}