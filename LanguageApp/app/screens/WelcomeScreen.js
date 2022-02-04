import React from "react";
import { StyleSheet, View, Image } from "react-native";

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
        <Image
          style={styles.mainLogo}
          source={{
            uri: "https://picsum.photos/200",
          }}
        />
        <AppTitle style={styles.welcomeText}>TITLE OF THE APP</AppTitle>
        <AppText style={[styles.welcomeText, { paddingBottom: 50 }]}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </AppText>
        <AppButton
          title="LOG IN"
          color={colors.white}
          onPress={() => navigation.navigate(routes.USER_TYPE)}
        />
        <AppButton
          title="REGISTER"
          onPress={() => navigation.navigate(routes.USER_TYPE)}
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
