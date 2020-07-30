import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const CategoriesScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>First time user?</Text>
      <Button
        title="Go to login page!"
        onPress={() => {
          props.navigation.navigate({ routeName: "Authentication" });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CategoriesScreen;
