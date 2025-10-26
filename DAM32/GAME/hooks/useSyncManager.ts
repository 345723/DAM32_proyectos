import { useGameStore } from './useGameStore';

export const useSyncManager = async () => {
  const { pendingChanges, clearPendingChanges, setSyncStatus } = useGameStore.getState();
  setSyncStatus('syncing');

  try {
    for (const change of pendingChanges) {
      console.log('Syncing:', change); // Aquí iría la lógica real
    }
    clearPendingChanges();
    setSyncStatus('synced');
  } catch (err) {
    setSyncStatus('error');
  }
};
