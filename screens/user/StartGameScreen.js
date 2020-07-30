import React from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";
import Input from "../../components/UI/Input";

const StartGameScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Enter you login details!</Text>
      <Card style={styles.inputContainer}>
        <Text>Enter username here</Text>
        <TextInput />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              title="Login"
              onPress={() => {
                props.navigation.navigate({ routeName: "SignUp" });
              }}
              color={Colors.primary}
            />
          </View>
          <Text>or</Text>
          <View style={styles.button}>
            <Button title="Signup" onPress={() => {}} />
          </View>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "120%",
    justifyContent: "space-between",
    paddingHorizontal: 70,
  },
  button: {
    width: 80,
    height: 50,
  },
});

export default StartGameScreen;
