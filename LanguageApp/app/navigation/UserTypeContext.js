import React, { createContext, useState } from "react";

export const UserTypeContext = createContext([[], () => {}]);

export const UserTypeContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserTypeContext.Provider value={[user, setUser]}>
      {children}
    </UserTypeContext.Provider>
  );
};
