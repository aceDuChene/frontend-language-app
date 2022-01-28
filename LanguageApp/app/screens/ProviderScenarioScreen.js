import React, { useState } from "react";
import { Platform, StyleSheet, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import ScenarioImage from "../components/ScenarioImage";
import AppTitle from "../components/AppTitle";
import colors from "../config/colors";
import Screen from "../components/Screen";

const initialData = {
  id: 12312432,
  title: "Scenario Title",
  prompt: "What time is it?",
  answer: "It's three in the afternoon.",
  image: "https://reactnative.dev/img/tiny_logo.png",
  category: "Time",
};

function ProviderScenarioScreen(translatorId) {
  /* To be updated with scenario data from DB */
  const [scenario, setScenario] = useState(initialData);

  const [cpPrompt, setCpPrompt] = useState("");
  const [cpAnswer, setCpAnswer] = useState("");

  /* To be used with Firebase - links set after Firebase API call */
  const [promptAudioLink, setPromptAudioLink] = useState("example link 1");
  const [answerAudioLink, setAnswerAudioLink] = useState("example link 2");

  const translatedScenario = {
    promptTranslation: cpPrompt,
    answerTranslation: cpAnswer,
    promptRecording: promptAudioLink,
    answerRecording: answerAudioLink,
    translatorID: 11111111,
  };

  /* **** TO ADD ******
    - API call to Firebase to get link for cpPrompt recording, setPromptAudioLink
    - API call to Firebase to get link for cpAnswer recording, setAnswerAudioLink
    - On Submit button press: POST request to backend API
  */

  const submitTranslation = async () => {
    console.log("submitting to database", translatedScenario);
    // Add code to sumbit to Firestore
    console.log("added to firebase");
    setCpPrompt("");
    setCpAnswer("");
  };

  return (
    <Screen>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <AppTitle style={styles.text}>{scenario.title}</AppTitle>

          <ScenarioImage uriLink={scenario.image} />
          <AppText style={styles.text}>{scenario.prompt}</AppText>
          <View style={styles.recordAnswer}></View>
          <TextInput
            style={styles.input}
            placeholder="Type Prompt Translation"
            onChangeText={(value) => setCpPrompt(value)}
          />
          <AppText style={styles.text}>{scenario.answer}</AppText>
          <View style={styles.recordAnswer}></View>
          <TextInput
            style={styles.input}
            placeholder="Type Answer Translation"
            onChangeText={(value) => setCpAnswer(value)}
          />

          <AppButton
            title="submit"
            onPress={(e) => (e.preventDefault(), submitTranslation())}
          />
        </View>
      </KeyboardAwareScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
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
