import { StyleSheet, View } from "react-native";
import React from "react";

import AppTitle from "../components/AppTitle";
import Screen from "../components/Screen";
import AppButton from "../components/AppButton";

function UserTypeScreen() {
  return (
    <Screen>
      <View style={styles.container}>
        <AppTitle style={styles.title}>Choose User Type</AppTitle>
        <AppButton
          title="Content Provider"
          onPress={() => console.log("pressed CP")}
        />
        <AppButton
          title="Language Learner"
          onPress={() => console.log("pressed LL")}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
  },
});

export default UserTypeScreen;
