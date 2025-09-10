import { getAuthService } from "@/config/auth/authServiceInstance";
import { NextRequest, NextResponse } from "next/server";
import { FirebaseError } from "firebase/app";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = (await req.json()) as {
      email: string;
      password: string;
    };

    let res:NextResponse;

    if (!email || !password) {
      res = NextResponse.json(
        { status: 400, response: null, code: "no-credentials" },
        { status: 400 }
      );
    }

    const authService = await getAuthService();
    return NextResponse.json(
      { status: 200, response: authService, code: "login-disabled" },
      { status: 200 }
    );
    /*const result = await authService.login(email, password);

    if (!result.success) {
      return NextResponse.json(
        { status: 401, response: result.message || "Credenciales inválidas.", code: "login-error" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { status: 200, response: result.user, code: "login-successful" },
      { status: 200 }
    );*/
  } catch (error) {
    return NextResponse.json(
      { status: 500, response: (error as FirebaseError).message, code: "internal-server-error" },
      { status: 500 }
    );
  }
}