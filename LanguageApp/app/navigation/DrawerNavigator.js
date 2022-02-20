import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';

import UserTypeScreen from "../screens/UserTypeScreen";
import LanguagesScreen from "../screens/LanguagesScreen";
import CategoriesScreen from "../screens/CategoriesScreen";
import ScenariosScreen from "../screens/ScenariosScreen";

const Drawer = createDrawerNavigator();

function MyDrawer(){
  return(
    <Drawer.Navigator>
        <Drawer.Screen name="Choose User Type" component={UserTypeScreen} />
        <Drawer.Screen name="Languages" component={LanguagesScreen} />
        <Drawer.Screen name="Categories" component={CategoriesScreen} />
        <Drawer.Screen name="Scenarios" component={ScenariosScreen} />
    </Drawer.Navigator>
  )
}

export default MyDrawer;
