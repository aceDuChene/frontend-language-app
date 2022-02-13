import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import ScenarioImage from "../components/ScenarioImage";
import RecordButton from "../components/RecordButton";
import AppTextInput from "../components/AppTextInput";
import { db } from "../../firebaseSetup";

function ProviderScenarioScreen({ route }) {
  /* **** TO ADD ******
    - API call to Firebase to post recording and get link for cpPrompt recording, setPromptAudioLink
    - API call to Firebase to post recording get link for cpAnswer recording, setAnswerAudioLink
    - On Submit button press: POST request to Firebase
  */

  const [uploading, setUploading] = useState("");

  /* To be updated with scenario data from DB */
  const [scenario, setScenario] = useState(route.params);
  const [scenarioLanguage, setScenarioLanguage] = useState(scenario.language);
  const [scenarioCategory, setScenarioCategory] = userState(scenario.category);

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
  // custom object: https://firebase.google.com/docs/firestore/manage-data/add-data#custom_objects
  class infoToSubmit {
    constructor(
      answerRecording,
      answerTranslation,
      promptRecording,
      promptTranslation,
      translatorID
    ) {
      this.answerRecording = answerRecording;
      this.answerTranslation = answerTranslation;
      this.promptRecording = promptRecording;
      this.promptTranslation = promptTranslation;
      this.translatorID = translatorID;
    }
    toString() {
      return (
        this.answerRecording +
        ", " +
        this.answerTranslation +
        ", " +
        this.promptRecording +
        ", " +
        this.promptTranslation +
        ", " +
        this.translatorID
      );
    }
  }
  // Firestore data converter
  var infoConverter = {
    toFirestore: function (infoToSubmit) {
      return {
        answerRecording: infoToSubmit.answerRecording,
        answerTranslation: infoToSubmit.answerTranslation,
        promptRecording: infoToSubmit.promptRecording,
        promptTranslation: infoToSubmit.promptTranslation,
        translatorID: infoToSubmit.translatorID,
      };
    },
    fromFirestore: function (snapshot, options) {
      const data = snapshot.data(options);
      return new infoToSubmit(
        data.answerRecording,
        data.answerTranslation,
        data.promptRecording,
        data.promptTranslation,
        data.translatorID
      );
    },
  };

  const submitTranslation = async () => {
    console.log("submitting to database", translatedScenario);
    console.log("Prompt audio uri to submit to Firebase", promptAudio);
    console.log("Answer audio uri to submit to Firebase", answerAudio);
    /* TO DO:  Add code to sumbit to Firestore */
    // https://firebase.google.com/docs/firestore/manage-data/add-data
    db.collection("Scenarios")
      .doc(scenario.id)
      .update({
        answerTranslation: db.FieldValue.arrayUnion("get translation here"),
      });

    db.collection("Languages")
      .doc(scenarioLanguage)
      .update({
        hasContent: true,
      })
      .then(() => {
        console.log("Language successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });

    db.collection("Categories")
      .doc(scenarioCategory)
      .update({
        //? does arrayUnion need a then() and catch(error)?
        hasContent: db.FieldValue.arrayUnion(scenarioLanguage),
      });

    setCpPrompt("");
    setCpAnswer("");
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
