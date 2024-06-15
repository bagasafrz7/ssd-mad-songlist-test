import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';

interface ContainerProps {
  bgColor?: string;
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({bgColor, children}) => {
  const containerStyle: ViewStyle = {
    flex: 1,
    padding: 10,
    gap: 15,
    paddingBottom: '20%',
    backgroundColor: bgColor,
  };

  return <View style={[styles.container, containerStyle]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 15,
    paddingBottom: '20%',
  },
});

export default Container;
