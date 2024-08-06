import { Database } from "@/db/types";
import { supabase } from "@/supabase/createClient";
import { useQuery } from "@tanstack/react-query";


interface TeamInfo {
    id: string;
    logo_id: number;
    name_abbreviation: string;
    primary_color: string;
  }
  
  interface Team {
    id: string;
    team_id: string;
    team_info: TeamInfo;
  }

export interface GetCommitsResponse {
    first_name: string;
    id: string;
    last_name: string;
    position: Database["public"]["Enums"]["commit_position"];
    star_rating: Database["public"]["Enums"]["commit_star_rating"];
    team: Team | null;
    team_id: string | null ;
}

async function getCommits(leagueId?: string): Promise<GetCommitsResponse[]> {
    if (!leagueId) {
        throw new Error("Invalid league");
    }
    const { data, error } = await supabase
    .from("commits")
    .select(`
        first_name, 
        id, 
        last_name, 
        position, 
        star_rating, 
        team_id,
        team:league_teams!left(
        id, team_id, 
          team_info:teams!left(id, logo_id, name_abbreviation, primary_color)
        )`)
    .eq("league_id", leagueId).order("star_rating", { ascending: false });


  if (error) {
    throw new Error("Error code: " + error.code + "\nFailed to fetch teams");
  }

    // @ts-expect-error-next-line
    return data as GetCommitsResponse[];
}

export function useGetCommits(leagueId?: string) {
  return useQuery({
    queryKey: ["getCommits", leagueId],
    queryFn: async () => {
      return getCommits(leagueId);
    },
  });
}