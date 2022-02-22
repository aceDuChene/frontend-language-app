import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, Platform, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import colors from "../config/colors";

import routes from "./routes";

// React Native FlatList doc https://reactnative.dev/docs/flatlist#example
const DATA = [
    {
      id: routes.USER_TYPE,
      title: "Choose User Type",
    },
    {
      id: routes.LANGUAGES,
      title: "Choose Language",
    },
    {
      id: routes.CATEGORIES,
      title: "Choose Category",
    },
  ];

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.text, textColor]}>{item.title}</Text>
    </TouchableOpacity>
  );

function MenuOpened() {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? colors.lightBlue : colors.white;
    const color = item.id === selectedId ? colors.white : colors.black;

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
        <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
            style={styles.menuThing}
        />
  );
}

const styles = StyleSheet.create({
    menuThing: {
        position: 'absolute',
        zIndex: 1,
        right: 0,
        borderWidth: 1,
        backgroundColor: colors.white,
        width: 200,
        top: 50,
    },
  item: {
    padding: 20,
    borderWidth: 2
  },
  text: {
    fontSize: 14,
    textTransform: "uppercase",
    fontWeight: "bold",
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
});

export default MenuOpened;
