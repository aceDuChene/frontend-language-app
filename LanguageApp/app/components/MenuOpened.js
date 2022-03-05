import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppText from "./AppText";

import colors from "../config/colors";
import routes from "../navigation/routes";

import { auth } from "../../firebaseSetup";

// Adapted from React Native FlatList doc https://reactnative.dev/docs/flatlist#example

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <AppText style={[styles.text, textColor]}>{item.title}</AppText>
  </TouchableOpacity>
);

function MenuOpened({ onPress }) {
  const [selectedId, setSelectedId] = useState(null);
  const navigation = useNavigation();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  const DATA = [
    {
      id: routes.USER_TYPE,
      title: "Change User Type",
      nav: () => navigation.navigate(routes.USER_TYPE),
    },
    {
      id: "LOG_OUT",
      title: "logout",
      nav: handleSignOut,
    },
  ];

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
      <TouchableOpacity
        style={[styles.button, styles.buttonOpen]}
        onPress={onPress}
      >
        <MaterialCommunityIcons name="menu" size={30} />
      </TouchableOpacity>
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
  button: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    right: 17,
    bottom: 0,
  },
  menuStyle: {
    position: "absolute",
    zIndex: 1,
    right: 0,
    borderWidth: 0.5,
    backgroundColor: colors.white,
    width: 200,
    top: 50,
    right: 10,
  },
  item: {
    padding: 17,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default MenuOpened;
