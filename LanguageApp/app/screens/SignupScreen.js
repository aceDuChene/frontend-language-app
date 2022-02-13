// Source: https://blog.jscrambler.com/how-to-integrate-firebase-authentication-with-an-expo-app

import React from "react";
import { useState } from "react";
import { View } from "react-native";

import AppButton from "../components/AppButton";
import AppTextInput from "../components/AppTextInput";
import AuthErrorMsg from "../components/AuthErrorMsg";

import LoginSignUpStyles from "../styles/LoginSignupStyles";

import { auth } from "../../firebaseSetup";

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupError, setSignupError] = useState("");

  const onHandleSignup = async () => {
    try {
      if (email !== "" && password !== "") {
        await auth.createUserWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setSignupError(error.message);
    }
  };

  return (
    <View style={LoginSignUpStyles.container}>
      <AppTextInput
        placeholder="Enter email"
        textContentType="emailAddress"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={LoginSignUpStyles.inputs}
      />
      <AppTextInput
        placeholder="Enter password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={LoginSignUpStyles.inputs}
      />
      <AppTextInput
        placeholder="Re-enter password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={LoginSignUpStyles.inputs}
      />
      <AppButton title="Submit" onPress={onHandleSignup} />
      {signupError ? <AuthErrorMsg error={signupError} visible={true} /> : null}
    </View>
  );
}
