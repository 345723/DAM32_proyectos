import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';

export default function App() {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [pokemonList, setPokemonList] = useState([]);

  const addPokemon = () => {
    if (!name || !type || !imageUrl) return;

    const newPokemon = {
      id: Date.now(),
      name,
      type,
      imageUrl,
      caught: false,
    };

    setPokemonList([...pokemonList, newPokemon]);
    setName('');
    setType('');
    setImageUrl('');
  };

  const toggleCaught = (id) => {
    setPokemonList((prevList) =>
      prevList.map((p) =>
        p.id === id ? { ...p, caught: !p.caught } : p
      )
    );
  };

  const totalCaught = pokemonList.filter((p) => p.caught).length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokédex Básica</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre del Pokémon"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Tipo del Pokémon"
        value={type}
        onChangeText={setType}
      />
      <TextInput
        style={styles.input}
        placeholder="URL de la imagen"
        value={imageUrl}
        onChangeText={setImageUrl}
      />

      <TouchableOpacity style={styles.addButton} onPress={addPokemon}>
        <Text style={styles.buttonText}>Agregar Pokémon</Text>
      </TouchableOpacity>

      <FlatList
        data={pokemonList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <Text
              style={[
                styles.pokemonName,
                item.caught && styles.caughtText,
              ]}
            >
              {item.name}
            </Text>
            <Text style={styles.pokemonType}>{item.type}</Text>

            <TouchableOpacity
              style={styles.catchButton}
              onPress={() => toggleCaught(item.id)}
            >
              <Text style={styles.buttonText}>
                {item.caught ? 'Liberar' : 'Atrapar'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.footer}>
        <Text>Total registrados: {pokemonList.length}</Text>
        <Text>Total atrapados: {totalCaught}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D32F2F',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#FFF',
  },
  addButton: {
    backgroundColor: '#D32F2F',
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
  },
  catchButton: {
    backgroundColor: '#1976D2',
    padding: 8,
    borderRadius: 20,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  pokemonName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  pokemonType: {
    fontSize: 16,
    color: '#555',
  },
  caughtText: {
    color: 'green',
    textDecorationLine: 'line-through',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
});