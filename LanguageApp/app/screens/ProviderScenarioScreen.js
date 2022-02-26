import React, { useContext, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import firebase from "firebase/compat/app";
import "firebase/firestore";
import { db, storage } from "../../firebaseSetup";

import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import ScenarioImage from "../components/ScenarioImage";
import RecordButton from "../components/RecordButton";
import AppTextInput from "../components/AppTextInput";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import routes from "../navigation/routes";

function ProviderScenarioScreen({ route, navigation }) {
  // Retrieve authenticated user information
  const { user } = useContext(AuthenticatedUserContext);

  // scenario data from DB brought in from previous screens
  const [scenario, setScenario] = useState(route.params);
  const [scenarioLanguage, setScenarioLanguage] = useState(scenario.language);
  const [scenarioCategory, setScenarioCategory] = useState(scenario.category);

  // Stores the translated text
  const [cpPrompt, setCpPrompt] = useState("");
  const [cpAnswer, setCpAnswer] = useState("");

  // Contains path to audio files uploaded to Storage
  const [promptAudio, setPromptAudio] = useState();
  const [answerAudio, setAnswerAudio] = useState();

  // Record if submitting error occurred
  const [submitError, setSubmitError] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // create error alert
  const createSubmitAlert = () => Alert.alert(
    "Submission Error",
    "Please try again in a few seconds.",
    [ {
      text: "OK",
    }]
  )

  // check if everything is filled in, if so then submit
  const checkInput = () => {
    if(!cpPrompt.trim()){
      alert("Please enter prompt translation.");
      return;
    }
    if(!cpAnswer.trim()){
      alert("Please enter answer translation.");
      return;
    }
    if(!promptAudio){
      alert("Please record prompt translation.");
      return;
    }
    if(!answerAudio){
      alert("Please record answer translation.")
      return;
    }

    // everything is filled in, so submit and go back to scenarios screen
    submitTranslation();
  }

  /* Method to upload audio file to Storage: 
  https://dev.to/lankinen/expo-audio-upload-recording-to-firebase-storage-and-download-it-later-25o6 
  Parameters: uri - URI obtained from recording on device
              type - prompt or answer - passed from button 
  */
  const updateStorage = async (uri, type) => {
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
        const fileName =
          type + scenario.id + route.params.language + "." + fileType;
        const filePath = "/cp-audio/" + fileName;
        storage
          .ref()
          .child(`${filePath}`)
          .put(blob, {
            contentType: `audio/${fileType}`,
          })
          .then(() => {
            const storagePath = "gs://capstone-language-app-fa069.appspot.com";
            if (type == "prompt") {
              setPromptAudio(storagePath + filePath);
            } else {
              setAnswerAudio(storagePath + filePath);
            }
          })
          .catch((e) => console.log("error:", e));
      } else {
        console.log("error with blob");
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  /* Passes audio data between the screen and RecordButton component
    adapted from https://www.kindacode.com/article/passing-data-from-a-child-component-to-the-parent-in-react/
    Parameters: data - data to pass between the screen and component, in this case the recording uri
                type - string prompt or answer depending which button is pressed */
  const passLink = (data, type) => {
    updateStorage(data, type);
  };

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
        setSubmitError(true);
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
        setSubmitError(true);
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
        setSubmitError(true);
      });

      if(!submitError){
        navigation.navigate(routes.SCENARIOS, {
          language: route.params.language,
          language_code: route.params.language_code,
          category: route.params.category,
          user_type: "CP",
          language_key: route.params.language_key,
          category_key: route.params.category_key,
        });
      }
  };

  return (
    <View>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <ScenarioImage uriLink={scenario.image} />
          <AppText style={styles.text}>{scenario.prompt}</AppText>
          <RecordButton type="prompt" passData={passLink} />
          <AppTextInput
            placeholder="Type Prompt Translation"
            onChangeText={(value) => setCpPrompt(value)}
          />
          <AppText style={styles.text}>{scenario.answer}</AppText>
          <RecordButton type="answer" passData={passLink} />
          <AppTextInput
            placeholder="Type Answer Translation"
            onChangeText={(value) => setCpAnswer(value)}
          />

          <AppButton
            title="submit"
            onPress={(e) => (e.preventDefault(), checkInput())}
          />
          {submitError ? createSubmitAlert() : null}

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
