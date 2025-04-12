import React, { useState, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Ionicons } from '@expo/vector-icons';
import { Place } from '../types';
import 'react-native-get-random-values';
import { GOOGLE_MAPS_API_KEY } from '@env';

interface SearchBarProps {
  onPlaceSelect: (place: Place) => void;
  onHistoryPress: () => void;
}

export default function SearchBar({ onPlaceSelect, onHistoryPress }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const autocompleteRef = useRef<any>(null);

  const handlePlaceSelect = (data: any, details: any) => {
    try {
      if (details) {
        const selectedPlace: Place = {
          place_id: data.place_id,
          name: details.name || data.description,
          address: details.formatted_address || data.description,
          geometry: {
            location: {
              lat: details.geometry.location.lat,
              lng: details.geometry.location.lng
            }
          }
        };
        
        onPlaceSelect(selectedPlace);
        setIsFocused(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearSearch = () => {
    if (autocompleteRef.current) {
      autocompleteRef.current.clear();
      autocompleteRef.current.blur();
    }
    setIsFocused(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <GooglePlacesAutocomplete
            ref={autocompleteRef}
            placeholder="Search for a place"
            onPress={handlePlaceSelect}
            fetchDetails={true}
            query={{
              key: GOOGLE_MAPS_API_KEY,
              language: 'en'
            }}
            textInputProps={{
              onFocus: () => setIsFocused(true),
              onBlur: () => setIsFocused(false),
              clearButtonMode: 'never',
            }}
            styles={{
              textInput: styles.input,
              listView: styles.listView,
              row: styles.row,
              poweredContainer: { display: 'none' }, 
              separator: styles.separator,
            }}
            renderLeftButton={() => (
              <View style={styles.leftButton}>
                 {!isFocused ? (
                  <TouchableOpacity 
                    onPress={onHistoryPress} 
                    style={styles.historyButton}
                  >
                    <Ionicons name="time-outline" size={24} color="#666" />
                  </TouchableOpacity>
                  ) : (
                    <TouchableOpacity 
                      onPress={handleClearSearch} 
                      style={styles.closeButton}
                    >
                      <Ionicons name="close" size={24} color="#666" />
                    </TouchableOpacity>
                  )}
                  <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
              </View>
            )}
            enablePoweredByContainer={false}
            debounce={300}
            keyboardShouldPersistTaps="handled"
            listViewDisplayed={isFocused}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    width: '100%',
    position: 'absolute'
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    padding: 8,
  },
  leftButton: {
    flexDirection: 'row',
  },
  historyButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginRight: 8,
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginRight: 8,
  },
  inputContainer: {
    flex: 1,
    zIndex: 3,
  },
  searchIcon: {
    padding: 10,
    zIndex: 3,
  },
  input: {
    height: 44,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    paddingLeft: 5,
    fontSize: 16,
  },
  listView: {
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 4,
  },
  row: {
    padding: 13,
    height: 44,
    fontSize: 16,
  },
  separator: {
height: 1, backgroundColor: '#eee'
  }
});