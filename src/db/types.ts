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
      league_teams: {
        Row: {
          coach_name: string | null
          created_at: string
          id: string
          league_id: string
          losses: number | null
          team_id: string
          ties: number | null
          wins: number | null
        }
        Insert: {
          coach_name?: string | null
          created_at?: string
          id?: string
          league_id: string
          losses?: number | null
          team_id: string
          ties?: number | null
          wins?: number | null
        }
        Update: {
          coach_name?: string | null
          created_at?: string
          id?: string
          league_id?: string
          losses?: number | null
          team_id?: string
          ties?: number | null
          wins?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "league_teams_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "leagues"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "league_teams_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      leagues: {
        Row: {
          created_at: string
          display_name: string
          id: string
          slug_name: string
          week: number | null
          year: number | null
        }
        Insert: {
          created_at?: string
          display_name: string
          id?: string
          slug_name: string
          week?: number | null
          year?: number | null
        }
        Update: {
          created_at?: string
          display_name?: string
          id?: string
          slug_name?: string
          week?: number | null
          year?: number | null
        }
        Relationships: []
      }
      recruits: {
        Row: {
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          league_id: string
          position: string | null
        }
        Insert: {
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          league_id: string
          position?: string | null
        }
        Update: {
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          league_id?: string
          position?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recruits_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "leagues"
            referencedColumns: ["id"]
          },
        ]
      }
      schedules: {
        Row: {
          away_team_id: string
          away_team_score: number
          created_at: string
          game_played: boolean
          game_rating: number | null
          home_team_id: string
          home_team_score: number
          id: string
          league_id: string
          week: number
          year: number
        }
        Insert: {
          away_team_id: string
          away_team_score?: number
          created_at?: string
          game_played?: boolean
          game_rating?: number | null
          home_team_id: string
          home_team_score?: number
          id?: string
          league_id: string
          week: number
          year: number
        }
        Update: {
          away_team_id?: string
          away_team_score?: number
          created_at?: string
          game_played?: boolean
          game_rating?: number | null
          home_team_id?: string
          home_team_score?: number
          id?: string
          league_id?: string
          week?: number
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "schedules_away_team_id_fkey"
            columns: ["away_team_id"]
            isOneToOne: false
            referencedRelation: "league_teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schedules_home_team_id_fkey"
            columns: ["home_team_id"]
            isOneToOne: false
            referencedRelation: "league_teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schedules_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "leagues"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          created_at: string
          id: string
          logo_id: number | null
          name_abbreviation: string | null
          name_mascot: string | null
          name_nick: string | null
          name_school: string | null
          primary_color: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          logo_id?: number | null
          name_abbreviation?: string | null
          name_mascot?: string | null
          name_nick?: string | null
          name_school?: string | null
          primary_color?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          logo_id?: number | null
          name_abbreviation?: string | null
          name_mascot?: string | null
          name_nick?: string | null
          name_school?: string | null
          primary_color?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
