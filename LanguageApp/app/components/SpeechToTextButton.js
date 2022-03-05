import React, { useState } from "react";
import { View, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { DOMAIN } from "@env";
import { LoadingSign } from "./";

function SpeechToTextButton({
  getTranscription,
  setErrorMessage,
  languageCode,
}) {
  const [recording, setRecording] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  async function startRecording() {
    setErrorMessage("");
    setIsRecording(true);
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording } = await Audio.Recording.createAsync({
        android: {
          extension: ".amr",
          audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AMR_WB,
          outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_AMR_WB,
        },
        ios: {
          extension: ".amr",
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
          audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
          outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_AMR_WB,
        },
      });
      setRecording(recording);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    setIsRecording(false);
    setRecording(undefined);
    try {
      await recording.stopAndUnloadAsync();
      await speechToText();
    } catch (err) {
      console.error("Failed to stop recording", err);
    }
  }

  async function speechToText() {
    const uri = recording.getURI();
    setIsProcessing(true);
    getTranscription("Processing...");
    try {
      const api = `https://${DOMAIN}/audio/` + languageCode;
      const response = await FileSystem.uploadAsync(api, uri);
      if (response.status === 400) {
        const body = JSON.parse(response.body);
        setErrorMessage(body.text);
        getTranscription("");
      } else {
        const body = JSON.parse(response.body);
        getTranscription(body.text);
      }
    } catch (err) {
      setErrorMessage("Trascription currently not available");
    }
    setIsProcessing(false);
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPressOut={isRecording ? stopRecording : startRecording}
    >
      <View style={styles.icon}>
        {isProcessing ? (
          <LoadingSign />
        ) : (
          <View>
            {isRecording ? (
              <MaterialCommunityIcons name="stop" size={40} />
            ) : (
              <MaterialCommunityIcons name="microphone" size={40} />
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 70,
    backgroundColor: "white",
    borderRadius: 50,
    borderColor: "black",
    borderWidth: 3,
    marginVertical: 10,
  },
  dim: {
    opacity: 0.2,
  },
  icon: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SpeechToTextButton;
