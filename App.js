import React, { Component } from 'react';
import {
  Platform,
  View,
  StyleSheet,
  StatusBar,
} from 'react-native';

import { Provider } from 'react-redux';
import Store from './redux/Store';

import Navigator from './navigation/Navigator';

export default class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
        <Navigator />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  statusBarUnderlay: {
    height: StatusBar.currentHeight,
    backgroundColor: 'rgba(0,0,0,0.2)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});
