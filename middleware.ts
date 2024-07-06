// import { authMiddleware } from '@clerk/nextjs';
// import { NextRequest } from 'next/server';

// export default authMiddleware({
//   publicRoutes: ['/', '/api/cron-networth-evolution'],
//   async beforeAuth(req: NextRequest, evt: any) {
//     console.log('Request URL:', req.url);
//   },
// });

// export const config = {
//   matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
// };

import { authMiddleware } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';

export default authMiddleware({
  publicRoutes: ['/', '/api/cron-networth-evolution'],
  async beforeAuth(req: NextRequest) {
    if (req.nextUrl.pathname === '/api/cron-networth-evolution') {
      return NextResponse.next();
    }
    return NextResponse.next();
  },
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
