import { supabase } from "@/supabase/createClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface PostGameToScheduleInput {
    awayTeamId: string;
    awayTeamScore: number;
    homeTeamId: string;
    homeTeamScore: number;
    scheduleId?: string;
    week: number;
    year: number;
}

async function postGameToSchedule(formData: PostGameToScheduleInput) {
  const { error } = await supabase.from("schedules")
  .upsert({
    id: formData.scheduleId,
    away_team_id: formData.awayTeamId,
    away_team_score: formData.awayTeamScore,
    game_played: true,
    home_team_id: formData.homeTeamId,
    home_team_score: formData.homeTeamScore,
    league_id: '7b3af6f8-9168-4040-bc92-c45943451e92',
    week: formData.week,
    year: formData.year
  }, { onConflict: 'id' }).select();

  if (error) {
    throw new Error("Error code: " + error.code + "\nFailed to add/edit game to schedule");
  }
}

export function usePostGameToSchedule() {
    const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["postGameToSchedule"],
    mutationFn: async (formData: PostGameToScheduleInput) => {
      return postGameToSchedule(formData);
    },
    onSuccess: () => {
       toast.success("Game added to schedule");
       queryClient.invalidateQueries({ queryKey: ["getSchedules"] });
    },
    onError: (error) => {
       toast.error(error.message);
    },
  });
}
