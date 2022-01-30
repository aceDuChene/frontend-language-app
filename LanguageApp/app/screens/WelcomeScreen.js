import React from "react";
import { StyleSheet, View } from "react-native";

import AppTitle from "../components/AppTitle";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import AppButton from "../components/AppButton";

const WelcomeScreen = () => {
  return (
    <Screen>
      <View style={styles.container}>
        <AppTitle style={styles.title}>TITLE OF THE APP</AppTitle>
        <AppText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </AppText>
        <AppButton title="LOG IN" />
        <AppButton title="REGISTER" />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
  },
});

export default WelcomeScreen;
