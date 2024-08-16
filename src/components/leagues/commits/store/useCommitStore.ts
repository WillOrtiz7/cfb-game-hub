import { Database } from '@/db/types';
import { create } from 'zustand';

interface CommitState {
  isEditMode: boolean;
  setIsEditMode: (isEditMode: boolean) => void;
  isTableViewMode: boolean;
  setIsTableViewMode: (isTableViewMode: boolean) => void;
  filterYear: number;
  setFilterYear: (year: number) => void;
  filterTeamId: string | undefined;
  setFilterTeamId: (teamId: string | undefined) => void;
  filterPosition: Database["public"]["Enums"]["commit_position"] | undefined;
  setFilterPosition: (position: Database["public"]["Enums"]["commit_position"] | undefined) => void;
  filterMinStars: Database["public"]["Enums"]["commit_star_rating"] | undefined;
  setFilterMinStars: (stars: Database["public"]["Enums"]["commit_star_rating"] | undefined) => void;
  filterMaxStars: Database["public"]["Enums"]["commit_star_rating"] | undefined;
  setFilterMaxStars: (stars: Database["public"]["Enums"]["commit_star_rating"] | undefined) => void;

}

export const useCommitStore = create<CommitState>((set) => ({
    isEditMode: false,
    setIsEditMode: (isEditMode) => set({ isEditMode }),
    isTableViewMode: false,
    setIsTableViewMode: (isTableViewMode) => set({ isTableViewMode }),
    filterYear: 2024,
    setFilterYear: (year) => set({ filterYear: year }),
    filterTeamId: "",
    setFilterTeamId: (teamId) => set({ filterTeamId: teamId }),
    filterPosition: undefined,
    setFilterPosition: (position) => set({ filterPosition: position }),
    filterMinStars: undefined,
    setFilterMinStars: (stars) => set({ filterMinStars: stars }),
    filterMaxStars: undefined,
    setFilterMaxStars: (stars) => set({ filterMaxStars: stars }),
}));