import React from "react";
import { StyleSheet } from "react-native";
import { AppText } from "./";

import colors from "../config/colors";

function FormMessages({ error, errorMessage, successMessage, visible }) {
  if (successMessage)
    return <AppText style={styles.sucess}>{successMessage}</AppText>;
  if (!error || !visible) return null;
  return <AppText style={styles.error}>{errorMessage}</AppText>;
}

const styles = StyleSheet.create({
  error: { color: colors.red, fontStyle: "italic" },
  sucess: { color: colors.green, fontStyle: "italic" },
});

export default FormMessages;
