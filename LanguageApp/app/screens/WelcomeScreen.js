import React from "react";
import { StyleSheet, View, Image } from "react-native";

import AppTitle from "../components/AppTitle";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import AppButton from "../components/AppButton";

const WelcomeScreen = () => {
  return (
    <Screen>
      <View style={styles.container}>
        <Image
          style={styles.mainLogo}
          source={{
            uri: "https://picsum.photos/200",
          }}
        />
        <AppTitle>TITLE OF THE APP</AppTitle>
        <AppText style={{ justifyContent: "center" }}>
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
    paddingTop: 50,
    paddingRight: 25,
    paddingLeft: 25,
  },
  mainLogo: {
    height: 200,
    width: 200,
    borderRadius: 100,
  },
});

export default WelcomeScreen;
