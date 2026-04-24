import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "./prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user || !user.password) {
          throw new Error("User not found or password not set");
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
          image: user.image,
        };
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async jwt({ token, user, profile, trigger, session }: any) {
      // If an update was triggered from the client, refresh the token data immediately
      if (trigger === "update" && session?.user?.name) {
        token.name = session.user.name;
      } else if (trigger === "update" && session?.name) {
        // Fallback for direct { name: '...' } updates
        token.name = session.name;
      }

      if (user) {
        token.id = user.id;
        token.uid = (user as any).uid;
        // Robustly capture image from user (database) or profile (provider)
        const profileImage = 
          (profile as any)?.picture || 
          (profile as any)?.image || 
          (profile as any)?.avatar_url || 
          user.image;
        
        token.image = profileImage;
        
        // ALWAYS update the DB on sign-in with the latest provider image to ensure it's not stale
        if (profileImage && profileImage !== user.image) {
          await prisma.user.update({
            where: { id: user.id },
            data: { image: profileImage }
          }).catch((err: any) => console.error("Failed to sync profile image:", err));
        }

        token.name = (user as any).firstName || user.name || (profile as any)?.name;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).uid = token.uid;
        (session.user as any).image = token.image;
        session.user.image = token.image; // Standard NextAuth property
        (session.user as any).picture = token.image; // Extra fallback
        (session.user as any).avatar_url = token.image; // Extra fallback
        (session.user as any).name = token.name;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/sign-in',
  },
};
