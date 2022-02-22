import React, { useState } from "react";
// import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet, TouchableOpacity, Text } from "react-native";


import UserTypeScreen from "../screens/UserTypeScreen";
import LanguagesScreen from "../screens/LanguagesScreen";
import CategoriesScreen from "../screens/CategoriesScreen";
import ScenariosScreen from "../screens/ScenariosScreen";
import routes from "./routes";
import colors from "../config/colors";
import DrawerMenu from "./DrawerMenu";

function TheDrawer({ title, onPress, color = colors.lightBlue }) {
  // Make button text black if background color is set to white
  let btnTextColor = colors.white;
  if (color === colors.white) {
    btnTextColor = colors.primary;
  }

  const [toggle, setToggle] = useState(true);
  const toggleFunction = () => {
    setToggle(!toggle);
  }

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={() => toggleFunction()}
    >
      <Text style={[styles.text, { color: btnTextColor }]}>
        {toggle ? "Menu" : "Open"}
      </Text>
      {toggle ? null : <DrawerMenu />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.lightBlue,
    borderWidth: 1,
    borderRadius: 25,
    padding: 10,
    right: 10,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    textTransform: "uppercase",
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  }
});

export default TheDrawer;
