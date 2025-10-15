"use server";

import { authActionClient } from "@/lib/safe-action";
import { flattenValidationErrors } from "next-safe-action";
import { z } from "zod";

const allowedTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
];

const uploadProfileAvatarInputSchema = z.object({
  file: z
    .file()
    .refine((file) => file.size <= 1024 * 1024, {
      message: "File size must be less than 1MB",
    })
    .refine(
      (file) => {
        return allowedTypes.includes(file.type);
      },
      {
        message: "File must be an image (JPEG, PNG, or WebP)",
      }
    ),
});

export const uploadProfileAvatar = authActionClient
  .metadata({ actionName: "uploadProfileAvatar" })
  .inputSchema(uploadProfileAvatarInputSchema, {
    handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve),
  })
  .action(async ({ parsedInput, ctx }) => {
    const { supabase, userId } = ctx;
    const file = parsedInput.file;

    const ext = file.name.split(".").pop()?.toLowerCase();
    const fileName = `avatar.${ext}`;
    const filePath = `${userId}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) throw uploadError;

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ avatar_path: filePath })
      .eq("id", userId);

    if (updateError) throw updateError;

    return { success: true, filePath };
  });
