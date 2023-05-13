import { z } from "zod";
const bcrypt = require("bcrypt");
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getUser: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findFirst();
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
      z.object({ id: z.string(), firstName: z.string(), lastName: z.string() })
    )
    .mutation(async ({ input, ctx }) => {
      const updatedUser = await ctx.prisma.user.update({
        where: { id: input.id },
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
        },
      });
      return updatedUser;
    }),
});
