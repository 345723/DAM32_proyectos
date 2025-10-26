import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useGameStore } from '../hooks/useGameStore';

export default function GameDetailScreen() {
  const { id } = useLocalSearchParams();
  const { games } = useGameStore();
  const game = games.find((g) => g.id.toString() === id);

  if (!game) {
    return (
      <View style={styles.fullScreen}>
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>❌ Juego no encontrado</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.fullScreen}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{game.title}</Text>
        <Text style={styles.description}>{game.description}</Text>
        <Text style={styles.meta}>🧑 Autor: {game.author || 'Desconocido'}</Text>
        <Text style={styles.meta}>📅 Fecha: {game.releaseDate?.slice(0, 10) || 'N/A'}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: '#000000', // fondo negro total
  },
  container: {
    padding: 20,
    backgroundColor: '#0f1117', // fondo interno neón oscuro
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#00ffcc',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#c0c3c9',
    marginBottom: 16,
    lineHeight: 22,
  },
  meta: {
    fontSize: 14,
    color: '#7a7f87',
    marginBottom: 6,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  notFoundText: {
    fontSize: 18,
    color: '#ff4d4d',
    fontWeight: 'bold',
  },
});