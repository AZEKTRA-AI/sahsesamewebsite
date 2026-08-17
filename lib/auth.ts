import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'
import { authConfig } from './auth.config'
import { isLockedOut, recordFailedAttempt, clearAttempts } from './login-rate-limit'

/**
 * Full Auth.js setup — Node runtime only. Imports Prisma, which cannot run on
 * the Edge runtime, so middleware must use lib/auth.config.ts instead.
 *
 * Uses bcryptjs rather than bcrypt: bcrypt resolves its native binary at
 * runtime via node-gyp-build, which build-time tracing cannot follow, so the
 * binary goes missing in serverless bundles. bcryptjs is pure JS and verifies
 * the same $2b$ hashes.
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const email = credentials.email as string

        if (isLockedOut(email)) {
          return null
        }

        const adminUser = await prisma.adminUser.findUnique({
          where: { email },
        })

        if (!adminUser) {
          recordFailedAttempt(email)
          return null
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password as string,
          adminUser.passwordHash
        )

        if (!passwordMatch) {
          recordFailedAttempt(email)
          return null
        }

        clearAttempts(email)

        return {
          id: adminUser.id,
          email: adminUser.email,
        }
      },
    }),
  ],
})
