import { Platform, StyleSheet, Dimensions, StatusBar } from 'react-native';

export const width = Dimensions.get('window').width;
export const height = Dimensions.get('window').height;

export const Colors = {
  red: 'rgb(226, 57, 56)',
  redOpacity: 'rgba(226, 57, 56, 0.7)',
  redDark: 'rgb(193, 47, 46)',
  yellow: 'rgb(254, 254, 202)',
  yellowOpacity: 'rgba(254, 254, 202, 0.7)',
};

export default StyleSheet.create({
  container: {
    flex: 1,
  },
});
