import { z } from "zod";

export const registerUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  password: z.string().min(8),
});

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
