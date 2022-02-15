import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

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

  const getCategories = async () => {
    let categoryArray = [];
    var categoryCount = 0;

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
          categoryArray.push(documentSnapshot.data());
          categoryArray[categoryCount]["categoryID"] = documentSnapshot.id;
          categoryCount++;
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
  }, []);

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
            onPress={() =>
              navigation.navigate(routes.SCENARIOS, {
                language: route.params.language,
                category: item.name,
                user_type: route.params.user_type,
                languageID: route.params.languageID,
                categoryID: item.categoryID
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
