import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import ScenarioImage from "../components/ScenarioImage";
import RecordButton from "../components/RecordButton";
import AppTextInput from "../components/AppTextInput";
import { db } from "../../firebaseSetup";
import firebase from 'firebase/app';
import 'firebase/firestore';

function ProviderScenarioScreen({ route }) {
  /* **** TO ADD ******
    - API call to Firebase to post recording and get link for cpPrompt recording, setPromptAudioLink
    - API call to Firebase to post recording get link for cpAnswer recording, setAnswerAudioLink
    - On Submit button press: POST request to Firebase
    ! TO DO: need to get user id
  */
  const [uploading, setUploading] = useState("");

  /* scenario data from DB brought in from previous screens */
  const [scenario, setScenario] = useState(route.params);
  const [scenarioLanguage, setScenarioLanguage] = useState(scenario.language);
  const [scenarioCategory, setScenarioCategory] = useState(scenario.category);

  // Stores the translated text
  const [cpPrompt, setCpPrompt] = useState("");
  const [cpAnswer, setCpAnswer] = useState("");

  // Stores just the recording URI; change to what's needed for Firebase (sound?)
  const [promptAudio, setPromptAudio] = useState();
  const [answerAudio, setAnswerAudio] = useState();

  // Store the audio links from Firebase - links set after the Firebase call
  const [promptAudioLink, setPromptAudioLink] = useState("example link 1");
  const [answerAudioLink, setAnswerAudioLink] = useState("example link 2");

  // Passes audio data between the screen and RecordButton component
  // adapted from https://www.kindacode.com/article/passing-data-from-a-child-component-to-the-parent-in-react/
  const passLinkPrompt = (data) => {
    setPromptAudio(data);
  };

  const passLinkAnswer = (data) => {
    setAnswerAudio(data);
  };

    // Submission data to be passed to Firebase
    const translatedScenario = {
      promptTranslation: cpPrompt,
      answerTranslation: cpAnswer,
      promptRecording: promptAudioLink,
      answerRecording: answerAudioLink,
      translatorID: 11111111,
    };

  const submitTranslation = async () => {
    console.log("submitting to database", translatedScenario);
    console.log("Prompt audio uri to submit to Firebase", promptAudio);
    console.log("Answer audio uri to submit to Firebase", answerAudio);

    // Create calls to use to add to DB
    // https://firebase.google.com/docs/firestore/manage-data/add-data#update_fields_in_nested_objects
    var answerRecordingLanguage = "answerRecording." + route.params.language;
    var answerTranslationLanguage = "answerTranslation." + route.params.language;
    var promptRecordingLanguage = "promptRecording." + route.params.language;
    var promptTranslationLanguage = "promptTranslation." + route.params.language;
    var translatorIdLanguage = "translatorId." + route.params.language;
    db.collection("Scenarios").doc(route.params.id).update({
      [answerRecordingLanguage]: answerAudio,
      [answerTranslationLanguage]: cpPrompt,
      [promptRecordingLanguage]: promptAudio,
      [promptTranslationLanguage]: cpAnswer,
      [translatorIdLanguage]: 12353464563
    }).then(() => {
        console.log(route.params.title, " scenario successfully updated!");})
      .catch((error) => {
        console.error("Error updating document: ", error);
      });

    db.collection("Languages")
      .doc(route.params.language_key)
      .update({
        hasContent: true,
      })
      .then(() => {
        console.log(route.params.language, " language successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });

    var hasContentLanguage = "hasContent." + route.params.language;
    db.collection("Categories").doc(route.params.category_key).update({
      [hasContentLanguage]: true
    })      .then(() => {
      console.log(route.params.category, " category successfully updated!");
    })
    .catch((error) => {
      console.error("Error updating document: ", error);
    });
  };

  return (
    <View>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <ScenarioImage uriLink={scenario.image} />
          <AppText style={styles.text}>{scenario.prompt}</AppText>
          <RecordButton id="prompt" passData={passLinkPrompt} />
          <AppTextInput
            // style={styles.input}
            placeholder="Type Prompt Translation"
            onChangeText={(value) => setCpPrompt(value)}
          />
          <AppText style={styles.text}>{scenario.answer}</AppText>
          <RecordButton id="answer" passData={passLinkAnswer} />
          <AppTextInput
            // style={styles.input}
            placeholder="Type Answer Translation"
            onChangeText={(value) => setCpAnswer(value)}
          />

          <AppButton
            title="submit"
            onPress={(e) => (e.preventDefault(), submitTranslation())}
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
  text: {
    textAlign: "center",
    margin: 12,
  },
});

export default ProviderScenarioScreen;
