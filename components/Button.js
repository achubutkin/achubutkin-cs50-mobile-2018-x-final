import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import SharedStyles, { width, height, Colors } from '../constants/SharedStyles';

export default props => (
  <TouchableOpacity style={styles.button} onPress={props.onPress}>
    <Text style={styles.buttonText}>{props.title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: Colors.yellow,
    borderRadius: 4,
    width: width / 2,
  },
  buttonText: {
    fontWeight: 'bold',
    color: Colors.red,
  },
});
