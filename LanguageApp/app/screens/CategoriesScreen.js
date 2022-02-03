import React, { useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";

import AppTitle from "../components/AppTitle";
import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import routes from "../navigation/routes";

const initialCategories = [
  { name: "Time", icon: "clock" },
  { name: "Weather", icon: "weather-partly-cloudy" },
  { name: "Animals", icon: "dog-side" },
  { name: "Travel", icon: "wallet-travel" },
  { name: "Food", icon: "food" },
  { name: "Activities", icon: "lightbulb-on-outline" },
];

function CategoriesScreen({ route, navigation }) {
  const [categories, setCategories] = useState(initialCategories);
  const [refreshing, setRefreshing] = useState(false);

  return (
    <View>
      {/* <View style={styles.container}>
        <AppTitle style={styles.title}>Categories</AppTitle>
      </View> */}
      <ListItemSeparator />
      <FlatList
        data={categories}
        keyExtractor={(category) => category.icon}
        renderItem={({ item }) => (
          <ListItem
            title={item.name}
            icon={item.icon}
            onPress={() =>
              navigation.navigate(routes.SCENARIOS, {
                language: route.params.language,
                category: item.name,
                user_type: route.params.user_type,
              })
            }
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() =>
          // call backend to retrieve categories
          setCategories(categories)
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

export default CategoriesScreen;
