import { StyleSheet, View, ScrollView } from "react-native";
import React from "react";

import AppButton from "../components/AppButton";
import routes from "../navigation/routes";
import colors from "../config/colors";
import AppText from "../components/AppText";

function UserTypeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <AppText>
          With this app, you can study as a Language Learner or upload
          translations of prompts and answers as a Content Provider.{"\n"}
          {"\n"}As a Language Learner, you can browse according to Language and
          Category to choose a scenario you would like to study. Play the prompt
          recording to listen to the prompt spoken aloud. You can then choose to
          record your response, which will be transliterated, or you may simply
          type in your answer. When you submit, your answer will be graded
          compared to the Content Provider's stored response.{"\n"}
          {"\n"}As a Content Provider, you will choose your language and see
          which categories and scenarios need translations. You will record and
          enter text of your translation of prompts and answers. Your reponses
          will be saved for Language Learners to study from.{"\n"}
        </AppText>
        <AppButton
          title="Let's get started!"
          onPress={() => navigation.navigate(routes.USER_TYPE)}
        ></AppButton>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
    paddingHorizontal: 25,
  },
  scrollView: {
    height: "90%",
    width: "90%",
    margin: 20,
    alignSelf: "center",
    padding: 20,
    borderWidth: 5,
    borderRadius: 5,
    backgroundColor: colors.white,
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50,
  },
});

export default UserTypeScreen;
