import { supabase } from "@/supabase/createClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateWeekInput {
    leagueId: string;
    week: number;
    year: number;
}

async function updateWeek(formData: UpdateWeekInput) {
    const { error } = await supabase
    .from('leagues')
    .update({ week: formData.week, year: formData.year })
    .eq('id', formData.leagueId);

  if (error) {
    throw new Error("Error code: " + error.code + "\nFailed to add/edit game to schedule");
  }
}

export function useUpdateWeek() {
    const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateWeek"],
    mutationFn: async (formData: UpdateWeekInput) => {
      return updateWeek(formData);
    },
    onSuccess: (_data, variables) => {
       queryClient.invalidateQueries({ queryKey: ["getCurrentYearWeek", variables.leagueId] });
    },
   
  });
}
