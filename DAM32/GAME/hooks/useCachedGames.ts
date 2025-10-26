import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGameStore } from './useGameStore';

export const useCachedGames = async () => {
  const cached = await AsyncStorage.getItem('cachedGames');
  if (cached) {
    useGameStore.getState().setGames(JSON.parse(cached));
  }
};
