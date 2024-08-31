import { supabase } from '@/supabase/createClient';
import { useEffect } from 'react';
import { create } from 'zustand';

interface LeagueState {
  leagueId: string | undefined;
  leagueSlug: string | undefined;
  leagueWeek: number | null;
  leagueYear: number | null;
  setLeagueId: (leagueId: string | undefined) => void;
  setLeagueSlug: (leagueSlug: string | undefined) => void;
  setLeagueWeek: (leagueWeek: number | null) => void;
  setLeagueYear: (leagueYear: number | null) => void;
}

function getLeagueSlugFromUrl(): string | undefined {
  const urlParts = window.location.pathname.split('/');
  const leagueSlugIndex = urlParts.indexOf('leagues') + 1;
  return urlParts[leagueSlugIndex];
}

async function getLeagueId(leagueSlug: string | undefined): Promise<string | undefined> {
  
  if (!leagueSlug) {
    return undefined;
  }
  const response  = await supabase.from("leagues").select("id").eq("slug_name", leagueSlug).single();
  
  if (response.data?.id) {
    return response.data.id;
  } else {
    // handle error
    return undefined;
  }
}

async function getCurrentYearWeek(leagueId?: string) {
  if (!leagueId){
    throw new Error("Invalid league");
  }
  const { data, error } = await supabase.from("leagues").select('year, week').eq('id', leagueId).single();
  if (error) {
    throw new Error("Error code: " + error.code + "\nFailed to fetch current year and week");
  }
  return data;
}

export const useLeagueStore = create<LeagueState>((set) => ({
  leagueId: undefined,
  leagueSlug: getLeagueSlugFromUrl(),
  leagueYear: null,
  leagueWeek: null,
  setLeagueId: (leagueId) => set({ leagueId }),
  setLeagueSlug: (leagueSlug) => set({ leagueSlug }),
  setLeagueWeek: (leagueWeek) => set({ leagueWeek }),
  setLeagueYear: (leagueYear) => set({ leagueYear }),
}));

// Custom hook to fetch and set the leagueId when leagueSlug changes
export function useInitializeLeagueId() {
  const { leagueSlug, leagueId, setLeagueId, setLeagueSlug, setLeagueWeek, setLeagueYear } = useLeagueStore();

  useEffect(() => {
    const handleUrlChange = async () => {
      const newLeagueSlug = getLeagueSlugFromUrl();
      if (newLeagueSlug !== leagueSlug || !leagueId) {
        setLeagueSlug(newLeagueSlug);
        const leagueId = await getLeagueId(newLeagueSlug);
        setLeagueId(leagueId);
        const { year, week } = await getCurrentYearWeek(leagueId);
        setLeagueYear(year);
        setLeagueWeek(week);
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('pushstate', handleUrlChange);
    window.addEventListener('replacestate', handleUrlChange);

    // Initial fetch
    handleUrlChange();

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('pushstate', handleUrlChange);
      window.removeEventListener('replacestate', handleUrlChange);
    };
  }, [leagueSlug, leagueId, setLeagueId, setLeagueSlug]);
}