import { create } from 'zustand';

interface CommitState {
  isEditMode: boolean;
  setIsEditMode: (isEditMode: boolean) => void;
}

export const useCommitStore = create<CommitState>((set) => ({
    isEditMode: false,
    setIsEditMode: (isEditMode) => set({ isEditMode }),
}));