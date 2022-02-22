import React, { useState } from "react";
// import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet, TouchableOpacity, Text } from "react-native";


import UserTypeScreen from "../screens/UserTypeScreen";
import LanguagesScreen from "../screens/LanguagesScreen";
import CategoriesScreen from "../screens/CategoriesScreen";
import ScenariosScreen from "../screens/ScenariosScreen";
import routes from "./routes";
import colors from "../config/colors";

// const Drawer = createDrawerNavigator();

// function CustomDrawerContent({ navigation }){
//     // console.log(navigation);
//   return (
//     <>
//     <Button 
//       title="User Type"
//         onPress={() => {
//           navigation.navigate(routes.USER_TYPE)
//         }}
//     />    
//     <Button 
//     title="Languages"
//       onPress={() => {
//         navigation.navigate(routes.LANGUAGES)
//       }}
//     />
//     </>
//   )
// }

// import { createStackNavigator } from "@react-navigation/stack";
// const Stack = createStackNavigator();

// function NotVisibleScreens(){
//   return(
//     <Stack.Navigator>
//       <Stack.Screen name="Categories" component={CategoriesScreen}/>
//       <Stack.Screen name="Scenarios" component={ScenariosScreen}/>
//     </Stack.Navigator>
//   )
// }

// function MyDrawer({ navigation }){
//   return(
//     <Drawer.Navigator 
//     // drawerContent={ (props) =>    
//     //     <CustomDrawerContent {...props}/>
//     // }
//     >
//       <Drawer.Screen name="User Type" component={UserTypeScreen}/>
//       <Drawer.Screen name="Languages" component={LanguagesScreen} />
//       <Drawer.Screen name="Categories" component={CategoriesScreen}
//       options={{drawerItemStyle: {height: 0}}}
//       />
//       <Drawer.Screen name="Scenarios" component={ScenariosScreen}
//       options={{drawerItemStyle: {height: 0}}}
//       />
//       <Drawer.Screen name="Not Visible" component={NotVisibleScreens} 
//         options={{drawerItemStyle: {height: 0}}}
//       />
//       {/* <Drawer.Screen name="Categories" component={CategoriesScreen} /> */}
//     </Drawer.Navigator>
//   )
// }

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
