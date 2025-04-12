import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Place } from '../types';

interface PlaceDetailsProps {
  place: Place;
}

export default function PlaceDetails({ place }: PlaceDetailsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.detail}>
        <Text style={styles.title}>{place.name}</Text>
      </View>
      <Text style={styles.address}>{place.address}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  detail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
});