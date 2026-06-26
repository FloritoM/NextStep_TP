import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { z } from 'zod';
import { authConfig } from './auth.config';
import { loginWithCredentials } from '@/lib/services/auth.service';

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,

  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.email(),
            password: z.string().min(8),
          })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        let result: { ok: boolean; data: any };
        try {
          result = await loginWithCredentials(email.toLowerCase(), password);
        } catch (networkError) {
          console.error('Backend no disponible:', networkError);
          throw new Error('server_unavailable');
        }

        if (!result.ok) return null;

        const response = result.data;
        const userData = response.user;

        if (!userData.isActive) {
          throw new Error("inactive");
        }

        return {
          id: userData.id.toString(),
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          role: userData.role,
          token: response.token,
        };
      },
      credentials: undefined,
    }),
  ],
});