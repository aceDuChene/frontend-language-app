import React, { useState } from "react";
import { Image, StyleSheet } from "react-native";
import { storage } from "../../firebaseSetup";

function ScenarioImage({ uriLink }) {
  const [imageURL, setImageURL] = useState();
  let imageRef = storage.refFromURL(uriLink);
  imageRef
    .getDownloadURL()
    .then((url) => {
      setImageURL(url);
    })
    .catch((error) => console.log("Error getting image URL: ", error));

  return <Image style={styles.rectangle} source={{ uri: imageURL }} />;
}

const styles = StyleSheet.create({
  rectangle: {
    width: 300,
    height: 200,
    margin: 12,
  },
});

export default ScenarioImage;
