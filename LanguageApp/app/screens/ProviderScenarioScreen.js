import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import ScenarioImage from "../components/ScenarioImage";
import AppTitle from "../components/AppTitle";
import colors from "../config/colors";

function ProviderScenarioScreen() {
  const [title, setTitle] = useState("Scenario Title"); // will be set when we query DB
  const [uriLink, setUriLink] = useState(
    "https://reactnative.dev/img/tiny_logo.png"
  ); // will be set when we query DB
  const [prompt, setPrompt] = useState("Prompt Text Displayed"); // will be set when we query DB
  const [answer, setAnswer] = useState("Answer To Prompt Displayed"); // will be set when we query DB
  const [cpPrompt, onChangeCpPrompt] = React.useState("Type Prompt");
  const [cpAnswer, onChangeCpAnswer] = React.useState("Type Answer");

  return (
    <View style={styles.container}>
      <AppTitle style={styles.text}>{title}</AppTitle>

      <ScenarioImage uriLink={uriLink} />

      <AppText style={styles.text}>{prompt}</AppText>
      <View style={styles.recordAnswer}></View>
      <TextInput
        style={styles.input}
        onChangeCpPrompt={onChangeCpPrompt}
        value={cpPrompt}
      />

      <AppText style={styles.text}>{answer}</AppText>
      <View style={styles.recordAnswer}></View>
      <TextInput
        style={styles.input}
        onChangeCpAnswer={onChangeCpAnswer}
        value={cpAnswer}
      />

      <AppButton title="submit" />
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    width: "100%",
    padding: 10,
  },
  recordAnswer: {
    width: 50,
    height: 50,
    backgroundColor: colors.primary,
  },
  text: {
    textAlign: "center",
    margin: 12,
  },
});

export default ProviderScenarioScreen;
