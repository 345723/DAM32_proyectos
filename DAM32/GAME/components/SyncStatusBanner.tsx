import React from 'react';
import { Text, View } from 'react-native';
import { useGameStore } from '../hooks/useGameStore';

export default function SyncStatusBanner() {
  const { syncStatus } = useGameStore();

  if (syncStatus === 'idle') return null;

  const statusText = {
    syncing: '🔄 Sincronizando...',
    synced: '✅ Sincronizado',
    error: '❌ Error de red',
  };

  return (
    <View style={{ padding: 8, backgroundColor: '#eee' }}>
      <Text>{statusText[syncStatus]}</Text>
    </View>
  );
}
