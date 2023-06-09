import React, { useState, useContext, createContext } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [userdata, setUserdata] = useState(null);

  return (
    <UserContext.Provider value={{ userdata, setUserdata }}>
      {children}
    </UserContext.Provider>
  );
}
