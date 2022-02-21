import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Audio } from "expo-av";

import colors from "../config/colors";

import AppButton from "../components/AppButton";
import AppTextInput from "../components/AppTextInput";
import AppText from "../components/AppText";
import ScenarioImage from "../components/ScenarioImage";
import AppButtonSecondary from "../components/AppButtonSecondary";
import SoundButton from "../components/SoundButton";

function LearnerScenarioScreen({ route }) {
  const [scenario, setScenario] = useState(route.params);
  const [error, setError] = useState(null);

  /* To store Audio recordings */
  // Stores all of recording object, (sound, uri, duration, etc..), resets to undefined in stopRecording because used in if/else
  const [recording, setRecording] = useState();
  //Stores just the recording URI
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

  if (error) {
    return <ErrorMessage message="Error fetching data" />;
  }

  return (
    <View>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <ScenarioImage uriLink={scenario.image} />

          <SoundButton
            title={"Play prompt"}
            uri={scenario.promptRecording[scenario.language]}
            color={colors.lightBlue}
          />
          <AppText style={styles.text}>
            {scenario.promptTranslation[scenario.language]}
          </AppText>

          <View style={styles.spacer}></View>

          <AppButtonSecondary
            title={recording ? "Stop Recording" : "Record Answer"}
            onPress={recording ? stopRecording : startRecording}
            color={colors.lightBlue}
          />
          <AppTextInput
            // style={styles.input}
            placeholder="Type Answer Translation"
            onChangeText={(value) => setllAnswer(value)}
          />

          <AppButton
            title="submit"
            onPress={(e) => (e.preventDefault(), gradeTranslation())}
          />
          <View style={styles.answerButtons}>
            <AppButtonSecondary
              title="Show Answer"
              onPress={(e) =>
                Alert.alert(
                  "The translated answer is: ",
                  scenario.answerTranslation[scenario.language],
                  [{ text: "OK" }]
                )
              }
              color={colors.lightRed}
            />
            <View style={styles.spacer}></View>
            <SoundButton
              title={"Play Answer"}
              uri={scenario.answerRecording[scenario.language]}
              color={colors.lightRed}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  answerButtons: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
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
    margin: 20,
  },
  text: {
    textAlign: "center",
    margin: 12,
  },
});

export default LearnerScenarioScreen;
