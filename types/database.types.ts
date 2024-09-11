export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      contributor: {
        Row: {
          created_at: string
          custom_price: number | null
          id: string
          ticket_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          custom_price?: number | null
          id?: string
          ticket_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          custom_price?: number | null
          id?: string
          ticket_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "contributor_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "ticket"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contributor_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      house: {
        Row: {
          admin: string
          created_at: string
          id: string
          name: string
          password: string
          pending_delete: string | null
        }
        Insert: {
          admin?: string
          created_at?: string
          id?: string
          name: string
          password: string
          pending_delete?: string | null
        }
        Update: {
          admin?: string
          created_at?: string
          id?: string
          name?: string
          password?: string
          pending_delete?: string | null
        }
        Relationships: []
      }
      ticket: {
        Row: {
          amount: number
          cancelled: boolean
          created_at: string
          description: string | null
          house_id: string
          id: string
          join_date: string
          pay_date: string
          title: string
          user_id: string
        }
        Insert: {
          amount?: number
          cancelled?: boolean
          created_at?: string
          description?: string | null
          house_id: string
          id?: string
          join_date: string
          pay_date: string
          title: string
          user_id?: string
        }
        Update: {
          amount?: number
          cancelled?: boolean
          created_at?: string
          description?: string | null
          house_id?: string
          id?: string
          join_date?: string
          pay_date?: string
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_house_id_fkey"
            columns: ["house_id"]
            isOneToOne: false
            referencedRelation: "house"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ticket_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      user: {
        Row: {
          ai_usage: number
          created_at: string
          expo_push_token: string | null
          firstName: string | null
          house_id: string | null
          id: string
          lastName: string | null
          tier: number
          venmo: string | null
        }
        Insert: {
          ai_usage?: number
          created_at?: string
          expo_push_token?: string | null
          firstName?: string | null
          house_id?: string | null
          id?: string
          lastName?: string | null
          tier?: number
          venmo?: string | null
        }
        Update: {
          ai_usage?: number
          created_at?: string
          expo_push_token?: string | null
          firstName?: string | null
          house_id?: string | null
          id?: string
          lastName?: string | null
          tier?: number
          venmo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_ticket: {
        Args: {
          ticket_id: string
        }
        Returns: {
          id: string
          title: string
          description: string
          created_at: string
          pay_date: string
          amount: number
          cancelled: boolean
          status: Database["public"]["Enums"]["ticket_status_enum"]
          contributors: Json
        }[]
      }
      get_tickets: {
        Args: {
          house_id: string
          page: number
        }
        Returns: {
          id: string
          title: string
          description: string
          created_at: string
          pay_date: string
          amount: number
          cancelled: boolean
          status: Database["public"]["Enums"]["ticket_status_enum"]
          contributors: Json
        }[]
      }
    }
    Enums: {
      contributor_status_enum:
        | "Declined"
        | "Refunded"
        | "Paid"
        | "Resolved"
        | "Pending"
      ticket_status_enum: "Closed" | "Open" | "Late" | "Pending Refund"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
