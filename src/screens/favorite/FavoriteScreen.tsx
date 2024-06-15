import React from 'react';
import {FavoriteProvider} from '../../components/Favorite/FavoriteContext';
import ListFavorite from '../../components/Favorite/ListFavorite';

const FavoriteScreen = () => {
  return (
    <FavoriteProvider>
      <ListFavorite />
    </FavoriteProvider>
  );
};

export default FavoriteScreen;
