import * as z from "zod";

export const SignUpFormSchema = z.object({
  name: z
    .string()
    .min(2, "Title lenght must have at least 2 characters")
    .max(10, "Title length not more that 10 characters"),
  username: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(100, "Description must be at most 100 characters."),
  email: z.email(),
  password: z
    .string()
    .min(8, "Title lenght must have at least 2 characters")
    .max(10, "Title length not more that 10 characters"),
});
