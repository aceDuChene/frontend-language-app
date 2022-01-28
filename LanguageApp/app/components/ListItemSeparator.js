import React from "react";
import { View, StyleSheet } from "react-native";

import colors from "../config/colors";

function ListItemSeparator(props) {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  separator: {
    width: "95%",
    height: 2,
    marginStart: "5%",
    backgroundColor: colors.separator,
  },
});

export default ListItemSeparator;
