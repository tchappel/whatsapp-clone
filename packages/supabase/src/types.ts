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
// Table rows (read operations)
export type Chat = Tables<"chats">;
export type ChatParticipant = Tables<"chat_participants">;
export type Message = Tables<"messages">;
export type MessageStatus = Tables<"message_statuses">;
export type Profile = Tables<"profiles">;
export type StorageCleanupQueue = Tables<"storage_cleanup_queue">;

// Inserts (create operations)
export type ChatInsert = TablesInsert<"chats">;
export type ChatParticipantInsert = TablesInsert<"chat_participants">;
export type MessageInsert = TablesInsert<"messages">;
export type MessageStatusInsert = TablesInsert<"message_statuses">;
export type ProfileInsert = TablesInsert<"profiles">;
export type StorageCleanupQueueInsert = TablesInsert<"storage_cleanup_queue">;

// Updates (update operations)
export type ChatUpdate = TablesUpdate<"chats">;
export type ChatParticipantUpdate = TablesUpdate<"chat_participants">;
export type MessageUpdate = TablesUpdate<"messages">;
export type MessageStatusUpdate = TablesUpdate<"message_statuses">;
export type ProfileUpdate = TablesUpdate<"profiles">;
export type StorageCleanupQueueUpdate = TablesUpdate<"storage_cleanup_queue">;

// Enums
export type ChatRole = Enums<"chat_role">;
export type ChatType = Enums<"chat_type">;
export type MessageDeliveryStatus = Enums<"message_delivery_status">;
