"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const nextjs_1 = require("@clerk/nextjs");
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
// If you want to make other routes public, check out the authMiddleware:
// https://clerk.com/docs/references/nextjs/auth-middleware
// export default authMiddleware({});
// export const config = {
//   matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
//   // matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
// };
exports.default = (0, nextjs_1.authMiddleware)({
    publicRoutes: ['/', '/in/dashboard'],
});
exports.config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
