import { supabase } from "@/supabase/createClient";
import { useQuery } from "@tanstack/react-query";



async function getRecruits() {
  const { data } = await supabase.from("recruits").select();
  return data;
}
export function useGetRecruits() {
  return useQuery({
    queryKey: ["recruits"],
    queryFn: async () => {
      return getRecruits();
    },
  });
}
