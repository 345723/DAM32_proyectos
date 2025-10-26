import { create } from 'zustand';

// Define el tipo de cada juego
export type Game = {
  id: number;
  title: string;
  description: string;
  author?: string;
  releaseDate?: string;
};

// Define el tipo del store
type GameStore = {
  games: Game[];
  pendingChanges: { type: string; data: Game }[];
  syncStatus: 'idle' | 'syncing' | 'synced' | 'error';
  setGames: (games: Game[]) => void;
  addPendingChange: (change: { type: string; data: Game }) => void;
  clearPendingChanges: () => void;
  setSyncStatus: (status: 'idle' | 'syncing' | 'synced' | 'error') => void;
};

// Crea el store con tipos
export const useGameStore = create<GameStore>((set) => ({
  games: [],
  pendingChanges: [],
  syncStatus: 'idle',
  setGames: (games) => set({ games }),
  addPendingChange: (change) =>
    set((state) => ({ pendingChanges: [...state.pendingChanges, change] })),
  clearPendingChanges: () => set({ pendingChanges: [] }),
  setSyncStatus: (status) => set({ syncStatus: status }),
}));
