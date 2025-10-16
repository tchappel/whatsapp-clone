export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      chat_participants: {
        Row: {
          chat_id: string
          deleted_at: string | null
          id: string
          is_deleted: boolean
          joined_at: string
          last_visible_message_created_at: string | null
          role: Database["public"]["Enums"]["chat_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          chat_id: string
          deleted_at?: string | null
          id?: string
          is_deleted?: boolean
          joined_at?: string
          last_visible_message_created_at?: string | null
          role?: Database["public"]["Enums"]["chat_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          chat_id?: string
          deleted_at?: string | null
          id?: string
          is_deleted?: boolean
          joined_at?: string
          last_visible_message_created_at?: string | null
          role?: Database["public"]["Enums"]["chat_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_participants_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chats"
            referencedColumns: ["id"]
          },
        ]
      }
      chats: {
        Row: {
          chat_type: Database["public"]["Enums"]["chat_type"]
          created_at: string
          created_by: string
          id: string
          metadata: Json | null
          updated_at: string
        }
        Insert: {
          chat_type?: Database["public"]["Enums"]["chat_type"]
          created_at?: string
          created_by: string
          id?: string
          metadata?: Json | null
          updated_at?: string
        }
        Update: {
          chat_type?: Database["public"]["Enums"]["chat_type"]
          created_at?: string
          created_by?: string
          id?: string
          metadata?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      contacts: {
        Row: {
          alias: string
          contact_id: string
          created_at: string
          id: string
          owner_id: string
          updated_at: string
        }
        Insert: {
          alias?: string
          contact_id: string
          created_at?: string
          id?: string
          owner_id: string
          updated_at?: string
        }
        Update: {
          alias?: string
          contact_id?: string
          created_at?: string
          id?: string
          owner_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      message_statuses: {
        Row: {
          id: string
          message_id: string
          recipient_id: string
          status: Database["public"]["Enums"]["message_delivery_status"]
          status_updated_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          message_id: string
          recipient_id: string
          status?: Database["public"]["Enums"]["message_delivery_status"]
          status_updated_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          message_id?: string
          recipient_id?: string
          status?: Database["public"]["Enums"]["message_delivery_status"]
          status_updated_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_statuses_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "chat_last_message"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_statuses_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_statuses_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "visible_messages_view"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          chat_id: string
          client_message_id: string | null
          content: string | null
          content_json: Json | null
          created_at: string
          id: string
          is_edited: boolean
          reply_to: string | null
          sender_id: string
          updated_at: string
        }
        Insert: {
          chat_id: string
          client_message_id?: string | null
          content?: string | null
          content_json?: Json | null
          created_at?: string
          id?: string
          is_edited?: boolean
          reply_to?: string | null
          sender_id: string
          updated_at?: string
        }
        Update: {
          chat_id?: string
          client_message_id?: string | null
          content?: string | null
          content_json?: Json | null
          created_at?: string
          id?: string
          is_edited?: boolean
          reply_to?: string | null
          sender_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_reply_to_fkey"
            columns: ["reply_to"]
            isOneToOne: false
            referencedRelation: "chat_last_message"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_reply_to_fkey"
            columns: ["reply_to"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_reply_to_fkey"
            columns: ["reply_to"]
            isOneToOne: false
            referencedRelation: "visible_messages_view"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_path: string | null
          created_at: string
          display_name: string
          id: string
          is_online: boolean
          last_seen: string
          status_message: string
          updated_at: string
        }
        Insert: {
          avatar_path?: string | null
          created_at?: string
          display_name?: string
          id?: string
          is_online?: boolean
          last_seen?: string
          status_message?: string
          updated_at?: string
        }
        Update: {
          avatar_path?: string | null
          created_at?: string
          display_name?: string
          id?: string
          is_online?: boolean
          last_seen?: string
          status_message?: string
          updated_at?: string
        }
        Relationships: []
      }
      storage_cleanup_queue: {
        Row: {
          bucket: string
          created_at: string
          file_path: string
          id: string
          processed: boolean
        }
        Insert: {
          bucket: string
          created_at?: string
          file_path: string
          id?: string
          processed?: boolean
        }
        Update: {
          bucket?: string
          created_at?: string
          file_path?: string
          id?: string
          processed?: boolean
        }
        Relationships: []
      }
    }
    Views: {
      chat_last_message: {
        Row: {
          chat_id: string | null
          client_message_id: string | null
          content: string | null
          content_json: Json | null
          created_at: string | null
          id: string | null
          is_edited: boolean | null
          reply_to: string | null
          sender_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_reply_to_fkey"
            columns: ["reply_to"]
            isOneToOne: false
            referencedRelation: "chat_last_message"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_reply_to_fkey"
            columns: ["reply_to"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_reply_to_fkey"
            columns: ["reply_to"]
            isOneToOne: false
            referencedRelation: "visible_messages_view"
            referencedColumns: ["id"]
          },
        ]
      }
      visible_messages_view: {
        Row: {
          chat_id: string | null
          client_message_id: string | null
          content: string | null
          content_json: Json | null
          created_at: string | null
          id: string | null
          is_edited: boolean | null
          reply_to: string | null
          sender_id: string | null
          updated_at: string | null
        }
        Insert: {
          chat_id?: string | null
          client_message_id?: string | null
          content?: string | null
          content_json?: Json | null
          created_at?: string | null
          id?: string | null
          is_edited?: boolean | null
          reply_to?: string | null
          sender_id?: string | null
          updated_at?: string | null
        }
        Update: {
          chat_id?: string | null
          client_message_id?: string | null
          content?: string | null
          content_json?: Json | null
          created_at?: string | null
          id?: string | null
          is_edited?: boolean | null
          reply_to?: string | null
          sender_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_reply_to_fkey"
            columns: ["reply_to"]
            isOneToOne: false
            referencedRelation: "chat_last_message"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_reply_to_fkey"
            columns: ["reply_to"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_reply_to_fkey"
            columns: ["reply_to"]
            isOneToOne: false
            referencedRelation: "visible_messages_view"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      search_profiles: {
        Args: { query: string }
        Returns: {
          avatar_path: string
          display_name: string
          id: string
          similarity_score: number
        }[]
      }
    }
    Enums: {
      chat_role: "member" | "admin"
      chat_type: "direct" | "group"
      message_delivery_status: "sent" | "delivered" | "seen"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      chat_role: ["member", "admin"],
      chat_type: ["direct", "group"],
      message_delivery_status: ["sent", "delivered", "seen"],
    },
  },
} as const
