import { supabase } from '@/supabase/createClient';
import { useEffect } from 'react';
import { create } from 'zustand';

interface LeagueState {
  leagueId: string | undefined;
  leagueSlug: string | undefined;
  setLeagueId: (leagueId: string | undefined) => void;
  setLeagueSlug: (leagueSlug: string | undefined) => void;
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

export const useLeagueStore = create<LeagueState>((set) => ({
  leagueId: undefined,
  leagueSlug: getLeagueSlugFromUrl(),
  setLeagueId: (leagueId) => set({ leagueId }),
  setLeagueSlug: (leagueSlug) => set({ leagueSlug }),
}));

// Custom hook to fetch and set the leagueId when leagueSlug changes
export function useInitializeLeagueId() {
  const { leagueSlug, leagueId, setLeagueId, setLeagueSlug } = useLeagueStore();
  console.log('leagueSlug', leagueSlug);

  useEffect(() => {
    const handleUrlChange = async () => {
      const newLeagueSlug = getLeagueSlugFromUrl();
      console.log('newLeagueSlug', newLeagueSlug);
      console.log('leagueSlug', leagueSlug);
      if (newLeagueSlug !== leagueSlug || !leagueId) {
        setLeagueSlug(newLeagueSlug);
        const leagueId = await getLeagueId(newLeagueSlug);
        console.log('setting leagueId', leagueId);
        setLeagueId(leagueId);
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