import React, { useState } from "react";
import { Audio } from "expo-av";
import { REACT_APP_STORAGE_BUCKET } from "@env";
import colors from "../config/colors";
import AppButtonSecondary from "./AppButtonSecondary";
import "firebase/firestore";
import { storage } from "../../firebaseSetup";

function RecordButton({ type, getReference, scenarioID, language }) {
  /* To store Audio recordings 
    Method obatined from 'expo-av' documentation https://docs.expo.dev/versions/latest/sdk/audio/
  */

  // Stores all of recording object, (sound, uri, duration, etc..), resets to undefined in stopRecording because used in if/else
  const [recording, setRecording] = useState();

  async function startRecording() {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    console.log(uri);
    await updateStorage(uri);
  }

  /* Method to upload audio file to Storage: 
  https://dev.to/lankinen/expo-audio-upload-recording-to-firebase-storage-and-download-it-later-25o6 
  Parameters: uri - URI obtained from recording on device
              type - prompt or answer - passed from button 
  */
  const updateStorage = async (uri) => {
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
        const fileName = scenarioID + language + type + "." + fileType;
        const filePath = `/cp-audio/${fileName}`
        storage
          .ref()
          .child(`${filePath}`)
          .put(blob, {
            contentType: `audio/${fileType}`,
          })
          .then(() => {
            const storagePath = `gs://${REACT_APP_STORAGE_BUCKET}`;
            getReference(storagePath + filePath);
          })
          .catch((e) => console.log("error:", e));
      } else {
        console.log("error with blob");
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <AppButtonSecondary
      title={recording ? "Stop Recording" : "Start Recording"}
      onPress={recording ? stopRecording : startRecording}
      color={colors.lightBlue}
    ></AppButtonSecondary>
  );
}

export default RecordButton;
