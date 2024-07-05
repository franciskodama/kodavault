import { authMiddleware } from '@clerk/nextjs';

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware

// If you want to make other routes public, check out the authMiddleware:
// https://clerk.com/docs/references/nextjs/auth-middleware

export default authMiddleware({
  publicRoutes: [
    '/',
    // '/in/dashboard',
    '/api/cron-networth-evolution',
  ],
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
