import { StyleSheet, TextInput, View } from "react-native";
import React, { useState, createContext, useEffect, useContext } from "react";
import { useIsFocused } from "@react-navigation/native";

import Screen from "../components/Screen";
import AppButton from "../components/AppButton";
import routes from "../navigation/routes";
import colors from "../config/colors";
import { UserTypeContext } from "../navigation/UserTypeContext";

function UserTypeScreen({ navigation }) {
  const [userType, setUserType] = useContext(UserTypeContext);
  const isFocused = useIsFocused();

  useEffect(() => {
    setUserType(userType);
  }, [isFocused]);

  return (
    <Screen>
      <View style={styles.container}>
        <AppButton
          title="Content Provider"
          color={colors.white}
          onPress={() => {
            setUserType("CP");
            navigation.navigate(routes.LANGUAGES, { user_type: "CP" });
          }}

          // {() =>
          //   navigation.navigate(routes.LANGUAGES, {
          //     user_type: "CP",
          //   })
          // }
        />
        <AppButton
          title="Language Learner"
          onPress={() => {
            setUserType("LL");
            navigation.navigate(routes.LANGUAGES, { user_type: "LL" });
          }}
          // onPress={() =>
          //   navigation.navigate(routes.LANGUAGES, { user_type: "LL" })
          // }
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
