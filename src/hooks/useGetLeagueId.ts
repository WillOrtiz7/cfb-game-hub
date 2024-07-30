import { supabase } from "@/supabase/createClient";
import { useLeagueStore } from "@/zustand/useLeagueStore";
import { useParams } from "@tanstack/react-router";
import { useEffect } from "react";



export function useGetLeagueId() {
    const { leagueSlug } = useParams({from: "/leagues/$leagueSlug"});
    const setLeagueId = useLeagueStore((state) => state.setLeagueId);
  
    useEffect(() => {
      async function getLeagueId() {
        const response  = await supabase.from("leagues").select("id").eq("slug_name", leagueSlug).single();
        
        if (response.data?.id) {
          setLeagueId(response.data.id);
        } else {
          // handle error
          setLeagueId("");
        }
      }
      getLeagueId();
    }, [leagueSlug, setLeagueId]);
}