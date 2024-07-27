import { supabase } from "@/supabase/createClient";
import { useQuery } from "@tanstack/react-query";



async function getCurrentYearWeek() {
  const { data, error } = await supabase.from("leagues").select('year, week');
  if (error) {
    throw new Error("Error code: " + error.code + "\nFailed to fetch current year and week");
  }
  return data;
}
export function useGetCurrentYearWeek() {
  return useQuery({
    queryKey: ["getCurrentYearWeek"],
    queryFn: async () => {
      return getCurrentYearWeek();
    },
  });
}
