import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { Place } from '../types';

interface MapProps {
  selectedPlace: Place | null;
}

export default function MapDisplay({ selectedPlace }: MapProps) {
  const initialRegion: Region = {
    latitude: 3.1342,
    longitude: 101.6861,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectedRegion: Region = selectedPlace ? {
    latitude: selectedPlace.geometry.location.lat,
    longitude: selectedPlace.geometry.location.lng,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  } : initialRegion;

  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map} 
        region={selectedRegion}
        zoomControlEnabled
      >
        {selectedPlace && (
          <Marker
            coordinate={{
              latitude: selectedPlace.geometry.location.lat,
              longitude: selectedPlace.geometry.location.lng,
            }}
            title={selectedPlace.name}
            description={selectedPlace.address}
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  map: {
    width: Dimensions.get('window').width,
    height: '100%',
  },
  placeholderOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  placeholderText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});