import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import LoadingSign from "../components/LoadingSign";
import AppTextInput from "../components/AppTextInput";
import ErrorMessage from "../components/ErrorMessage";
import routes from "../navigation/routes";
import { db } from "../../firebaseSetup";
import colors from "../config/colors";
import { useIsFocused } from "@react-navigation/native";

function ScenariosScreen({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [scenarios, setScenarios] = useState([]);
  const [filteredScenarios, setFilteredScenarios] = useState([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  // used to automatically refresh the screen
  const isFocused = useIsFocused();

  const getScenarios = async () => {
    let scenarioArray = [];

    await db
      .collection("Scenarios")
      .where("category", "==", route.params.category)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          const id = documentSnapshot.id;
          scenarioArray.push({ id: id, ...documentSnapshot.data() });
        });
        if (route.params.user_type === "CP") {
          scenarioArray = scenarioArray.filter((item) => {
            return !(route.params.language in item.promptTranslation);
          });
        } else {
          scenarioArray = scenarioArray.filter((item) => {
            return route.params.language in item.promptTranslation;
          });
        }
        setScenarios(scenarioArray);
        setFilteredScenarios(scenarioArray);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    getScenarios();
    return () => {};
  }, [isFocused]);

  const searchFilter = (text) => {
    if (text) {
      const newData = scenarios.filter((item) => {
        const itemTitle = item.title
          ? item.title.toLowerCase()
          : "".toLowerCase();
        const itemPrompt = item.prompt
          ? item.prompt.toLowerCase()
          : "".toLowerCase();
        const searchText = text.toLowerCase();
        return (
          itemTitle.indexOf(searchText) > -1 ||
          itemPrompt.indexOf(searchText) > -1
        );
      });
      setFilteredScenarios(newData);
      setSearch(text);
    } else {
      setFilteredScenarios(scenarios);
      setSearch(text);
    }
  };

  if (isLoading) {
    return <LoadingSign />;
  }

  if (error) {
    return (
      <ErrorMessage
        style={{ flex: 1 }}
        message="Error fetching data... Please check your network connection!"
      />
    );
  }

  return (
    <View>
      <View style={styles.search}>
        <AppTextInput
          icon="search"
          placeholder="Search Scenarios"
          value={search}
          onChangeText={(text) => searchFilter(text)}
        />
      </View>
      <ListItemSeparator />
      <FlatList
        data={filteredScenarios}
        keyExtractor={(scenario) => scenario.title}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            prompt={item.prompt}
            onPress={() => {
              if (route.params.user_type === "CP") {
                navigation.navigate(routes.PROVIDER_SCENARIO, {
                  language: route.params.language,
                  language_key: route.params.language_key,
                  category_key: route.params.category_key,
                  languageHasContent: route.params.languageHasContent,
                  categoryHasContent: route.params.categoryHasContent,
                  ...item,
                });
              } else {
                navigation.navigate(routes.LEARNER_SCENARIO, {
                  language: route.params.language,
                  language_code: route.params.language_code,
                  ...item,
                });
              }
            }}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => {
          getScenarios();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  search: {
    backgroundColor: colors.white,
    alignItems: "center",
    paddingHorizontal: 15,
  },
});

export default ScenariosScreen;
