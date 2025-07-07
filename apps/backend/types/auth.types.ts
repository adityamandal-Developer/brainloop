import type { loginUserSchema, registerUserSchema } from "validators";
import type z from "zod";

export type type_body_registration = z.infer<typeof registerUserSchema>;
export type type_body_login = z.infer<typeof loginUserSchema>;
