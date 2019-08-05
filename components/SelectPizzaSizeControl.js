import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Slider } from 'react-native';

import SharedStyles, { width, height, Colors } from '../constants/SharedStyles';

const sizes = [
  { persons: '1-2', inches: 10 },
  { persons: '2-3', inches: 12 },
  { persons: '3-4', inches: 14 },
  { persons: '3-6', inches: 18 },
];

class SelectPizzaSizeControl extends Component {
  state = {
    selected: 3,
  };

  _renderChoices() {
    const selectedItem = sizes[this.state.selected - 1];
    return (
      <View style={styles.choicesContainer}>
        {sizes.map((item, index) => {
          const isSelected = selectedItem === item;
          return (
            <View
              key={index}
              onTouchEndCapture={() => {
                this.setState({ selected: index + 1 });
              }}
              style={[styles.choicesItem, isSelected ? { opacity: 1 } : null]}>
              <Text
                style={[
                  styles.choicesValueText,
                  isSelected ? { fontSize: 24 } : null,
                ]}>
                {item.inches}
              </Text>
              {isSelected ? (
                <Text style={styles.choicesPersonsText}>
                  {item.persons} persons
                </Text>
              ) : null}
            </View>
          );
        })}
      </View>
    );
  }

  _handleValueChange = value => {
    this.setState({ selected: value });

    if (this.props.onValueChange) {
      this.props.onValueChange(sizes[value - 1]);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {this._renderChoices()}
        <Slider
          ref={ref => (this._slider = ref)}
          minimumValue={1}
          maximumValue={4}
          step={1}
          value={this.state.selected}
          onValueChange={this._handleValueChange}
          style={styles.slider}
        />
        <Text style={styles.text}>
          Select your pizza{'`'}s size{'\n'}by inches
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
  slider: {
    width: width - width / 4,
  },
  choicesContainer: {
    width: width - width / 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  choicesItem: {
    opacity: 0.7,
    alignItems: 'center',
    width: width / 6,
  },
  choicesValueText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.yellow,
    textAlign: 'center',
  },
  choicesPersonsText: {
    fontSize: 12,
    color: Colors.yellow,
    textAlign: 'center',
  },
});

export default SelectPizzaSizeControl;
