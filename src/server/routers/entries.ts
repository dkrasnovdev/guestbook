import { desc } from "drizzle-orm";

import { db } from "~/server/db";
import { entries } from "~/server/db/schema";
import { publicProcedure, router } from "~/server/trpc";

export const entriesRouter = router({
  get: publicProcedure.query(() => {
    return db.select().from(entries).orderBy(desc(entries.createdAt));
  }),
});
