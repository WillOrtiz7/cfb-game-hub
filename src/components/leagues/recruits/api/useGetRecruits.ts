import { supabase } from "@/supabase/createClient";
import { useQuery } from "@tanstack/react-query";

interface Recruit {
  id: string;
  first_name: string;
  last_name: string;
}

async function getRecruits(): Promise<Recruit[]> {
  const { data } = await supabase.from("recruits").select();
  return data as Recruit[];
}
export function useGetRecruits() {
  return useQuery<Recruit[]>({
    queryKey: ["recruits"],
    queryFn: async () => {
      return getRecruits();
    },
  });
}
