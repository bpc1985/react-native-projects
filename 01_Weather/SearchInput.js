import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TextInput } from 'react-native';

export default function SearchInput({placeholder, onSubmit}) {
  const [text, setText] = useState('');

  const handleChangeText = (text) => {
    setText(text);
  }

  const handleSubmitEditing = () => {
    if (text && text.length > 0) {
      onSubmit(text);
      setText('');
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        autoCorrect={false}
        placeholder={placeholder}
        placeholderTextColor="white"
        underlineColorAndroid="transparent"
        style={styles.textInput}
        clearButtonMode="always"
        value={text}
        onChangeText={handleChangeText}
        onSubmitEditing={handleSubmitEditing} />
    </View>
  )
}

SearchInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#666',
    height: 40,
    width: 300,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    borderRadius: 10
  },
  textInput: {
    flex: 1,
    color: '#fff'
  }
});