import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, ViewPropTypes, Text, TouchableOpacity } from 'react-native';
import NavigationBar from '../components/NavigationBar';
import CommentInput from '../components/CommentInput';
import CommentList from '../components/CommentList';

export default function Comments({onClose, comments, onSubmitComment}) {
  return (
    <SafeAreaView>
      <NavigationBar
        title="Comments"
        leftText="Close"
        onPressLeftText={onClose}
      />
      <CommentInput onSubmit={onSubmitComment} />
      <CommentList items={comments} />
    </SafeAreaView>
  )
}

Comments.propTypes = {
  style: ViewPropTypes.style,
  onClose: PropTypes.func.isRequired,
};

Comments.defaultProps = {
  style: null
};
