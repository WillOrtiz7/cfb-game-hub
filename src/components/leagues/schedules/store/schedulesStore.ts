import { create } from 'zustand';

interface SchedulesState {
  isEditMode: boolean;
  setIsEditMode: (isEditMode: boolean) => void;
  

}

export const schedulesStore = create<SchedulesState>((set) => ({
    isEditMode: false,
    setIsEditMode: (isEditMode) => set({ isEditMode }),
}));