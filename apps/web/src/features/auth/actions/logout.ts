"use server";

import { actionClient } from "@/lib/safe-action";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const logout = actionClient.action(async () => {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();
  if (error) {
    // You could throw an ActionError or let redirect handle it
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/auth");
});
