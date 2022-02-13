import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import UserTypeScreen from "../screens/UserTypeScreen";
import LanguagesScreen from "../screens/LanguagesScreen";
import CategoriesScreen from "../screens/CategoriesScreen";
import ScenariosScreen from "../screens/ScenariosScreen";
import ProviderScenarioScreen from "../screens/ProviderScenarioScreen";
import LearnerScenarioScreen from "../screens/LearnerScenarioScreen";

const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerTitleAlign: "center",
      headerStatusBarHeight: 50,
      headerTitleStyle: { fontSize: 30, paddingBottom: 10 },
    }}
  >
    <Stack.Screen name="User Type" component={UserTypeScreen} />
    <Stack.Screen name="Languages" component={LanguagesScreen} />
    <Stack.Screen
      name="Categories"
      component={CategoriesScreen}
      options={({ route }) => ({ title: route.params.language })}
    />
    <Stack.Screen
      name="Scenarios"
      component={ScenariosScreen}
      options={({ route }) => ({ title: route.params.category })}
    />
    <Stack.Screen
      name="ProviderScenario"
      component={ProviderScenarioScreen}
      options={({ route }) => ({ title: route.params.title })}
    />
    <Stack.Screen
      name="LearnerScenario"
      component={LearnerScenarioScreen}
      options={({ route }) => ({ title: route.params.title })}
    />
  </Stack.Navigator>
);
export default AppNavigator;
