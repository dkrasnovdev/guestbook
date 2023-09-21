import { TRPCError } from "@trpc/server";
import { and, desc, eq } from "drizzle-orm";
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
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
      }),
    )
    .mutation(async ({ input, ctx: { session, db } }) => {
      if (!session?.user || !session?.user.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });
      }

      const entry = await db
        .select()
        .from(entries)
        .where(eq(entries.id, input.id));

      if (!entry[0]) {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      }

      if (entry[0].userId !== session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
        });
      }

      return await db
        .delete(entries)
        .where(
          and(eq(entries.id, input.id), eq(entries.userId, session.user.id)),
        );
    }),
});
