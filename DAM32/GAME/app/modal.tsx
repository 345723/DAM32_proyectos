import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useGameStore } from '../hooks/useGameStore';

export default function GameEditScreen() {
  console.log('Modal cargado');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { addPendingChange, games, setGames } = useGameStore();
  const router = useRouter();

  const handleSave = () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Campos requeridos', 'Por favor completa título y descripción.');
      return;
    }

    const newGame = {
      id: Date.now(),
      title,
      description,
      author: 'Tú',
      releaseDate: new Date().toISOString(),
    };

    setGames([newGame, ...games]);
    addPendingChange({ type: 'create', data: newGame });
    router.dismiss();
  };

  return (
    <View style={styles.container}>

      <TextInput
        style={styles.input}
        placeholder="Título"
        placeholderTextColor="#7a7f87"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.textarea]}
        placeholder="Descripción"
        placeholderTextColor="#7a7f87"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleSave} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Guardar juego</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00ffcc',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#1f2230',
    borderColor: '#00ffcc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    color: '#ffffff',
    fontSize: 16,
  },
  textarea: {
    height: 120,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#00ffcc',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#00ffcc',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  buttonText: {
    color: '#0f1117',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});