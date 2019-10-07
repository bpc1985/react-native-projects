import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { millisecondsToHuman } from "../utils/TimerUtils.js";
import TimerButton from "./TimerButton";

export default function Timer({
  id,
  title,
  project,
  elapsed,
  isRunning,
  onEditPress,
  onRemovePress,
  onStartPress,
  onStopPress
}) {
  const elapsedString = millisecondsToHuman(elapsed);

  const renderActionButton = () => {
    if (isRunning) {
      return (
        <TimerButton
          color="#DB2828"
          title="Stop"
          onPress={() => onStopPress(id)}
        />
      );
    }
    return (
      <TimerButton
        color="#21BA45"
        title="Start"
        onPress={() => onStartPress(id)}
      />
    );
  };

  return (
    <View style={styles.timerContainer}>
      <Text style={styles.title}>{title}</Text>

      <Text>{project}</Text>

      <Text style={styles.elapsedTime}>{elapsedString}</Text>

      <View style={styles.buttonGroup}>
        <TimerButton color="blue" small title="Edit" onPress={onEditPress} />
        <TimerButton
          color="blue"
          small
          title="Remove"
          onPress={() => onRemovePress(id)}
        />
      </View>

      {renderActionButton()}
    </View>
  );
}

const styles = StyleSheet.create({
  timerContainer: {
    backgroundColor: "white",
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    margin: 15,
    marginBottom: 0
  },
  title: {
    fontSize: 14,
    fontWeight: "bold"
  },
  elapsedTime: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 15
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
