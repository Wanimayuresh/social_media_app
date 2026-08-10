import { z } from "zod";

export const updateProfileSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(2, "Username must be at least 2 characters")
      .max(15, "Username must not exceed 15 characters")
      .optional(),
    bio: z
      .string()
      .trim()
      .max(200, "Bio must not exceed 200 characters")
      .optional(),
    avatarUrl: z
      .url("Avatar URL must be a valid URL")
      .nullable()
      .optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;
