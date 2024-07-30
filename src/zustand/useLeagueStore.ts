import { create } from 'zustand';

interface LeagueState {
  leagueId: string | undefined;
  setLeagueId: (leagueId: string) => void;
}

export const useLeagueStore = create<LeagueState>((set) => ({
  leagueId: undefined,
  setLeagueId: (leagueId) => set({ leagueId }),
}));