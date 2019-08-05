/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Text, View, StyleSheet, StatusBar, Platform } from 'react-native';

import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

import OrderList from '../components/OrderList';
import SharedStyles, { Colors } from '../constants/SharedStyles';

class AllOrdersScreen extends Component {
  static navigationOptions = {
    title: 'All Orders',
  };

  render() {
    return (
      <View style={styles.container}>
        <OrderList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...SharedStyles.container,
    paddingTop: Platform.OS === 'ios' ? 24 : 0,
  },
});

export default withNavigation(AllOrdersScreen);
