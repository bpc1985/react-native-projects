import React from 'react';
import PropTypes from "prop-types";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function NavigationBar({ title, leftText, onPressLeftText}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.leftText} onPress={onPressLeftText}>
        <Text>{leftText}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

NavigationBar.propTypes = {
  title: PropTypes.string,
  leftText: PropTypes.string,
  onPressLeftText: PropTypes.func,
};

NavigationBar.defaultProps = {
  title: '',
  leftText: '',
  onPressLeftText: () => {},
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.1)'
  },
  leftText: {
    position: 'absolute',
    left: 20,
    justifyContent: 'center'
  },
  title: {
    fontWeight: '500'
  }
});
