import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  songImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  songGenre: {
    fontSize: 14,
    color: '#888',
  },
  iconContainer: {
    position: 'absolute',
    right: 16,
  },
});

const ListSongs = () => {
  const [favorites, setFavorites] = useState([]);
  const [albums, setAlbums] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getFavoritesFromStorage();

    fetchAlbumsFromAPI();
  }, []);

  const fetchAlbumsFromAPI = async () => {
    try {
      const response = await fetch(
        'https://itunes.apple.com/lookup?amgArtistId=468749,5723&entity=album&limit=5',
      );
      const json = await response.json();
      const results = json.results.filter(
        result => result.wrapperType === 'collection',
      );
      setAlbums(results);
    } catch (error) {
      console.error('Error fetching albums:', error);
      Alert.alert('Error', 'Failed to fetch albums from API.');
    }
  };

  const addToFavorites = async song => {
    try {
      const existingFavorites = await AsyncStorage.getItem('favoriteSongs');
      let favoritesArray = existingFavorites
        ? JSON.parse(existingFavorites)
        : [];

      const isDuplicate = favoritesArray.some(
        item => item.title === song.collectionName,
      );
      if (isDuplicate) {
        Alert.alert(
          'Already in Favorites',
          'This album is already in your favorites.',
        );
        return;
      }

      favoritesArray.push(song);

      await AsyncStorage.setItem(
        'favoriteSongs',
        JSON.stringify(favoritesArray),
      );

      setFavorites(favoritesArray);

      Alert.alert('Added to Favorites', 'Album added to your favorites.');
    } catch (error) {
      console.error('Error adding to favorites:', error);
      Alert.alert('Error', 'Failed to add album to favorites.');
    }
  };

  const getFavoritesFromStorage = async () => {
    try {
      const existingFavorites = await AsyncStorage.getItem('favoriteSongs');
      if (existingFavorites !== null) {
        setFavorites(JSON.parse(existingFavorites));
      }
    } catch (error) {
      console.error('Error getting favorites:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recommended Albums</Text>
      <ScrollView>
        {albums.map((album, index) => (
          <TouchableOpacity
            key={index}
            style={styles.songItem}
            onPress={() => {
              navigation.navigate('Detail', {
                productId: album.collectionId.toString(),
              });
            }}>
            <Image
              source={{uri: album.artworkUrl100}}
              style={styles.songImage}
            />
            <View style={styles.songInfo}>
              <Text style={styles.songTitle}>{album.collectionName}</Text>
              <Text style={styles.songGenre}>{album.primaryGenreName}</Text>
            </View>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => addToFavorites(album)}>
              <Icon name="heart-o" size={24} color="red" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default ListSongs;
