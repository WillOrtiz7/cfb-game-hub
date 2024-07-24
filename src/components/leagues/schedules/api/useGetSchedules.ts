import { supabase } from "@/supabase/createClient";
import { useQuery } from "@tanstack/react-query";



async function getSchedules() {
  const { data, error } = await supabase.from("schedules").select();
  if (error) {
    throw new Error("Error code: " + error.code + "\nFailed to fetch schedules");
  }
  return data;
}
export function useGetSchedules() {
  return useQuery({
    queryKey: ["schedules"],
    queryFn: async () => {
      return getSchedules();
    },
  });
}
