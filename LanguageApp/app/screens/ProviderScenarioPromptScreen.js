import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Audio } from "expo-av";

import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import ScenarioImage from "../components/ScenarioImage";
import AppTitle from "../components/AppTitle";
import colors from "../config/colors";
import Screen from "../components/Screen";

const initialData = {
  id: 12312432,
  title: "Asking the Time",
  prompt: "What time is it?",
  answer: "It's three in the afternoon.",
  image: "https://reactnative.dev/img/tiny_logo.png",
  category: "Time",
};

function ProviderScenarioPromptScreen(translatorId) {
  /* **** TO ADD ******
    - API call to Firebase to post recording and get link for cpPrompt recording, setPromptAudioLink
    - API call to Firebase to post recording get link for cpAnswer recording, setAnswerAudioLink
    - On Submit button press: POST request to Firebase
  */

  /* To be updated with scenario data from DB */
  const [scenario, setScenario] = useState(initialData);

  const [cpPrompt, setCpPrompt] = useState("");

  /* To store Audio recordings */
  // Stores all of recording object, (sound, uri, duration, etc..), resets to undefined in stopRecording because used in if/else
  const [recording, setRecording] = useState();

  //Stores just the recording URI; change to what's needed for Firebase (sound?)
  const [promptAudio, setPromptAudio] = useState();

  /* To be used with Firebase - links set after Firebase API call */
  const [promptAudioLink, setPromptAudioLink] = useState("example link 1");

  const translatedScenario = {
    promptTranslation: cpPrompt,
    promptRecording: promptAudioLink,
    translatorID: 11111111,
  };

  const submitTranslation = async () => {
    console.log("submitting to database", translatedScenario);
    console.log("Prompt audio uri to submit to Firebase", promptAudio);
    /* TO DO:  Add code to sumbit to Firestore */
    setCpPrompt("");
  };

  /* For recording audio using expo-av audio functions provided in the documentation: https://docs.expo.dev/versions/latest/sdk/audio/ */
  async function startRecording() {
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording.getURI());
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording(item) {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    setPromptAudio(recording);
    console.log("Recording stopped and stored at", recording.getURI());
  }

  return (
    <Screen>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <AppTitle style={styles.text}>{scenario.title}</AppTitle>

          <ScenarioImage uriLink={scenario.image} />
          {/* <AppText style={styles.header}>"Prompt"</AppText> */}
          <AppText style={styles.text}>Prompt: {scenario.prompt}</AppText>
          <Button
            title={recording ? "Stop Recording" : "Start Recording Prompt"}
            onPress={recording ? stopRecording : startRecording}
          />
          <TextInput
            style={styles.input}
            placeholder="Type Prompt Translation"
            onChangeText={(value) => setCpPrompt(value)}
          />
          <AppText style={styles.text}>Answer: {scenario.answer}</AppText>

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

export default ProviderScenarioPromptScreen;
