import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";

import AppTitle from "../components/AppTitle";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import AppButton from "../components/AppButton";
import routes from "../navigation/routes";
import colors from "../config/colors";

const WelcomeScreen = ({ navigation }) => {
  return (
    <Screen>
      <View style={styles.container}>
        <TouchableOpacity
          title="ABOUT"
          onPress={() => {
            navigation.navigate(routes.ABOUT);
          }}
        >
          <Image
            style={styles.mainLogo}
            source={require("../assets/LOCUTE.png")}
          />
        </TouchableOpacity>

        <AppTitle style={styles.welcomeText}>LOCUTE</AppTitle>
        <AppText style={[styles.welcomeText]}>
          Practice to learn.
        </AppText>
        <AppText style={[styles.welcomeText, { paddingTop: 0 }]}>
          Provide to help.
        </AppText>
        <AppText style={[styles.welcomeText, { paddingTop: 0, paddingBottom: 15 }]}>
          We can all Locute.
        </AppText>
        <AppButton
          title="LOG IN"
          color={colors.white}
          onPress={() => navigation.navigate(routes.LOGIN)}
        />
        <AppButton
          title="SIGN UP"
          onPress={() => navigation.navigate(routes.SIGNUP)}
        />
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
    paddingTop: 15,
    textAlign: "center",
  },
});

export default WelcomeScreen;
