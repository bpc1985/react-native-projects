import uuidv4 from "uuid/v4";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import ToggleTimerForm from "./components/ToggleTimerForm";
import EditableTimer from "./components/EditableTimer";
import { newTimer } from "./utils/TimerUtils";

const initialState = {
  timers: [
    {
      id: uuidv4(),
      title: "Coding Plugins",
      project: "Android",
      elapsed: 8986300,
      isRunning: false
    },
    {
      id: uuidv4(),
      title: "Adding Todo",
      project: "iOS",
      elapsed: 3890985,
      isRunning: false
    }
  ]
};

const TIME_INTERVAL = 1000;

export default function App() {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newTimers = state.timers.map(timer => {
        const { elapsed, isRunning } = timer;
        return {
          ...timer,
          elapsed: isRunning ? elapsed + TIME_INTERVAL : elapsed
        };
      });
      setState({ timers: newTimers });
    }, TIME_INTERVAL);

    return () => {
      clearInterval(intervalId);
    };
  });

  const handleCreateFormSubmit = timer => {
    const newTimers = [newTimer(timer), ...state.timers];
    setState({ timers: newTimers });
  };

  const handleUpdateFormSubmit = updatedTimer => {
    const newTimers = state.timers.map(timer => {
      if (timer.id === updatedTimer.id) {
        const { title, project } = updatedTimer;
        return {
          ...timer,
          title,
          project
        };
      }
      return timer;
    });
    setState({ timers: newTimers });
  };

  const handleRemoveFormSubmit = timerId => {
    const newTimers = state.timers.filter(t => t.id !== timerId);
    setState({ timers: newTimers });
  };

  const toggleTimer = timerId => {
    const newTimers = state.timers.map(timer => {
      const { id, isRunning } = timer;
      if (id === timerId) {
        return {
          ...timer,
          isRunning: !isRunning
        };
      }
      return timer;
    });
    setState({ timers: newTimers });
  };

  return (
    <View style={styles.appContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Tracking Timers</Text>
      </View>

      <KeyboardAvoidingView
        behavior="padding"
        style={styles.timerListContainer}
      >
        <ScrollView style={styles.timerList}>
          <ToggleTimerForm onCreateSubmit={handleCreateFormSubmit} />
          {state.timers.map(({ id, title, project, elapsed, isRunning }) => (
            <EditableTimer
              key={id}
              id={id}
              title={title}
              project={project}
              elapsed={elapsed}
              isRunning={isRunning}
              onUpdateSubmit={handleUpdateFormSubmit}
              onRemoveSubmit={handleRemoveFormSubmit}
              onStartPress={toggleTimer}
              onStopPress={toggleTimer}
            />
          ))}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1
  },
  titleContainer: {
    paddingTop: 35,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#D6D7DA"
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  },
  timerListContainer: {
    flex: 1
  },
  timerList: {
    paddingBottom: 15
  }
});
