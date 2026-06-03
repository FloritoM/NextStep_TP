import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,

  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
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

          return {
            id: userData.id.toString(),
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            role: userData.role?.name
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
    jwt({ token, user }) {
      console.log('JWT USER:', user);

      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.email = user.email;
        token.role = user.role;
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
        session.user.role = token.role as string;
      }

      console.log('SESSION:', session);

      return session;
    },
  },
});
