import { Database } from "@/db/types";
import { supabase } from "@/supabase/createClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpsertCommitInput {
    commitId?: string;
    firstName: string;
    lastName: string;
    leagueId: string;
    position: Database["public"]["Enums"]["commit_position"];
    rankNational: number;
    starRating: Database["public"]["Enums"]["commit_star_rating"];
    teamId: string;
    year: number;
}

async function upsertCommit(formData: UpsertCommitInput) {
  const { error } = await supabase.from("commits")
  .upsert({
    id: formData.commitId,
    first_name: formData.firstName,
    last_name: formData.lastName,
    league_id: formData.leagueId,
    portrait_id: Math.floor(Math.random() * 8) + 1,
    position: formData.position,
    rank_national: formData.rankNational,
    star_rating: formData.starRating,
    team_id: formData.teamId,
    year: formData.year
  }, { onConflict: 'id' }).select();

  if (error) {
    throw new Error("Error code: " + error.code + "\nFailed to add/edit commit");
  }
}

export function useUpsertCommit() {
    const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["upsertCommit"],
    mutationFn: async (formData: UpsertCommitInput) => {
      return upsertCommit(formData);
    },
    onSuccess: (_data, variables) => {
       queryClient.invalidateQueries({ queryKey: ["getCommits", variables.leagueId] });
    },
   
  });
}
