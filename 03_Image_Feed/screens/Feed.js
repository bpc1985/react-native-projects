import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Text,
  View,
  ViewPropTypes,
  SafeAreaView,
  StyleSheet
} from "react-native";
import PropTypes from "prop-types";
import { fetchImages } from "../utils/api";
import CardList from "../components/CardList";

const initialState = {
  loading: true,
  error: false,
  items: []
};

export default function Feed({ style, commentsForItem, onPressComments }) {
  const [state, setState] = useState(initialState);

  const getImagesAndSetState = async () => {
    try {
      const items = await fetchImages();
      setState({ ...state, loading: false, items });
    } catch (e) {
      setState({ ...state, loading: false, error: true });
    }
  };

  useEffect(() => {
    getImagesAndSetState();
  }, []);

  const { loading, error, items } = state;

  if (loading) {
    return (
      <View style={styles.activityContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return <Text>Error...</Text>;
  }

  return (
    <SafeAreaView style={style}>
      <CardList
        items={items}
        commentsForItem={commentsForItem}
        onPressComments={onPressComments}
      />
    </SafeAreaView>
  );
}

Feed.propTypes = {
  style: ViewPropTypes.style,
  commentsForItem: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
  onPressComments: PropTypes.func
};

const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    justifyContent: "center"
  }
});
