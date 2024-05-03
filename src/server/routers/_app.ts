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
  createItem: procedure
    .input(
      z.strictObject({
        name: z.string(),
      })
    )
    .mutation(async (opts) => {
      const item = await prisma.item.create({
        data: {
          name: opts.input.name,
        },
      });
      return item;
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
