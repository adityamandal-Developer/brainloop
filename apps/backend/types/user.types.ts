import type { updateUserSchema } from "validators";
import type z from "zod";

export type UPDATE_USER = z.infer<typeof updateUserSchema>;
