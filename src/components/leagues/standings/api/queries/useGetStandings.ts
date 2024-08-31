import { supabase } from "@/supabase/createClient";
import { useQuery } from "@tanstack/react-query";

interface TeamInfo {
    id: string;
    logo_id: number;
    name_abbreviation: string;
  }

  interface Standings {
    id: string;
    losses_total: number;
    losses_conf: number;
    ties_total: number;
    ties_conf: number;
    wins_total: number;
    wins_conf: number;
    year: number;
  }
  
  interface Team {
      id: string;
      coach_name: string;
      standings: Standings;
      team_info: TeamInfo;
  }
  
  interface League {
    id: string;
    display_name: string;
  }
  
  export interface Conference {
    id: string;
    league_id: string;
    logo_url: string | null;
    name: string;
    league: League;
    teams: Team[];
  }
  
  type StandingsResponse = Conference[];

async function getStandings(leagueYear:number | null, leagueId?: string): Promise<StandingsResponse> {
  if (!leagueId) {
    throw new Error("Invalid league");
  }

  if (!leagueYear || leagueYear === null) {
    throw new Error("Invalid year");
  }

  const { data, error } = await supabase
  .from('leagues_conferences')
  .select(`
    id,
    league_id,
    logo_url,
    name,
    league:leagues!leagues_conferences_league_id_fkey (
      display_name,
      id
    ),
    teams:league_teams!inner (
      coach_name,
      id,
      team_info:teams!inner (
        id,
        logo_id,
        name_abbreviation
      ),
      standings:standings!inner (
        id,
        losses_total,
        losses_conf,
        ties_total,
        ties_conf,
        wins_total,
        wins_conf,
        year
      )
    )
  `)
  .eq('league_id', leagueId)
  .eq('teams.standings.year', leagueYear)
  .limit(1, { foreignTable: 'teams.standings'});

  if (error) {
    throw new Error("Error code: " + error.code + "\nFailed to fetch standings");
  }
  // Flatten the structure to ensure each team's standings are directly accessible
  const flattenedData = (data as unknown as StandingsResponse).map(conference => ({
    ...conference,
    teams: conference.teams.map(team => ({
        ...team,
        // @ts-expect-error-next-line 
        standings: team.standings[0], // Ensure standings is a single object
    })).sort((a, b) => {
        if (b.standings.wins_conf !== a.standings.wins_conf) {
            return b.standings.wins_conf - a.standings.wins_conf; // Sort by conference wins
        }
        return b.standings.wins_total - a.standings.wins_total; // Use overall wins as tiebreaker
    }),
}));

return flattenedData;
}

export function useGetStandings(leagueYear: number | null, leagueId?: string) {
  return useQuery({
    queryKey: ["getStandings", leagueYear, leagueId],
    queryFn: async () => {
      return getStandings(leagueYear, leagueId);
    },
  });
}