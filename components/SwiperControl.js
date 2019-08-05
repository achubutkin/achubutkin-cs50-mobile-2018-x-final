import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import SharedStyles, { Colors, width, height } from '../constants/SharedStyles';

const SwiperControl = props => {
  const { currentSlideIndex, total, posting } = props;
  const hasPrevSlide = currentSlideIndex > 0;
  const isStep4 = currentSlideIndex === 3;

  let nextButtonText;

  switch (currentSlideIndex) {
    case 2:
      nextButtonText = 'Order Now!';
      break;
    case 3:
      nextButtonText = 'Done';
      break;
    default:
      nextButtonText = 'Next';
      break;
  }

  return (
    <View style={styles.controls}>
      <TouchableOpacity
        disabled={!hasPrevSlide || isStep4}
        onPress={props.onPressPrev}
        style={styles.button}>
        <Text
          style={
            !hasPrevSlide || isStep4
              ? styles.inactiveButtonText
              : styles.buttonText
          }>
          Previous
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={posting}
        onPress={props.onPressNext}
        style={styles.button}>
        <Text style={posting ? styles.inactiveButtonText : styles.buttonText}>
          {nextButtonText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: Colors.redDark,
    height: 58,
  },
  button: {
    alignItems: 'center',
    alignContent: 'center',
    paddingVertical: 22,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: Colors.yellow,
    fontWeight: '800',
  },
  inactiveButtonText: {
    color: Colors.yellowOpacity,
  },
});

export default SwiperControl;
