import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export function middleware(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    // ❌ No token → redirect to login
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // ❌ Invalid token → redirect
    jwt.verify(token, JWT_SECRET);

    // ✅ Token valid → continue
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// 👇 Protect only these routes
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/api/private/:path*"],
};
