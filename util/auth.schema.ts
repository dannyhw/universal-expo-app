import { z } from "zod";

export const loginValidationSchema = z.object({
  email: z
    .string()
    .min(1, { message: "You must enter your email" })
    .email({ message: "You must use a valid email" }),
  password: z.string().min(1, { message: "You must enter your password" }),
});

export type LoginFormData = z.infer<typeof loginValidationSchema>;

export const loginResponseSchema = z.object({
  session: z.string().optional(),
  error: z.string().optional(),
});

export const signupValidationSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "You must enter your email" })
      .email({ message: "You must use a valid email" }),
    password: z.string().min(1, { message: "You must enter your password" }),
    confirmPassword: z
      .string()
      .min(1, { message: "You must confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match",
  });

export type SignupFormData = z.infer<typeof signupValidationSchema>;
