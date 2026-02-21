import { auth } from "@/auth"; 
import { NextResponse } from "next/server";

export default auth((req) => {
  // req.auth contains the user's session data if they are logged in
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  const isProtectedRoute = pathname.startsWith("/dashboard");


  if (isProtectedRoute && !isLoggedIn) {
    // Redirect them straight to the login page
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (pathname === "/login" && isLoggedIn) {
    // Redirect them to the dashboard so they don't see the login form again
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }


  return NextResponse.next();
});

// The matcher optimizes performance by telling Next.js exactly which routes the middleware should run on.
export const config = {
  matcher: [

    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};