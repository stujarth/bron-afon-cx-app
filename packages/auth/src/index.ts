import NextAuth, { type NextAuthResult } from 'next-auth';
import MicrosoftEntraId from 'next-auth/providers/microsoft-entra-id';

const nextAuth: NextAuthResult = NextAuth({
  providers: [
    MicrosoftEntraId({
      clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID,
      clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
      issuer: `https://login.microsoftonline.com/${process.env.AUTH_MICROSOFT_ENTRA_ID_TENANT_ID}/v2.0`,
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth: session, request: { nextUrl } }) {
      const isLoggedIn = !!session?.user;
      const isOnDashboard = nextUrl.pathname.includes('/dashboard') ||
        nextUrl.pathname.includes('/repairs') ||
        nextUrl.pathname.includes('/rent') ||
        nextUrl.pathname.includes('/profile') ||
        nextUrl.pathname.includes('/support');

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      }

      return true;
    },
  },
});

export const handlers = nextAuth.handlers;
export const auth = nextAuth.auth;
export const signIn = nextAuth.signIn;
export const signOut = nextAuth.signOut;
