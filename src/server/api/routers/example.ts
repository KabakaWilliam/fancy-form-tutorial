import { z } from "zod";
import bcrypt from "bcrypt";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getUser: publicProcedure
    .input(
      z.object({ userID: z.string().or(z.array(z.string())).or(z.undefined()) })
    )
    .query(({ input, ctx }) => {
      if (typeof input.userID == "string") {
        const res = ctx.prisma.user.findUnique({
          where: { id: input.userID },
        });
        return res;
      }
      return null;
    }),

  getAllUsers: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),

  createUser: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        country: z.string(),
        password: z.string(),
        age: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(input.password, salt);
      return await ctx.prisma.user.create({
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          country: input.country,
          password: hash,
          age: input.age,
        },
      });
    }),
  updateUser: publicProcedure
    .input(
      z.object({
        id: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        country: z.string(),
        password: z.string(),
        age: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const updatedUser = await ctx.prisma.user.update({
        where: { id: input.id },
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          country: input.country,
          password: input.password,
          age: input.age,
        },
      });
      return updatedUser;
    }),
});
