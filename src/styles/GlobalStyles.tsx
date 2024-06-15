import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  smallFont: {
    fontSize: 14,
    fontWeight: '400',
  },
  regularFont: {
    fontSize: 16,
    fontWeight: '400',
  },
  mediumFont: {
    fontSize: 18,
    fontWeight: '400',
  },
  largeFont: {
    fontSize: 22,
    fontWeight: '700',
  },
  superLargeFont: {
    fontSize: 28,
    fontWeight: '700',
  },
});
