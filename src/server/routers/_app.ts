import { z } from "zod";
import { procedure, router } from "../trpc";

export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}, ${opts.ctx.auth.userId}`,
      };
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
