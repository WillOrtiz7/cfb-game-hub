import { supabase } from "@/supabase/createClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";



async function deleteCommit(commitId: string) {
  const response = await supabase.from("commits").delete().eq('id', commitId);
  
  if (response.error) {
    throw new Error("Error code: " + response.error.code + "\nFailed to add game to schedule");
  }
}

export function useDeleteCommit() {
    const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteCommit"],
    mutationFn: async (commitId: string) => {
      return deleteCommit(commitId);
    },
    onSuccess: () => {
       toast.success("Commit deleted");
       queryClient.invalidateQueries({ queryKey: ["getCommits"] });
    },
    onError: (error) => {
       toast.error(error.message);
    },
  });
}
