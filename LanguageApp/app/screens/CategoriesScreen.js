import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import routes from "../navigation/routes";
import { db } from "../../firebaseSetup";

function CategoriesScreen({ route, navigation }) {
  const [categories, setCategories] = useState();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    let categoryArray = [];

    db.collection("Categories")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          categoryArray.push(documentSnapshot.data());
        });
        setCategories(categoryArray);
        // console.log("db array: ", categoryArray);
      });
  }, []);

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
