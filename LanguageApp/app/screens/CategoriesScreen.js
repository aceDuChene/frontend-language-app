import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import LoadingSign from "../components/LoadingSign";
import ErrorMessage from "../components/ErrorMessage";
import routes from "../navigation/routes";
import { db } from "../../firebaseSetup";

function CategoriesScreen({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState();
  const [refreshing, setRefreshing] = useState(false);
  // used to automatically refresh page
  const isFocused = useIsFocused();

  const getCategories = async () => {
    let categoryArray = [];
    let categoryQuery = db.collection("Categories");

    // Restrict contents of LL screen to categories that have content in the selected language
    if (route.params.user_type === "LL") {
      categoryQuery = categoryQuery.where(
        "hasContent",
        "array-contains",
        route.params.language
      );
    }

    categoryQuery
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          const id = documentSnapshot.id;
          categoryArray.push({ id: id, ...documentSnapshot.data() });
        });

        setCategories(categoryArray);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    getCategories();
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
        data={categories}
        keyExtractor={(category) => category.icon}
        renderItem={({ item }) => (
          <ListItem
            title={item.name}
            icon={item.icon}
            onPress={() => {
              navigation.navigate(routes.SCENARIOS, {
                language: route.params.language,
                language_code: route.params.language_code,
                category: item.name,
                user_type: route.params.user_type,
                language_key: route.params.language_key,
                category_key: item.id,
                languageHasContent: route.params.languageHasContent,
                categoryHasContent: item.hasContent,
              });
            }}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => {
          // call backend to retrieve categories
          getCategories();
        }}
      />
    </View>
  );
}

export default CategoriesScreen;
