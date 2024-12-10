import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { db, Comment } from "astro:db";

export const server = {
  addComment: defineAction({
    accept: "form",
    input: z.object({
      postSlug: z.string(),
      name: z.string().min(1, "Name is required"),
      email: z.string().email("Valid email is required"),
      message: z.string().min(1, "Comment cannot be empty"),
    }),
    handler: async ({ postSlug, name, email, message }) => {
      const comment = await db
        .insert(Comment)
        .values({
          postSlug,
          name,
          email,
          message,
          createdAt: new Date(),
        })
        .returning();

      return comment[0];
    },
  }),
};
