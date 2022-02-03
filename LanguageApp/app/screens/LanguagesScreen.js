import React, { useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";

import AppTitle from "../components/AppTitle";
import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import Screen from "../components/Screen";
import routes from "../navigation/routes";

const initialLanguages = [
  {
    id: 1,
    name: "Spanish",
    image: "https://cdn.britannica.com/36/4336-004-6BD81071/Flag-Spain.jpg",
  },
  {
    id: 2,
    name: "Japanese",
    image:
      "https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/1-japanese-flag-with-heavy-grunge-bigalbaloo-stock.jpg",
  },
  {
    id: 3,
    name: "French",
    image: "https://flagpedia.net/data/flags/w580/fr.png",
  },
];

function LanguagesScreen({ route, navigation }) {
  const [languages, setLanguages] = useState(initialLanguages);
  const [refreshing, setRefreshing] = useState(false);

  return (
    <View>
      {/* <View style={styles.container}>
        <AppTitle style={styles.title}>Languages</AppTitle>
      </View> */}
      <ListItemSeparator />
      <FlatList
        data={languages}
        keyExtractor={(language) => language.id}
        renderItem={({ item }) => (
          <ListItem
            title={item.name}
            imageLink={item.image}
            onPress={() =>
              navigation.navigate(routes.CATEGORIES, {
                language: item.name,
                user_type: route.params.user_type,
              })
            }
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() =>
          // call backend to retrieve Languages
          setLanguages(languages)
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
  },
});

export default LanguagesScreen;
