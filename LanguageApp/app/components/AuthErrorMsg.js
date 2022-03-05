// Source: https://blog.jscrambler.com/how-to-integrate-firebase-authentication-with-an-expo-app

import React from "react";
import { StyleSheet } from "react-native";

import AppText from "./AppText";

const AuthErrorMsg = ({ error, visible }) => {
  if (!error || !visible) {
    return null;
  }

  return <AppText style={styles.errorText}>{error}</AppText>;
};

const styles = StyleSheet.create({
  errorText: {
    color: "red",
    fontWeight: "800",
  },
});

export default AuthErrorMsg;
