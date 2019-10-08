import React from "react";
import PropTypes from "prop-types";
import { ColorPropType, View, Text, StyleSheet } from "react-native";

export default function Avatar({ size, backgroundColor, initials }) {
  const style = {
    height: size,
    width: size,
    borderRadius: size / 2,
    backgroundColor
  };
  return (
    <View style={([styles.container, style])}>
      <Text style={styles.text}>{initials}</Text>
    </View>
  );
}

Avatar.propTypes = {
  initials: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  backgroundColor: ColorPropType.isRequired
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "white"
  }
});
