import { supabase } from "@/supabase/createClient";
import { useQuery } from "@tanstack/react-query";


interface GetHighlightsResponse {
    id: string;
    schedule_id: string;
    title?: string;
    url: string;
}

async function getHighlights(scheduleId: string): Promise<GetHighlightsResponse[]> {
  const { data, error } = await supabase
    .from("highlights")
    .select(`
      id,
      schedule_id,
      title,
      url
    `).eq("schedule_id", scheduleId)

  if (error) {
    throw new Error("Error code: " + error.code + "\nFailed to fetch teams");
  }

    return data as GetHighlightsResponse[];
}

export function useGetHighlights(scheduleId: string) {
  return useQuery({
    queryKey: ["getHighlights", scheduleId],
    queryFn: async () => {
      return getHighlights(scheduleId);
    },
  });
}