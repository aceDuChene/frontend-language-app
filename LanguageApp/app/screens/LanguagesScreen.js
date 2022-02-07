import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import routes from "../navigation/routes";
import { db } from "../../firebaseSetup";

function LanguagesScreen({ route, navigation }) {
  const [languages, setLanguages] = useState();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    let languageArray = [];

    db.collection("Languages")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          languageArray.push(documentSnapshot.data());
        });
        setLanguages(languageArray);
        // console.log("db array: ", languageArray);
      });
  }, []);

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
                user_type: route.params.user_type,
              })
            }
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        // onRefresh={() => getLanguages()}
      />
    </View>
  );
}

export default LanguagesScreen;
