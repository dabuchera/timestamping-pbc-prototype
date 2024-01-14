import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

import { User } from '@prisma/client';

// import { sql } from '@vercel/postgres';
import { authConfig } from './auth.config';
import { db } from './lib/db';

const bcrypt = require('bcrypt')

async function getUser(name: string): Promise<User | null> {
    return await db.user.findFirst({
      where: {
        name: name,
      },
    })
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z.object({ name: z.string(), password: z.string().min(6) }).safeParse(credentials)
        if (parsedCredentials.success) {
          const { name, password } = parsedCredentials.data
          const user = await getUser(name)
          if (!user) return null
          console.log(password)
          const passwordsMatch = await bcrypt.compare(password, user.password)

          if (passwordsMatch) return user
        }

        return null
      },
    }),
  ],
})
