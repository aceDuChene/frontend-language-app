import React from "react";
import "react-native-gesture-handler";

import { AuthenticatedUserProvider } from "./app/navigation/AuthenticatedUserProvider";
import RootNavigator from "./app/navigation/RootNavigator";
import { UserTypeContextProvider } from "./app/navigation/UserTypeContext";

function App() {
  return (
    <AuthenticatedUserProvider>
      <UserTypeContextProvider>
        <RootNavigator />
      </UserTypeContextProvider>
    </AuthenticatedUserProvider>
  );
}

export default App;
