import type * as trpc from "@trpc/server";
import type * as trpcNext from "@trpc/server/adapters/next";
import { getServerSession } from "next-auth";
import { authOptions } from "~/pages/api/auth/[...nextauth]";

export const createContext = async (
  opts: trpcNext.CreateNextContextOptions,
) => {
  const session = await getServerSession(opts.req, opts.res, authOptions);
  return {
    session,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
