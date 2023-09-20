import type { AuthOptions } from "next-auth";
import NextAuth from "next-auth";

export const authOptions: AuthOptions = {
  providers: [],
};

export default NextAuth(authOptions);
