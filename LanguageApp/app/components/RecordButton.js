import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { Audio } from "expo-av";

import AppButtonSecondary from "./AppButtonSecondary";
import colors from "../config/colors";

function RecordButton({
  passData,
  id,
  title,
  onPress,
  color = colors.lightBlue,
}) {
  /* **** TO ADD ******
    - API call to Firebase to post recording and get link for cpPrompt recording, setPromptAudioLink
    - API call to Firebase to post recording get link for cpAnswer recording, setAnswerAudioLink
    - On Submit button press: POST request to Firebase
  */

  /* To store Audio recordings */
  // Stores all of recording object, (sound, uri, duration, etc..), resets to undefined in stopRecording because used in if/else
  const [recording, setRecording] = useState();

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
    // setRecordedObject(recording);
    const uri = recording.getURI();
    console.log("Storing " + id);
    passData(uri);
    console.log("Recording stopped and stored at", uri);
  }

  return (
    <AppButtonSecondary
      title={recording ? "Stop Recording" : "Start Recording"}
      onPress={recording ? stopRecording : startRecording}
    ></AppButtonSecondary>
  );
}

export default RecordButton;
