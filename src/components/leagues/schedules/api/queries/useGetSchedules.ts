import { supabase } from "@/supabase/createClient";
import { QueryData } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

const getSchedulesQuery = (year: number, week: number, leagueId: string) => 
  supabase.from("schedules").select(`
    created_at, id, game_played, home_team_score, away_team_score,
    home_team:league_teams!schedules_home_team_id_fkey (
      coach_name, id, team_id, wins, losses, ties,
      team:teams!inner(id, logo_id, name_abbreviation, name_nick, primary_color),
      standings:standings(id, wins_total, losses_total, ties_total, year)
    ),
    away_team:league_teams!schedules_away_team_id_fkey (
      coach_name, id, team_id, wins, losses, ties,
      team:teams!inner(id, logo_id, name_abbreviation, name_nick, primary_color),
      standings:standings(id, wins_total, losses_total, ties_total, year)
    )
  `).eq("year", year).eq("week", week).eq("league_id", leagueId)
    .eq("home_team.standings.year", year)
    .eq("away_team.standings.year", year)
    .order("created_at", { ascending: true });

export type GetSchedulesResponse = QueryData<ReturnType<typeof getSchedulesQuery>>;

async function getSchedules(year: number, week: number, leagueId?: string) {
  if (!leagueId) {
    throw new Error("Invalid league");
  }

  const { data, error } = await getSchedulesQuery(year, week, leagueId);

  if (error) {
    throw new Error("Error code: " + error.code + "\nFailed to fetch schedules");
  }

  if (!data) {
    throw new Error("No schedules found");
  }

  const schedules: GetSchedulesResponse = data;
  return schedules;
}

export function useGetSchedules(year: number, week: number, leagueId?: string) {
  return useQuery({
    queryKey: ["getSchedules", year, week, leagueId],
    queryFn: async () => {
      return getSchedules(year, week, leagueId);
    },
  });
}