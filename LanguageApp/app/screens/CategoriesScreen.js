import React, { useState } from "react";
import { FlatList, View } from "react-native";

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

export default CategoriesScreen;
