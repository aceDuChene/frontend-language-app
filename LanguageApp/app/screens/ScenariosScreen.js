import React, { useState } from "react";
import { FlatList, View } from "react-native";

import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import routes from "../navigation/routes";

const initialScenarios = [
  { id: 1, title: "Telling Time", prompt: "What time is it?" },
  {
    id: 2,
    title: "Daily Schedule",
    prompt: "When do you come home from school?",
  },
  {
    id: 3,
    title: "Future Events",
    prompt: "When will you start your new job?",
  },
];

function ScenariosScreen({ route, navigation }) {
  const [scenarios, setScenarios] = useState(initialScenarios);
  const [refreshing, setRefreshing] = useState(false);

  return (
    <View>
      <ListItemSeparator />
      <FlatList
        data={scenarios}
        keyExtractor={(scenario) => scenario.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            prompt={item.prompt}
            onPress={() => {
              if (route.params.user_type === "CP") {
                navigation.navigate(routes.PROVIDER_SCENARIO, item);
              } else {
                navigation.navigate(routes.LEARNER_SCENARIO, item);
              }
            }}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() =>
          // call backend to retrieve Scenarios
          setScenarios(initialScenarios)
        }
      />
    </View>
  );
}

export default ScenariosScreen;
