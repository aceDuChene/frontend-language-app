// Source: https://blog.jscrambler.com/how-to-integrate-firebase-authentication-with-an-expo-app
import React from "react";
import { useState } from "react";
import { View } from "react-native";
import { AppButton, AppTextInput, AuthErrorMsg } from "../components";
import LoginSignUpStyles from "../styles/LoginSignupStyles";

import { auth } from "../../firebaseSetup";

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [signupError, setSignupError] = useState("");

  const onHandleSignup = async () => {
    try {
      if (email !== "" && password1 !== "" && password2 !== "") {
        if (password1 !== password2) {
          setSignupError("Passwords do not match.");
        } else {
          await auth.createUserWithEmailAndPassword(email, password2);
        }
      }
    } catch (error) {
      setSignupError(error.message);
    }
  };

  return (
    <View style={LoginSignUpStyles.container}>
      <AppTextInput
        placeholder="Enter Email"
        textContentType="emailAddress"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={LoginSignUpStyles.inputs}
      />
      <AppTextInput
        placeholder="Enter Password"
        secureTextEntry={true}
        value={password1}
        onChangeText={(text) => setPassword1(text)}
        style={LoginSignUpStyles.inputs}
      />
      <AppTextInput
        placeholder="Re-enter Password"
        secureTextEntry={true}
        value={password2}
        onChangeText={(text) => setPassword2(text)}
        style={LoginSignUpStyles.inputs}
      />
      <AppButton title="Submit" onPress={onHandleSignup} />
      {signupError ? <AuthErrorMsg error={signupError} visible={true} /> : null}
    </View>
  );
}
