
import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import styles from './styles';

export default function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState('');

  const handleOperation = (type) => {
  const a = parseFloat(num1);
  const b = parseFloat(num2);

  if (isNaN(a) || isNaN(b)) {
    setResult('Ingresa ambos números');
    return;
  }

  switch (type) {
    case 'sum':
      setResult((a + b).toString());
      break;
    case 'subtract':
      setResult((a - b).toString());
      break;
    case 'multiply':
      setResult((a * b).toString());
      break;
    case 'divide':
      setResult(b !== 0 ? (a / b).toString() : 'No se puede dividir por 0');
      break;
    default:
      setResult('Operación inválida');
  }
};
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora</Text>

      {/* Pantalla resultado */}
      <View style={styles.resultBox}>
        <Text style={styles.resultText}>{result || '—'}</Text>
      </View>

      {/* Inputs */}
      <TextInput
        style={styles.input}
        placeholder="Número 1"
        keyboardType="numeric"
        value={num1}
        onChangeText={setNum1}
      />
      <TextInput
        style={styles.input}
        placeholder="Número 2"
        keyboardType="numeric"
        value={num2}
        onChangeText={setNum2}
      />

      {/* Botones */}
      <View style={styles.buttonsGrid}>
        <TouchableOpacity style={[styles.button, styles.blue]} onPress={() => handleOperation('sum')}>
          <Text style={styles.buttonText}>➕</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.purple]} onPress={() => handleOperation('subtract')}>
          <Text style={styles.buttonText}>➖</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.green]} onPress={() => handleOperation('multiply')}>
          <Text style={styles.buttonText}>✖</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.red]} onPress={() => handleOperation('divide')}>
          <Text style={styles.buttonText}>➗</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
