import { create } from 'zustand';

interface LeagueState {
  leagueId: string | undefined;
  leagueSlug: string | undefined;
  setLeagueId: (leagueId: string) => void;
  setLeagueSlug: (leagueSlug: string) => void;
}

export const useLeagueStore = create<LeagueState>((set) => ({
  leagueId: undefined,
  leagueSlug: undefined,
  setLeagueId: (leagueId) => set({ leagueId }),
  setLeagueSlug: (leagueSlug) => set({ leagueSlug }),
}));