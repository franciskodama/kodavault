import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      const { pathname } = req.nextUrl;
      
      // Define public routes
      const publicRoutes = [
        "/",
        "/sign-in",
        "/sign-up",
        "/api/cron-networth-evolution",
        "/api/economic-calendar",
        "/api/auth", // NextAuth routes must be public
      ];

      const isPublic = publicRoutes.some(route => pathname.startsWith(route));
      
      if (isPublic) return true;
      return !!token;
    },
  },
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
