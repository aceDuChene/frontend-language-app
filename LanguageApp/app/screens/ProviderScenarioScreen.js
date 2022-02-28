import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import firebase from "firebase/compat/app";
import "firebase/firestore";
import { db } from "../../firebaseSetup";

import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import ScenarioImage from "../components/ScenarioImage";
import RecordButton from "../components/RecordButton";
import AppTextInput from "../components/AppTextInput";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";

function ProviderScenarioScreen({ route }) {
  // Retrieve authenticated user information
  const { user } = useContext(AuthenticatedUserContext);

  const scenario = route.params;

  // Stores the translated text
  const [cpPrompt, setCpPrompt] = useState("");
  const [cpAnswer, setCpAnswer] = useState("");

  // Contains path to audio files uploaded to Storage
  const [promptAudio, setPromptAudio] = useState();
  const [answerAudio, setAnswerAudio] = useState();

  /* Method to update the scenario document in Firebase */
  const submitTranslation = async () => {
    // Create calls to use to add to DB
    // https://firebase.google.com/docs/firestore/manage-data/add-data#update_fields_in_nested_objects
    const answerRecordingLanguage = "answerRecording." + route.params.language;
    const answerTranslationLanguage =
      "answerTranslation." + route.params.language;
    const promptRecordingLanguage = "promptRecording." + route.params.language;
    const promptTranslationLanguage =
      "promptTranslation." + route.params.language;
    const translatorIdLanguage = "translatorId." + route.params.language;
    db.collection("Scenarios")
      .doc(route.params.id)
      .update({
        [answerRecordingLanguage]: answerAudio,
        [answerTranslationLanguage]: cpAnswer,
        [promptRecordingLanguage]: promptAudio,
        [promptTranslationLanguage]: cpPrompt,
        [translatorIdLanguage]: user.uid,
      })
      .then(() => {
        console.log(route.params.title, " scenario successfully updated!");
      })
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

    db.collection("Categories")
      .doc(route.params.category_key)
      .update({
        hasContent: firebase.firestore.FieldValue.arrayUnion(
          route.params.language
        ),
      })
      .then(() => {
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

          <RecordButton
            type="prompt"
            getReference={(reference) => setPromptAudio(reference)}
            scenarioID={scenario.id}
            language={scenario.language}
          />

          <AppTextInput
            placeholder="Type Prompt Translation"
            onChangeText={(value) => setCpPrompt(value)}
          />

          <AppText style={styles.text}>{scenario.answer}</AppText>

          <RecordButton
            type="answer"
            getReference={(reference) => setAnswerAudio(reference)}
            scenarioID={scenario.id}
            language={scenario.language}
          />

          <AppTextInput
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
