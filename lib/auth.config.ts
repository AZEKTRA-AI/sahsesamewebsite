import type { NextAuthConfig } from 'next-auth'

/**
 * Edge-safe half of the Auth.js setup.
 *
 * Middleware runs on the Edge runtime, which cannot load Prisma. The
 * Credentials provider needs a database lookup, so it lives in lib/auth.ts and
 * is only used in the Node runtime. Anything imported here must stay
 * dependency-free enough to run on the edge.
 */
export const authConfig = {
  providers: [],
  // Auth.js v5 reads AUTH_SECRET; NEXTAUTH_SECRET is the v4 name. Accept either
  // so an existing deployment's variable keeps working. Dev auto-generates a
  // secret, but production throws "server configuration" without one.
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  // Auth.js refuses requests from hosts it does not recognise. It auto-trusts
  // Vercel, but not a self-hosted production build or a custom domain, which
  // fails with UntrustedHost. The app is always served from a known origin.
  trustHost: true,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    // Runs in middleware. Returning false sends the user to pages.signIn, so
    // the login page itself must always authorize or it redirects to itself.
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      if (pathname.startsWith('/admin/login')) return true
      if (pathname.startsWith('/admin')) return Boolean(auth)
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
} satisfies NextAuthConfig
