import React from "react";
import { Image, StyleSheet } from "react-native";

function ScenarioImage({ uriLink }) {
  return <Image style={styles.rectangle} source={{ uri: uriLink }} />;
}

const styles = StyleSheet.create({
  rectangle: {
    width: 300,
    height: 200,
    margin: 12,
  },
});

export default ScenarioImage;
