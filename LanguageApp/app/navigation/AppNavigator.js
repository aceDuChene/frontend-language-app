import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "../screens/WelcomeScreen";
import UserTypeScreen from "../screens/UserTypeScreen";
import LanguagesScreen from "../screens/LanguagesScreen";
import CategoriesScreen from "../screens/CategoriesScreen";
import ScenariosScreen from "../screens/ScenariosScreen";
import ProviderScenarioScreen from "../screens/ProviderScenarioScreen";
import LearnerScenarioScreen from "../screens/LearnerScenarioScreen";
import AboutScreen from "../screens/AboutScreen";
import LoginScreen from "../screens/LoginScreen";

import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();

function MyDrawer(){
  return(
    <Drawer.Navigator>
      <Drawer.Screen name="Choose User Type" component={UserTypeScreen} />
      <Drawer.Screen name="Languages" component={LanguagesScreen} />
      <Drawer.Screen name="Categories" component={CategoriesScreen} />
    </Drawer.Navigator>
  )
}

const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerTitleAlign: "center",
      headerStatusBarHeight: 50,
      headerTitleStyle: { fontSize: 30, paddingBottom: 10 },
    }}
  >
    <Stack.Screen name="I don't want this" component={MyDrawer} options={{headerShown:false}}/>
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
