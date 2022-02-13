import React from "react";
import { useState } from "react";
import { StyleSheet, View, Button as RNButton } from "react-native";

import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";

import LoginSignUpStyles from "../styles/LoginSignupStyles";

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
    <View style={LoginSignUpStyles.container}>
      <AppTextInput
        placeholder="Enter Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={LoginSignUpStyles.inputs}
      />
      <AppTextInput
        placeholder="Enter Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={LoginSignUpStyles.inputs}
      />
      <AppButton title="Submit" onPress={onLogin} />
    </View>
  );
}
