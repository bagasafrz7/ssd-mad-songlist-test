import {SafeAreaView, StatusBar} from 'react-native';
import React, {type ReactNode} from 'react';
import GlobalStyles from '../../styles/GlobalStyles';

interface CustomSafeAreaProps {
  children: ReactNode;
}

export function CustomSafeArea({children}: CustomSafeAreaProps) {
  return (
    <SafeAreaView style={GlobalStyles.safeAreaStyle}>
      <StatusBar animated={true} barStyle="default" />
      {children}
    </SafeAreaView>
  );
}
