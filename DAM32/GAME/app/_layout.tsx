import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1f2230',
        },
        headerTitleStyle: {
          color: '#00ffcc',
          fontSize: 22,
          fontWeight: 'bold',
          letterSpacing: 1.2,
        },
        headerTintColor: '#00ffcc',
      }}
    >
      <Stack.Screen
        name="GameList"
        options={{
          title: '🎮 Inicio',
        }}
      />
      <Stack.Screen
        name="explore"
        options={{
          title: '🕹️ Detalles del juego',
        }}
      />
      <Stack.Screen
        name="modal"
        options={{
          presentation: 'modal',
          title: '➕ Nuevo juego',
        }}
      />
    </Stack>
  );
}