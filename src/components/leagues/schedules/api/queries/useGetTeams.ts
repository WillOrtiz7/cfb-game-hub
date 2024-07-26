import { supabase } from "@/supabase/createClient";
import { useQuery } from "@tanstack/react-query";

export interface Team {
  coach_name: string;
  id: string;
  team: {
    id: string;
    logo_id: number;
    name_nick: string;
    primary_color: string;
  };
}

async function getTeams() {
  const { data, error } = await supabase.from("league_teams").select('coach_name, id, team:teams!inner(id, logo_id, name_nick, primary_color)');
  if (error) {
    throw new Error("Error code: " + error.code + "\nFailed to fetch teams");
  }

  return data as Team[];
}
export function useGetTeams() {
  return useQuery({
    queryKey: ["getTeams"],
    queryFn: async () => {
      return getTeams();
    },
  });
}
