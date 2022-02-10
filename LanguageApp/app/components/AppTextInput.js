import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import colors from "../config/colors";

function AppTextInput({ icon, width = "100%", ...otherProps }) {
  return (
    <View style={[styles.container, { width }]}>
      {icon && (
        <MaterialIcons
          name={icon}
          size={20}
          color={colors.medium}
          style={styles.icon}
        />
      )}
      <TextInput
        placeholderTextColor={colors.medium}
        style={styles.text}
        {...otherProps}
      ></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    borderColor: colors.separator,
    padding: 5,
    paddingHorizontal: 20,
    borderWidth: 3,
    flexDirection: "row",
    margin: 5,
  },
  icon: {
    margin: 5,
  },
  text: {
    fontSize: 20,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
});

export default AppTextInput;
