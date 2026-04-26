import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User[]>`
  SELECT users.*, roles."roleName" as role 
  FROM users 
  JOIN roles ON users."idRole" = roles."idRole"
  WHERE users.email = ${email}
`;
    return user[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          console.log('--- INTENTO DE LOGIN ---');
          console.log('Email recibido:', email);

          const user = await getUser(email);
          if (!user) {
            console.log('ERROR: Usuario no encontrado en Neon');
            return null;
          }

          console.log('USUARIO ENCONTRADO:', user.email);
          console.log('HASH EN BASE DE DATOS:', user.password);
          console.log('ROL EN BASE DE DATOS:', user.role);

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        return null;
      },
      credentials: undefined
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = user.role  // guarda el rol al hacer login
      return token
    },
    session({ session, token }) {
      session.user.role = token.role as string  // lo pasa a la sesión
      return session
    }
  }
});