"use server";

import { actionClient } from "@/lib/safe-action";
import {
  flattenValidationErrors,
  returnValidationErrors,
} from "next-safe-action";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const signupSchema = z.object({
  email: z.email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const signup = actionClient
  .metadata({ actionName: "signup" })
  .inputSchema(signupSchema, {
    handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve),
  })
  .action(async ({ parsedInput, ctx }) => {
    const { email, password } = parsedInput;
    const { supabase } = ctx;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (data.user) {
      revalidatePath("/", "layout");
      redirect("/");
    }

    returnValidationErrors(signupSchema, {
      _errors: [error?.message || "Signup failed. Please try again."],
    });
  });
