import { create } from 'zustand';

interface StandingsState {
  isEditMode: boolean;
  setIsEditMode: (isEditMode: boolean) => void;
  

}

export const standingsStore = create<StandingsState>((set) => ({
    isEditMode: false,
    setIsEditMode: (isEditMode) => set({ isEditMode }),
}));