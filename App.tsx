import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { Place } from './src/types';
import { getSearchHistory, saveSearchHistory } from './src/utils/storage';
import SearchBar from './src/components/searchBar';
import HistoryList from './src/components/historyList';
import MapDisplay from './src/components/mapDisplay';
import PlaceDetails from './src/components/placesDetail';

export default function App() {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [searchHistory, setSearchHistory] = useState<Place[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  useEffect(() => {
    loadSearchHistory();
  }, []);

  const loadSearchHistory = async (): Promise<void> => {
    const history = await getSearchHistory();
    setSearchHistory(history);
  };

  const handlePlaceSelect = async (place: Place): Promise<void> => {
    setSelectedPlace(place);
    setShowHistory(false);
    
    if (!searchHistory.some(item => item.place_id === place.place_id)) {
      const updatedHistory = [...searchHistory, place];
      setSearchHistory(updatedHistory);
      await saveSearchHistory(updatedHistory);
    }
  };

  const handleHistoryItemSelect = (place: Place): void => {
    setSelectedPlace(place);
    setShowHistory(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SearchBar 
        onPlaceSelect={handlePlaceSelect}
        onHistoryPress={() => setShowHistory(!showHistory)}
      />
      
      {showHistory ? (
        <HistoryList 
          history={searchHistory}
          onItemSelect={handleHistoryItemSelect}
        />
      ) : (
        <>
          <MapDisplay selectedPlace={selectedPlace} />
          {selectedPlace && <PlaceDetails place={selectedPlace} />}
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});