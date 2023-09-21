import { entriesRouter } from "./routers/entries";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  checkhealth: publicProcedure.query(() => {
    return "Healthy";
  }),
  entries: entriesRouter,
});

export type AppRouter = typeof appRouter;
