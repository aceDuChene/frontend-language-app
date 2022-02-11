import React from "react";
import { useState } from "react";
import { StyleSheet, View, Button as RNButton } from "react-native";

import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";

import { auth } from "../../firebaseSetup";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async () => {
    try {
      if (email !== "" && password !== "") {
        await auth.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <AppText>Login</AppText>
      <AppTextInput
        placeholder="Enter email"
        textContentType="emailAddress"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <AppTextInput
        placeholder="Enter password"
        textContentType="password"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <AppButton title="Submit" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
});
