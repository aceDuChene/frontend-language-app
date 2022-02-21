import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, Platform } from "react-native";
import { Audio } from "expo-av";
import { storage } from "../../firebaseSetup";

import colors from "../config/colors";

function AppButtonSecondary({ title, uri, color }) {
  //   Make button text black if background color is set to white
  let btnTextColor = colors.white;
  if (color === colors.white) {
    btnTextColor = colors.primary;
  }

  const [cpRecording, setCpRecording] = useState();
  const [sound, setSound] = useState();

  /* Retrieve audio recording from Storage */
  const getAudioUrl = async () => {
    let audioRef = storage.refFromURL(uri);
    await audioRef
      .getDownloadURL()
      .then((url) => {
        setCpRecording(url);
      })
      .catch((err) => {
        setError(err);
      });
  };
  /* Playing audio function based upon documentation: https://docs.expo.dev/versions/latest/sdk/audio/ */
  async function playSound() {
    console.log("cpRecording: ", cpRecording);
    const { sound } = await Audio.Sound.createAsync({
      uri: cpRecording,
    });
    setSound(sound);
    await sound.playAsync();
  }

  useEffect(() => {
    getAudioUrl();
  }, []);

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={playSound}
    >
      <Text style={[styles.text, { color: btnTextColor }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.lightBlue,
    borderWidth: 1,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: "40%",
    marginVertical: 10,
  },
  text: {
    fontSize: 14,
    textTransform: "uppercase",
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
});

export default AppButtonSecondary;
