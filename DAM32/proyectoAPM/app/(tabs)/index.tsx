import { Image, ScrollView, StyleSheet, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../../assets/images/solecito.jpg')}
        style={styles.image}
      />
      <Text style={styles.bio}>
        hola mundo
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  bio: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    color: '#555',
  },
});

