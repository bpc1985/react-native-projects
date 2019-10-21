import React, { useState, useEffect } from "react";
import { Animated, StyleSheet, View, LayoutAnimation } from "react-native";
import PropTypes from "prop-types";

import Button from "../components/Button";
import Logo from "../components/Logo";
import Toggle from "../components/Toggle";
import configureTransition from "../utils/configureTransition";
import sleep from "../utils/sleep";

const State = {
  Launching: "Launching",
  WillTransitionIn: "WillTransitionIn",
  WillTransitionOut: "WillTransitionOut"
};

const BOARD_SIZES = [3, 4, 5, 6];

export default function Start({ size, onChangeSize, onStartGame }) {
  const [state, setState] = useState({ transitionState: State.Launching });

  const startAnimating = async () => {
    await sleep(500);
    const animation = LayoutAnimation.create(
      750,
      LayoutAnimation.Types.easeInEaseOut,
      LayoutAnimation.Properties.opacity
    );
    LayoutAnimation.configureNext(animation);
    setState({ transitionState: State.WillTransitionIn });
  };

  useEffect(() => {
    startAnimating();
  }, []);

  const toggleOpacity = new Animated.Value(0);
  const buttonOpacity = new Animated.Value(0);

  Animated.timing(toggleOpacity, {
    toValue: 1,
    duration: 500,
    delay: 500,
    useNativeDriver: true
  }).start();

  Animated.timing(buttonOpacity, {
    toValue: 1,
    duration: 500,
    delay: 1000,
    useNativeDriver: true
  }).start();

  const toggleStyle = { opacity: toggleOpacity };
  const buttonStyle = { opacity: buttonOpacity };

  handlePressStart = async () => {
    setState({ transitionState: State.WillTransitionOut });
    onStartGame();
  };

  const { transitionState } = state;

  return (
    transitionState !== State.WillTransitionOut && (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Logo />
        </View>
        {transitionState !== State.Launching && (
          <Animated.View style={toggleStyle}>
            <Toggle options={BOARD_SIZES} value={size} onChange={onChangeSize} />
          </Animated.View>
        )}
        {transitionState !== State.Launching && (
          <Animated.View style={buttonStyle}>
            <Button title={"Start Game"} onPress={handlePressStart} />
          </Animated.View>
        )}
      </View>
    )
  );
}

Start.propTypes = {
  size: PropTypes.number.isRequired,
  onChangeSize: PropTypes.func.isRequired,
  onStartGame: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 20
  },
  logo: {
    alignSelf: "stretch",
    paddingHorizontal: 40
  }
});
