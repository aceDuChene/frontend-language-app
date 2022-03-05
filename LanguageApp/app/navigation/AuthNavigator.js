import React from "react";
import {
  LoginScreen,
  SignupScreen,
  WelcomeScreen,
  AboutScreen,
} from "../screens";

import { createStackNavigator } from "@react-navigation/stack";

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerStatusBarHeight: 50,
        headerTitleStyle: { fontSize: 30, paddingBottom: 10 },
      }}
    >
      <AuthStack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="About"
        component={AboutScreen}
        options={{ title: "What is Locute?" }}
      />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Signup" component={SignupScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
