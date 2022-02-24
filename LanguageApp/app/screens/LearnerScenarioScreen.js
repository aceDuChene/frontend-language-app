import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import AppButton from "../components/AppButton";
import AppTextInput from "../components/AppTextInput";
import AppText from "../components/AppText";
import ScenarioImage from "../components/ScenarioImage";
import AppButtonSecondary from "../components/AppButtonSecondary";
import SoundButton from "../components/SoundButton";
import SpeechToTextButton from "../components/SpeechToTextButton";

import colors from "../config/colors";

function LearnerScenarioScreen({ route }) {
  const scenario = route.params;

  const [llAnswer, setllAnswer] = useState("");

  /* TO DO: Add functionality to compare LL and CP answers */
  const gradeTranslation = async () => {
    // determine distancde-wise match
    // send alert about correct/try again
    console.log("grading the answer");
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

          <SpeechToTextButton
            getTranscription={(transcription) => setllAnswer(transcription)}
            languageCode={scenario.language_code}
          />

          <AppTextInput
            value={llAnswer}
            placeholder="Type Answer Translation"
            onChangeText={(value) => setllAnswer(value)}
          />

          <AppButton
            title="submit"
            onPress={(e) => (e.preventDefault(), gradeTranslation())}
          />
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
  text: {
    textAlign: "center",
    margin: 12,
  },
});

export default LearnerScenarioScreen;
