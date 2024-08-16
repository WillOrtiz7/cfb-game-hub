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
    portrait_id: number;
    position: Database["public"]["Enums"]["commit_position"];
    rank_national: number;
    star_rating: Database["public"]["Enums"]["commit_star_rating"];
    team: Team | null;
    team_id: string | null ;
    year: number;
}

async function getCommits(leagueId?: string, year?: number, teamId?: string, 
  position?: Database["public"]["Enums"]["commit_position"] | "ALL", 
  minStars?: Database["public"]["Enums"]["commit_star_rating"],
  maxStars?: Database["public"]["Enums"]["commit_star_rating"],
): Promise<GetCommitsResponse[]> {
    if (!leagueId) {
        throw new Error("Invalid league");
    }
    let getCommitsQuery = supabase
    .from("commits")
    .select(`
        first_name, 
        id, 
        last_name, 
        portrait_id,
        position, 
        rank_national,
        star_rating, 
        team:league_teams!left(
        id, team_id, 
          team_info:teams!left(id, logo_id, name_abbreviation, primary_color)
        ),
        team_id,
        year`)
    .eq("league_id", leagueId).order("rank_national", { ascending: true });

    if (year) {
      getCommitsQuery = getCommitsQuery.eq("year", year);
    }

    if (teamId && teamId !== "ALL") {
      getCommitsQuery = getCommitsQuery.eq("team_id", teamId);
    }

    if (position && position !== "ALL") {
      getCommitsQuery = getCommitsQuery.eq("position", position);
    }

    if (minStars) {
      getCommitsQuery = getCommitsQuery.gte("star_rating", minStars);
    }

    if (maxStars) {
      getCommitsQuery = getCommitsQuery.lte("star_rating", maxStars);
    }

    const { data, error } = await getCommitsQuery;


  if (error) {
    throw new Error("Error code: " + error.code + "\nFailed to fetch teams");
  }

    // @ts-expect-error-next-line
    return data as GetCommitsResponse[];
}

export function useGetCommits(leagueId?: string, year?: number, teamId?: string, 
  position?: Database["public"]["Enums"]["commit_position"] | "ALL", 
  minStars?: Database["public"]["Enums"]["commit_star_rating"],
  maxStars?: Database["public"]["Enums"]["commit_star_rating"]) {
  return useQuery({
    queryKey: ["getCommits", leagueId, year, teamId, position, minStars, maxStars],
    queryFn: async () => {
      return getCommits(leagueId, year, teamId, position, minStars, maxStars);
    },
  });
}