import Credentials from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';
import { verifyUser } from './auth';
import { Role } from '@prisma/client';

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        const user = await verifyUser(credentials.email, credentials.password);
        if (!user) return null;
        return { id: `${user.id}`, name: user.name, email: user.email, role: user.role } as any;
      }
    })
  ],
  pages: {
    signIn: '/ar/login'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = (user as any).id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role as Role;
        (session.user as any).id = token.id as string;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET
};
