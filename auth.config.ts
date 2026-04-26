import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const protectedRoutes = ['/adminDashboard', '/userDashboard', '/screenRedirection']
      const isOnProtectedRoute = protectedRoutes.some(route => 
        nextUrl.pathname.startsWith(route)
      )
      if (isOnProtectedRoute) {
        if (isLoggedIn) return true;
        return false; 
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/screenRedirection', nextUrl));
      }
      return true;
    },
  },
  providers: [], 
} satisfies NextAuthConfig;
