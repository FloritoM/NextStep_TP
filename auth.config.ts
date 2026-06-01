import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const role = (auth?.user as { role?: string })?.role;

      console.log("ROL en middleware:", role);
      console.log("USER en middleware:", auth?.user);

      const publicRoutes = ['/', '/login', '/register']
      if (publicRoutes.includes(nextUrl.pathname)) {
        return true;
      }

      if (nextUrl.pathname.startsWith('/adminDashboard') && role !== 'admin') {
        return Response.redirect(new URL('/home', nextUrl));
      }
      if (nextUrl.pathname.startsWith('/applicantDashboard') && role !== 'applicant') {
        return Response.redirect(new URL('/home', nextUrl));
      }
      if (nextUrl.pathname.startsWith('/recruiterDashboard') && role !== 'recruiter') {
        return Response.redirect(new URL('/home', nextUrl));
      }

      const protectedRoutes = ['/adminDashboard', '/applicantDashboard', '/recruiterDashboard', '/recruiterProfile', '/home']
      const isOnProtectedRoute = protectedRoutes.some(route =>
        nextUrl.pathname.startsWith(route)
      )
      if (isOnProtectedRoute && !isLoggedIn) {
        return false;
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;