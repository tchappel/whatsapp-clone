"use server";

import { actionClient } from "@/lib/safe-action";
import { createClient } from "@/lib/supabase/server";
import { returnValidationErrors } from "next-safe-action";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

// Input validation schema
const signupSchema = z.object({
  email: z.email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const signup = actionClient
  .inputSchema(signupSchema)
  .action(async ({ parsedInput }) => {
    const { email, password } = parsedInput;

    const supabase = await createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (data.user) {
      revalidatePath("/", "layout");
      redirect("/");
    }

    // Fallback error case
    returnValidationErrors(signupSchema, {
      _errors: [error?.message || "Signup failed. Please try again."],
    });
  });
