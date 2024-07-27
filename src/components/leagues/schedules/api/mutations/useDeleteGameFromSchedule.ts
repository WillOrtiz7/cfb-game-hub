import { supabase } from "@/supabase/createClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";



async function deleteGameFromSchedule(scheduleId: string) {
  const response = await supabase.from("schedules").delete().eq('id', scheduleId);
  
  if (response.error) {
    throw new Error("Error code: " + response.error.code + "\nFailed to add game to schedule");
  }
}

export function useDeleteGameFromSchedule() {
    const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteGameFromSchedule"],
    mutationFn: async (scheduleId: string) => {
      return deleteGameFromSchedule(scheduleId);
    },
    onSuccess: () => {
       toast.success("Game deleted from schedule");
       queryClient.invalidateQueries({ queryKey: ["getSchedules"] });
    },
    onError: (error) => {
       toast.error(error.message);
    },
  });
}
