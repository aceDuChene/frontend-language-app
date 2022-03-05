import React, { useState, useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import { storage } from "../../firebaseSetup";
import { LoadingSign, ErrorMessage } from "./";

function ScenarioImage({ uriLink }) {
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState(null);
  const [imageURL, setImageURL] = useState();

  const getImage = async () => {
    let imageRef = storage.refFromURL(uriLink);
    imageRef
      .getDownloadURL()
      .then((url) => {
        setImageURL(url);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    getImage();
  }, []);

  return (
    <View>
      {error ? (
        <ErrorMessage message="Picture Unavailable" style={styles.square} />
      ) : (
        <View>
          {isLoading ? (
            <LoadingSign style={styles.square} />
          ) : (
            <Image style={styles.square} source={{ uri: imageURL }} />
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  square: {
    width: 220,
    height: 220,
    marginBottom: 10,
    borderRadius: 15,
  },
});

export default ScenarioImage;
