import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Audio } from "expo-av";

import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import ScenarioImage from "../components/ScenarioImage";
import AppButtonSecondary from "../components/AppButtonSecondary";
import { db } from "../../firebaseSetup";

function LearnerScenarioScreen({ route }) {
  /* **** TO ADD ******
    - Add call to Speech-to-Text to convert LL audio to text
    - Add function to compare LL answer to CP answer and respond with alert success/try again
    - Add playback functionality to play CP Prompt recording
  */

  /* To be updated with scenario data from DB */
  const [scenario, setScenario] = useState(route.params.scenario.item);
  const [cpRecording, setCpRecording] = useState();
  console.log("Scenario", scenario);

  /* To store Audio recordings */
  // Stores all of recording object, (sound, uri, duration, etc..), resets to undefined in stopRecording because used in if/else
  const [recording, setRecording] = useState();
  //Stores just the recording URI; change to what's needed for Firebase
  const [llanswerAudio, setllAnswerAudio] = useState();

  //Stores LL answer text
  const [llAnswer, setllAnswer] = useState("");

  /* TO DO: Add functionality to compare LL and CP answers, convert speech-to-text as necessary */
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

  /* For playing audio 
  TO DO: fill remaining function based upon documentation: https://docs.expo.dev/versions/latest/sdk/audio/ */
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
          <ScenarioImage uriLink={scenario.image} />

          <AppButtonSecondary title={"Play prompt"} onPress={playSound} />
          <AppText style={styles.text}>{scenario.prompt}</AppText>

          <View style={styles.spacer}></View>

          <AppButtonSecondary
            title={recording ? "Stop Recording" : "Record Answer"}
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
  spacer: {
    margin: 30,
  },
  text: {
    textAlign: "center",
    margin: 12,
  },
});

export default LearnerScenarioScreen;
