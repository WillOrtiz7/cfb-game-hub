import { supabase } from "@/supabase/createClient";
import { useQuery } from "@tanstack/react-query";



async function getCurrentYearWeek(leagueId?: string) {
  if (!leagueId){
    throw new Error("Invalid league");
  }
  const { data, error } = await supabase.from("leagues").select('year, week').eq('id', leagueId).single();
  if (error) {
    throw new Error("Error code: " + error.code + "\nFailed to fetch current year and week");
  }
  return data;
}
export function useGetCurrentYearWeek(leagueId?: string) {
  return useQuery({
    queryKey: ["getCurrentYearWeek", leagueId],
    queryFn: async () => {
      return getCurrentYearWeek(leagueId);
    },
  });
}
