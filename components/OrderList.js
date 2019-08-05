import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import { connect } from 'react-redux';

import SharedStyles, { Colors } from '../constants/SharedStyles';

import { getAllOrders } from '../api/Api';

class OrderList extends Component {
  state = {
    loading: true,
    orders: [],
  };

  componentDidMount() {
    this._loadOrders();
  }

  componentWillReceiveProps(nextProps) {
    const order = nextProps.order;
    if (order) {
      this.setState({ orders: [...this.state.orders, order] });
    }
  }

  _loadOrders() {
    getAllOrders()
      .then(response => response.json())
      .then(data => {
        const arr = Object.keys(data).map(key => {
          return data[key];
        });
        this.setState({ loading: false, orders: arr });
      })
      .catch(reason => {
        this.setState({ loading: false, orders: [] });
      });
  }

  _renderItem = ({ item }) => {
    return (
      <TouchableOpacity activeOpacity={0.8} style={styles.item}>
        <View>
          <View style={styles.header}>
            <View style={styles.infoContainer}>
              <Text
                style={styles.titleText}
                ellipsizeMode="tail"
                numberOfLines={1}>
                {new Date(item.createdDate).toDateString()}
              </Text>
              <View style={styles.extraInfoContainer}>
                <Text
                  style={styles.infoText}
                  ellipsizeMode="tail"
                  numberOfLines={1}>
                  {item.size.inches}
                  {item.extras.length > 1 ? ' x 2 ' : ' '}
                  {item.toppings && item.toppings.map(t => t + ', ')}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const emptyStyle =
      this.state.loading || !this.state.orders.length
        ? { justifyContent: 'center', alignItems: 'center' }
        : null;

    const emptyText = this.state.loading
      ? 'Loading...'
      : 'You not have orders. :(';

    return (
      <View style={[styles.container, emptyStyle]}>
        <FlatList
          bounces
          data={this.state.orders}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this._renderItem}
          ListEmptyComponent={<Text style={styles.emptyText}>{emptyText}</Text>}
          contentContainerStyle={emptyStyle}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...SharedStyles.container,
  },
  item: {
    backgroundColor: Colors.yellow,
    flexGrow: 1,
    borderBottomColor: Colors.redOpacity,
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 15,
  },
  infoContainer: {
    paddingTop: 13,
    flexDirection: 'column',
    alignSelf: 'stretch',
    paddingBottom: 10,
  },
  titleText: {
    fontSize: 15,
    marginRight: 170,
    marginBottom: 2,
    ...Platform.select({
      ios: {
        fontWeight: '500',
      },
      android: {
        fontWeight: '400',
        marginTop: 1,
      },
    }),
    color: Colors.red,
  },
  extraInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    color: Colors.redOpacity,
    fontSize: 13,
    lineHeight: 16,
  },
  emptyText: {
    color: Colors.yellowOpacity,
    fontWeight: 'bold',
  },
});

const OrderListContainer = connect(state => {
  return { order: { ...state.defaultOrder } };
})(OrderList);

export default OrderListContainer;
