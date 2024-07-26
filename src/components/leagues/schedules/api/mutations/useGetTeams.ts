import { supabase } from "@/supabase/createClient";
import { useQuery } from "@tanstack/react-query";



async function getTeams() {
  const { data, error } = await supabase.from("league_teams").select('*');
  if (error) {
    throw new Error("Error code: " + error.code + "\nFailed to fetch teams");
  }
  console.log(data);
  return data;
}
export function useGetTeams() {
  return useQuery({
    queryKey: ["getTeams"],
    queryFn: async () => {
      return getTeams();
    },
  });
}
