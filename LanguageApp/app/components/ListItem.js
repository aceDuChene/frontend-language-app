import React, { useState } from "react";
import { Image, View, StyleSheet, TouchableHighlight } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { storage } from "../../firebaseSetup";

import AppText from "./AppText";
import colors from "../config/colors";

function ListItem({ title, prompt, imageLink, icon, onPress }) {
  const [imageURL, setImageURL] = useState();
  if (imageLink != null) {
    let imageRef = storage.refFromURL(imageLink);
    imageRef
      .getDownloadURL()
      .then((url) => {
        setImageURL(url);
      })
      .catch((error) => console.log("Error getting image URL: ", error));
  }

  return (
    <TouchableHighlight onPress={onPress} underlayColor={colors.separator}>
      <View style={styles.container}>
        {icon && (
          <View style={styles.icon}>
            <MaterialCommunityIcons name={icon} size={30} />
          </View>
        )}
        {imageLink && (
          <View>
            <Image
              style={styles.image}
              source={{
                uri: imageURL,
              }}
            />
          </View>
        )}
        <View style={styles.textContainer}>
          {prompt ? (
            <View>
              <AppText style={styles.title}>{title}</AppText>
              <AppText style={styles.prompt}>{prompt}</AppText>
            </View>
          ) : (
            <AppText style={styles.category}>{title}</AppText>
          )}
        </View>
        <View style={styles.right}>
          <MaterialCommunityIcons
            name="chevron-right"
            color={colors.separator}
            size={35}
          />
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  category: {
    fontSize: 30,
    fontWeight: "bold",
  },
  container: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: colors.white,
  },
  icon: {
    justifyContent: "center",
  },
  right: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 50,
    overflow: "hidden",
    borderColor: "black",
    borderWidth: 3,
  },
  prompt: {
    fontSize: 15,
  },
  textContainer: {
    marginLeft: 15,
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
  },
});

export default ListItem;
