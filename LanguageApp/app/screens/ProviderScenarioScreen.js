import React, { useContext } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import firebase from "firebase/compat/app";
import "firebase/firestore";
import { db } from "../../firebaseSetup";
import { Formik } from "formik";
import * as Yup from "yup";

import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import ScenarioImage from "../components/ScenarioImage";
import RecordButton from "../components/RecordButton";
import AppTextInput from "../components/AppTextInput";
import FormMessages from "../components/FormMessages";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import routes from "../navigation/routes";

const validationSchema = Yup.object().shape({
  cpPrompt: Yup.string().required().label("Prompt text"),
  cpAnswer: Yup.string().required().label("Answer text"),
  promptAudio: Yup.string().required().label("Prompt audio"),
  answerAudio: Yup.string().required().label("Answer audio"),
});
function ProviderScenarioScreen({ route, navigation }) {
  // Retrieve authenticated user information
  const { user } = useContext(AuthenticatedUserContext);

  const scenario = route.params;

  // keep track of how the db was before submitting
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

  // Create calls to use to add to DB
  // https://firebase.google.com/docs/firestore/manage-data/add-data#update_fields_in_nested_objects
  const dbCalls = {
    answerRecordingLanguage: "answerRecording." + scenario.language,
    answerTranslationLanguage: "answerTranslation." + scenario.language,
    promptRecordingLanguage: "promptRecording." + scenario.language,
    promptTranslationLanguage: "promptTranslation." + scenario.language,
    translatorIDLanguage: "translatorID." + scenario.language,
  };

  const updateScenario = async (fields) => {
    let updateError = false;

    await db
      .collection("Scenarios")
      .doc(scenario.id)
      .update({
        [dbCalls.answerRecordingLanguage]: fields.answerAudio,
        [dbCalls.answerTranslationLanguage]: fields.cpAnswer,
        [dbCalls.promptRecordingLanguage]: fields.promptAudio,
        [dbCalls.promptTranslationLanguage]: fields.cpPrompt,
        [dbCalls.translatorIDLanguage]: user.uid,
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
  const submitTranslation = async (fields) => {
    const scenarioError = await updateScenario(fields);
    const languageError = await updateLanguage();
    const categoryError = await updateCategory();
    const errorStatus = scenarioError || languageError || categoryError;
    return errorStatus;
  };

  const resetScenario = async () => {
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
        [dbCalls.translatorIDLanguage]: firebase.firestore.FieldValue.delete(),
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
    console.log("Successfully updated, returning to scenarios screen.");
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

  const pressedSubmit = async (fields) => {
    const errorStatus = await submitTranslation(fields);
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

          <Formik
            initialValues={{
              cpPrompt: "",
              cpAnswer: "",
              promptAudio: "",
              answerAudio: "",
            }}
            // function that gets called when form is submitted
            // values contain the data in each field in key value pair
            onSubmit={(values) => pressedSubmit(values)}
            validationSchema={validationSchema}
          >
            {({
              handleChange,
              handleSubmit,
              errors,
              setFieldTouched,
              touched,
              values,
            }) => (
              <>
                <RecordButton
                  type="Prompt"
                  getReference={handleChange("promptAudio")}
                  scenarioID={scenario.id}
                  language={scenario.language}
                />
                {values.promptAudio ? (
                  <FormMessages successMessage="Prompt audio recorded" />
                ) : null}
                <FormMessages
                  error={errors.promptAudio}
                  visible={touched.promptAudio}
                  errorMessage="Prompt audio not recorded"
                />

                <AppTextInput
                  placeholder="Type Prompt Translation"
                  onChangeText={handleChange("cpPrompt")}
                  onBlur={() => setFieldTouched("cpPrompt")}
                />
                <FormMessages
                  error={errors.cpPrompt}
                  visible={touched.cpPrompt}
                  errorMessage={errors.cpPrompt}
                />

                <AppText style={styles.text}>{scenario.answer}</AppText>

                <RecordButton
                  type="Answer"
                  getReference={handleChange("answerAudio")}
                  scenarioID={scenario.id}
                  language={scenario.language}
                />
                {values.answerAudio ? (
                  <FormMessages successMessage="Answer audio recorded" />
                ) : null}
                <FormMessages
                  error={errors.answerAudio}
                  visible={touched.answerAudio}
                  errorMessage="Answer audio not recorded"
                />

                <AppTextInput
                  placeholder="Type Answer Translation"
                  onChangeText={handleChange("cpAnswer")}
                  onBlur={() => setFieldTouched("cpAnswer")}
                />

                <FormMessages
                  error={errors.cpAnswer}
                  visible={touched.cpAnswer}
                  errorMessage={errors.cpAnswer}
                />

                <AppButton title="submit" onPress={handleSubmit} />
              </>
            )}
          </Formik>
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
    fontSize: 22,
    margin: 8,
  },
});

export default ProviderScenarioScreen;
