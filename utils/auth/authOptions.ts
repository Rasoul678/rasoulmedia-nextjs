import GitHubProvider from "next-auth/providers/github";
import CredentialProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./db/client";
import * as bcrypt from "bcrypt";

const prismaAdapter = PrismaAdapter(prisma) as Adapter;

export const authOptions: NextAuthOptions = {
  // debug: process.env.NODE_ENV === "development",
  secret: String(process.env.NEXTAUTH_SECRET),
  adapter: prismaAdapter,
  session: {
    strategy: "jwt",
  },
  providers: [
    GitHubProvider({
      id: "github",
      name: "Github",
      clientId: String(process.env.GITHUB_CLIENT_ID),
      clientSecret: String(process.env.GITHUB_CLIENT_SECRET),
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialProvider({
      id: "credentials",
      name: "Email",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@email.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        const userExists = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        //! See if user with this email already exists
        if (userExists) {
          //! Check password
          const match = bcrypt.compareSync(
            String(credentials?.password),
            String(userExists.password)
          );

          if (match) {
            return userExists;
          } else {
            return null;
          }
        } else {
          //! User not found
          return null;
        }
      },
    }),
  ],
  callbacks: {
    session: async ({ session, user, token }) => {
      if (user) {
        session.user.id = user.id;
        session.user.role = user.role;
      }

      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.provider = token.provider;
      }

      return session;
    },
    jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.provider = String(account?.provider);
      }
      return token;
    },
  },
  events: {
    createUser: async ({ user }) => {
      await prisma.profile.create({
        data: {
          userId: user.id,
          avatarUrl: user.image,
          firstName: user.name,
          email: user.email,
        },
      });
    },
    signIn: async ({ account, user, profile, isNewUser }) => {
      if (isNewUser && account?.provider === "github") {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            image: profile?.image,
          },
        });
      }
    },
    // signOut(message) {
    //   console.log({ message });
    // },
  },
  pages: {
    newUser: "/auth/signup",
    signIn: "/auth/signin",
  },
};
