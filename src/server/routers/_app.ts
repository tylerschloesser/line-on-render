import { z } from "zod";
import { procedure, router } from "../trpc";
import prisma from "../prisma";

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
  listItems: procedure.query(() => prisma.item.findMany()),
});

// export type definition of API
export type AppRouter = typeof appRouter;
