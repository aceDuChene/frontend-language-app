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
import { RECORDING_OPTION_IOS_OUTPUT_FORMAT_LINEARPCM } from "expo-av/build/Audio";

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

  /* To store Audio recordings */
  // Stores all of recording object, (sound, uri, duration, etc..), resets to undefined in stopRecording because used in if/else
  const [recordingPrompt, setRecordingPrompt] = useState();
  const [recordingAnswer, setRecordingAnswer] = useState();

  //Stores just the recording URI; change to what's needed for Firebase
  const [promptAudio, setPromptAudio] = useState();
  const [answerAudio, setAnswerAudio] = useState();

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
    - API call to Firebase to post recording and get link for cpPrompt recording, setPromptAudioLink
    - API call to Firebase to post recording get link for cpAnswer recording, setAnswerAudioLink
    - On Submit button press: POST request to Firebase
  */

  const submitTranslation = async () => {
    console.log("submitting to database", translatedScenario);
    console.log("Prompt audio uri to submit to Firebase", promptAudio);
    console.log("Answer audio uri to submit to Firebase", answerAudio);
    /* TO DO:  Add code to sumbit to Firestore */
    setCpPrompt("");
    setCpAnswer("");
  };

  /* For recording audio using expo-av */
  async function startRecordingPrompt() {
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log("Starting recording..");
      const { recordingPrompt } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecordingPrompt(recordingPrompt);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecordingPrompt() {
    console.log("Stopping recording..");
    setRecordingPrompt(undefined);
    await recordingPrompt.stopAndUnloadAsync();
    console.log("Recording stopped and stored at", recordingPrompt.getURI());
    setPromptAudio(recordingPrompt.getURI());
  }

  async function startRecordingAnswer() {
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log("Starting recording..");
      const { recordingAnswer } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecordingAnswer(recordingAnswer);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecordingAnswer() {
    console.log("Stopping recording..");
    setRecordingAnswer(undefined);
    await recordingAnswer.stopAndUnloadAsync();
    console.log("Recording stopped and stored at", recordingAnswer.getURI());
    setAnswerAudio(recordingAnswer.getURI());
  }

  return (
    <Screen>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <AppTitle style={styles.text}>{scenario.title}</AppTitle>

          <ScenarioImage uriLink={scenario.image} />
          <AppText style={styles.text}>{scenario.prompt}</AppText>
          <Button
            title={recordingPrompt ? "Stop" : "Start"}
            onPress={
              recordingPrompt ? stopRecordingPrompt : startRecordingPrompt
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Type Prompt Translation"
            onChangeText={(value) => setCpPrompt(value)}
          />
          <AppText style={styles.text}>{scenario.answer}</AppText>
          <Button
            title={recordingAnswer ? "Stop Recording" : "Start Recording"}
            onPress={
              recordingAnswer ? stopRecordingAnswer : startRecordingAnswer
            }
          />
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
