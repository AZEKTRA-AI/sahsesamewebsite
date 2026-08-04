import type { NextAuthConfig } from 'next-auth'

/**
 * Edge-safe half of the Auth.js setup.
 *
 * Middleware runs on the Edge runtime, which cannot load native Node modules.
 * The Credentials provider needs bcrypt (native) and Prisma, so it lives in
 * lib/auth.ts and is only used in the Node runtime. Anything imported here must
 * stay dependency-free enough to run on the edge.
 */
export const authConfig = {
  providers: [],
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
