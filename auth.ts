import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import Google from 'next-auth/providers/google';

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
            email: z.string().email(),
            password: z.string().min(8),
          })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        try {
          const res = await fetch(
            `${process.env.BACKEND_URL}/auth/login`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: email.toLowerCase(),
                password,
              }),
            }
          );

          if (!res.ok) return null;

          const response = await res.json();

          console.log('AUTHORIZE RESPONSE:', response);

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

        } catch (error) {
          console.error('Error llamando al backend:', error);
          return null;
        }
      },

      credentials: undefined,
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      console.log('JWT USER:', user);

      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.email = user.email;
        token.role = user.role;
        token.accessToken = user.token;
      }

      if (account?.provider === 'google' && token.email) {
        try {
          const res = await fetch(
            `${process.env.BACKEND_URL}/auth/google-login`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: token.email }),
            }
          );

          if (res.ok) {
            const response = await res.json();
            token.id = response.user.id.toString();
            token.firstName = response.user.firstName;
            token.lastName = response.user.lastName;
            token.role = response.user.role;
            token.accessToken = response.token;
          }

        } catch (error) {
          console.error('Error en google-login:', error);
        }
        token.provider = 'google';
      }

      console.log('JWT TOKEN:', token);

      return token;
    },

    session({ session, token }) {
      console.log('SESSION TOKEN:', token);

      if (session.user) {
        session.user.id = token.id as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.email = token.email as string;
        session.user.role = token.role as { id: number, name: string, isDefault?: boolean };
      }
      session.accessToken = token.accessToken as string;

      console.log('SESSION:', session);

      return session;
    },
  },
});