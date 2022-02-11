import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import AppNavigator from "./app/navigation/AppNavigator";
import { AuthenticatedUserProvider } from "./app/navigation/AuthenticatedUserProvider";
import RootNavigator from "./app/navigation/RootNavigator";

function App() {
  return (
    // <NavigationContainer>
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
    // </NavigationContainer>
  );
}

export default App;
