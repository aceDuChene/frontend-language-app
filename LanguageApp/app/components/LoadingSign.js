import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

import colors from "../config/colors";

function LoadingSign({ style }) {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size="large" color={colors.lightBlue} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default LoadingSign;
