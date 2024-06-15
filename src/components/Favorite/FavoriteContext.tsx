import React, {createContext, useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Song {
  title: string;
  imageUrl: string;
  genre: string;
}

interface FavoriteContextType {
  favorites: Song[];
  addToFavorites: (song: Song) => void;
  removeFromFavorites: (song: Song) => void;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined,
);

export const useFavoriteContext = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error(
      'useFavoriteContext must be used within a FavoriteProvider',
    );
  }
  return context;
};

export const FavoriteProvider: React.FC = ({children}: any) => {
  const [favorites, setFavorites] = useState<Song[]>([]);

  useEffect(() => {
    getFavoritesFromStorage();
  }, []);

  const getFavoritesFromStorage = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favoriteSongs');
      if (storedFavorites !== null) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error getting favorites:', error);
    }
  };

  const addToFavorites = async (song: Song) => {
    try {
      const updatedFavorites = [...favorites, song];
      await AsyncStorage.setItem(
        'favoriteSongs',
        JSON.stringify(updatedFavorites),
      );
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  const removeFromFavorites = async (song: Song) => {
    try {
      const updatedFavorites = favorites.filter(
        item => item.title !== song.title,
      );
      await AsyncStorage.setItem(
        'favoriteSongs',
        JSON.stringify(updatedFavorites),
      );
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };

  const contextValue: FavoriteContextType = {
    favorites,
    addToFavorites,
    removeFromFavorites,
  };

  return (
    <FavoriteContext.Provider value={contextValue}>
      {children}
    </FavoriteContext.Provider>
  );
};
