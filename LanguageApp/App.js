import React from "react";
import "react-native-gesture-handler";

import { AuthenticatedUserProvider } from "./app/navigation/AuthenticatedUserProvider";
import RootNavigator from "./app/navigation/RootNavigator";

function App() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}

export default App;
