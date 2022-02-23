import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import LoadingSign from "../components/LoadingSign";
import ErrorMessage from "../components/ErrorMessage";
import routes from "../navigation/routes";
import { db } from "../../firebaseSetup";

function LanguagesScreen({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [languages, setLanguages] = useState();
  const [refreshing, setRefreshing] = useState(false);
  // used to refresh the page when going back
  const isFocused = useIsFocused();

  async function getLanguages() {
    let languageArray = [];
    let query = db.collection("Languages");

    if (route.params.user_type === "LL") {
      query = query.where("hasContent", "==", true);
    }
    await query
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          const id = documentSnapshot.id;
          languageArray.push({ id: id, ...documentSnapshot.data() });
        });
      })
      .catch((err) => {
        setError(err);
      });
    setLanguages(languageArray);
    setIsLoading(false);
  }

  useEffect(() => {
    setIsLoading(true);
    getLanguages();
  }, [isFocused]);

  if (isLoading) {
    return <LoadingSign />;
  }

  if (error) {
    return (
      <ErrorMessage message="Error fetching data... Please check your network connection!" />
    );
  }

  return (
    <View>
      <ListItemSeparator />
      <FlatList
        data={languages}
        keyExtractor={(language) => language.englishName}
        renderItem={({ item }) => (
          <ListItem
            title={item.englishName}
            imageLink={item.flag}
            onPress={() =>
              navigation.navigate(routes.CATEGORIES, {
                language: item.englishName,
                language_key: item.id,
                user_type: route.params.user_type,
              })
            }
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => setLanguages(languages)}
      />
    </View>
  );
}

export default LanguagesScreen;
