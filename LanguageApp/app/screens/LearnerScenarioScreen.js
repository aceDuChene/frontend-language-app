import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Audio } from "expo-av";
import { storage } from "../../firebaseSetup";

import AppButton from "../components/AppButton";
import AppTextInput from "../components/AppTextInput";
import AppText from "../components/AppText";
import ScenarioImage from "../components/ScenarioImage";
import AppButtonSecondary from "../components/AppButtonSecondary";
import SoundButton from "../components/SoundButton";

function LearnerScenarioScreen({ route }) {
  const [scenario, setScenario] = useState(route.params);
  const [error, setError] = useState(null);
  // const [cpRecording, setCpRecording] = useState();
  // const [sound, setSound] = useState();

  /* To store Audio recordings */
  // Stores all of recording object, (sound, uri, duration, etc..), resets to undefined in stopRecording because used in if/else
  const [recording, setRecording] = useState();
  //Stores just the recording URI
  const [llanswerAudio, setllAnswerAudio] = useState();
  //Stores LL answer text
  const [llAnswer, setllAnswer] = useState("");

  // /* Retrieve audio recording from Storage */
  // const getAudioUrl = async () => {
  //   let audioRef = storage.refFromURL(
  //     scenario.promptRecording[scenario.language]
  //   );
  //   await audioRef
  //     .getDownloadURL()
  //     .then((url) => {
  //       setCpRecording(url);
  //     })
  //     .catch((err) => {
  //       setError(err);
  //     });
  // };

  // useEffect(() => {
  //   getAudioUrl();
  // }, []);

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

  // /* Playing audio function based upon documentation: https://docs.expo.dev/versions/latest/sdk/audio/ */
  // async function playSound() {
  //   getAudioUrl();
  //   const { sound } = await Audio.Sound.createAsync({
  //     uri: cpRecording,
  //   });
  //   setSound(sound);
  //   await sound.playAsync();
  // }

  if (error) {
    return <ErrorMessage message="Error fetching data" />;
  }

  return (
    <View>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <ScenarioImage uriLink={scenario.image} />

          {/* <AppButtonSecondary title={"Play prompt"} onPress={playSound} /> */}
          <SoundButton
            title={"Play prompt"}
            uri={scenario.promptRecording[scenario.language]}
          ></SoundButton>
          <AppText style={styles.text}>
            {scenario.promptTranslation[scenario.language]}
          </AppText>

          <View style={styles.spacer}></View>

          <AppButtonSecondary
            title={recording ? "Stop Recording" : "Record Answer"}
            onPress={recording ? stopRecording : startRecording}
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

          <AppButton
            color="grey"
            title="Show Answer"
            onPress={(e) =>
              Alert.alert(
                "The translated answer is: ",
                scenario.answerTranslation[scenario.language],
                [{ text: "OK" }]
              )
            }
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
    margin: 20,
  },
  text: {
    textAlign: "center",
    margin: 12,
  },
});

export default LearnerScenarioScreen;
