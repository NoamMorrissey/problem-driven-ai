import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "./lib/supabase/middleware";
import { createServerClient } from "@supabase/ssr";

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Handle admin routes - check authentication and refresh session
  if (pathname.startsWith("/admin")) {
    // Refresh Supabase session
    const response = await updateSession(request);

    // Check authentication for admin routes (except login and callback)
    if (
      !pathname.startsWith("/admin/login") &&
      !pathname.startsWith("/admin/auth")
    ) {
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll() {
              return request.cookies.getAll();
            },
            setAll() {},
          },
        }
      );

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }
    }

    return response;
  }

  // Apply next-intl middleware to all other routes
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Match all pathnames including admin routes
    "/((?!api|_next|.*\\..*).*)",
  ],
};
