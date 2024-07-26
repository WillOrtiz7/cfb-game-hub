import { supabase } from "@/supabase/createClient";
import { useMutation } from "@tanstack/react-query";



async function postGameToSchedule() {
  const { error } = await supabase.from("schedules").insert({
    away_team_id: 'b4ab18e4-ae72-4e3a-9626-2fb15cb2af10',
    away_team_score: 13,
    game_played: true,
    home_team_id: '943e5aa6-0b8c-4231-b8f5-4efe00834a97',
    home_team_score: 35,
    league_id: '7b3af6f8-9168-4040-bc92-c45943451e92',
    week: 0,
    year: 2024,
  });
  if (error) {
    throw new Error("Error code: " + error.code + "\nFailed to add game to schedule");
  }
}

export function usePostGameToSchedule() {
  return useMutation({
    mutationKey: ["postGameToSchedule"],
    mutationFn: async () => {
      return postGameToSchedule();
    },
    onSuccess: () => {
       
    },
  });
}
