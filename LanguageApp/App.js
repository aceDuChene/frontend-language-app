import React from "react";
import Screen from "./app/components/Screen";
import ProviderScenarioScreen from "./app/screens/ProviderScenarioScreen";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import AppNavigator from "./app/navigation/AppNavigator";

function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

export default App;
