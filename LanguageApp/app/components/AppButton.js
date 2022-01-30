import React from "react";
import { StyleSheet, Text, TouchableOpacity, Platform } from "react-native";

import colors from "../config/colors";

function AppButton({ title, onPress, color = colors.primary }) {
  // Make button text black if background color is set to white
  let btnTextColor = colors.white;
  if (color === colors.white) {
    btnTextColor = colors.primary;
  }

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color: btnTextColor }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 10,
  },
  text: {
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
});

export default AppButton;
