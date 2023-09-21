import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { AuthOptions } from "next-auth";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

import { env } from "~/env.mjs";
import { db } from "~/server/db";

export const authOptions: AuthOptions = {
  adapter: DrizzleAdapter(db),
  callbacks: {
    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    jwt: ({ token, user, account }) => {
      if (account) {
        token.sub = user.id;
        return token;
      }
      return token;
    },
  },
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
  ],
};

export default NextAuth(authOptions);
