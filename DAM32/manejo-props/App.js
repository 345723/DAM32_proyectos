import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function App() {
  const [counter, setCounter] = useState(0);
  const [inputValue, setInputValue] = useState("");

  const handleSetInitial = () => {
    const value = parseInt(inputValue) || 0;
    setCounter(value);
  };

  const handleIncrement = () => {
    setCounter(counter + 1);
  };

  const handleDecrement = () => {
    setCounter(counter - 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contador con valor inicial</Text>
      <Text style={styles.counter}>Contador: {counter}</Text>

      <TextInput
        style={styles.input}
        placeholder="Ingresar valor inicial"
        keyboardType="numeric"
        value={inputValue}
        onChangeText={setInputValue}
      />

      <TouchableOpacity style={styles.button} onPress={handleSetInitial}>
        <Text style={styles.buttonText}>Valor inicial</Text>
      </TouchableOpacity>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleIncrement}>
          <Text style={styles.buttonText}>Aumentar valor</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleDecrement}>
          <Text style={styles.buttonText}>Disminuir valor</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  counter: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 20,
    color: '#00796B',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 10,
    width: 200,
    textAlign: 'center',
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#00897B', 
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 8, 
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
});
