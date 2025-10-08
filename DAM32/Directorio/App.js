import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });
  }, []);

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
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#FFFFFF' },
  card: { padding: 15, marginBottom: 12, backgroundColor: '#2D2D44', borderRadius: 10, elevation: 3 },
  name: { fontSize: 18, fontWeight: '700', marginBottom: 8, color: '#FFFFFF' },
  detail: { fontSize: 14, color: '#B0BEC5', marginBottom: 4 },
});

export default App;