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
      commits: {
        Row: {
          created_at: string
          first_name: string
          id: string
          last_name: string
          league_id: string
          portrait_id: number | null
          position: Database["public"]["Enums"]["commit_position"]
          rank_national: number
          star_rating: Database["public"]["Enums"]["commit_star_rating"]
          team_id: string
          year: number
        }
        Insert: {
          created_at?: string
          first_name: string
          id?: string
          last_name: string
          league_id: string
          portrait_id?: number | null
          position: Database["public"]["Enums"]["commit_position"]
          rank_national: number
          star_rating: Database["public"]["Enums"]["commit_star_rating"]
          team_id: string
          year: number
        }
        Update: {
          created_at?: string
          first_name?: string
          id?: string
          last_name?: string
          league_id?: string
          portrait_id?: number | null
          position?: Database["public"]["Enums"]["commit_position"]
          rank_national?: number
          star_rating?: Database["public"]["Enums"]["commit_star_rating"]
          team_id?: string
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "recruits_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "leagues"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recruits_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "league_teams"
            referencedColumns: ["id"]
          },
        ]
      }
      highlights: {
        Row: {
          created_at: string
          id: string
          schedule_id: string | null
          title: string | null
          url: string
        }
        Insert: {
          created_at?: string
          id?: string
          schedule_id?: string | null
          title?: string | null
          url: string
        }
        Update: {
          created_at?: string
          id?: string
          schedule_id?: string | null
          title?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "highlights_schedule_id_fkey"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "schedules"
            referencedColumns: ["id"]
          },
        ]
      }
      league_teams: {
        Row: {
          coach_name: string
          conference_id: string | null
          created_at: string
          id: string
          league_id: string
          losses: number
          losses_conf: number
          team_id: string
          ties: number
          ties_conf: number
          wins: number
          wins_conf: number
        }
        Insert: {
          coach_name?: string
          conference_id?: string | null
          created_at?: string
          id?: string
          league_id: string
          losses?: number
          losses_conf?: number
          team_id: string
          ties?: number
          ties_conf?: number
          wins?: number
          wins_conf?: number
        }
        Update: {
          coach_name?: string
          conference_id?: string | null
          created_at?: string
          id?: string
          league_id?: string
          losses?: number
          losses_conf?: number
          team_id?: string
          ties?: number
          ties_conf?: number
          wins?: number
          wins_conf?: number
        }
        Relationships: [
          {
            foreignKeyName: "league_teams_conference_id_fkey"
            columns: ["conference_id"]
            isOneToOne: false
            referencedRelation: "leagues_conferences"
            referencedColumns: ["id"]
          },
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
          week: number
          year: number
        }
        Insert: {
          created_at?: string
          display_name: string
          id?: string
          slug_name: string
          week?: number
          year?: number
        }
        Update: {
          created_at?: string
          display_name?: string
          id?: string
          slug_name?: string
          week?: number
          year?: number
        }
        Relationships: []
      }
      leagues_conferences: {
        Row: {
          created_at: string
          id: string
          league_id: string
          logo_url: string | null
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          league_id: string
          logo_url?: string | null
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          league_id?: string
          logo_url?: string | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "leagues_conferences_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "leagues"
            referencedColumns: ["id"]
          },
        ]
      }
      role_permissions: {
        Row: {
          id: number
          permission: Database["public"]["Enums"]["app_permission"]
          role: Database["public"]["Enums"]["app_role"]
        }
        Insert: {
          id?: number
          permission: Database["public"]["Enums"]["app_permission"]
          role: Database["public"]["Enums"]["app_role"]
        }
        Update: {
          id?: number
          permission?: Database["public"]["Enums"]["app_permission"]
          role?: Database["public"]["Enums"]["app_role"]
        }
        Relationships: []
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
      standings: {
        Row: {
          created_at: string
          id: string
          losses_conf: number
          losses_total: number
          team_id: string
          ties_conf: number
          ties_total: number
          wins_conf: number
          wins_total: number
          year: number
        }
        Insert: {
          created_at?: string
          id?: string
          losses_conf?: number
          losses_total?: number
          team_id: string
          ties_conf?: number
          ties_total?: number
          wins_conf?: number
          wins_total?: number
          year: number
        }
        Update: {
          created_at?: string
          id?: string
          losses_conf?: number
          losses_total?: number
          team_id?: string
          ties_conf?: number
          ties_total?: number
          wins_conf?: number
          wins_total?: number
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "standings_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "league_teams"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          created_at: string
          id: string
          logo_id: number
          name_abbreviation: string
          name_mascot: string
          name_nick: string
          name_school: string
          primary_color: string
        }
        Insert: {
          created_at?: string
          id?: string
          logo_id: number
          name_abbreviation: string
          name_mascot: string
          name_nick: string
          name_school: string
          primary_color: string
        }
        Update: {
          created_at?: string
          id?: string
          logo_id?: number
          name_abbreviation?: string
          name_mascot?: string
          name_nick?: string
          name_school?: string
          primary_color?: string
        }
        Relationships: []
      }
      user_league_roles: {
        Row: {
          id: number
          league_id: string
          role: Database["public"]["Enums"]["app_role"]
          team_id: string | null
          user_id: string
        }
        Insert: {
          id?: number
          league_id: string
          role: Database["public"]["Enums"]["app_role"]
          team_id?: string | null
          user_id: string
        }
        Update: {
          id?: number
          league_id?: string
          role?: Database["public"]["Enums"]["app_role"]
          team_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_league_roles_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "leagues"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_league_roles_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "league_teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_league_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          display_name: string | null
          id: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          id: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
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
      get_league_id_from_schedule: {
        Args: {
          p_schedule_id: string
        }
        Returns: string
      }
      is_user_authorized_for_this_action: {
        Args: {
          p_user_id: string
          p_league_id: string
          p_permission: Database["public"]["Enums"]["app_permission"]
        }
        Returns: boolean
      }
    }
    Enums: {
      app_permission: "schedules.delete" | "highlights.delete"
      app_role: "admin" | "coach" | "visitor"
      commit_position:
        | "ATH"
        | "QB"
        | "HB"
        | "WR"
        | "TE"
        | "OT"
        | "OG"
        | "C"
        | "DE"
        | "DT"
        | "OLB"
        | "MLB"
        | "CB"
        | "FS"
        | "SS"
        | "K"
        | "P"
      commit_star_rating: "1" | "2" | "3" | "4" | "5"
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
