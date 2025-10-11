"use server";

import { authActionClient } from "@/lib/safe-action";
import {
  flattenValidationErrors,
  returnValidationErrors,
} from "next-safe-action";
import { z } from "zod";

const profileFieldSchemas = {
  display_name: z.string().min(1).max(50),
  status_message: z.string().max(140),
  avatar_url: z.string(),
} as const;

export type ProfileEditableField = keyof typeof profileFieldSchemas;

const inputSchema = z.discriminatedUnion("key", [
  z.object({
    key: z.literal("display_name"),
    value: profileFieldSchemas.display_name,
  }),
  z.object({
    key: z.literal("status_message"),
    value: profileFieldSchemas.status_message,
  }),
  z.object({
    key: z.literal("avatar_url"),
    value: profileFieldSchemas.avatar_url,
  }),
]);

export const updateProfileField = authActionClient
  .metadata({ actionName: "updateProfileField" })
  .inputSchema(inputSchema, {
    handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve),
  })
  .action(async ({ parsedInput, ctx }) => {
    const { key, value } = parsedInput;
    const { supabase, userId } = ctx;

    const { error } = await supabase
      .from("profiles")
      .update({ [key]: value })
      .eq("id", userId);

    if (error) {
      returnValidationErrors(inputSchema, {
        _errors: [error.message || "Failed to update profile field."],
      });
    }

    return {
      value,
    };
  });
