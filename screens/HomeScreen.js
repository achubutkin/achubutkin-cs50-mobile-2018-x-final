/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

import Button from '../components/Button';
import SharedStyles, { Colors } from '../constants/SharedStyles';

class HomeScreen extends Component {
  _handleButtonOnPress = () => this.props.navigation.navigate('Order');

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headContainer}>
          <Text style={styles.welcome}>Just Order Pizza</Text>
          <Text style={styles.instructions}>
            Just order yourself a simple pizza.
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          <Button title={'Order'} onPress={this._handleButtonOnPress} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...SharedStyles.container,
    backgroundColor: 'transparent',
    justifyContent: 'space-around',
  },
  headContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomContainer: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  welcome: {
    fontSize: 40,
    fontWeight: 'bold',
    color: Colors.yellow,
    textAlign: 'center',
  },
  instructions: {
    color: Colors.yellowOpacity,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default withNavigation(HomeScreen);
