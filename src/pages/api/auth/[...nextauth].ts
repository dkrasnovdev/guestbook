import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { AuthOptions } from "next-auth";
import NextAuth from "next-auth";
import { db } from "~/server/db";

export const authOptions: AuthOptions = {
  adapter: DrizzleAdapter(db),
  providers: [],
};

export default NextAuth(authOptions);
