"use server";

import { actionClient } from "@/lib/safe-action";
import { createClient } from "@/lib/supabase/server";
import { returnValidationErrors } from "next-safe-action";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

// Input validation schema
const inputSchema = z.object({
  email: z.email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const login = actionClient
  .inputSchema(inputSchema)
  .action(async ({ parsedInput }) => {
    const { email, password } = parsedInput;

    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (data.user) {
      revalidatePath("/", "layout");
      redirect("/");
    }

    // Fallback error case
    returnValidationErrors(inputSchema, {
      _errors: [error?.message || "Login failed. Please try again."],
    });
  });
