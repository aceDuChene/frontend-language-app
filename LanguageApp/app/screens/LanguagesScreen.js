import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import routes from "../navigation/routes";
import { db } from "../../firebaseSetup";

// const initialLanguages = [
//   {
//     id: 1,
//     name: "Spanish",
//     image: "https://cdn.britannica.com/36/4336-004-6BD81071/Flag-Spain.jpg",
//   },
//   {
//     id: 2,
//     name: "Japanese",
//     image:
//       "https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/1-japanese-flag-with-heavy-grunge-bigalbaloo-stock.jpg",
//   },
//   {
//     id: 3,
//     name: "French",
//     image: "https://flagpedia.net/data/flags/w580/fr.png",
//   },
// ];

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
        console.log("db array: ", languageArray);
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
