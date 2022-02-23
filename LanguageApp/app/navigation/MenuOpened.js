import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import colors from "../config/colors";
import routes from "./routes";
import { UserTypeContext } from "./UserTypeContext";

// Adapted from React Native FlatList doc https://reactnative.dev/docs/flatlist#example

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.text, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);

function MenuOpened({ onPress, currentScreen }) {
  const [selectedId, setSelectedId] = useState(null);
  const [userType, setUserType] = useContext(UserTypeContext);
  const navigation = useNavigation();

  const DATA = [
    {
      id: routes.USER_TYPE,
      title: "Choose User Type",
      nav: () => navigation.navigate(routes.USER_TYPE),
    },
  ];

  if (currentScreen != "user") {
    DATA.push({
      id: routes.LANGUAGES,
      title: "Choose Language",
      nav: () =>
        navigation.navigate(routes.LANGUAGES, {
          user_type: userType,
        }),
    });
  }

  DATA.push(
    {
      id: "LOG_OUT",
      title: "Log out",
      nav: () => console.log("pressed logout"),
    },
    {
      id: "CLOSE_MODAL",
      title: "Close",
      nav: onPress,
    }
  );

  const renderItem = ({ item }) => {
    const backgroundColor = colors.white;
    const color = colors.black;

    return (
      <Item
        item={item}
        backgroundColor={{ backgroundColor }}
        onPress={item.nav}
        textColor={{ color }}
      />
    );
  };

  return (
    <>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
        style={styles.menuStyle}
      />
    </>
  );
}

const styles = StyleSheet.create({
  menuStyle: {
    position: "absolute",
    zIndex: 1,
    right: 0,
    borderWidth: 1,
    backgroundColor: colors.white,
    width: 200,
    top: 70,
    right: 10,
  },
  item: {
    padding: 20,
    borderWidth: 2,
  },
  text: {
    fontSize: 14,
    textTransform: "uppercase",
    fontWeight: "bold",
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
});

export default MenuOpened;
