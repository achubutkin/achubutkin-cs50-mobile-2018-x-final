/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';

import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

import SwiperControl from '../components/SwiperControl';
import SelectPizzaSizeControl from '../components/SelectPizzaSizeControl';
import SelectToppingsControl from '../components/SelectToppingsControl';
import SelectExtrasControl from '../components/SelectExtrasControl';

import SharedStyles, { Colors, width, height } from '../constants/SharedStyles';

import { postOrder } from '../api/Api';

const sliderTitles = ['Size', 'Toppings', 'Extras', 'Order Now!'];
const TIME_FOR_DELAY = 1000;

class OrderScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title') || sliderTitles[0],
  });

  state = {
    totalSlides: sliderTitles.length,
    currentSlideIndex: 0,
    defaultOrder: {
      size: { inches: 14 },
      toppings: ['cheese', 'onion', 'salami'],
      extras: ['original'],
    },
    posting: false,
    postOrderState: '',
  };

  _renderPagination(index, total, context) {
    return (
      <View style={styles.pagination}>
        <Text style={styles.paginationText}>
          Step {index + 1} of {total}
        </Text>
      </View>
    );
  }

  _handleIndexChanged = index =>
    this.setState({ currentSlideIndex: index }, () => {
      this.props.navigation.setParams({ title: sliderTitles[index] });
      if (this.state.currentSlideIndex + 1 === 4) {
        this._postOrder();
      }
    });

  _handlePressPrev = () => {
    const { currentSlideIndex } = this.state;
    if (currentSlideIndex === 0) {
      return;
    }

    this._swiper.scrollBy(-1);
  };

  _handlePressNext = () => {
    const { currentSlideIndex, totalSlides } = this.state;
    if (currentSlideIndex + 1 === totalSlides) {
      this._orderDone();
      return;
    }

    this._swiper.scrollBy(1);
  };

  _handlePizzaSizeValueChange = value =>
    this.setState({
      defaultOrder: {
        ...this.state.defaultOrder,
        size: { inches: value.inches },
      },
    });

  _handleToppingsValueChange = value =>
    this.setState({
      defaultOrder: {
        ...this.state.defaultOrder,
        toppings: value.map(item => item.name),
      },
    });

  _handleExtrasValueChange = value =>
    this.setState({
      defaultOrder: {
        ...this.state.defaultOrder,
        extras: value.map(item => item.title),
      },
    });

  _postOrder() {
    this.setState({ posting: true, postOrderState: 'Ordering...' }, () => {
      setTimeout(() => {
        const order = this.state.defaultOrder;
        order.createdDate = Date.now();

        postOrder(order)
          .then(result => {
            if (!result.ok) {
              this.setState({ postOrderState: 'Error!' });
              return;
            }
            this.setState({
              posting: false,
              postOrderState: `Pizza will arrive in 60 minutes.${'\n'}Enjoy!`,
            });
            this.props.dispatch({ type: 'addOrder', payload: order });
          })
          .catch(reason => {
            this.setState({ postOrderState: reason.toString() });
          });
      }, TIME_FOR_DELAY);
    });
  }

  _orderDone() {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={styles.container}>
        <Swiper
          ref={ref => (this._swiper = ref)}
          scrollEnabled={false}
          loop={false}
          showButtons={false}
          showsPagination={true}
          renderPagination={this._renderPagination}
          onIndexChanged={this._handleIndexChanged}>
          <View style={styles.slide}>
            <Image
              source={require('../assets/pizza_yellow.png')}
              style={styles.slideImage}
            />
            <SelectPizzaSizeControl
              onValueChange={this._handlePizzaSizeValueChange}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={require('../assets/mushrooms_yellow.png')}
              style={styles.slideImage}
            />
            <SelectToppingsControl
              onValueChange={this._handleToppingsValueChange}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={require('../assets/sauces_yellow.png')}
              style={styles.slideImage}
            />
            <SelectExtrasControl
              onValueChange={this._handleExtrasValueChange}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={require('../assets/delivery-truck_yellow.png')}
              style={styles.slideImage}
            />
            <View style={styles.doneContainer}>
              <Text style={styles.doneOrderTitleText}>
                {this.state.postOrderState}
              </Text>
              <Text style={styles.doneOrderText}>
                If the pizza arrives later,{'\n'}we will give it to you for
                free.
              </Text>
            </View>
          </View>
        </Swiper>
        <SwiperControl
          {...this.state}
          onPressPrev={this._handlePressPrev}
          onPressNext={this._handlePressNext}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...SharedStyles.container,
    paddingTop: 60,
    backgroundColor: Colors.red,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slideImage: {
    flex: 1,
    width: width / 1.5,
    resizeMode: 'contain',
  },
  pagination: {
    position: 'absolute',
    top: 0,
    width: '100%',
    alignItems: 'center',
  },
  paginationText: {
    color: Colors.yellowOpacity,
  },
  doneContainer: {
    alignItems: 'center',
  },
  doneOrderTitleText: {
    color: Colors.yellow,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    height: height / 10,
  },
  doneOrderText: {
    textAlign: 'center',
    color: Colors.yellowOpacity,
    paddingVertical: height / 20,
  },
});

export default withNavigation(connect()(OrderScreen));
