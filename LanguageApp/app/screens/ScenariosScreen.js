import React, { useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";

import AppTitle from "../components/AppTitle";
import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import Screen from "../components/Screen";

const initialScenarios = [
  { id: 1, title: "Clock", prompt: "What time is it?" },
  {
    id: 2,
    title: "End of Class",
    prompt: "When do you come home from school?",
  },
  { id: 3, title: "New Job", prompt: "When will you start your new job?" },
];

function ScenariosScreen(props) {
  const [scenarios, setScenarios] = useState(initialScenarios);
  const [refreshing, setRefreshing] = useState(false);

  return (
    <Screen>
      <View style={styles.container}>
        <AppTitle style={styles.title}>Time</AppTitle>
      </View>
      <ListItemSeparator />
      <FlatList
        data={scenarios}
        keyExtractor={(scenario) => scenario.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            prompt={item.prompt}
            onPress={() => console.log("pressed", item)}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() =>
          // call backend to retrieve Scenarios
          setScenarios(initialScenarios)
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

export default ScenariosScreen;
