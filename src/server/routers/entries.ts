import { TRPCError } from "@trpc/server";
import { desc } from "drizzle-orm";
import { z } from "zod";

import { entries } from "~/server/db/schema";
import { protectedProcedure, publicProcedure, router } from "~/server/trpc";

export const entriesRouter = router({
  get: publicProcedure.query(({ ctx: { db } }) => {
    return db.select().from(entries).orderBy(desc(entries.createdAt));
  }),
  create: protectedProcedure
    .input(
      z.object({
        content: z.string().min(1).max(1000),
      }),
    )
    .mutation(async ({ input, ctx: { session, db } }) => {
      console.log("session", session);
      if (!session?.user || !session?.user.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to create an entry.",
        });
      }
      return await db.insert(entries).values({
        id: crypto.randomUUID(),
        userId: session.user.id,
        content: input.content,
        createdAt: new Date(),
      });
    }),
});
