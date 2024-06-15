import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  Alert,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

interface Album {
  wrapperType: string;
  collectionType: string;
  artistId: number;
  collectionId: number;
  amgArtistId: number;
  artistName: string;
  collectionName: string;
  collectionCensoredName: string;
  artistViewUrl: string;
  collectionViewUrl: string;
  artworkUrl60: string;
  artworkUrl100: string;
  collectionPrice: number;
  collectionExplicitness: string;
  trackCount: number;
  copyright: string;
  country: string;
  currency: string;
  releaseDate: string;
  primaryGenreName: string;
}

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
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 10,
    marginBottom: 16,
  },
  inputWrapper: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    flex: 1,
  },
  searchbar: {
    flex: 1,
    padding: 0,
    margin: 0,
    paddingLeft: 30,
    backgroundColor: 'white',
  },
  searchIcon: {
    position: 'absolute',
    left: 10,
    zIndex: 1,
  },
  searchButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 10,
    marginLeft: 10,
  },
  noResultsText: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 14,
    fontWeight: 'normal',
    color: '#888',
  },
});

const SearchResultScreen: React.FC = () => {
  const [favorites, setFavorites] = useState<Album[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation();

  useEffect(() => {
    getFavoritesFromStorage();

    if (searchQuery.trim() !== '') {
      fetchAlbumsFromAPI(searchQuery);
    }
  }, [searchQuery]);

  const fetchAlbumsFromAPI = async (searchTerm: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://itunes.apple.com/search?term=${searchTerm}&entity=album&limit=30`,
      );
      const json = await response.json();
      const results = json.results.filter((result: any) => {
        return (
          result.wrapperType === 'collection' &&
          (result.collectionType === 'Album' ||
            result.collectionType === 'Music Video')
        );
      }) as Album[];

      if (searchTerm.startsWith('artist:')) {
        const artistName = searchTerm.substring(7);
        const groupedResults: Album[][] = [];
        const artistsSet = new Set<string>();

        results.forEach(album => {
          if (
            album.artistName.toLowerCase().includes(artistName.toLowerCase())
          ) {
            if (!artistsSet.has(album.artistName)) {
              artistsSet.add(album.artistName);
              groupedResults.push([album]);
            } else {
              groupedResults
                .find(group => group[0].artistName === album.artistName)
                ?.push(album);
            }
          }
        });

        setAlbums(groupedResults.flat());
      } else {
        setAlbums(results);
      }
    } catch (error) {
      console.error('Error fetching albums:', error);
      Alert.alert('Error', 'Failed to fetch albums from API.');
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = async (album: Album) => {
    try {
      const existingFavorites = await AsyncStorage.getItem('favoriteSongs');
      let favoritesArray: Album[] = existingFavorites
        ? JSON.parse(existingFavorites)
        : [];

      const isDuplicate = favoritesArray.some(
        item => item.collectionName === album.collectionName,
      );
      if (isDuplicate) {
        Alert.alert(
          'Already in Favorites',
          'This album is already in your favorites.',
        );
        return;
      }

      favoritesArray.push(album);

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

  const handleSearchInputChange = (text: string) => {
    setSearchQuery(text);
  };

  return (
    <ScrollView>
      <View style={styles.searchBarContainer}>
        <View style={styles.inputWrapper}>
          <Icon
            name="search"
            size={20}
            color="gray"
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search Songs"
            style={styles.searchbar}
            value={searchQuery}
            onChangeText={handleSearchInputChange}
          />
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Search Results</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#007bff" />
        ) : albums.length === 0 ? (
          <React.Fragment>
            <View style={styles.noResultsText}>
              <Text>No Songs found</Text>
              <Text>Try a different search.</Text>
            </View>
          </React.Fragment>
        ) : (
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
        )}
      </View>
    </ScrollView>
  );
};

export default SearchResultScreen;
