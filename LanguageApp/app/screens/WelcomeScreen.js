import React from "react";
import { StyleSheet, View, Image } from "react-native";

import AppTitle from "../components/AppTitle";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import AppButton from "../components/AppButton";
import colors from "../config/colors";

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
        <AppTitle style={styles.welcomeText}>TITLE OF THE APP</AppTitle>
        <AppText style={styles.welcomeText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </AppText>
        <AppButton title="LOG IN" color={colors.white} />
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
    paddingTop: 100,
    paddingRight: 25,
    paddingLeft: 25,
  },
  mainLogo: {
    height: 200,
    width: 200,
    borderRadius: 100,
  },
  welcomeText: {
    textAlign: "center",
  },
});

export default WelcomeScreen;
