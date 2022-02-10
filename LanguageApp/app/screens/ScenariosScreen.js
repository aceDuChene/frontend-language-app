import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import AppTextInput from "../components/AppTextInput";
import routes from "../navigation/routes";
import { db } from "../../firebaseSetup";
import colors from "../config/colors";

function ScenariosScreen({ route, navigation }) {
  const [scenarios, setScenarios] = useState([]);
  const [filteredScenarios, setFilteredScenarios] = useState([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const getCategories = async () => {
    let scenarioArray = [];
    await db
      .collection("Scenarios")
      // .where("category", "==", route.params.category)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          scenarioArray.push(documentSnapshot.data());
        });
        setScenarios(scenarioArray);
        setFilteredScenarios(scenarioArray);
        // console.log("db array: ", scenarioArray);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

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
                  scenario: { item },
                });
              } else {
                navigation.navigate(routes.LEARNER_SCENARIO, {
                  language: route.params.language,
                  scenario: { item },
                });
              }
            }}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => {
          // call backend to retrieve Scenarios
          console.log(search);
          searchFilter(search);
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
