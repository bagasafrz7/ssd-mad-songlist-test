import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';

interface RouteParams {
  productId: string;
}

const DetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {productId} = route.params as RouteParams;

  const [songDetail, setSongDetail] = useState<any>({});

  useEffect(() => {
    fetchSongDetailFromAPI(productId);
  }, [productId]);

  const fetchSongDetailFromAPI = async (collectionId: string) => {
    try {
      const response = await fetch(
        `https://itunes.apple.com/lookup?id=${collectionId}&media=music`,
      );
      const json = await response.json();
      if (json.resultCount > 0) {
        const result = json.results[0];
        setSongDetail(result);
      } else {
        Alert.alert('Error', 'Song detail not found.');
      }
    } catch (error) {
      console.error('Error fetching song detail:', error);
      Alert.alert('Error', 'Failed to fetch song detail from API.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Song Detail</Text>
      </View>
      <View style={styles.content}>
        <Image
          source={{uri: songDetail.artworkUrl100}}
          style={styles.songImage}
        />
        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={styles.label}>Album:</Text>
            <Text style={styles.value}>{songDetail.collectionName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Artist:</Text>
            <Text style={styles.value}>{songDetail.artistName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Genre:</Text>
            <Text style={styles.value}>{songDetail.primaryGenreName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Price:</Text>
            <Text
              style={
                styles.value
              }>{`${songDetail.collectionPrice} ${songDetail.currency}`}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Release Date:</Text>
            <Text style={styles.value}>{songDetail.releaseDate}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Track Count:</Text>
            <Text style={styles.value}>{songDetail.trackCount}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Explicit:</Text>
            <Text style={styles.value}>
              {songDetail.collectionExplicitness}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Country:</Text>
            <Text style={styles.value}>{songDetail.country}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Copyright:</Text>
            <Text style={styles.value}>{songDetail.copyright}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  content: {
    alignItems: 'center',
  },
  songImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
  table: {
    width: '100%',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
  },
  value: {
    flex: 2,
    fontSize: 16,
  },
});

export default DetailScreen;
