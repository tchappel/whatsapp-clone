"use server";

import { authActionClient } from "@/lib/safe-action";
import { flattenValidationErrors } from "next-safe-action";
import { z } from "zod";

const inputSchema = z.object({
  filePath: z.string(),
});

export const deleteProfileAvatar = authActionClient
  .metadata({ actionName: "deleteProfileAvatar" })
  .inputSchema(inputSchema, {
    handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve),
  })
  .action(async ({ parsedInput, ctx }) => {
    const { supabase, userId } = ctx;
    const { filePath } = parsedInput;

    const { error: deleteError } = await supabase.storage
      .from("avatars")
      .remove([filePath]);

    if (deleteError) throw deleteError;

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ avatar_path: null })
      .eq("id", userId);

    if (updateError) throw updateError;

    return { success: true, filePath };
  });
