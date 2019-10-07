import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function TimerButton({ small, color, title, onPress }) {
  const buttonTextStyle = [
    styles.buttonText,
    small ? styles.small : styles.large,
    { color }
  ];

  return (
    <TouchableOpacity
      style={[styles.button, {borderColor: color}]}
      onPress={onPress}>
      <Text style={buttonTextStyle}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    minWidth: 100,
    borderWidth: 2,
    borderRadius: 10
  },
  small: {
    fontSize: 14,
    padding: 5
  },
  large: {
    fontSize: 16,
    padding: 10
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold"
  },
  title: {
    fontSize: 14,
    fontWeight: "bold"
  },
  elapsedTime: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 10
  }
});
