import { z } from "zod";

export const loginValidationSchema = z.object({
  email: z
    .string()
    .min(1, { message: "You must enter your email" })
    .email({ message: "You must use a valid email" }),
  password: z.string().min(1, { message: "You must enter your password" }),
});

export type LoginFormData = z.infer<typeof loginValidationSchema>;
