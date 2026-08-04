import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import { prisma } from './prisma'
import { authConfig } from './auth.config'

/**
 * Full Auth.js setup — Node runtime only. Imports bcrypt (a native module) and
 * Prisma, neither of which can run on the Edge runtime, so middleware must use
 * lib/auth.config.ts instead of this file.
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

        const adminUser = await prisma.adminUser.findUnique({
          where: { email: credentials.email as string },
        })

        if (!adminUser) {
          return null
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password as string,
          adminUser.passwordHash
        )

        if (!passwordMatch) {
          return null
        }

        return {
          id: adminUser.id,
          email: adminUser.email,
        }
      },
    }),
  ],
})
