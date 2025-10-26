import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

export default function GameCard({ game, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={{ padding: 12, borderBottomWidth: 1 }}>
      <Text style={{ fontWeight: 'bold' }}>{game.title}</Text>
      <Text numberOfLines={2}>{game.description}</Text>
    </TouchableOpacity>
  );
}
