import React, { useState } from "react";
import { StyleSheet, View, Modal, TouchableOpacity } from "react-native";

import MenuOpened from "../navigation/MenuOpened";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function MenuButton() {
  // Adapted from React Native Modal Documentation https://reactnative.dev/docs/modal#example
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <MenuOpened onPress={() => setModalVisible(!modalVisible)} />
      </Modal>
      <TouchableOpacity
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <MaterialCommunityIcons name="menu" size={30} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    bottom: 12,
    right: 18,
    justifyContent: "center",
  },
  text: {
    fontSize: 14,
    textTransform: "uppercase",
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
});

export default MenuButton;
