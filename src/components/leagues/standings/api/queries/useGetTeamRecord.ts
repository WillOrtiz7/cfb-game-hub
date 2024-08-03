import { supabase } from "@/supabase/createClient";
import { useQuery } from "@tanstack/react-query";

interface GetTeamRecordResponse {
    id: string;
    losses: number;
    losses_conf: number;
    ties: number;
    ties_conf: number;
    wins: number;
    wins_conf: number;
}

async function getTeamRecord(teamId: string): Promise<GetTeamRecordResponse> {
  const { data, error } = await supabase.from('league_teams')
  .select('id, losses, losses_conf, ties, ties_conf, wins, wins_conf')
  .eq("id", teamId).select().maybeSingle();

  if (error) {
    throw new Error("Error code: " + error.code + "\nFailed to fetch standings");
  }
  
  return data as GetTeamRecordResponse;
 
}

export function useGetTeamRecord(teamId: string) {
  return useQuery({
    queryKey: ["getTeamRecord", teamId],
    queryFn: async () => {
      return getTeamRecord(teamId);
    },
    enabled: !!teamId,
  });
}