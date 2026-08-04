import NextAuth from 'next-auth'
import { authConfig } from '@/lib/auth.config'

// Uses the edge-safe config — importing lib/auth.ts here would pull bcrypt
// (a native module) into the Edge runtime and crash every /admin request.
// Access rules live in the `authorized` callback in lib/auth.config.ts.
export default NextAuth(authConfig).auth

export const config = {
  matcher: ['/admin/:path*'],
}
