import React, {useState} from "react";
import { StyleSheet, TextInput, View } from "react-native";
import PropTypes from "prop-types";

export default function CommentInput({onSubmit}) {
  const [text, setText] = useState('');

  const handleChangeText = text => setText(text);

  const handleSubmitEditing = () => {
    if (!text) {
      return;
    }
    onSubmit(text);
    setText('');
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Input your comment"
        value={text}
        onChangeText={handleChangeText}
        onSubmitEditing={handleSubmitEditing} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.1)'
  },
  input: {
    flex: 1
  }
});

CommentInput.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

