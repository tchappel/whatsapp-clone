import { Database, Profile } from "@repo/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js";

export type PublicProfile = Pick<
  Profile,
  | "avatar_url"
  | "display_name"
  | "id"
  | "is_online"
  | "last_seen"
  | "status_message"
>;

export async function getPublicProfile(
  supabase: SupabaseClient<Database>,
  id: Profile["id"]
): Promise<PublicProfile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select(
      "avatar_url, display_name, id, is_online, last_seen, status_message"
    )
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}
