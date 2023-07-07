import GitHubProvider from "next-auth/providers/github";
import { NextAuthOptions } from "next-auth";
import vercelPostgresAdapter from "./vercelPostgresAdapter";
import { AdapterUser } from "next-auth/adapters";
import { postgresAdapter } from "@services/postgresAdapterService";

export const authOptions: NextAuthOptions = {
  debug: true,
  secret: String(process.env.NEXTAUTH_SECRET),
  providers: [
    GitHubProvider({
      clientId: String(process.env.GITHUB_CLIENT_ID),
      clientSecret: String(process.env.GITHUB_CLIENT_SECRET),
    }),
  ],
  callbacks: {
    session: ({ session, newSession, token, trigger, user }) => {
      // console.log({ session, newSession, token, trigger, user });
      return session;
    },
    signIn: async ({ user, account, credentials, profile, email }) => {
      // console.log({ profile, account });
      try {
        const userExists = await postgresAdapter.getUserByEmail(
          String(user.email)
        );

        if (!userExists) {
          const newUser = await postgresAdapter.createUser(user as AdapterUser);

          if (account) {
            await postgresAdapter.linkAccount({
              ...account,
              userId: newUser.id,
            });
          }

          if (profile) {
            await postgresAdapter.linkProfile({
              ...profile as GitHubProfileType,
              userId: newUser.id,
            });
          }
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
