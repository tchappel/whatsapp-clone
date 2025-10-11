// packages/supabase/src/types.ts
import type {
  Database,
  Enums,
  Tables,
  TablesInsert,
  TablesUpdate,
} from "./database.types";

// Re-export the main generated Database type
export type { Database };

// Optional: alias helper types for easier usage
export type { Enums, Tables, TablesInsert, TablesUpdate };

// 🔥 Convenience helper example (optional)
export type Profile = Tables<"profiles">;
export type ProfileInsert = TablesInsert<"profiles">;
export type ProfileUpdate = TablesUpdate<"profiles">;

export const profileUpdateKeys = [
  "display_name",
  "avatar_url",
  "is_online",
  "last_seen",
  "status_message",
] as const satisfies readonly (keyof ProfileUpdate)[];

export type ProfileUpdateKey = (typeof profileUpdateKeys)[number];
