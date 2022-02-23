import React, { useState } from "react";
import { StyleSheet, Text, View, Modal, Pressable } from "react-native";

import colors from "../config/colors";
import MenuOpened from "./MenuOpened";

function MenuButton({ color = colors.lightBlue, currentScreen }) {
  // Make button text black if background color is set to white
  let btnTextColor = colors.white;
  if (color === colors.white) {
    btnTextColor = colors.primary;
  }

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
        <MenuOpened
          currentScreen={currentScreen}
          onPress={() => setModalVisible(!modalVisible)}
        />
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <Text style={styles.text}>menu</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.lightBlue,
    borderWidth: 1,
    borderRadius: 25,
    padding: 5,
    bottom: 10,
    right: 10,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
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
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonOpen: {
    backgroundColor: colors.lightBlue,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default MenuButton;
