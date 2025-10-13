"use server";

import { authActionClient } from "@/lib/safe-action";
import { randomUUID } from "crypto";
import {
  flattenValidationErrors,
  returnValidationErrors,
} from "next-safe-action";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const inputSchema = z.object({
  file: z.file(),
});

export const uploadAvatar = authActionClient
  .metadata({ actionName: "uploadAvatar" })
  .inputSchema(inputSchema, {
    handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve),
  })
  .action(async ({ parsedInput, ctx }) => {
    const { supabase, userId } = ctx;
    const file = parsedInput.file;

    const uuid = randomUUID();
    const timestamp = Date.now();
    const ext = file.name.split(".").pop();
    const fileName = `${uuid}_${timestamp}_avatar.${ext}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) {
      returnValidationErrors(inputSchema, {
        _errors: [uploadError.message ?? "Error uploading image"],
      });
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(filePath);

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ avatar_url: publicUrl })
      .eq("id", userId);

    if (updateError) {
      returnValidationErrors(inputSchema, {
        _errors: [
          updateError.message ?? "Could not save avatar url in profile",
        ],
      });
    }

    revalidatePath("/profile");
  });
