import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import SharedStyles, { Colors, width, height } from '../constants/SharedStyles';

class SelectToppingsControl extends Component {
  state = {
    toppings: [
      {
        title: 'Cheese',
        name: 'cheese',
        image: require('../assets/cheese_small.png'),
        selected: true,
      },
      {
        title: 'Mushrooms',
        name: 'mushrooms',
        image: require('../assets/mushroom_small.png'),
        selected: false,
      },
      {
        title: 'Onion',
        name: 'onion',
        image: require('../assets/onion_small.png'),
        selected: true,
      },
      {
        title: 'Salami',
        name: 'salami',
        image: require('../assets/salami_small.png'),
        selected: true,
      },
    ],
  };

  constructor(props) {
    super(props);
  }

  _handlePressChoiceItem(selectedIndex) {
    this.setState({
      toppings: [
        ...this.state.toppings.map((item, index) => {
          if (index === selectedIndex) {
            item.selected = !item.selected;
          }
          return item;
        }),
      ],
    });

    if (this.props.onValueChange) {
      this.props.onValueChange(
        this.state.toppings.filter(item => item.selected)
      );
    }
  }

  _renderChoices() {
    return (
      <View style={styles.choicesContainer}>
        {this.state.toppings.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => this._handlePressChoiceItem(index)}
              style={[styles.choicesItem]}>
              <View style={styles.choiceIcon}>
                {item.selected ? (
                  <Ionicons
                    name={'ios-checkmark'}
                    size={38}
                    style={styles.choiceIcon}
                  />
                ) : null}
              </View>
              <Image
                source={item.image}
                style={[
                  styles.choiceImage,
                  !item.selected ? { opacity: 0.7 } : null,
                ]}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  render() {
    const addedToppings = this.state.toppings.filter(item => item.selected);

    return (
      <View style={styles.container}>
        {this._renderChoices()}
        <Text style={styles.text}>
          Added {addedToppings.length} toppings: {'\n'}
          {addedToppings.map((item, index) => {
            return `${item.title}${
              index === addedToppings.length - 1 ? '' : ', '
            }`;
          })}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    color: Colors.yellowOpacity,
    paddingVertical: height / 20,
  },
  choicesContainer: {
    width: width - width / 6,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  choicesItem: {
    opacity: 1,
    alignItems: 'center',
    padding: 10,
  },
  choiceImage: {
    width: width / 10,
    height: width / 10,
    resizeMode: 'contain',
  },
  choiceIcon: {
    height: 40,
    color: Colors.yellow,
  },
});

export default SelectToppingsControl;
