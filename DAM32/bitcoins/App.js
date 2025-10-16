import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

export default function App() {
  const [data, setData] = useState([]);
  const [offline, setOffline] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const STORAGE_KEY = 'CRYPTO_SIMPLE_CACHE';

  const fetchCryptoSimple = async () => {
    const url =
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin,solana&vs_currencies=usd&include_24hr_change=true';
    const response = await axios.get(url);
    const raw = response.data;

    return Object.entries(raw).map(([id, info]) => ({
      id,
      name: id.charAt(0).toUpperCase() + id.slice(1),
      price: info.usd,
      change: info.usd_24h_change,
    }));
  };

  const getCachedData = async () => {
    try {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      return json ? JSON.parse(json) : null;
    } catch {
      return null;
    }
  };

  const saveCachedData = async (data) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // fallback silently
    }
  };

  const loadData = async () => {
    const netState = await NetInfo.fetch();
    setOffline(!netState.isConnected);

    const cached = await getCachedData();
    if (cached) setData(cached);

    if (netState.isConnected) {
      try {
        const freshData = await fetchCryptoSimple();
        setData(freshData);
        saveCachedData(freshData);
        setError(null);
      } catch (err) {
        setError('Error al obtener datos');
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const renderItem = ({ item }) => {
    const isUp = item.change >= 0;
    return (
      <View style={styles.card}>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        </View>
        <Text style={[styles.change, { color: isUp ? 'green' : 'red' }]}>
          {isUp ? '+' : ''}
          {item.change.toFixed(2)}%
        </Text>
      </View>
    );
  };

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} size="large" />;

  return (
    <SafeAreaView style={styles.container}>
      {offline && <Text style={styles.offline}>Modo offline</Text>}
      {error && <Text style={styles.error}>{error}</Text>}
      <FlatList data={data} keyExtractor={(item) => item.id} renderItem={renderItem} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, backgroundColor: '#fff' },
  offline: { textAlign: 'center', color: 'orange', marginBottom: 10 },
  error: { textAlign: 'center', color: 'red', marginBottom: 10 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  name: { fontSize: 16, fontWeight: 'bold' },
  price: { fontSize: 14, color: '#555' },
  change: { fontSize: 14, fontWeight: 'bold' },
});