import React, { useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";

import AppTitle from "../components/AppTitle";
import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import Screen from "../components/Screen";

const initialCategories = [
  "Time",
  "Weather",
  "Food",
  "Animals",
  "Activities",
  "Travel",
];

function CategoriesScreen(props) {
  const [categories, setCategories] = useState(initialCategories);
  const [refreshing, setRefreshing] = useState(false);

  return (
    <Screen>
      <View style={styles.container}>
        <AppTitle style={styles.title}>Categories</AppTitle>
      </View>
      <ListItemSeparator />
      <FlatList
        data={categories}
        keyExtractor={(category) => category}
        renderItem={({ item }) => (
          <ListItem title={item} onPress={() => console.log("pressed", item)} />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() =>
          // call backend to retrieve categories
          setCategories(categories)
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
  },
});

export default CategoriesScreen;
