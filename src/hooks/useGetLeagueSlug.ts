import { useLeagueStore } from "@/zustand/useLeagueStore";
import { useParams } from "@tanstack/react-router";
import { useEffect } from "react";



export function useGetLeagueSlug() {
    const { leagueSlug } = useParams({from: "/leagues/$leagueSlug"});
    const setLeagueSlug = useLeagueStore((state) => state.setLeagueSlug);
  
    useEffect(() => {
      setLeagueSlug(leagueSlug);
    }, [leagueSlug, setLeagueSlug]);
}