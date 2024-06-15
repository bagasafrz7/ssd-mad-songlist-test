import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import DetailScreen from '../screens/detail/DetailScreen';
import FavoriteScreen from '../screens/favorite/FavoriteScreen';
import HomeTabs from './tabs';
import {Text, TouchableOpacity} from 'react-native';
import SearchResultScreen from '../screens/search/SearchResultScreen';

const Stack = createStackNavigator();

interface IconButtonProps {
  icon: string;
  onPress: () => void;
}

const IconButton = ({icon, onPress}: IconButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{icon}</Text>
    </TouchableOpacity>
  );
};

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Group>
          <Stack.Screen name="Main" component={HomeTabs} />
          <Stack.Screen name="Detail" component={DetailScreen} />
          <Stack.Screen name="SearchResult" component={SearchResultScreen} />
        </Stack.Group>
        <Stack.Group screenOptions={{presentation: 'modal'}}>
          <Stack.Screen
            name="Menu"
            options={({navigation}) => ({
              headerShown: true,
              title: 'Halaman Menu',
              headerLeft: () => (
                <IconButton icon="close" onPress={() => navigation.goBack()} />
              ),
            })}
            component={FavoriteScreen}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
