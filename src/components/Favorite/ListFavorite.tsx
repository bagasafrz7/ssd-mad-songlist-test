import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  Alert,
} from 'react-native';
import {useFavoriteContext} from './FavoriteContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

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

const ListFavorite: React.FC = () => {
  const {favorites, removeFromFavorites} = useFavoriteContext();
  const navigation = useNavigation();

  const handleRemoveFavorite = (song: any) => {
    removeFromFavorites(song);
    Alert.alert('Removed from Favorites', 'Song removed from your favorites.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Songs</Text>
      <ScrollView>
        {favorites.length === 0 ? (
          <Text style={{textAlign: 'center'}}>No favorite songs yet.</Text>
        ) : (
          favorites.map((song, index) => (
            <TouchableOpacity
              key={index}
              style={styles.songItem}
              onPress={() => {
                navigation.navigate('Detail', {
                  productId: song.collectionId.toString(),
                });
              }}>
              <Image
                source={{uri: song.artworkUrl100}}
                style={styles.songImage}
              />
              <View style={styles.songInfo}>
                <Text style={styles.songTitle}>{song.collectionName}</Text>
                <Text style={styles.songGenre}>{song.primaryGenreName}</Text>
              </View>
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => handleRemoveFavorite(song)}>
                <Icon name="heart" size={24} color="red" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default ListFavorite;
