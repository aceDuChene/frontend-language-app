import React from "react";
import { StyleSheet, View, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import "firebase/firestore";
import { db } from "../../firebaseSetup";
import { Formik } from "formik";
import * as Yup from "yup";

import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import FormMessages from "../components/FormMessages";

const categories = ["Time ", "Weather ", "Animals ", "Travel ", "Food ", "Activities "];
const validationSchema = Yup.object().shape({
    image: Yup.string().required().label("Image"),
    title: Yup.string().required().label("Title"),
    prompt: Yup.string().required().label("Prompt"),
    answer: Yup.string().required().label("Answer"),
    category: Yup.string().required().label("Category"),
  });
  
function AdminScreen() {
    const createErrorAlert = () =>
    Alert.alert("Submission Error", "Please double check the DB and try again.", [
      {
        text: "OK",
      },
    ]);

  const createSubmitAlert = () =>
    Alert.alert(
      "Submission successful",
      "Your scenario has been sent to the database.",
      [
        {
          test: "OK",
        },
      ]
    );

    const addScenario = async(fields) => {
        await db.collection("Scenarios")
        .add({
            title: fields.title,
            prompt: fields.prompt,
            answer: fields.answer,
            image: fields.image,
            category: fields.category,
            altText: fields.altText,
            answerRecording: {},
            answerTranslation: {},
            promptRecording: {},
            promptTranslation: {},
            translatorID: {},
        })
        .then(() => {
            console.log("Scenario successfully written!");
            createSubmitAlert();
        })
        .catch((error) => {
            console.error("Error writing Scenario: ", error);
            createErrorAlert();
        });
    }
    return (
        <View>
          <KeyboardAwareScrollView>
            <View style={styles.container}>

              <Formik
                initialValues={{
                  image: "",
                  title: "",
                  prompt: "",
                  answer: "",
                  category: "",
                  altText: "",
                }}
                // function that gets called when form is submitted
                // values contain the data in each field in key value pair
                onSubmit={(values) => addScenario(values)}
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
                    <AppTextInput
                      placeholder="Type Scenario Title"
                      onChangeText={handleChange("title")}
                      onBlur={() => setFieldTouched("title")}
                    />
                    <FormMessages
                      error={errors.title}
                      visible={touched.title}
                      errorMessage={errors.title}
                    />

<AppTextInput
                      placeholder="Prompt here"
                      onChangeText={handleChange("prompt")}
                      onBlur={() => setFieldTouched("prompt")}
                    />
                    <FormMessages
                      error={errors.answer}
                      visible={touched.answer}
                      errorMessage={errors.answer}
                    />
        
        <AppTextInput
                      placeholder="Answer here"
                      onChangeText={handleChange("answer")}
                      onBlur={() => setFieldTouched("answer")}
                    />
                    <FormMessages
                      error={errors.answer}
                      visible={touched.answer}
                      errorMessage={errors.answer}
                    />

                    <AppTextInput
                      placeholder="Input image location from storage"
                      onChangeText={handleChange("image")}
                      onBlur={() => setFieldTouched("image")}
                    />
                    <FormMessages
                      error={errors.image}
                      visible={touched.image}
                      errorMessage={errors.image}
                    />

<AppTextInput
                      placeholder="Alt Text"
                      onChangeText={handleChange("altText")}
                      onBlur={() => setFieldTouched("altText")}
                    />
                    <FormMessages
                      error={errors.altText}
                      visible={touched.altText}
                      errorMessage={errors.altText}
                    />

                    <AppTextInput
                      placeholder="Type Category"
                      onChangeText={handleChange("category")}
                      onBlur={() => setFieldTouched("category")}
                    />
                    <FormMessages
                      error={errors.category}
                      visible={touched.category}
                      errorMessage={errors.category}
                    />

                    <AppText>{categories}</AppText>
    
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

export default AdminScreen;
