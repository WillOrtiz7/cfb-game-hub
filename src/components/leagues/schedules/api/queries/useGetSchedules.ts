import { supabase } from "@/supabase/createClient";
import { useQuery } from "@tanstack/react-query";

interface Team {
    team: {
        
        id: string;
        logo_id: number;
        name_abbreviation: string;
        name_nick: string;
        primary_color: string;
    };
    coach_name: string;
    id: string;
    team_id: string;
    wins: number;
    losses: number;
    ties: number;
}

export interface ScheduleItem {
    id: string;
    game_played: boolean;
    home_team: Team;
    away_team: Team;
    home_team_score: number;
    away_team_score: number;
}

async function getSchedules(leagueId: string, year: number, week: number): Promise<ScheduleItem[]> {
    const { data, error } = await supabase.from("schedules").select(`
        created_at, id, game_played, home_team_score, away_team_score,
        home_team:league_teams!schedules_home_team_id_fkey (
          coach_name, id, team_id, wins, losses, ties,
          team:teams!inner(id, logo_id, name_abbreviation, name_nick, primary_color)
        ),
        away_team:league_teams!schedules_away_team_id_fkey (
          coach_name, id, team_id, wins, losses, ties,
          team:teams!inner(id, logo_id, name_abbreviation, name_nick, primary_color)
        )
      `).eq("year", year).eq("week", week).eq("league_id", leagueId).order("created_at", { ascending: true });
  if (error) {
    throw new Error("Error code: " + error.code + "\nFailed to fetch schedules");
  }
  return data as ScheduleItem[];
}
export function useGetSchedules(leagueId: string, year: number, week: number) {
  return useQuery({
    queryKey: ["getSchedules", leagueId, year, week],
    queryFn: async () => {
      return getSchedules(leagueId, year, week);
    },
  });
}
