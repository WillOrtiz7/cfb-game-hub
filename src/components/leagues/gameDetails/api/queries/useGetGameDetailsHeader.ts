import { supabase } from "@/supabase/createClient";
import { QueryData } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";



const getGameDetailsHeaderQuery = (scheduleId: string, year: number | undefined) => {
  if (!year) {
    throw new Error("Invalid year");
  }
  return supabase
    .from("schedules")
    .select(
      `
        id, game_played, home_team_score, away_team_score, year,
        home_team:league_teams!schedules_home_team_id_fkey (
          coach_name, id, team_id,
          team:teams!inner(id, logo_id, name_abbreviation, name_nick, primary_color),
          standings:standings(id, losses_total, ties_total, wins_total, year)
        ),
        away_team:league_teams!schedules_away_team_id_fkey (
          coach_name, id, team_id,
          team:teams!inner(id, logo_id, name_abbreviation, name_nick, primary_color),
          standings:standings(id, losses_total, ties_total, wins_total, year)
        )
      `
    )
    .eq("id", scheduleId)
    .eq("home_team.standings.year", year)
    .eq("away_team.standings.year", year)
    .single();
}
export type GetGameDetailsHeaderResponse = QueryData<ReturnType<typeof getGameDetailsHeaderQuery>>;


// We have to get the year of the game first so we can get the team standings from the correct year
const getGameDetailsYearQuery = (scheduleId: string) => {
  return supabase
    .from("schedules")
    .select("year")
    .eq("id", scheduleId)
    .single();
};

async function getGameDetailsHeader(
  scheduleId: string
) {
  const { data: schedule, error: scheduleError } = await getGameDetailsYearQuery(scheduleId);
  if (scheduleError) {
    throw new Error("Error code: " + scheduleError.code + "\nFailed to fetch schedule");
  }

  const { data, error } = await getGameDetailsHeaderQuery(scheduleId, schedule?.year);

  if (error) {
    throw new Error("Error code: " + error.code + "\nFailed to fetch teams");
  }

  if (!data) {
    throw new Error("No teams found");
  }

  const gameDetails: GetGameDetailsHeaderResponse = data;
  return gameDetails;
}
export function useGetGameDetailsHeader(scheduleId: string) {
  return useQuery({
    queryKey: ["getGameDetailsHeader", scheduleId],
    queryFn: async () => {
      return getGameDetailsHeader(scheduleId);
    },
  });
}
