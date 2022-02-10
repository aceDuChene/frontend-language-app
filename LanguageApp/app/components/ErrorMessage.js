import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "./AppText";

function ErrorMessage({ style, message }) {
  return (
    <View style={[styles.container, style]}>
      <AppText>{message}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ErrorMessage;
