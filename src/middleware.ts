import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Refresh session if expired - required for Server Components
  await supabase.auth.getSession();

  const {
    data: { user },
  } = await supabase.auth.getUser();


  // Auth guard for public routes (login, signup) - redirect to dashboard if logged in
  if (user && (
    req.nextUrl.pathname === "/login" || 
    req.nextUrl.pathname === "/signup" ||
    req.nextUrl.pathname === "/"
  )) {
    const redirectUrl = new URL("/dashboard", req.url);
    return NextResponse.redirect(redirectUrl);
  }

  // Auth guard for protected routes - redirect to login if not logged in
  if (!user && req.nextUrl.pathname.startsWith("/dashboard")) {
    const redirectUrl = new URL("/login", req.url);
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     * - api routes (api folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|public|api).*)',
  ],
}; 