import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Audio } from "expo-av";

import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import ScenarioImage from "../components/ScenarioImage";
import AppTitle from "../components/AppTitle";

const initialData = {
  id: 12312432,
  title: "Telling Time",
  prompt: "What time is it?",
  answer: "It's three in the afternoon.",
  image: "https://reactnative.dev/img/tiny_logo.png",
  promptRecording: "firebaselink",
  answerRecording: "firebaseLink",
  promptTranslation: "Quehora es?",
  answerTranslation: "Son las tres de la tarde",
  category: "Time",
};

function LearnerScenarioScreen({ route }) {
  /* To be updated with scenario data from DB */
  const [scenario, setScenario] = useState(initialData);
  const [cpRecording, setCpRecording] = useState();

  /* To store Audio recordings */
  // Stores all of recording object, (sound, uri, duration, etc..), resets to undefined in stopRecording because used in if/else
  const [recording, setRecording] = useState();
  //Stores just the recording URI; change to what's needed for Firebase
  const [llanswerAudio, setllAnswerAudio] = useState();

  //Stores LL answer text
  const [llAnswer, setllAnswer] = useState("");

  const gradeTranslation = async () => {
    // If audio -> speech-to-text, update text state with setllAnswer
    // determine distancde-wise match
    // send alert about correct/try again
    console.log("grading the answer");
  };

  /* For recording audio using expo-av */
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
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    setllAnswerAudio(recording.getURI());
    console.log("Recording stopped and stored at", recording.getURI());
  }

  /* For playing audio */
  async function playSound() {
    // load the recording based on the URI from firebase
    console.log("Loading recording");
    // const { cpRecording } = await Audio.Sound.createAsync({
    //   uri: scenario.promptRecording,
    // });
  }

  return (
    <View>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          {/* <AppTitle style={styles.text}>{scenario.title}</AppTitle> */}

          <ScenarioImage uriLink={scenario.image} />
          <Button
            style={styles.button}
            title={"Play prompt recording"}
            onPress={playSound}
          />
          <AppText style={styles.text}>{scenario.prompt}</AppText>
          <View style={styles.spacer}></View>

          <Button
            style={styles.button}
            title={recording ? "Stop Recording" : "Start Recording Answer"}
            onPress={recording ? stopRecording : startRecording}
          />
          <TextInput
            style={styles.input}
            placeholder="Type Answer Translation"
            onChangeText={(value) => setllAnswer(value)}
          />

          <AppButton
            title="submit"
            onPress={(e) => (e.preventDefault(), gradeTranslation())}
          />

          <AppButton
            title="Show Answer"
            onPress={(e) => (
              e.preventDefault(), console.log("Show the Answer")
            )}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
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
  button: {
    marginBottom: 12,
  },
  spacer: {
    margin: 30,
  },
  text: {
    textAlign: "center",
    margin: 12,
  },
});

export default LearnerScenarioScreen;
