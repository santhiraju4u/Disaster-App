import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Game = (props) => {
  return (
    <View style={styles.screen}>
      <Text>The Game Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
    height: 90,
    padding: 10,
    alignItems: "center",
  },
});

export default Game;
