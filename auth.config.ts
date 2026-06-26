import type { NextAuthConfig } from 'next-auth';
import { googleLogin } from '@/lib/services/auth.service';

const publicRoutes = ['/', '/login', '/register', '/register/complete'];
const systemRoles = ['admin', 'applicant', 'recruiter'];

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user, account }) {
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
          const response = await googleLogin(token.email);
          token.id = response.user.id.toString();
          token.firstName = response.user.firstName;
          token.lastName = response.user.lastName;
          token.role = response.user.role;
          token.accessToken = response.token;
        } catch (error) {
          console.error('Error en google-login:', error);
        }
        token.provider = 'google';
      }

      return token;
    },

    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.email = token.email as string;
        session.user.role = token.role;
      }
      session.accessToken = token.accessToken as string;

      return session;
    },

    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const role = auth?.user?.role?.name || "applicant";

      const pathname = nextUrl.pathname;
      const isPublicRoute = publicRoutes.includes(pathname);

      if (!isLoggedIn) {
        if (isPublicRoute) return true;
        return false;
      }

      if (isPublicRoute) {
        return Response.redirect(new URL(`/${role}/dashboard`, nextUrl));
      }

      const targetRole = pathname.split('/')[1];

      if (systemRoles.includes(targetRole) && targetRole !== role) {
        return Response.redirect(new URL(`/${role}/dashboard`, nextUrl));
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;