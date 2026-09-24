import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Protect admin panel routes
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = request.cookies.get("admin_token")?.value;
    
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    
    try {
      // Must exactly match the secret logic in src/app/api/admin/login/route.js
      const jwtSecretString = process.env.JWT_SECRET || 'fallback-secret-key-32-chars-minimum!!';
      const secret = new TextEncoder().encode(jwtSecretString);
      
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (error) {
      console.error('[MIDDLEWARE-AUTH-ERROR]', error.message);
      
      // Clear the invalid cookie and redirect to login
      const response = NextResponse.redirect(new URL("/admin/login", request.url));
      response.cookies.delete("admin_token");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};