import React from 'react';
import Routes from './src/routes/index';
import {CustomSafeArea} from './src/components';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {enableScreens} from 'react-native-screens';
enableScreens();

const App = () => {
  return (
    <CustomSafeArea>
      <GestureHandlerRootView
        style={{
          flex: 1,
        }}>
        <Routes />
      </GestureHandlerRootView>
    </CustomSafeArea>
  );
};

export default App;
