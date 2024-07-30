import { supabase } from "@/supabase/createClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpsertGameToScheduleInput {
    awayTeamId: string;
    awayTeamScore: number;
    homeTeamId: string;
    homeTeamScore: number;
    leagueId: string;
    scheduleId?: string;
    week: number;
    year: number;
}

async function upsertGameToSchedule(formData: UpsertGameToScheduleInput) {
  const { error } = await supabase.from("schedules")
  .upsert({
    id: formData.scheduleId,
    away_team_id: formData.awayTeamId,
    away_team_score: formData.awayTeamScore,
    game_played: true,
    home_team_id: formData.homeTeamId,
    home_team_score: formData.homeTeamScore,
    league_id: formData.leagueId,
    week: formData.week,
    year: formData.year
  }, { onConflict: 'id' }).select();

  if (error) {
    throw new Error("Error code: " + error.code + "\nFailed to add/edit game to schedule");
  }
}

export function useUpsertGameToSchedule() {
    const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["postGameToSchedule"],
    mutationFn: async (formData: UpsertGameToScheduleInput) => {
      return upsertGameToSchedule(formData);
    },
    onSuccess: (_data, variables) => {
       queryClient.invalidateQueries({ queryKey: ["getSchedules", variables.year, variables.week, variables.leagueId] });
    },
   
  });
}
