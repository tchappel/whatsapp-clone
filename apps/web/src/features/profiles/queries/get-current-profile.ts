import { Database, Profile } from "@repo/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js";

export type CurrentProfile = Pick<
  Profile,
  | "avatar_path"
  | "created_at"
  | "display_name"
  | "id"
  | "is_online"
  | "last_seen"
  | "status_message"
>;

export async function getCurrentProfile(
  supabase: SupabaseClient<Database>,
  id: Profile["id"]
): Promise<CurrentProfile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select(
      "avatar_path, created_at, display_name, id, is_online, last_seen, status_message"
    )
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}
