import { z } from 'zod';
import { baseProcedure, createTRPCRouter, protectedProcedure } from '../init';
import { TRPCError } from '@trpc/server';
import { auth } from '@clerk/nextjs/server';
export const appRouter = createTRPCRouter({
  hello: protectedProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query(async (opts) => {

        return {
            greeting: `hello ${opts.input.text} ${JSON.stringify(opts.ctx.user)} `,
        };
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
