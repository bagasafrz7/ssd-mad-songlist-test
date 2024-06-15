import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const styles = StyleSheet.create({
  titlePopular: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  cardProduct: {
    width: 150,
    height: 250,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    elevation: 3,
    marginRight: 15,
    marginBottom: 5,
    overflow: 'hidden',
  },
  cardCoverProduct: {
    width: '100%',
    height: '70%',
  },
  cardContent: {
    padding: 10,
  },
  titleProduct: {
    fontWeight: '500',
    fontSize: 16,
  },
  priceText: {
    fontSize: 14,
    marginTop: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const TopSongs = () => {
  const navigation = useNavigation();
  const [songs, setSongs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalData, setTotalData] = useState(0);

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  const fetchDataFromApi = async () => {
    try {
      const response = await fetch(
        'https://itunes.apple.com/lookup?upc=720642462928&entity=song&limit=2',
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setSongs(data.results);
        setTotalData(data.resultCount);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const renderCards = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    return songs.map((item, index) => (
      <TouchableOpacity
        key={index}
        style={styles.cardProduct}
        onPress={() => {
          navigation.navigate('Detail', {
            productId: item.collectionId.toString(), // Mengirim collectionId sebagai productId
          });
        }}>
        <Image
          source={{uri: item.artworkUrl100}}
          style={styles.cardCoverProduct}
          resizeMode="cover"
        />
        <View style={styles.cardContent}>
          <Text style={styles.titleProduct} numberOfLines={1}>
            {item.collectionName}
          </Text>
          <Text style={styles.priceText}>{item.primaryGenreName}</Text>
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    <View>
      <Text style={styles.titlePopular}>Top {totalData} Songs Weezer</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{paddingVertical: 10}}>
        {renderCards()}
      </ScrollView>
    </View>
  );
};

export default TopSongs;
