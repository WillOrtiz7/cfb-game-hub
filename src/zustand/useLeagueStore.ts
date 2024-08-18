import { create } from 'zustand';

interface LeagueState {
  leagueId: string | undefined;
  leagueSlug: string | undefined;
  setLeagueId: (leagueId: string | undefined) => void;
  setLeagueSlug: (leagueSlug: string | undefined) => void;
}

export const useLeagueStore = create<LeagueState>((set) => ({
  leagueId: undefined,
  leagueSlug: undefined,
  setLeagueId: (leagueId) => set({ leagueId }),
  setLeagueSlug: (leagueSlug) => set({ leagueSlug }),
}));