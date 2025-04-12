import AsyncStorage from '@react-native-async-storage/async-storage';
import { Place } from '../types';

const HISTORY_STORAGE_KEY = 'search_history';

export const saveSearchHistory = async (history: Place[]): Promise<boolean> => {
  try {
    const limitedHistory = history.slice(-20);
    await AsyncStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(limitedHistory));
    return true;
  } catch (error) {
    console.error('Error saving search history:', error);
    return false;
  }
};

export const getSearchHistory = async (): Promise<Place[]> => {
  try {
    const history = await AsyncStorage.getItem(HISTORY_STORAGE_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error getting search history:', error);
    return [];
  }
};