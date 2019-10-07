import React, {useState} from "react";
import { StyleSheet, View } from "react-native";
import TimerButton from "./TimerButton";
import TimerForm from "./TimerForm";

export default function ToggleableTimerForm({onCreateSubmit}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCreateSubmit = (timer) => {
    onCreateSubmit(timer);
    setIsOpen(false);
  }

  return (
    <View style={[styles.container, !isOpen && styles.buttonPadding]}>
      {isOpen ?
        <TimerForm
          onFormSubmit={handleCreateSubmit}
          onFormClose={() => setIsOpen(false)} /> :
        <TimerButton
          title="Add (+)"
          color="black"
          onPress={() => setIsOpen(true)} />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10
  },
  buttonPadding: {
    paddingHorizontal: 15
  }
});
