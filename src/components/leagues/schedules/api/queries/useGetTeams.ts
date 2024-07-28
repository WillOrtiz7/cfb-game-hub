import { supabase } from "@/supabase/createClient";
import { useQuery } from "@tanstack/react-query";

interface Team {
  coach_name: string;
  id: string;
  teams: {
    id: string;
    logo_id: number;
    name_nick: string;
    primary_color: string;
  };
}

interface GetTeamsResponse {
  userTeams: Team[];
  cpuTeams: Team[];
}

async function getTeams(): Promise<GetTeamsResponse> {
  const { data, error } = await supabase
    .from("league_teams")
    .select(`
      coach_name,
      id,
      teams(
        id,
        logo_id,
        name_nick,
        primary_color
      )
    `)
    .order('teams(name_nick)', { ascending: true });

  if (error) {
    throw new Error("Error code: " + error.code + "\nFailed to fetch teams");
  }

  const userTeams: Team[] = [];
  const cpuTeams: Team[] = [];

  (data as Team[]).forEach(team => {
    if (team.coach_name === "CPU") {
      cpuTeams.push(team);
    } else {
      userTeams.push(team);
    }
  });

  return { userTeams, cpuTeams };
}

export function useGetTeams() {
  return useQuery({
    queryKey: ["getTeams"],
    queryFn: async () => {
      return getTeams();
    },
  });
}