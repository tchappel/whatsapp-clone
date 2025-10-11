"use server";

import { actionClient } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const logout = actionClient
  .metadata({ actionName: "logout" })
  .action(async ({ ctx }) => {
    const { supabase } = ctx;

    const { error } = await supabase.auth.signOut();
    if (error) {
      // You could throw an ActionError or let redirect handle it
      redirect("/error");
    }

    revalidatePath("/", "layout");
    redirect("/auth");
  });
