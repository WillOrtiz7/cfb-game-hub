import { Database } from "@/db/types";
import { supabase } from "@/supabase/createClient";
import { useQuery } from "@tanstack/react-query";


export interface GetRecruitsResponse {
    first_name: string;
    id: string;
    last_name: string;
    position: Database["public"]["Enums"]["recruit_positions"];
    star_rating: Database["public"]["Enums"]["recruit_star_ratings"];
    team_id: string;
}

async function getRecruits(leagueId?: string): Promise<GetRecruitsResponse[]> {
    if (!leagueId) {
        throw new Error("Invalid league");
    }
    const { data, error } = await supabase
    .from("recruits")
    .select(`first_name, id, last_name, position, star_rating, team_id`)
    .eq("league_id", leagueId);


  if (error) {
    throw new Error("Error code: " + error.code + "\nFailed to fetch teams");
  }

    return data as GetRecruitsResponse[];
}

export function useGetRecruits(leagueId?: string) {
  return useQuery({
    queryKey: ["getRecruits", leagueId],
    queryFn: async () => {
      return getRecruits(leagueId);
    },
  });
}