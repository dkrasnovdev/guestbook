import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  checkhealth: publicProcedure.query(() => {
    return "Healthy"
  })
});

export type AppRouter = typeof appRouter;
