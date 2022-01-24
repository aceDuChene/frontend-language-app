import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import AppButton from "./app/components/AppButton";
import AppText from "./app/components/AppText";

export default function App() {
  return (
    <View style={styles.container}>
      <AppText style={styles.text}>
        Crowd-sourced Immersive Language Learning App!
      </AppText>
      <AppButton title="Let's do it" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  text: {
    textAlign: "center",
  },
});
