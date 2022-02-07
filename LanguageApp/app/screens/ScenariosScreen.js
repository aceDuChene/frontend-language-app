import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import routes from "../navigation/routes";
import { db } from "../../firebaseSetup";

function ScenariosScreen({ route, navigation }) {
  const [scenarios, setScenarios] = useState();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    let scenarioArray = [];
    // console.log("category selected: ", route.params.category);

    db.collection("Scenarios")
      .where("category", "==", route.params.category)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          scenarioArray.push(documentSnapshot.data());
        });
        setScenarios(scenarioArray);
        // console.log("db array: ", scenarioArray);
      });
  }, []);

  return (
    <View>
      <ListItemSeparator />
      <FlatList
        data={scenarios}
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
        onRefresh={() =>
          // call backend to retrieve Scenarios
          setScenarios(scenarios)
        }
      />
    </View>
  );
}

export default ScenariosScreen;
