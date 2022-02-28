import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
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
import FormErrorMessages from "../components/FormErrorMessages";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";

const validationSchema = Yup.object().shape({
  cpPrompt: Yup.string().required().label("Prompt text"),
  cpAnswer: Yup.string().required().label("Answer text"),
  promptAudio: Yup.string().required().label("Prompt audio"),
  answerAudio: Yup.string().required().label("Answer audio"),
});

function ProviderScenarioScreen({ route }) {
  // Retrieve authenticated user information
  const { user } = useContext(AuthenticatedUserContext);

  const scenario = route.params;

  /* Method to update the scenario document in Firebase */
  const submitTranslation = async (fields) => {
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
        [answerRecordingLanguage]: fields.answerAudio,
        [answerTranslationLanguage]: fields.cpAnswer,
        [promptRecordingLanguage]: fields.promptAudio,
        [promptTranslationLanguage]: fields.cpPrompt,
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

          <Formik
            initialValues={{
              cpPrompt: "",
              cpAnswer: "",
              promptAudio: "",
              answerAudio: "",
            }}
            // function that gets called when form is submitted
            // values contain the data in each field in key value pair
            onSubmit={(values) => submitTranslation(values)}
            validationSchema={validationSchema}
          >
            {({
              handleChange,
              handleSubmit,
              errors,
              setFieldTouched,
              touched,
            }) => (
              <>
                <RecordButton
                  type="prompt"
                  getReference={handleChange("promptAudio")}
                  scenarioID={scenario.id}
                  language={scenario.language}
                />
                <FormErrorMessages
                  error={errors.promptAudio}
                  visible={touched.promptAudio}
                  message="Prompt audio not recorded"
                />

                <AppTextInput
                  placeholder="Type Prompt Translation"
                  onChangeText={handleChange("cpPrompt")}
                  onBlur={() => setFieldTouched("cpPrompt")}
                />
                <FormErrorMessages
                  error={errors.cpPrompt}
                  visible={touched.cpPrompt}
                  message={errors.cpPrompt}
                />

                <AppText style={styles.text}>{scenario.answer}</AppText>

                <RecordButton
                  type="answer"
                  getReference={handleChange("answerAudio")}
                  scenarioID={scenario.id}
                  language={scenario.language}
                />
                <FormErrorMessages
                  message="Answer audio not recorded"
                  error={errors.answerAudio}
                  visible={touched.answerAudio}
                />

                <AppTextInput
                  placeholder="Type Answer Translation"
                  onChangeText={handleChange("cpAnswer")}
                  onBlur={() => setFieldTouched("cpAnswer")}
                />
                <FormErrorMessages
                  error={errors.cpAnswer}
                  visible={touched.cpAnswer}
                  message={errors.cpAnswer}
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
