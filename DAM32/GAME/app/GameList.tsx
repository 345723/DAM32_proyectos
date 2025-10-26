import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { API_URL } from '../constants/api';
import { useCachedGames } from '../hooks/useCachedGames';
import { useGameStore } from '../hooks/useGameStore';

export default function GameListScreen() {
  const { games, setGames } = useGameStore();
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const loadGames = async () => {
    setRefreshing(true);
    try {
      const filters = encodeURIComponent(
        JSON.stringify([
          {
            key: 'platform',
            values: [{ value: 'pc' }],
            connection: 'OR',
          },
          {
            key: 'genre',
            values: [{ value: 'action' }],
          },
        ])
      );

      const url = `${API_URL}&filters=${filters}&sort=computed_rating&sort-order=desc`;

      const response = await axios.get(url, {
        headers: {
          'x-api-key': '800bbaf893984d108edc342793a678f3',
        },
      });

      const rawGames = response.data.results || response.data.games || response.data;

      const formattedGames = rawGames.map((g, i) => ({
        id: g.id || i,
        title: g.title || g.name || 'Sin título',
        description: g.description || g.summary || 'Sin descripción',
        author: g.author || 'GameBrain',
        releaseDate: g.releaseDate || new Date().toISOString(),
      }));

      setGames(formattedGames);
      await AsyncStorage.setItem('cachedGames', JSON.stringify(formattedGames));
    } catch (err) {
      console.error('Error al cargar juegos:', err);
      await useCachedGames();
    }
    setRefreshing(false);
  };

  useEffect(() => {
    loadGames();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header gamer */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lista de juegos</Text>
      </View>

      <FlatList
        data={games}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/explore?id=${item.id}`)}
            activeOpacity={0.9}
          >
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
            <Text style={styles.cardMeta}>
              🧑 {item.author} | 📅 {item.releaseDate.slice(0, 10)}
            </Text>
          </TouchableOpacity>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadGames} />
        }
        contentContainerStyle={games.length === 0 && styles.emptyList}
        ListEmptyComponent={
          <View style={styles.emptyList}>
            <Ionicons name="game-controller-outline" size={48} color="#c0c3c9" />
            <Text style={styles.emptyText}>No hay juegos disponibles por ahora.</Text>
          </View>
        }
      />

      {/* Botón flotante para crear nuevo juego */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/modal')}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={28} color="#0f1117" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f1117',
    paddingTop: 16,
    paddingHorizontal: 12,
  },
  header: {
    marginBottom: 12,
    paddingVertical: 12,
    backgroundColor: '#1f2230',
    borderRadius: 12,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00ffcc',
    letterSpacing: 1.2,
  },
  card: {
    backgroundColor: '#1e2638',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#00ffcc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 14,
    color: '#c0c3c9',
    marginBottom: 8,
  },
  cardMeta: {
    fontSize: 12,
    color: '#7a7f87',
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyText: {
    fontSize: 18,
    color: '#7a7f87',
    textAlign: 'center',
    marginTop: 12,
    fontWeight: '500',
  },
  fab: {
    position: 'absolute',
    bottom: 28,
    right: 28,
    backgroundColor: '#00ffcc',
    borderRadius: 32,
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#00ffcc',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
});