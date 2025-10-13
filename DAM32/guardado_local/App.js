import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PREFERENCE_KEY = 'offline_preference';
const USER_DATA_KEY = 'user_data';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);

  useEffect(() => {
    loadPreference();
  }, []);

  const loadPreference = async () => {
    try {
      const value = await AsyncStorage.getItem(PREFERENCE_KEY);
      if (value === 'true') {
        setOfflineMode(true);
        const storedUsers = await AsyncStorage.getItem(USER_DATA_KEY);
        if (storedUsers) {
          setUsers(JSON.parse(storedUsers));
        } else {
          setUsers([]);
        }
        setLoading(false);
      } else {
        fetchUsers();
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'No se pudo cargar la preferencia. Conéctate a internet nuevamente para continuar.'
      );
      fetchUsers();
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
      await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(response.data));
      await AsyncStorage.setItem(PREFERENCE_KEY, 'true');
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => {
    const address = item.address || {};
    const company = item.company || {};
    return (
      <View style={styles.card}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.detail}>👤 Nombre_Usuario: {item.username}</Text>
        <Text style={styles.detail}>📞 Teléfono: {item.phone}</Text>
        <Text style={styles.detail}>✉️ Email: {item.email}</Text>
        <Text style={styles.detail}>🌐 Sitio_Web: {item.website}</Text>
        <Text style={styles.detail}>🏢 Compañía: {company.name}</Text>
        <Text style={styles.detail}>
          🏠 Dirección: {address.street}, {address.suite}, {address.city}, ZIP {address.zipcode}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Directorio de Usuarios</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#00BCD4" />
      ) : users.length === 0 ? (
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Text style={{ color: '#FFCDD2', fontSize: 16, textAlign: 'center' }}>
            No se encontraron datos para mostrar.
          </Text>
          <Text style={{ color: '#B0BEC5', fontSize: 14, textAlign: 'center', marginTop: 8 }}>
            Es posible que estés en modo offline y aún no se hayan guardado datos localmente,
            o que haya ocurrido un error al recuperar la información.
          </Text>
        </View>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#1E1E2F' },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  card: {
    padding: 15,
    marginBottom: 12,
    backgroundColor: '#2D2D44',
    borderRadius: 10,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    color: '#FFFFFF',
  },
  detail: {
    fontSize: 14,
    color: '#B0BEC5',
    marginBottom: 4,
  },
});

export default App;