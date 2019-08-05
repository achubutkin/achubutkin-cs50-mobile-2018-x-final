import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import SharedStyles, { Colors, width, height } from '../constants/SharedStyles';

class SelectExtrasControl extends Component {
  state = {
    extras: [
      { title: 'Original', selected: true },
      { title: 'Double It!', selected: false },
    ],
  };

  constructor(props) {
    super(props);
  }

  _handlePressChoiceItem(selectedIndex) {
    const extras = this.state.extras.map((item, index) => {
      if (
        index === selectedIndex &&
        selectedIndex > 0 /* original by default and the not uncheck it. */
      ) {
        item.selected = !item.selected;
      }
      return item;
    });

    this.setState({
      extras: [...extras],
    });

    if (this.props.onValueChange) {
      this.props.onValueChange(this.state.extras);
    }
  }

  _renderChoices() {
    return (
      <View style={styles.choicesContainer}>
        {this.state.extras.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => this._handlePressChoiceItem(index)}
              style={styles.choicesItem}>
              <View style={styles.choiceIconContainer}>
                {item.selected ? (
                  <Ionicons
                    name={'ios-checkmark'}
                    size={38}
                    style={styles.choiceIcon}
                  />
                ) : null}
              </View>
              <Text
                style={[
                  styles.choiceTitle,
                  item.selected ? null : { opacity: 0.7 },
                ]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this._renderChoices()}
        <Text style={styles.text}>
          Add some extras to your pizza,{'\n'}double sauze, double cheeze
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
    marginBottom: 6,
  },
  choicesItem: {
    opacity: 1,
    alignItems: 'center',
    padding: 10,
  },
  choiceTitle: {
    color: Colors.yellow,
    fontSize: 18,
    fontWeight: 'bold',
  },
  choiceIcon: {
    color: Colors.yellow,
  },
  choiceIconContainer: {
    height: 40,
  },
});

export default SelectExtrasControl;
