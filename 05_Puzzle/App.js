import React, { useState, useEffect } from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  UIManager,
} from 'react-native';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';

import { createPuzzle } from './utils/puzzle';
import { getRandomImage } from './utils/api';
import Game from './screens/Game';
import Start from './screens/Start';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const BACKGROUND_COLORS = ['#1B1D34', '#2A2A38'];

const initState = {
  size: 3,
  puzzle: null,
  image: null
};

export default function App() {
  const [state, setState] = useState(initState);

  const preloadNextImage = async () => {
    const image = await getRandomImage();
    Image.prefetch(image.uri);
    setState({ ...state, image });
  }

  useEffect(() => {
    preloadNextImage();
  }, []);

  const handleChangeSize = size => {
    setState({ ...state, size });
  };

  const handleStartGame = () => {
    const { size } = state;
    setState({ ...state, puzzle: createPuzzle(size) });
  };

  const handleGameChange = puzzle => {
    setState({ ...state, puzzle });
  };

  const handleQuit = () => {
    setState({ ...state, puzzle: null, image: null });
    preloadNextImage();
  };

  const { size, puzzle, image } = state;

  return (
    <LinearGradient style={styles.background} colors={BACKGROUND_COLORS}>
      <StatusBar barStyle={'light-content'} />
      <SafeAreaView style={styles.container}>
        {!puzzle && (
          <Start
            size={size}
            onStartGame={handleStartGame}
            onChangeSize={handleChangeSize}
          />
        )}
        {puzzle && (
          <Game
            puzzle={puzzle}
            image={image}
            onChange={handleGameChange}
            onQuit={handleQuit}
          />
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginTop:
      Platform.OS === 'android' || parseInt(Platform.Version, 10) < 11
        ? Constants.statusBarHeight
        : 0,
  },
});