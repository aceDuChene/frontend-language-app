import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { Audio } from "expo-av";
import { storage } from "../../firebaseSetup";

import AppButtonSecondary from "./AppButtonSecondary";

function RecordButton({ passData, type, scenarioID }) {
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

    try {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          try {
            resolve(xhr.response);
          } catch (error) {
            console.log("error:", error);
          }
        };
        xhr.onerror = (e) => {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });
      if (blob != null) {
        const uriParts = uri.split(".");
        const fileType = uriParts[uriParts.length - 1];
        const filePath = "/cp-audio/" + type + scenarioID + fileType;
        storage
          .ref()
          .child(`${filePath}`)
          .put(blob, {
            contentType: `audio/${fileType}`,
          })
          .then(() => {
            console.log("Sent!");
            passData(filePath);
          })
          .catch((e) => console.log("error:", e));
      } else {
        console.log("error with blob");
      }
    } catch (error) {
      console.log("error:", error);
    }
  }

  return (
    <AppButtonSecondary
      title={recording ? "Stop Recording" : "Start Recording"}
      onPress={recording ? stopRecording : startRecording}
    ></AppButtonSecondary>
  );
}

export default RecordButton;
