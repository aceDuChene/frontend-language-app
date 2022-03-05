import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import * as Yup from "yup";

import {
  AppButton,
  AppTextInput,
  AppText,
  ScenarioImage,
  AppButtonSecondary,
  SoundButton,
  SpeechToTextButton,
  FormMessages,
} from "../components";

import colors from "../config/colors";
import { DOMAIN } from "@env";

const validationSchema = Yup.object().shape({
  llAnswer: Yup.string().required().label("Answer"),
});

function LearnerScenarioScreen({ route }) {
  const scenario = route.params;

  // Makes call to backend to check user answer
  const checkAnswer = async (userAnswer, correctAnswer) => {
    const apiUrl = `https://${DOMAIN}/text-comparison`;

    // Don't make backend call if answer is identical to correct answer
    if (userAnswer === correctAnswer) {
      Alert.alert(`✅ Correct! \nAnswer: ${correctAnswer}`);
      return;
    }

    fetch(apiUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_answer: userAnswer,
        correct_answer: correctAnswer,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.answer) {
          Alert.alert(`✅ Correct! \nAnswer: ${correctAnswer}`);
        } else {
          Alert.alert("❌ Incorrect, please try again.");
        }
      });
  };

  return (
    <View>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <ScenarioImage uriLink={scenario.image} />

          <SoundButton
            title={"Play prompt"}
            uri={scenario.promptRecording[scenario.language]}
            color={colors.lightBlue}
          />
          <AppText style={styles.text}>
            {scenario.promptTranslation[scenario.language]}
          </AppText>

          <Formik
            initialValues={{ llAnswer: "", errorMessage: "" }}
            // function that gets called when form is submitted
            onSubmit={(values) =>
              checkAnswer(
                values.llAnswer,
                scenario.answerTranslation[scenario.language]
              )
            }
            validationSchema={validationSchema}
          >
            {({
              handleChange,
              handleSubmit,
              setFieldTouched,
              touched,
              errors,
              values,
            }) => (
              <>
                <SpeechToTextButton
                  getTranscription={handleChange("llAnswer")}
                  setErrorMessage={handleChange("errorMessage")}
                  languageCode={scenario.language_code}
                />
                {values.errorMessage ? (
                  <AppText style={styles.error}>{values.errorMessage}</AppText>
                ) : null}

                <AppTextInput
                  value={values.llAnswer}
                  placeholder="Type Answer"
                  onChangeText={handleChange("llAnswer")}
                  onBlur={() => setFieldTouched("llAnswer")}
                />
                <FormMessages
                  error={errors.llAnswer}
                  visible={touched.llAnswer}
                  errorMessage={errors.llAnswer}
                />
                <AppButton title="submit" onPress={handleSubmit} />
              </>
            )}
          </Formik>

          <View style={styles.answerButtons}>
            <AppButtonSecondary
              title="Show Answer"
              onPress={(e) =>
                Alert.alert(
                  "The translated answer is: ",
                  scenario.answerTranslation[scenario.language],
                  [{ text: "OK" }]
                )
              }
              color={colors.lightRed}
            />
            <View style={styles.spacer}></View>
            <SoundButton
              title={"Play Answer"}
              uri={scenario.answerRecording[scenario.language]}
              color={colors.lightRed}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  answerButtons: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  spacer: {
    margin: 20,
  },
  error: { color: colors.red, fontStyle: "italic" },
  text: {
    textAlign: "center",
    margin: 8,
    fontSize: 22,
  },
});

export default LearnerScenarioScreen;
