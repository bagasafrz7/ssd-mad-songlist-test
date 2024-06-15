import React, {useState} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {searchItunesAPI, ItunesResult} from '../../services/itunesApi';

interface SearchBarProps {
  isHasButton?: boolean;
  onSearch?: (results: ItunesResult[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  isHasButton = false,
  onSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      return;
    }

    try {
      const results = await searchItunesAPI(searchQuery);
      if (onSearch) {
        onSearch(results);
      }
      navigation.navigate('SearchResult', {searchQuery});
    } catch (error) {
      console.error('Error searching iTunes API:', error);
    }
  };

  return (
    <View style={styles.searchBarContainer}>
      <View style={[styles.inputWrapper, {flex: 1}]}>
        <Icon name="search" size={20} color="gray" style={styles.searchIcon} />
        <TextInput
          placeholder="Search Songs"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchbar}
          onSubmitEditing={handleSearch}
        />
        {isHasButton && (
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Icon name="search-outline" size={20} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 10,
  },
  inputWrapper: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
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
});

export default SearchBar;
