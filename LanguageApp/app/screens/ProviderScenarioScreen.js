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

  // Track the db state
  const languageHasContent = scenario.languageHasContent;
  const categoryHasContent = scenario.categoryHasContent;

  const createErrorAlert = () =>
    Alert.alert("Submission Error", "Please try again in a few seconds.", [
      {
        text: "OK",
      },
    ]);

  const createSubmitAlert = () =>
    Alert.alert(
      "Submission successful",
      "Your responses have been sent to the database.",
      [
        {
          test: "OK",
        },
      ]
    );

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

  const createDBCalls = () => {
    // Create calls to use to add to DB
    // https://firebase.google.com/docs/firestore/manage-data/add-data#update_fields_in_nested_objects
    const dbCalls = {
      answerRecordingLanguage: "answerRecording." + scenario.language,
      answerTranslationLanguage: "answerTranslation." + scenario.language,
      promptRecordingLanguage: "promptRecording." + scenario.language,
      promptTranslationLanguage: "promptTranslation." + scenario.language,
      translatorIdLanguage: "translatorID." + scenario.language,
    };

    return dbCalls;
  };

  const updateScenario = async () => {
    let updateError = false;
    const dbCalls = createDBCalls();

    await db
      .collection("Scenarios")
      .doc(scenario.id)
      .update({
        [dbCalls.answerRecordingLanguage]: answerAudio,
        [dbCalls.answerTranslationLanguage]: cpAnswer,
        [dbCalls.promptRecordingLanguage]: promptAudio,
        [dbCalls.promptTranslationLanguage]: cpPrompt,
        [dbCalls.translatorIdLanguage]: user.uid,
      })
      .then(() => {
        console.log(scenario.title, " scenario successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
        createErrorAlert();
        updateError = true;
      });
    return updateError;
  };

  const updateLanguage = async () => {
    let updateError = false;
    await db
      .collection("Languages")
      .doc(scenario.language_key)
      .update({
        hasContent: true,
      })
      .then(() => {
        console.log(scenario.language, " language successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
        createErrorAlert();
        updateError = true;
      });
    return updateError;
  };

  const updateCategory = async () => {
    let updateError = false;
    await db
      .collection("Categories")
      .doc(scenario.category_key)
      .update({
        hasContent: firebase.firestore.FieldValue.arrayUnion(scenario.language),
      })
      .then(() => {
        console.log(scenario.category, " category successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
        createErrorAlert();
        updateError = true;
      });
    return updateError;
  };

  /* Method to update the scenario document in Firebase */
  const submitTranslation = async () => {
    const scenarioError = await updateScenario();
    const languageError = await updateLanguage();
    const categoryError = await updateCategory();
    const errorStatus = scenarioError || languageError || categoryError;
    return errorStatus;
  };

  const resetScenario = async () => {
    const dbCalls = createDBCalls();

    await db
      .collection("Scenarios")
      .doc(scenario.id)
      .update({
        [dbCalls.answerRecordingLanguage]:
          firebase.firestore.FieldValue.delete(),
        [dbCalls.answerTranslationLanguage]:
          firebase.firestore.FieldValue.delete(),
        [dbCalls.promptRecordingLanguage]:
          firebase.firestore.FieldValue.delete(),
        [dbCalls.promptTranslationLanguage]:
          firebase.firestore.FieldValue.delete(),
        [dbCalls.translatorIdLanguage]: firebase.firestore.FieldValue.delete(),
      })
      .then(() => {
        console.log(scenario.title, " scenario successfully reset!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };

  const resetLanguage = async () => {
    await db
      .collection("Languages")
      .doc(scenario.language_key)
      .update({
        hasContent: false,
      })
      .then(() => {
        console.log(scenario.language, " language successfully reset!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };

  const resetCategory = async () => {
    await db
      .collection("Categories")
      .doc(scenario.category_key)
      .update({
        hasContent: firebase.firestore.FieldValue.arrayRemove(
          scenario.language
        ),
      })
      .then(() => {
        console.log(scenario.category, " category successfully reset!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };

  /* Method to reset the scenario document in Firebase in case of an error*/
  const resetTranslation = async () => {
    await resetScenario();
    if (!languageHasContent) {
      await resetLanguage();
    }
    if (!categoryHasContent.includes(scenario.language)) {
      await resetCategory();
    }
  };

  // go back to the scenarios screen with our info
  const sendBackToScenarios = () => {
    console.log("Successfully updated, returning to scenarios screen");
    createSubmitAlert();
    navigation.navigate(routes.SCENARIOS, {
      language: scenario.language,
      language_code: scenario.language_code,
      category: scenario.category,
      user_type: "CP",
      language_key: scenario.language_key,
      category_key: scenario.category_key,
      languageHasContent: languageHasContent,
      categoryHasContent: categoryHasContent,
    });
  };

  const pressedSubmit = async () => {
    const errorStatus = await submitTranslation();
    if (!errorStatus) {
      sendBackToScenarios();
    } else {
      resetTranslation();
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

          <AppButton title="submit" onPress={() => pressedSubmit()} />
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
