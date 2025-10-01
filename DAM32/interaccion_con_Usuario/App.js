import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  Platform,
} from 'react-native';

const RegistrationScreen = () => {
  // 1. Estados para los datos básicos del formulario
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 2. Estados para la Fecha de Nacimiento
  const [birthDateObject, setBirthDateObject] = useState(new Date()); // Valor real (objeto Date)
  const [birthDateText, setBirthDateText] = useState('');             // Valor para mostrar en la interfaz (string)
  const [showDatePicker, setShowDatePicker] = useState(false);       // Controla la visibilidad del Picker

  // Función de ayuda para formatear el objeto Date a texto (DD/MM/AAAA)
  const formatDateForDisplay = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Función que maneja el cambio de fecha en el selector
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || birthDateObject;

    // Oculta el picker si es iOS (en Android se cierra por defecto al seleccionar)
    if (Platform.OS === 'ios') {
      setShowDatePicker(false);
    }

    if (currentDate) {
      setBirthDateObject(currentDate); // Guarda el objeto Date
      setBirthDateText(formatDateForDisplay(currentDate)); // Guarda el texto formateado
    }
  };

  // Función para mostrar el picker
  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  // 3. Función principal de validación y registro
  const handleRegister = () => {
    // Validación de campos vacíos (usando birthDateText para verificar si se seleccionó)
    if (!nombre || !correo || !birthDateText || !password || !confirmPassword) {
      Alert.alert('Error de Validación', 'Por favor, completa todos los campos.');
      return;
    }

    // Validación de contraseñas y otros... (aquí iría tu lógica avanzada)
    if (password !== confirmPassword) {
      Alert.alert('Error de Contraseña', 'Las contraseñas no coinciden. Por favor, revísalas.');
      return;
    }

    // Registro exitoso
    Alert.alert(
      '¡Registro Exitoso! 🎉',
      `Bienvenido, ${nombre}. Tu fecha de nacimiento registrada es: ${birthDateText}`
    );

  };

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Nueva Cuenta</Text>

      {/* Campo: Nombre */}
      <TextInput
        style={styles.input}
        placeholder="Nombre Completo"
        value={nombre}
        onChangeText={setNombre}
        autoCapitalize="words"
      />

      {/* Campo: Correo Electrónico */}
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Campo: Fecha de Nacimiento (Usando TouchableOpacity para abrir el picker) */}
      <TouchableOpacity
        style={styles.dateInputContainer}
        onPress={showDatepicker}
      >
        <Text style={[
            styles.dateInputText,
            !birthDateText && styles.placeholderText // Estilo de placeholder si está vacío
        ]}>
          {birthDateText || "Fecha de Nacimiento (DD/MM/AAAA)"}
        </Text>
      </TouchableOpacity>
      
      {/* DatePicker Component (Solo se renderiza si showDatePicker es true) */}
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={birthDateObject} // Usa el objeto Date para el valor inicial
          mode={'date'}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChangeDate}
          maximumDate={new Date()} 
        />
      )}

      {/* Campo: Contraseña */}
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Campo: Confirmar Contraseña */}
      <TextInput
        style={styles.input}
        placeholder="Confirmar Contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      {/* Botón de Registro */}
      <TouchableOpacity
        style={styles.registerButton}
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>Registrar Cuenta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 30, backgroundColor: '#f5f5f5' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, color: '#333', textAlign: 'center' },
  input: {
    height: 50, borderColor: '#ccc', borderWidth: 1, borderRadius: 8,
    marginBottom: 15, paddingHorizontal: 15, backgroundColor: '#fff', fontSize: 16,
  },
  registerButton: {
    backgroundColor: '#4CAF50', paddingVertical: 15, borderRadius: 8,
    marginTop: 20, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25, shadowRadius: 3.84,
  },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  dateInputContainer: {
    height: 50, borderColor: '#ccc', borderWidth: 1, borderRadius: 8,
    marginBottom: 15, paddingHorizontal: 15, backgroundColor: '#fff',
    justifyContent: 'center',
  },
  dateInputText: {
    fontSize: 16,
    color: '#333',
  },
  placeholderText: {
    color: '#999',
  }
});

export default RegistrationScreen;