import { StyleSheet, View } from "react-native";
import React from "react";
import { Screen, AppButton } from "../components";
import routes from "../navigation/routes";
import colors from "../config/colors";

function UserTypeScreen({ navigation }) {
  return (
    <Screen>
      <View style={styles.container}>
        <AppButton
          title="Content Provider"
          color={colors.white}
          onPress={() =>
            navigation.navigate(routes.LANGUAGES, {
              user_type: "CP",
            })
          }
        />
        <AppButton
          title="Language Learner"
          onPress={() =>
            navigation.navigate(routes.LANGUAGES, { user_type: "LL" })
          }
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
    paddingHorizontal: 25,
  },
});

export default UserTypeScreen;
