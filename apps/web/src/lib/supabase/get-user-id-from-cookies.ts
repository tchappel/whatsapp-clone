import { createClient } from "@/lib/supabase/server";
import { User } from "@supabase/supabase-js";

// function to get userId from cookies (server-side) without making extra calls to supabase API
// unsafe for checking if user is authenticated

export async function getUserIdFromCookies(): Promise<User["id"] | null> {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session?.user?.id || null;
}
