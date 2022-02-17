import React, { useState } from "react";
import { Audio } from "expo-av";

import AppButtonSecondary from "./AppButtonSecondary";

function RecordButton({ passData, type }) {
  /* To store Audio recordings 
    Method obatined from 'expo-av' documentation https://docs.expo.dev/versions/latest/sdk/audio/
  */

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
    const uri = recording.getURI();
    passData(uri, type);
  }

  return (
    <AppButtonSecondary
      title={recording ? "Stop Recording" : "Start Recording"}
      onPress={recording ? stopRecording : startRecording}
    ></AppButtonSecondary>
  );
}

export default RecordButton;
