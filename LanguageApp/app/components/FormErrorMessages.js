import React from "react";
import { StyleSheet } from "react-native";
import AppText from "./AppText";

import colors from "../config/colors";

function FormErrorMessages({ error, message, visible }) {
  if (!error || !visible) return null;
  return <AppText style={styles.error}>{message}</AppText>;
}

const styles = StyleSheet.create({
  error: { color: colors.red },
});

export default FormErrorMessages;
