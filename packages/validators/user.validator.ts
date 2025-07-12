import { z } from "zod";

export const prompt = z.object({
  type: z.enum(["ask", "follow_up"]),
  prompt: z.string().min(1),
  answer: z.string().array(),
  chatId: z.string(),
});

export const chatSchema = z.object({
  userId: z.string(),
  prompts: prompt,
});

export const updateUserSchema = z.object({
  name: z.string().min(2),
  chat: chatSchema,
});
