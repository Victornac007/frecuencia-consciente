import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const adminToken = request.cookies.get("auth_session");
  const url = request.nextUrl.clone();
  
  // Si es una ruta protegida y no tiene token, redirigir al login
  if (url.pathname.startsWith("/admin") && !url.pathname.startsWith("/admin/login")) {
    if (!adminToken) {
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }

  // Si intenta ir al login pero ya tiene un token, mandarlo al dashboard
  if (url.pathname.startsWith("/admin/login") && adminToken) {
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
