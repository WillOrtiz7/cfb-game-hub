import { supabase } from "@/supabase/createClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateStandingsInput {
    lossesConf: number;
    lossesOverall: number;
    teamId: string;
    tiesConf: number;
    tiesOverall: number;
    winsConf: number;
    winsOverall: number;
}

async function updateStandings(formData: UpdateStandingsInput) {
  const { error } = await supabase.from("league_teams")
  .update({
    losses_conf: formData.lossesConf,
    losses: formData.lossesOverall,
    ties_conf: formData.tiesConf,
    ties: formData.tiesOverall,
    wins_conf: formData.winsConf,
    wins: formData.winsOverall,
  }).eq("id", formData.teamId)

  if (error) {
    throw new Error("Error code: " + error.code + "\nFailed to add/edit game to schedule");
  }
}

export function useUpdateStandings() {
    const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["postGameToSchedule"],
    mutationFn: async (formData: UpdateStandingsInput) => {
      return updateStandings(formData);
    },
    onSuccess: () => {
        // TODO: Add league id in the query key to invalidate the correct standings
       queryClient.invalidateQueries({ queryKey: ["getStandings"] });
       queryClient.invalidateQueries({ queryKey: ["getTeams"] });
    },
   
  });
}
