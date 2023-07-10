import GitHubProvider from "next-auth/providers/github";
import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./db/client";

const prismaAdapter = PrismaAdapter(prisma) as Adapter;

export const authOptions: NextAuthOptions = {
  debug: true,
  secret: String(process.env.NEXTAUTH_SECRET),
  adapter: prismaAdapter,
  providers: [
    GitHubProvider({
      clientId: String(process.env.GITHUB_CLIENT_ID),
      clientSecret: String(process.env.GITHUB_CLIENT_SECRET),
    }),
  ],
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
  events: {
    createUser: async ({ user }) => {
      await prisma.profile.create({
        data: {
          userId: user.id,
          avatarUrl: user.image,
          userName: user.name,
          // TODO: add email field
        },
      });
    },
  },
};
