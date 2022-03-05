// Source: https://blog.jscrambler.com/how-to-integrate-firebase-authentication-with-an-expo-app
import React from "react";
import { useState } from "react";
import { View } from "react-native";
import { AppButton, AppTextInput, AuthErrorMsg } from "../components";
import LoginSignUpStyles from "../styles/LoginSignupStyles";

import { auth } from "../../firebaseSetup";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const onLogin = async () => {
    try {
      if (email !== "" && password !== "") {
        await auth.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setLoginError(error.message);
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
      {loginError ? <AuthErrorMsg error={loginError} visible={true} /> : null}
    </View>
  );
}
