import NextAuth, { NextAuthOptions, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "@/lib/supabase";

// Extend NextAuth's User and Session types to include `id`
declare module "next-auth" {
  interface User {
    id: string; // Add id to the User type
  }

  interface Session {
    user: User & DefaultSession["user"]; // Ensure session.user includes id
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your@email.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const { data, error } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        });

        if (error || !data.user) return null;
        return { id: data.user.id, email: data.user.email }; // Return `id` here
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        // Ensure session.user includes the `id`
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };