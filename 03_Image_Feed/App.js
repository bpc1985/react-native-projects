import React, {useState, useEffect} from "react";
import { AsyncStorage, StyleSheet, View, Text, Modal, Platform } from "react-native";
import Constants from 'expo-constants';
import Feed from "./screens/Feed";
import Comments from "./screens/Comments";

const ASYNC_STORAGE_COMMENTS_KEY = 'ASYNC_STORAGE_COMMENTS_KEY';

const initialState = {
  commentsForItem: {},
  showModal: false,
  selectedItemId: null
};

export default function App() {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    loadCommentsFromStorage();
  }, []);

  const loadCommentsFromStorage =  async () => {
    try {
      const loadedCommentsForItem = await AsyncStorage.getItem(ASYNC_STORAGE_COMMENTS_KEY);
      const commentsForItem = loadedCommentsForItem ? JSON.parse(loadedCommentsForItem) : {};
      setState({...state, commentsForItem});
    } catch (e) {
      console.log('Failed to load comments from storage!');
    }
  }

  const openCommentScreen = (id) => setState({...state, showModal: true, selectedItemId: id});
  const closeCommentScreen = (id) => setState({...state, showModal: false, selectedItemId: id});

  const onSubmitComment = (newComment) => {
    const { selectedItemId, commentsForItem } = state;
    const comments = commentsForItem[selectedItemId] || [];

    const updatedCommentsForItem = {
      ...commentsForItem,
      [selectedItemId]: [...comments, newComment]
    };

    setState({...state, commentsForItem: updatedCommentsForItem});

    try {
      AsyncStorage.setItem(ASYNC_STORAGE_COMMENTS_KEY, JSON.stringify(updatedCommentsForItem));
    } catch (e) {
      console.log('Failed to save comment', newComment, 'for', selectedItemId);
    }
  };

  const { selectedItemId, commentsForItem } = state;

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Image Feed</Text>
      </View>

      <Feed
        style={styles.feed}
        commentsForItem={commentsForItem}
        onPressComments={openCommentScreen} />

      <Modal
        visible={state.showModal}
        animationType="slide"
        onRequestClose={closeCommentScreen}>
        <Comments
          onClose={closeCommentScreen}
          comments={commentsForItem[selectedItemId] || []}
          onSubmitComment={onSubmitComment} />
      </Modal>
    </View>
  );
}

const platformVersion =
  Platform.OS === 'ios' ? parseInt(Platform.Version, 10) : Platform.Version;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleContainer: {
    paddingTop: 40,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#D6D7DA',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  feed: {
    flex: 1,
    marginTop:
      Platform.OS === 'android' || platformVersion < 11
        ? Constants.statusBarHeight
        : 0,
  },
});
