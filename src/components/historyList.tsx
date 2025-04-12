import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Place } from '../types';

interface HistoryListProps {
  history: Place[];
  onItemSelect: (place: Place) => void;
}

export default function HistoryList({ history, onItemSelect }: HistoryListProps) {
  const renderEmptyState = () => {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="time-outline" size={40} color="#999" />
        <Text style={styles.emptyText}>No search history yet</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Search History</Text>
      <FlatList
        data={history.slice().reverse()}
        keyExtractor={(item) => item.place_id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.historyItem}
            onPress={() => onItemSelect(item)}
          >
            <Ionicons name="time-outline" size={20} color="#666" style={styles.historyIcon} />
            <View>
              <Text style={styles.historyTitle}>{item.name}</Text>
              <Text style={styles.historyAddress}>{item.address}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={renderEmptyState}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  historyIcon: {
    marginRight: 12,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  historyAddress: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 10,
  },
});