import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

// Routes that do not require authentication
const OPEN_ROUTES = ["/auth/login", "/auth/callback"];

function isOpenRoute(pathname: string): boolean {
  if (OPEN_ROUTES.some((r) => pathname === r || pathname.startsWith(r + "/"))) {
    return true;
  }
  // /api/auth/* is always open
  if (pathname.startsWith("/api/auth/")) {
    return true;
  }
  return false;
}

function isApiRoute(pathname: string): boolean {
  return pathname.startsWith("/api/") && !pathname.startsWith("/api/auth/");
}

export async function proxy(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request);
  const { pathname } = request.nextUrl;

  if (user) {
    // Authenticated + trying to reach login → redirect home
    if (pathname === "/auth/login") {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
    return supabaseResponse;
  }

  // Not authenticated
  if (isOpenRoute(pathname)) {
    return supabaseResponse;
  }

  if (isApiRoute(pathname)) {
    // Never redirect API fetch calls — return 401 JSON
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  // Protected page → redirect to login
  const url = request.nextUrl.clone();
  const next = request.nextUrl.pathname + request.nextUrl.search;
  url.pathname = "/auth/login";
  url.search = `?next=${encodeURIComponent(next)}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - Static file extensions
     */
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff2?|ttf|otf|js|css|map)).*)",
  ],
};
