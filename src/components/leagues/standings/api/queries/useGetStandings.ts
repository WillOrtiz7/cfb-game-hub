import { supabase } from "@/supabase/createClient";
import { useQuery } from "@tanstack/react-query";

interface TeamInfo {
    id: string;
    logo_id: number;
    name_abbreviation: string;
  }
  
  interface Team {
    id: string;
    losses: number;
    wins: number;
    coach_name: string;
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

async function getStandings(leagueId?: string): Promise<StandingsResponse> {
  if (!leagueId) {
    throw new Error("Invalid league");
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
      losses,
      wins,
      team_info:teams!inner (
        id,
        logo_id,
        name_abbreviation
        )
      )
    `).eq('league_id', leagueId);

  if (error) {
    throw new Error("Error code: " + error.code + "\nFailed to fetch standings");
  }
  // Sort the teams within each conference by wins in descending order
  const sortedData = (data as StandingsResponse).map(conference => ({
    ...conference,
    teams: conference.teams.sort((a, b) => b.wins - a.wins),
  }));

  return sortedData;
 
}

export function useGetStandings(leagueId?: string) {
  return useQuery({
    queryKey: ["getStandings", leagueId],
    queryFn: async () => {
      return getStandings(leagueId);
    },
  });
}