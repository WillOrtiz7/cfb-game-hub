import { create } from 'zustand';

interface CommitState {
  isEditMode: boolean;
  setIsEditMode: (isEditMode: boolean) => void;
  filterYear: number;
  setFilterYear: (year: number) => void;
  filterTeamId: string;
    setFilterTeamId: (teamId: string) => void;
}

export const useCommitStore = create<CommitState>((set) => ({
    isEditMode: false,
    setIsEditMode: (isEditMode) => set({ isEditMode }),
    filterYear: 2024,
    setFilterYear: (year) => set({ filterYear: year }),
    filterTeamId: "",
    setFilterTeamId: (teamId) => set({ filterTeamId: teamId }),
}));