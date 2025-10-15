"use server";

import { authActionClient } from "@/lib/safe-action";
import { flattenValidationErrors } from "next-safe-action";
import { z } from "zod";

const updateProfileFieldInputSchema = z.discriminatedUnion("key", [
  z.object({
    key: z.literal("display_name"),
    value: z.string().min(1).max(50),
  }),
  z.object({
    key: z.literal("status_message"),
    value: z.string().max(140),
  }),
  z.object({
    key: z.literal("avatar_path"),
    value: z.string(),
  }),
]);

export const updateProfileField = authActionClient
  .metadata({ actionName: "updateProfileField" })
  .inputSchema(updateProfileFieldInputSchema, {
    handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve),
  })
  .action(async ({ parsedInput, ctx }) => {
    const { key, value } = parsedInput;
    const { supabase, userId } = ctx;

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ [key]: value })
      .eq("id", userId);

    if (updateError) throw updateError;

    return {
      success: true,
      value,
    };
  });
