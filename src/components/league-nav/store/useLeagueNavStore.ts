import { create } from 'zustand';
import { LeagueNavTabOptions } from '../constants/leagueNavTabOptions';

interface LeagueNavState {
  selectedTab: LeagueNavTabOptions;
  setSelectedTab: (tab: LeagueNavTabOptions) => void;

}

// Function to get the default tab based on the URL path
const getDefaultTabFromPath = (): LeagueNavTabOptions => {
    const pathSegments = window.location.pathname.split('/');
    const tab = pathSegments[pathSegments.length - 1];
    switch (tab) {
        case 'home':
            return LeagueNavTabOptions.HOME;
        case 'schedules':
            return LeagueNavTabOptions.SCHEDULE;
        case 'standings':
            return LeagueNavTabOptions.STANDINGS;
        case 'commits':
            return LeagueNavTabOptions.COMMITS;
        default:
            return LeagueNavTabOptions.HOME; // Default tab
    }
  };

export const useLeagueNavStore = create<LeagueNavState>((set) => ({
    selectedTab: getDefaultTabFromPath(),
    setSelectedTab: (tab) => set({ selectedTab: tab }),
}));